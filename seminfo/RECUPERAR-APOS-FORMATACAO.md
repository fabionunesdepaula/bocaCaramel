# Recuperar o projeto após formatar o computador

O ZIP completo de preservação é privado: contém senhas, certificados e chaves das bancas. Guardar no Drive com acesso restrito à organização. O GitHub contém o código e a documentação; não contém os bancos, as ISOs nem as credenciais.

## Antes de formatar

1. Enviar o ZIP completo para o Drive e aguardar a conclusão do upload.
2. Conferir o tamanho e, idealmente, baixar uma cópia para outro dispositivo e verificar o SHA-256 informado na entrega. Manter o arquivo original até conferir essa cópia.
3. O ZIP inclui `LEIA-PRIMEIRO-BACKUP.txt`, `MANIFESTO-BACKUP.json` e a pasta `bocaCaramel`, com o projeto, o histórico Git, os artefatos e os backups dos bancos. O manifesto identifica os backups novos e verificados e os hashes dos arquivos.
4. A formatação só deve ocorrer depois de confirmar que a cópia fora deste computador está íntegra.

## Depois de formatar

1. Instalar Git, Python 3.10 ou superior e Docker Desktop com suporte a containers Linux/WSL2. Iniciar o Docker e aguardar ficar pronto. O pacote preserva as imagens dos containers; não inclui os instaladores dessas ferramentas nem a distribuição WSL do computador antigo.
2. Extrair o ZIP completo com uma ferramenta com suporte a ZIP64, como 7-Zip. Preservar as pastas ocultas, inclusive `.git`. Abrir o PowerShell dentro da pasta extraída `bocaCaramel`.
3. Conferir `git status` e `git log -1`. O histórico local também está preservado no ZIP.
4. Carregar as imagens Docker preservadas:

```powershell
docker load --input .\seminfo\dist\seminfo-server-images.tar
```

5. Consultar `MANIFESTO-BACKUP.json` na raiz do ZIP e localizar a pasta de backup verificado de cada perfil. As pastas estão em `seminfo\backups`. Testar a restauração com o nome exato indicado no manifesto:

```powershell
python .\seminfo\manage.py restore-check --backup .\seminfo\backups\NOME-EXATO-DO-BACKUP
```

6. Restaurar cada perfil em sua respectiva mesa, em uma instalação Docker vazia. Usar `si` na mesa da Graduação e `tii` na mesa do Médio/Técnico. Exemplo para SI:

```powershell
python .\seminfo\manage.py restore si --backup .\seminfo\backups\NOME-EXATO-DO-BACKUP-SI
```

Na outra mesa, trocar `si` por `tii` e informar o backup TII. A restauração recusa bancos existentes e compara tabelas e objetos com o backup. Não executar os dois serviços web simultaneamente na mesma mesa: eles usam as mesmas portas.

7. Conferir IP, sub-rede e horários reais em `seminfo\local\si\lab.json` ou `seminfo\local\tii\lab.json`. Preservar as credenciais e os certificados restaurados; as ISOs existentes dependem da identidade da banca.
8. Reinstalar os atalhos e a integração Windows seguindo o manual em `seminfo\documentacao\manual-if.md`. Atalhos, tarefas agendadas, firewall do Windows e ambientes virtuais Python precisam ser recriados no Windows novo. Os arquivos dos ambientes virtuais foram preservados por completude, mas não devem ser considerados portáveis.
9. Repetir as verificações locais e a homologação presencial descritas no manual antes de ativar qualquer prova. As ISOs estão em `seminfo\dist\clients\si` e `seminfo\dist\clients\tii`; conferir seus checksums antes de gravar os pendrives.

Este backup é do projeto BOCA/SEMINFO. Não cobre outros projetos, arquivos pessoais, instalações do Windows ou volumes Docker de aplicações alheias ao projeto.
