"""Real native author/import/edit + isolated reference judge, synthetic data only."""
import base64
import datetime as dt
import io
import json
from pathlib import Path
import secrets
import subprocess
import sys
import tempfile
import time
import urllib.request
from unittest.mock import patch
from zipfile import ZipFile

sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
import manage as kit
import organizer
import problems
from integration import fixtures, login


def multipart(fields,files):
    boundary='seminfo-'+secrets.token_hex(16)
    data=b''
    for name,value in fields.items():
        data+=f'--{boundary}\r\nContent-Disposition: form-data; name="{name}"\r\n\r\n{value}\r\n'.encode()
    for name,(filename,raw) in files.items():
        data+=f'--{boundary}\r\nContent-Disposition: form-data; name="{name}"; filename="{filename}"\r\nContent-Type: application/octet-stream\r\n\r\n'.encode()+raw+b'\r\n'
    return data+f'--{boundary}--\r\n'.encode(),'multipart/form-data; boundary='+boundary


def main():
    tag='seminfo-author-'+secrets.token_hex(5)
    names={k:tag+'-'+k for k in ('db','web')};network=tag+'-net'
    lock=json.loads((kit.DIST/'server.lock.json').read_text())
    assert lock['source_sha256']==kit.source_hash()
    raw_run,raw_exists=kit.run,kit.exists
    actual_before={p:kit.fingerprint(f'boca-{p}-boca-db-1') for p in ('si','tii')}
    with tempfile.TemporaryDirectory() as temp:
        root=Path(temp);local=root/'local';(local/'si').mkdir(parents=True)
        cfg=json.loads((kit.HERE/'labs/si.json').read_text())
        cfg.update(start=(dt.datetime.now(dt.timezone.utc)-dt.timedelta(minutes=5)).isoformat(),
                   duration_minutes=120,freeze_minutes_before_end=0,timing_confirmed=True)
        credentials={key:secrets.token_hex(24) for key in ('POSTGRES_PASSWORD','BOCA_DB_PASSWORD','BOCA_PASSWORD','BOCA_KEY','SYSTEM_PASSWORD','SCORE_PASSWORD')}
        credentials.update({f'TEAM_{i:02}':secrets.token_hex(16) for i in range(1,11)})
        # Keep the saved user config on the real event date; only the disposable judge starts today.
        kit.write_json(local/'si/lab.json',json.loads((kit.HERE/'labs/si.json').read_text()))
        kit.write_json(local/'si/credentials.json',credentials)
        env=root/'isolated.env'
        env.write_text(''.join(k+'='+v+'\n' for k,v in credentials.items())+'SEMINFO_PROFILE=si\n')
        def control(profile,action,extra=None):
            assert profile=='si'
            return json.loads(raw_run(['docker','exec','-i',names['web'],'php','/opt/seminfo/control.php',action],
                             data=json.dumps({'config':cfg,'credentials':credentials,**(extra or {})}).encode()))
        mapping={'boca-si-boca-db-1':names['db'],'boca-si-boca-web-1':names['web']}
        def mapped(args,**kwargs):
            def target(arg):
                value=str(arg)
                for old,new in mapping.items():
                    if value==old or value.startswith(old+':'):return new+value[len(old):]
                return arg
            return raw_run([target(a) for a in args],**kwargs)
        raw_run(['docker','network','create',network])
        try:
            raw_run(['docker','run','-d','--name',names['db'],'--network',network,'--network-alias','boca-db','--env-file',env,lock['images']['db']['reference']])
            kit.wait_database(names['db'])
            raw_run(['docker','run','-d','--name',names['web'],'--network',network,'--env-file',env,
                     '-e','BOCA_DB_HOST=boca-db','-e','BOCA_DB_SUPER_USER=postgres','-p','127.0.0.1::80',
                     '--entrypoint','/bin/bash',lock['images']['web']['reference'],'-c',
                     'export BOCA_DB_SUPER_PASSWORD="$POSTGRES_PASSWORD"; exec /opt/seminfo/server-init.sh'])
            for _ in range(90):
                if kit.inspect(names['web'])['State'].get('Health',{}).get('Status')=='healthy':break
                time.sleep(1)
            else:raise RuntimeError('Authoring test web not healthy')
            assert control('si','prepare')['ok']
            port=kit.inspect(names['web'])['NetworkSettings']['Ports']['80/tcp'][0]['HostPort']
            base=f'http://127.0.0.1:{port}/boca/'
            client=login(base,'admin',credentials['BOCA_PASSWORD'],'admin',contest=1)
            with client.open(base+'index.php?contest=1&destination=builder') as response:
                assert response.url.endswith('admin/buildproblem.php')
                assert b'Timelimit' in response.read()
            with client.open(base+'index.php?contest=1&destination=problems') as response:
                assert response.url.endswith('admin/problem.php')
            def post(fields,files):
                data,kind=multipart(fields,files)
                with client.open(urllib.request.Request(base+'admin/problem.php',data,{'Content-Type':kind}),timeout=30) as response:return response.read()
            def build(answer=b'42\n'):
                package=post({'Submit5':'Send','confirmation':'confirm','noflush':'true','fullname':'Soma sintetica','basename':'A','timelimit':'2'},
                             {'probleminput':('casos.in',b'20 22\n'),'problemsol':('casos.out',answer),'problemdesc':('soma.txt',b'Leia dois inteiros e imprima a soma.\n')})
                with ZipFile(io.BytesIO(package)) as archive:
                    for ext in ('c','cpp','java','py3'):
                        for stage in ('compile','run','compare','limits'):assert stage+'/'+ext in archive.namelist()
                    assert b'-std=c++20' in archive.read('compile/cpp')
                return package
            def publish(package):
                post({'Submit3':'Send','confirmation':'confirm','noflush':'true','problemnumber':'1','problemname':'A',
                      'colorname':'Amarelo','color':'ffcc00','autojudge_new_sel':'all'}, {'probleminput':('A.zip',package)})
                # BOCA fills metadata by reading problem.info when the list is rendered.
                client.open(base+'admin/problem.php').close()
            package=build();publish(package)
            with patch.object(kit,'LOCAL',local),patch.object(kit,'run',mapped),patch.object(kit,'exists',side_effect=lambda x:raw_exists(mapping.get(str(x),x))),patch.object(kit,'control',side_effect=control),patch('admission_setup.running',return_value=False):
                problem=problems.catalog('si')[0]
                assert problem['basename']=='A' and problem['title']=='Soma sintetica'
                sources=fixtures(root)
                refs=[{'name':name,'content':base64.b64encode(sources[name].encode()).decode()} for name in ('Main.c','Main.cpp','A.java','Main.py3')]
                before=kit.fingerprint(names['db'])
                good=problems.validate('si',{'problem':1,'revision':problem['revision'],'sources':refs})
                if not good['passed']:kit.write_json(kit.HERE/'reports/contest-setup-reference-debug.json',good)
                assert good['passed'] and good['complete'],good['results']
                assert kit.fingerprint(names['db'])==before,'Reference run changed preparation database'
                assert problems.assert_reviewable('si')
                print('Native builder/import and four accepted reference languages: OK',flush=True)
                # Edit the package through the same admin importer; prior success must expire.
                time.sleep(1.1)
                publish(build(b'99\n'))
                changed=problems.catalog('si')[0]
                assert changed['revision']!=problem['revision']
                assert not problems.read_report('si',changed)['current']
                wrong=[{'name':'Wrong.c','content':base64.b64encode(sources['Wrong.c'].encode()).decode()}]
                before=kit.fingerprint(names['db'])
                bad=problems.validate('si',{'problem':1,'revision':changed['revision'],'sources':wrong})
                assert not bad['passed'] and not bad['complete'],bad
                assert kit.fingerprint(names['db'])==before
                # The normal bank backup must recover reference sources/reports too.
                with patch.object(kit,'HERE',root/'backup-kit'):
                    backup=kit.backup('si')
                    kit.check_restore(backup)
                    manifest=json.loads((backup/'manifest.json').read_text())
                    assert set(manifest['reference_files_sha256'])=={'1/sources.json','1/validation.json'}
                    checked=json.loads((backup/'restore-verified.json').read_text())
                    assert checked['reference_files_sha256']==manifest['reference_files_sha256']
                assert control('si','activate')['ok']
                for _ in range(60):
                    if kit.inspect(names['web'])['State'].get('Health',{}).get('Status')=='healthy':break
                    time.sleep(1)
                port=kit.inspect(names['web'])['NetworkSettings']['Ports']['80/tcp'][0]['HostPort']
                base=f'http://127.0.0.1:{port}/boca/'
                client=login(base,'admin',credentials['BOCA_PASSWORD'],'admin',contest=1)
                # A mutation attempted against an active event must be ignored by the native page.
                before=problems.catalog('si')
                publish(package)
                assert problems.catalog('si')==before,'Active contest package was modified'
                report={'passed':True,'server_source_sha256':kit.source_hash(),'native_create_import_edit':True,
                        'cpp20_template':True,'references_four_languages':good['results'],
                        'wrong_reference_rejected':True,'changed_package_invalidates_validation':True,
                        'active_native_problem_edit_rejected':True,'disposable_preparation_database_unchanged_by_references':True,
                        'reference_sources_and_reports_backed_up_and_restore_checked':True,
                        'real_event_databases_unchanged':True,'utc':dt.datetime.now(dt.timezone.utc).isoformat()}
            assert all(kit.fingerprint(f'boca-{p}-boca-db-1')==actual_before[p] for p in ('si','tii'))
            kit.write_json(kit.HERE/'reports/contest-setup.json',report)
            print('PASSOU: criacao, importacao, edicao, referencias AC/WA, revisoes e bancos reais intactos.',flush=True)
        finally:
            for name in names.values():subprocess.run(['docker','rm','-f','-v',name],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
            subprocess.run(['docker','network','rm',network],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)


if __name__=='__main__':main()
