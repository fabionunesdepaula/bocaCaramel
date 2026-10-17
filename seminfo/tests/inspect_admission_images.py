"""Inspect the compressed system from both actual ISOs, never a cached root."""
import hashlib
import json
from pathlib import Path
import ssl
import subprocess
import tempfile

HERE=Path('/kit/seminfo')
results={}
for profile,lab in (('si',3),('tii',4)):
    with tempfile.TemporaryDirectory(prefix='seminfo-inspect-') as tmp:
        fs=Path(tmp)/'filesystem.squashfs'
        iso=HERE/'dist/clients'/profile/f'ml-seminfo-lab{lab}-{profile}.iso'
        subprocess.run(['xorriso','-osirrox','on','-indev',str(iso),'-extract','/casper/filesystem.squashfs',str(fs)],
            stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,check=True)
        def read(name):return subprocess.check_output(['unsquashfs','-cat',str(fs),name])
        config=json.loads(read('etc/seminfo/lab.json'))
        pin=hashlib.sha256(ssl.PEM_cert_to_DER_cert((HERE/'local'/profile/'admission-cert.pem').read_text())).hexdigest()
        assert config['profile']==profile and config['lab']==lab and config['admission']
        assert config['admission_fingerprint']==pin
        bootstrap=read('etc/nftables.conf').decode()
        assert 'tcp dport 8000' not in bootstrap
        for source,target in [('client/admission-agent.py','usr/local/sbin/seminfo-admission-agent'),
                ('client/admission-window.py','usr/local/sbin/seminfo-admission-window'),
                ('client/network.sh','usr/local/sbin/seminfo-network'),
                ('client/wallpaper.py','usr/local/sbin/seminfo-wallpaper'),
                ('client_config.py','usr/local/lib/seminfo/client_config.py'),
                ('admission_wire.py','usr/local/lib/seminfo/admission_wire.py')]:
            assert read(target)==(HERE/source).read_bytes(),target
        assets={}
        for name in ('caramel-claro.png','caramel-espresso.png'):
            actual=read('usr/share/maratona-background/'+name)
            assert actual==(HERE/'banners'/name).read_bytes()
            assets[name]=hashlib.sha256(actual).hexdigest()
        permissions=subprocess.check_output(['unsquashfs','-ll',str(fs),'usr/local/sbin/seminfo-admission-agent']).decode()
        assert any(line.startswith('-rwxr-xr-x root/root') for line in permissions.splitlines()),permissions
        results[profile]={'passed':True,'profile':profile,'lab':lab,'pin_matches_desk':True,
            'bootstrap_closed':True,'executables_root_755':True,'runtime_matches_source':True,'wallpapers':assets}
Path('/reports/iso-admission-inspection.json').write_text(json.dumps(results,indent=2))
print('PASSOU: ambas as ISOs contem o cliente atual, bloqueio inicial, certificado certo e as duas artes intactas.')
