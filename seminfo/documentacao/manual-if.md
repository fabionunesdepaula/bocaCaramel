# Manual de implantação e operação

XIX SEMINFO 2026 - Caramel Contest

IF Goiano - Campus Urutaí | Núcleo de Informática

Evento: 29/10/2026 | Edição do manual: 16/10/2026 | Versão 1.1

Este manual orienta a equipe do IF na preparação, operação e recuperação das duas maratonas. Usa os nomes dos botões da interface mantida. A nova interface que foi descartada não é necessária para seguir estas instruções.

**Como ler:** a banca usa principalmente os capítulos 8 a 11. A TI executa a instalação, as mídias e a recuperação. A coordenação preenche os dados do evento e autoriza decisões sobre horários, incidentes e resultados.

## 1. O evento e quem faz cada tarefa

| Item | Superior | Médio/Técnico |
|---|---|---|
| Curso | Bacharelado em Sistemas de Informação | Técnico em Informática para a Internet |
| Laboratório adotado | Lab 3 | Lab 4 |
| Identificador técnico | si | tii |
| Nome da instalação Docker | boca-si | boca-tii |
| Contas de equipe | si01 a si10 | tii01 a tii10 |
| Capacidade | Até 10 equipes de 3 pessoas | Até 10 equipes de 3 pessoas |

São duas bancas gerenciadoras independentes: Graduação/SI no Lab 3 e Médio/Técnico/TII no Lab 4. Cada uma tem seu BOCA, juiz, questões diferentes, contas, homologação e classificação. Não há ranking único entre os níveis. Cada banca confirma seus próprios horários; eles podem coincidir por decisão da organização, mas uma prova não depende dos tempos nem da publicação da outra.

Os computadores das equipes usam Maratona Linux pelo USB. As mesas da banca adotadas neste projeto usam Windows com Docker Desktop. A central administrativa é aberta no navegador da mesa. Os dois BOCA não precisam compartilhar banco de dados.

| Responsável | O que precisa entregar |
|---|---|
| Coordenação do evento | Horários de cada categoria, responsáveis, contatos, regras e decisões sobre incidentes |
| TI do IF | Rede, mesas, Docker/Python, instalação, firewall, pendrives, homologação e recuperação |
| Cristiane | Questões e pacotes para revisão e importação |
| Organizador responsável pelos problemas | Importar os pacotes de Graduação no BOCA SI e os de Médio/Técnico no BOCA TII; conferir separadamente |
| Banca de cada sala | Conferir computadores, aprovar acessos, acompanhar a prova e registrar ocorrências |
| Responsável pelos projetores | Área estendida e janela correta de placar, sem expor administração |

Preencher nomes e telefones/ramais na planilha `dados-evento.csv`. Definir quem substitui cada responsável se houver ausência.

## 2. Dados que precisam ser confirmados

Preencher esta ficha antes da instalação definitiva. Campos vazios não devem ser substituídos por endereços ou tempos imaginados.

| Informação | Lab 3 / SI | Lab 4 / TII |
|---|---|---|
| IP reservado da mesa | A CONFIRMAR | A CONFIRMAR |
| Sub-rede e prefixo | A CONFIRMAR | A CONFIRMAR |
| Mesma sub-rede entre as salas? | A CONFIRMAR | A CONFIRMAR |
| IPs das centrais/projetores em outra sub-rede | A CONFIRMAR, se houver | A CONFIRMAR, se houver |
| Responsável e contato da banca | PREENCHER | PREENCHER |
| Responsável e contato da TI | PREENCHER | PREENCHER |
| Identificação do PC da mesa | PREENCHER | PREENCHER |

| Informação do evento | Situação |
|---|---|
| Data | 29/10/2026 |
| Fuso | Horário de Brasília, UTC-03:00 |
| Início | Proposta de 13h; confirmar com a coordenação |
| Duração em minutos | A CONFIRMAR; sem valor automático |
| Congelar quantos minutos antes do fim | A CONFIRMAR; zero significa sem período de congelamento |
| Penalidade inicial | 20 minutos |
| Entrega das questões revisadas | Data/responsável a combinar |
| Homologação presencial | Concluir até 28/10, conforme acesso aos laboratórios |

O campo de congelamento da central significa **minutos antes do fim**. Não preencher com o minuto decorrido da prova. Marcar a confirmação dos horários somente depois de combinar os valores da própria categoria com a coordenação.

## 3. Materiais e kit que a TI deve receber

### 3.1. Infraestrutura

1. Separar uma mesa Windows com Docker Desktop em modo de containers Linux por laboratório. Usar a conta do organizador preparada pela TI, com permissão para Docker e para o controle do firewall.
2. Instalar Python 3.12 para Windows, incluindo `pythonw.exe`, antes do evento. Essa versão corresponde ao pacote offline do Pygame fornecido.
3. Confirmar rede cabeada, IP reservado da mesa, alimentação e projetor. Se a prova não precisar de internet, a operação deve continuar sem ela.
4. Conferir os PCs das equipes: amd64, pelo menos 8 GB de RAM e boot USB permitido. A TI deve testar o modo de boot; a receita atual prevê Secure Boot desabilitado.
5. Separar 22 pendrives de 32 GB ou mais: dez de equipe e uma reserva por sala. Separar uma mídia protegida para a segunda cópia dos backups.
6. Disponibilizar Linux com `lsblk`, `sha256sum`, `dd`, `cmp`, `sgdisk`, `parted`, `partprobe`, `udevadm` e `mkfs.ext4` para gravar as mídias com persistência.

### 3.2. Conferência da entrega

Receber a pasta completa do projeto, preservando nomes e conteúdo. Abaixo, os caminhos são relativos à raiz dessa pasta.

| Material | Local | Quem pode receber |
|---|---|---|
| Código e scripts do kit | Projeto completo, incluindo src, tools, boca-docker e seminfo | TI/organização |
| Imagens offline do servidor | seminfo/dist/seminfo-server-images.tar | TI |
| Manifestos do servidor | seminfo/dist/server.lock.json e server-bundle.json | TI |
| Identidade privada SI | seminfo/local/si | TI e responsáveis autorizados por SI |
| Identidade privada TII | seminfo/local/tii | TI e responsáveis autorizados por TII |
| ISO e checksum SI | seminfo/dist/clients/si | TI responsável pelas mídias |
| ISO e checksum TII | seminfo/dist/clients/tii | TI responsável pelas mídias |
| Animeitor offline | seminfo/dist/animeitor-source.zip, animeitor-assets.json e wheels | TI da mesa de revelação |
| Manuais e formulários | seminfo/documentacao | Organização |
| Pacotes reais de problemas | Entrega separada da Cristiane | Organização/juízes, com acesso restrito |

**As ISOs já reconhecem os certificados das bancas.** Levar para cada mesa a pasta privada correspondente. Não criar outra identidade e continuar usando os mesmos pendrives: eles recusarão a banca com certificado diferente.

O kit mestre pode guardar os dois perfis com acesso restrito. Na mesa de cada sala, levar a pasta privada do próprio perfil. O pareamento com a outra sala será feito por descritor; não exige copiar sua chave TLS nem todas as suas senhas.

As pastas `local`, `backups` e os descritores de pareamento não devem ser compartilhados com equipes ou publicados em repositório. O manual não contém essas credenciais.

## 4. Instalação da mesa pela TI

Executar este capítulo uma vez por mesa. O exemplo usa SI. Na mesa do Lab 4, trocar `si` por `tii` em todos os comandos. Não iniciar as duas instalações web na mesma máquina: ambas usam as mesmas portas locais.

### 4.1. Abrir a pasta e conferir os programas

1. Copiar o kit para uma pasta local estável. Exemplo de pasta, a ser ajustado pela TI: `C:\SEMINFO\bocaCaramel`.
2. Entrar na conta do organizador e abrir o Docker Desktop. Aguardar o mecanismo de containers Linux ficar pronto.
3. Abrir PowerShell na raiz do projeto. Para ações de firewall e agendamento, usar PowerShell como administrador na conta preparada pela TI.
4. Executar:

```powershell
python --version
docker version
docker compose version
```

Resultado esperado: Python 3.12 e respostas tanto do cliente quanto do servidor Docker. Se aparecer apenas o cliente Docker ou falha de conexão, resolver o Docker Desktop antes de prosseguir.

### 4.2. Carregar as imagens já preparadas

1. Conferir o SHA256 do pacote e comparar com `sha256` no arquivo `server-bundle.json`:

```powershell
Get-FileHash seminfo/dist/seminfo-server-images.tar -Algorithm SHA256
Get-Content seminfo/dist/server-bundle.json
```

2. Se os hashes coincidirem, carregar:

```powershell
docker load -i seminfo/dist/seminfo-server-images.tar
python seminfo/manage.py init si
```

Resultado esperado: imagens carregadas e pasta privada existente preservada. Antes de `init`, conferir que a pasta recebida já contém certificado, chave, tokens e credenciais corretos. Se estiver incompleta, interromper e solicitar o kit original.

Não executar `build-server` na mesa só para iniciar uma entrega já pronta. Esse comando é de preparação de uma nova versão. Alterar o código pode invalidar o manifesto e os ensaios; a TI deve redistribuir o kit completo e homologado se precisar corrigir algo.

### 4.3. Criar os atalhos e preencher os dados

1. Criar os atalhos, se ainda não existirem:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File seminfo/install-organizer-shortcut.ps1
```

2. Abrir **Central SEMINFO** pela área de trabalho/menu Iniciar. Alternativa: abrir `seminfo/Abrir Central SEMINFO.vbs`.
3. Aceitar a solicitação de permissão do Windows com a conta preparada pela TI. A aplicação não solicita nem armazena a senha do Windows.
4. No topo, conferir **Esta banca gerencia**: Lab 3/SI ou Lab 4/TII.
5. Abrir **Preparação da sala** e preencher os IPs e tempos confirmados. Salvar antes da primeira inicialização da banca.

Se houver instalação anterior, a TI deve primeiro conferir seu estado e seguir o procedimento de manutenção do capítulo 12. A central recusa editar uma prova ativa, com submissões, com a banca aberta ou com estado do banco desconhecido.

### 4.4. Preparar banco e serviços

Na primeira instalação ou migração de um deploy anterior:

```powershell
python seminfo/manage.py check si --network --timing
python seminfo/manage.py migrate si
python seminfo/manage.py prepare si
python seminfo/manage.py verify si
```

Executar um comando por vez e aguardar sucesso. `migrate` detecta a instalação antiga, faz backup e testa restauração antes de trocar um volume anônimo. Se o banco já usar volume nomeado, não migra de novo. Em instalação nova, inicia os serviços.

Resultado esperado: banco, web e juiz funcionando; contas e quatro linguagens conferidas; prova ainda inativa. Não liberar equipes se houver erro. Não usar `prepare` em uma prova ativa ou já usada.

### 4.5. Instalar firewall e início no logon

Em PowerShell elevado, primeiro conferir a simulação:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File seminfo/install-admission.ps1 -Profile si -WhatIf
powershell -NoProfile -ExecutionPolicy Bypass -File seminfo/install-admission.ps1 -Profile si
```

O instalador pausa a banca, aplica o firewall e cria a tarefa **SEMINFO Banca si**. No Lab 4, a tarefa é **SEMINFO Banca tii**. Ela inicia no logon da conta do organizador e aguarda o Docker Desktop. Não é um serviço anterior ao logon.

Abrir a central e usar **Atualizar diagnóstico**. Resultado esperado: **Banca funcionando**. Testar saída/entrada da conta ou reinicialização da mesa durante a homologação, antes da prova.

### 4.6. Endereços e portas

| Serviço | Endereço/porta | Uso |
|---|---|---|
| BOCA das equipes | http://IP-DA-MESA:8000/boca/ | Somente computadores aprovados e a própria mesa |
| Canal de autorização | TCP 8443 com TLS | Serviço da imagem Linux e centrais pareadas |
| BOCA local administrativo | http://127.0.0.1:18000/boca/ | Somente na mesa; não divulgar como acesso da equipe |
| Aprovações locais | 127.0.0.1:17860 | Abrir pela sessão privada da central |
| Central de salas e placares | 127.0.0.1:17861 | Painel privado e páginas públicas locais de projeção |
| Central SEMINFO | 127.0.0.1:17862 | Abrir pelo atalho para obter a sessão privada |
| Grafana | 127.0.0.1:3001 | Somente na mesa |

`IP-DA-MESA` é um campo a substituir pelo endereço confirmado. `0.0.0.0` significa escutar em interfaces IPv4, não é endereço para digitar no navegador e não significa liberar qualquer computador.

Se a porta 8000 estiver ocupada por outro programa, a TI deve identificar o responsável. Não encerrar processos desconhecidos. A resposta nessa porta precisa ser do BOCA antes de ativar a prova.

## 5. Gravar e identificar os pendrives

Responsável: TI, em Linux. A gravação apaga o pendrive selecionado. Não executar os comandos deste capítulo na mesa Windows nem digitar um disco por suposição.

### 5.1. Escolher a variante

| Sala | ISO |
|---|---|
| Lab 3 / SI | seminfo/dist/clients/si/ml-seminfo-lab3-si.iso |
| Lab 4 / TII | seminfo/dist/clients/tii/ml-seminfo-lab4-tii.iso |

Cada ISO deve estar acompanhada do arquivo `.iso.sha256` da mesma pasta. Usar a pasta atual `clients/si` ou `clients/tii`; as imagens antigas em `before-admission` são históricas e não devem ser distribuídas.

### 5.2. Gravar o piloto

1. Conectar somente o pendrive a gravar, quando possível.
2. Listar modelo, número de série, tamanho e transporte:

```bash
lsblk -d -o NAME,MODEL,SERIAL,SIZE,TRAN
lsblk -o NAME,SIZE,FSTYPE,LABEL,MOUNTPOINTS
```

3. Identificar fisicamente o USB de 32 GB ou mais e desmontar suas partições pelo gerenciador de discos. Conferir que os discos internos não foram selecionados.
4. Executar o script com o dispositivo inteiro. O texto `/dev/sdX` abaixo é um marcador; substituir somente pelo USB que acabou de ser identificado:

```bash
sudo bash seminfo/client/write-usb.sh --device /dev/sdX /caminho/ml-seminfo-lab3-si.iso
```

5. Conferir o modelo/série mostrado. Digitar o caminho exato somente se corresponder ao USB escolhido.
6. Aguardar a verificação SHA256, a gravação, a comparação de bytes e a criação de `home-rw` no espaço restante.

Resultado esperado: mensagem de USB conferido e partição `home-rw`. Uma ferramenta que apenas grava a ISO pode não criar essa persistência; para a entrega atual, usar o script fornecido e conferir o resultado.

### 5.3. Validar e replicar

1. Identificar os pilotos como `SI-PILOTO` e `TII-PILOTO` no inventário.
2. Testar cada um no hardware real da sua sala, conforme o capítulo 7.
3. Depois da aprovação, gravar as demais mídias **a partir da ISO limpa** pelo mesmo script.
4. Não clonar a pasta `/home` de um piloto já iniciado: cada USB cria uma identidade própria para autorização.
5. Etiquetar `SI-01` a `SI-10`, `SI-RESERVA`, `TII-01` a `TII-10` e `TII-RESERVA`.
6. Registrar série da mídia, checksum conferido, responsável e teste de boot em `inventario-pendrives.csv`.
7. Ejetar corretamente e guardar as mídias por sala. A equipe não deve retirar o USB enquanto o sistema estiver ligado.

O Linux sorteia Claro ou Espresso uma vez por inicialização e mantém o fundo durante a sessão. Não há carrossel. Depois de reiniciar, pode sortear a mesma imagem ou a outra; isso é esperado.

## 6. Questões, contas e pareamento

### 6.1. Preparar as questões com o responsável pelos problemas

1. Receber de Cristiane os pacotes finais e guardar uma cópia protegida, fora da imagem dos participantes.
2. Revisar enunciado, entradas, saídas, limites e scripts `compile`, `run`, `compare` e `limits` para as quatro linguagens.
3. Ensaiar pacotes e submissões em instalação de homologação isolada, sem poluir o contest oficial. Não usar o evento oficial como prova de treino; ele precisa continuar sem submissões antes da ativação.
4. Separar e identificar duas listas: pacotes de Graduação/SI e pacotes de Médio/Técnico/TII. Registrar a versão e o checksum de cada ZIP com os juízes da categoria correta. Não copiar os ZIPs de uma categoria para a outra por padrão.
5. Manter os problemas consecutivos A, B, C etc. para a exportação Animeitor.

Para importar na prova oficial, ainda inativa:

1. Na central, clicar em **Abrir administração do BOCA**.
2. Entrar como `admin`. Se necessário, usar na própria mesa `http://127.0.0.1:18000/boca/?contest=1`, conferindo o contest adotado.
3. Abrir a área **Problems**. Para cada pacote, preencher **Number**, **Short Name** e **Problem package (ZIP)**. Usar a sequência 1/A, 2/B etc. dentro desta categoria. A letra A pode representar problemas diferentes em SI e TII.
4. Clicar em **Send** e confirmar a importação. Conferir os dados exibidos após cada envio.
5. Não clicar no número de um problema como forma de abri-lo: a página BOCA atual informa que essa ação exclui o problema e os dados relacionados.
6. Na outra sala, importar somente os ZIPs destinados à outra categoria e conferir a quantidade de problemas daquela prova.
7. Executar **Executar verificação automática** na central. A verificação de instalação não substitui a revisão e o julgamento dos pacotes reais.

Linguagens do evento: C, C++20, Python 3 e Java 17. Para Java, conferir o basename esperado pelo pacote; na convenção do projeto, problema A usa `A.java` com `public class A`. O teste local de instalação que usa `Main.java` não define o nome de classe de todos os problemas da competição.

### 6.2. Entregar contas

1. Com o projetor exibindo somente o placar, clicar em **Consultar contas e senhas…** no monitor administrativo.
2. Confirmar o ambiente reservado.
3. Entregar a cada equipe somente sua conta e senha: `si01` a `si10` ou `tii01` a `tii10`.
4. Guardar `admin` com os responsáveis. O usuário de placar chama-se **placar**, embora seu tipo interno seja `score`.
5. Fechar a janela de senhas após consultar. Não imprimir nem projetar a lista completa para os participantes.

Aprovação de rede e login BOCA são etapas diferentes. A equipe precisa das duas. A conta Linux do participante é `icpc`; a conta de manutenção `seminfo-admin` não é entregue às equipes.

### 6.3. Preparar o placar da banca e a consulta opcional

Executar primeiro na própria banca. Consultar o placar da outra categoria é opcional e não permite aprovar suas equipes:

1. Selecionar a sala local em **Esta banca gerencia**.
2. Em **Preparação da sala**, clicar em **Adicionar esta sala à central**.
3. Na outra mesa, selecionar o perfil correto e clicar em **Exportar pareamento desta sala…**. Confirmar a exportação privada.
4. Transferir esse arquivo somente por meio autorizado pela organização.
5. Na primeira mesa, clicar em **Adicionar arquivo de outra sala** e selecionar o JSON recebido. Não abrir nem editar seu conteúdo.
6. Conferir que as duas salas aparecem na lista.
7. Em **Operação da maratona**, clicar em **Preparar central de salas** e, após concluir, em **Abrir central de salas**.
8. Conferir que só a própria categoria oferece solicitações e aprovação. A outra, se importada, deve mostrar somente consulta de placar.

Para consulta dos dois placares em ambas as mesas, repetir no sentido inverso. Se forem sub-redes diferentes, a TI deve cadastrar os IPs de consulta em `control_ips`. A exportação pela interface fornece `projector-desk.json`, somente leitura. O catálogo antigo de ranking único é migrado; tokens de controle de outra categoria são removidos. Cada banca continua gerenciando somente sua prova.

Para um computador dedicado somente à projeção, a TI deve usar `projector-desk.json` de cada sala, que contém apenas permissão de placar. O arquivo `admission-desk.json` permite aprovar e revogar; não é apropriado para uma máquina sem responsável administrativo.

## 7. Homologação antes de 28/10

Usar uma ficha por laboratório. Todos os campos começam pendentes. Registrar responsável, data, PC, mídia e resultado. Uma implementação existente ou um teste automatizado em outra máquina não prova que o laboratório foi homologado.

### 7.1. Pendrive e quatro linguagens

1. Iniciar o PC real pelo USB da sala. Confirmar que não iniciou o sistema do disco interno.
2. Conferir a sessão participante `icpc`, fundo Claro ou Espresso estável e janela de autorização.
3. Abrir um terminal na sessão participante e executar:

```bash
seminfo-verify --offline
mkdir -p ~/trabalhos
printf 'persistencia-ok\n' > ~/trabalhos/ensaio.txt
```

4. Resultado esperado: compilação/execução das quatro linguagens e participante sem privilégios. Não corrigir falhas dando sudo a `icpc`.
5. Desligar pelo menu do sistema, aguardar e iniciar novamente pelo mesmo USB.
6. Abrir `~/trabalhos/ensaio.txt`. O texto deve continuar presente. Um arquivo no disco interno não comprova persistência do USB.

### 7.2. Autorização e isolamento

1. Antes da aprovação, confirmar que BOCA e navegação externa não ficam liberados.
2. Na janela, informar o IP real da própria banca, selecionar o número de equipe e solicitar acesso.
3. Conferir que o pedido aparece na sala correta. Um código digitado incorretamente deve ser recusado.
4. Aprovar com o código mostrado no PC. Confirmar acesso ao BOCA da sala e executar:

```bash
seminfo-verify
```

5. Testar também internet, IP de outro computador da sala, outra porta da mesa e o BOCA da outra sala. Todos devem permanecer bloqueados; conferir IPv4 e IPv6 com a TI.
6. Revogar a autorização e confirmar que o BOCA fecha. Solicitar novamente e aprovar.
7. Reiniciar o cliente, mudar o IP de teste ou reiniciar a banca: deve ser necessária nova aprovação. Conferir que os trabalhos persistem.
8. Ensaiar a perda de contato e a expiração da permissão. O prazo máximo de autorização sem renovação é 60 segundos; não contar apenas com o navegador fechado como prova de bloqueio.
9. Testar o firewall e a tarefa de logon **na mesa Windows real**. Os testes em containers não substituem esta etapa.

### 7.3. Juiz, problemas e projetores

1. Em ambiente de ensaio separado da prova oficial, conferir submissões corretas, incorretas, erro de compilação e tempo excedido nas linguagens aplicáveis.
2. Ensaiar dez equipes por sala e conferir que a fila do juiz se esvazia no hardware destinado ao evento. A TI pode executar `seminfo/tests/integration.py` para o ensaio sintético isolado; os pacotes reais exigem revisão própria.
3. Conferir problemas reais com o responsável e registrar o ambiente de ensaio usado. Não apagar submissões de uma prova oficial para simular uma preparação limpa.
4. Abrir os placares separados de Graduação/SI e Médio/Técnico/TII no projetor. Testar área estendida, congelamento, revelação e igualdade com o BOCA da categoria. Confirmar que uma banca pode publicar ou ficar indisponível sem bloquear o placar válido da outra.
5. Criar um backup e comprovar restauração isolada. No ensaio de contingência, usar mesa/ambiente de destino vazio.

### 7.4. Registrar os seis ensaios

Na central, em **Preparação da sala**, localizar cada teste e clicar em **Registrar ensaio executado…**. Informar nome, computador usado e resultado observado; confirmar somente se executou e aprovou.

| Registro | Evidência mínima |
|---|---|
| client_boot | USB/PC reais, fundo estável, sessão sem sudo e quatro linguagens |
| client_persistence | Arquivo preservado após desligar e ligar pelo USB |
| network_isolation | Aprovação/revogação, bloqueios, expiração e firewall/logon reais |
| projector | Categoria correta, área estendida, congelamento/revelação próprios, paridade e independência da outra banca |
| judge_load | Dez equipes e casos de julgamento com fila acompanhada |
| problems_reviewed | Pacotes reais revisados e testados no ambiente identificado |

Os registros são vinculados à configuração e às versões do servidor e do cliente. Alterar rede, horários, código ou receita do cliente exige nova conferência. A ficha assinada complementa o registro no sistema; não o substitui para a ativação.

## 8. Abertura no dia 29/10: banca e monitores

O responsável deve estar com o roteiro rápido e os contatos preenchidos. O horário de chegada da equipe de apoio deve ser combinado pela coordenação; este manual não define um horário institucional não confirmado.

### 8.1. Preparar a mesa

1. Ligar a mesa, entrar na conta do organizador e aguardar o Docker Desktop.
2. Abrir **Central SEMINFO** pelo atalho.
3. Conferir **Esta banca gerencia**. Não trocar de perfil para iniciar o BOCA da outra sala na mesma máquina.
4. Clicar em **Iniciar mesa**, se necessário, e aguardar o término da tarefa.
5. Clicar em **Atualizar diagnóstico** e abrir **Diagnóstico dos serviços**. Conferir banca funcionando, banco, BOCA e juiz.
6. Conferir relógio, data, início, duração, congelamento, quantidade de questões e sala selecionada com o responsável.
7. Abrir a central de salas e os placares que serão usados. Deixar administração no monitor e somente placar no projetor.
8. Guardar um backup pré-prova conferido. Combinar a breve pausa de cópia antes de as equipes começarem a usar o sistema.

**Iniciar mesa não equivale a ativar a prova.** Ele inicia serviços e mantém o estado que o BOCA tinha. Se uma prova já estava ativa, iniciar não a torna inativa.

### 8.2. Receber cada equipe

1. Conferir sala, número da equipe e USB etiquetado correspondente.
2. Iniciar o PC pelo USB e aguardar a janela com **Meu IP**.
3. Informar o IP da própria banca no campo da janela, se ainda estiver vazio.
4. Selecionar o número da equipe e clicar em **Solicitar acesso à mesa da banca**.
5. No monitor da mesa, clicar em **Abrir solicitações da sala** ou selecionar a própria categoria na central de salas.
6. Clicar em **Atualizar solicitações**. Conferir número da equipe, IP observado e identificação do dispositivo.
7. Pedir o código de oito caracteres exibido no computador da equipe. Digitar esse código na solicitação correspondente e clicar em **Conferir código e liberar**.
8. Aguardar **Acesso liberado**. Na equipe, o navegador abre o BOCA; se necessário, clicar em **Abrir BOCA**.
9. Entregar somente a conta/senha daquela equipe e orientar o login no BOCA.
10. Pedir que os trabalhos sejam salvos em `~/trabalhos`, no USB. Não retirar a mídia enquanto o sistema estiver ligado.

O BOCA não permite submissões antes da abertura configurada. Não alterar os horários para atender um computador com problema; registrar a ocorrência e chamar o responsável.

### 8.3. Ativar a prova

1. O responsável da banca confere as seis homologações, os pacotes e os horários da sua categoria. A outra banca realiza a mesma conferência na própria prova, com suas questões e tempos.
2. Em **Operação da maratona**, clicar em **Revisar e ativar prova…**.
3. Ler a sala e os tempos. Digitar a confirmação solicitada, por exemplo `ATIVAR LAB 3` na sala SI.
4. Aguardar a conclusão. Repetir na mesa TII com sua confirmação.
5. Se a ativação for bloqueada, resolver o motivo indicado. Não contornar os bloqueios pelo BOCA ou marcar teste não executado.
6. Conferir a abertura na hora programada e acompanhar as primeiras submissões.

## 9. Operação, projetores e classificação

### 9.1. Durante a prova

1. Manter Docker Desktop, sessão do organizador e rede da mesa ativos.
2. Acompanhar pedidos de acesso, fila de julgamentos e dúvidas conforme as regras definidas pela coordenação.
3. Registrar falhas, horário, equipe afetada e decisão em `ocorrencias.csv`.
4. Uma reinicialização, mudança de IP ou troca de computador exige nova aprovação. Conferir o novo código; não reutilizar uma autorização antiga.
5. Ao trocar de computador, usar **Revogar acesso…** no registro anterior, conferir e confirmar. Depois aprovar o novo pedido.
6. Não usar **Preparar prova**, reinstalar ou alterar tempos durante a competição. Uma exceção exige decisão registrada da coordenação e avaliação da TI.
7. Combinar backups durante a prova: a cópia consistente pausa brevemente web e juiz. Não iniciar várias tarefas ao mesmo tempo.

### 9.2. Abrir os placares

1. No Windows, pressionar **Win + P** e escolher **Estender**.
2. Na central, usar **Preparar central de salas** e aguardar; depois abrir **Abrir central de salas**.
3. Para a projeção, clicar em **Graduação / SI · Lab 3** ou **Médio/Técnico / TII · Lab 4**. Não existe link para ranking único.
4. Arrastar a janela de placar para o projetor e pressionar **F11**. Manter as telas de senhas/aprovação no monitor da mesa.
5. Conferir o título da sala e legibilidade antes de deixar a apresentação aberta.

A central consulta resultados a cada dez segundos. Dados antigos ou falha de uma banca bloqueiam só aquele placar. Questões, duração e fase diferentes não bloqueiam o placar válido da outra. Nenhuma tabela mistura as classificações.

Alternativa: abrir o placar web oficial de cada BOCA com o usuário `placar`, preferencialmente em outro navegador/perfil para não misturar a sessão de administração. Se o placar de uma categoria falhar ou divergir, apresentar os resultados oficiais das salas e chamar a TI.

### 9.3. Congelamento e desempates

O placar público respeita o congelamento configurado. Resultados ocultos não devem ser revelados manualmente pela banca. Cada placar mantém a ordem oficial devolvida pelo respectivo BOCA. Não há comparação esportiva entre equipes do Médio/Técnico e da Graduação.

O BOCA aplica problemas resolvidos, penalidade e desempates. A coordenação define no regulamento o tratamento de empate absoluto; uma ordem de tela não cria critério de premiação.

## 10. Encerramento e publicação do resultado

### 10.1. Conferir antes de revelar

1. Confirmar o término da duração configurada no BOCA desta categoria. Não é necessário aguardar o fim da prova da outra banca.
2. Aguardar a fila de julgamentos e rejulgamentos terminar. Não publicar enquanto houver pendências.
3. Conferir classificação, problemas resolvidos e penalidade no BOCA oficial de cada sala.
4. Criar e testar um backup de encerramento e guardar outra cópia em mídia protegida.
5. O responsável decide com a coordenação o momento da publicação e da apresentação final.

### 10.2. Publicar nos placares

1. Na central da própria sala, clicar em **Publicar resultado final…**.
2. Ler a confirmação e digitar `PUBLICAR LAB 3` para SI ou `PUBLICAR LAB 4` para TII, conforme solicitado.
3. Aguardar a exportação e a conferência. Se houver erro, manter o resultado oficial do BOCA como referência.
4. A outra banca publica o resultado quando sua própria prova terminar e sua fila estiver concluída. Uma categoria pode estar com o resultado final publicado enquanto a outra ainda está congelada; os placares permanecem separados.
5. Conferir o placar final da categoria no projetor antes de anunciar sua classificação.

### 10.3. Animeitor local: TI e responsável pela apresentação

Preparar Python/Pygame antes do evento, a partir do material offline:

```powershell
python seminfo/manage.py animeitor
```

Depois do encerramento, sem pendências e com a classificação conferida, na mesa da própria sala:

```powershell
python seminfo/manage.py reveal si
```

No Lab 4, usar `reveal tii`. O comando faz uma nova exportação e só abre a animação se ela estiver marcada como final e com pontuação igual à do BOCA. O Animeitor é por prova/sala; cada categoria apresenta seu placar web e sua própria animação, sem resultado combinado.

Manter a animação no projetor. Usar **Espaço** para avançar e **q** para sair. Ensaiar os comandos e a apresentação antes do dia. Se a animação falhar ou houver divergência, apresentar o placar oficial web. A exportação completa é local; não tentar liberá-la pela rede.

## 11. Backup e recuperação

### 11.1. Criar e conferir pela interface

1. Selecionar a sala correta na central.
2. Abrir **Backup e recuperação**.
3. Combinar a pausa breve com a organização e clicar em **Criar backup e verificar restauração**.
4. Aguardar toda a tarefa, incluindo a restauração de teste em banco separado.
5. Conferir a mensagem final e o backup listado como verificado. Se a cópia existir mas o teste falhar, não tratá-la como recuperação aprovada.
6. Copiar a pasta inteira do backup para outra mídia protegida. Não levar somente `database.dump`: manifesto, arquivos privados e identidade também são necessários.

Os backups ficam em `seminfo/backups`, em pastas com perfil e data. Contêm dados e credenciais privados. A organização define a guarda e quem pode acessá-los.

### 11.2. Recuperar uma mesa com falha

Responsável: TI. Antes de restaurar, tentar retomar os serviços existentes e preservar a instalação que falhou.

1. Registrar a falha e avisar a coordenação. Não apagar os containers/volumes originais.
2. Separar um computador/ambiente vazio e compatível. Carregar as mesmas imagens e o mesmo kit.
3. Levar o backup completo e a identidade privada original da sala. Não gerar novas chaves para contornar erro de certificado.
4. Preferir que a TI disponibilize à mesa substituta o **mesmo IP reservado**, após retirar a mesa defeituosa da rede. Não podem existir dois equipamentos com o mesmo IP.
5. Se o IP precisar mudar durante uma prova já ativa, interromper o procedimento comum e planejar a alteração com suporte técnico: configuração, clientes e pareamentos precisam ser coerentes. A interface bloqueia editar provas usadas por proteção.
6. Em destino vazio, com o Docker funcionando, executar ajustando o caminho real do backup:

```powershell
python seminfo/manage.py restore si --backup "C:\caminho\backup-completo"
```

7. Aguardar teste, restauração e comparação do conteúdo. O comando recusa destino que já contenha o banco da prova; não apagar a prova para fazê-lo aceitar.
8. Conferir contas, problemas, submissões, relógio, IP e placar. Instalar/testar o início automático e firewall na mesa substituta com orientação da TI; a instalação comum pode ser bloqueada se o contest já estiver ativo, exigindo manutenção controlada.
9. Reabrir os placares e solicitar nova aprovação dos computadores, porque as aprovações são voláteis.
10. Retomar somente depois da conferência e da decisão da coordenação. Registrar o backup usado e o horário da retomada.

## 12. Solução de problemas e manutenção pela TI

| Sintoma | Primeira ação | Se persistir |
|---|---|---|
| Central não abre | Abrir pelo atalho; conferir Python e permissão do Windows | TI confere a conta do Docker e conflito na porta 17862 |
| Docker indisponível | Abrir Docker Desktop e aguardar o servidor responder | Conferir virtualização e instalação institucional |
| Equipe sem IP | Conferir cabo, placa e DHCP da sala | TI verifica rede; não inventar um endereço estático |
| Pedido não aparece | Conferir IP da banca, variante USB e número da equipe; atualizar lista | TI confere TLS 8443, sub-rede e identidade original |
| Certificado recusado | Conferir se USB e pasta privada são da mesma sala | Restaurar a identidade correta; não desativar a verificação TLS |
| Código não confere | Ler o código atual no computador e localizar o pedido correto | Atualizar a lista; pedir nova solicitação |
| Equipe/IP já liberado | Conferir qual computador está em uso | Revogar o registro anterior com confirmação e aprovar o correto |
| Acesso caiu após reboot | Pedir nova solicitação e conferir o código | Verificar rede se o pedido não chegar |
| BOCA mostra outro sistema | Conferir quem está escutando TCP 8000 | TI resolve o conflito sem encerrar serviços desconhecidos |
| Placar de uma categoria indisponível | Usar o placar oficial do BOCA correspondente | TI confere a conexão somente daquela banca; a outra continua independente |
| Arquivos sumiram do USB | Parar o uso da mídia e identificar o boot/USB correto | TI confere home-rw e recuperação; não regravar a mídia com trabalhos |
| Juiz acumula submissões | Conferir diagnóstico e registrar horário/equipes | Responsável técnico analisa juiz, carga e limites dos problemas |
| Ativação/publicação bloqueada | Ler o motivo e conferir a sala | Resolver a pendência; não contornar guardas de homologação |

### 12.1. Diagnóstico técnico sem alterar a prova

Na raiz do projeto, usando o perfil da sala:

```powershell
python seminfo/manage.py status si
python seminfo/manage.py logs si
Get-NetTCPConnection -LocalPort 8000,8443,17860,17861,17862 -State Listen
```

Os arquivos em `seminfo/local/si` são privados. Exemplos de evidência: `verification.json`, `attestations.json`, `admission-service.log`, `admission-audit.jsonl` e `organizer/operations.jsonl` na pasta `local`. Encaminhar somente a informação necessária ao suporte e conferir se não há credenciais antes de compartilhar logs.

### 12.2. Corrigir rede/horários antes de uma prova ainda não usada

A central exige banca parada e banco acessível para comprovar que não há prova ativa nem submissões. **Parar mesa** também para o banco; por isso uma edição após essa parada pode exigir apoio da TI.

1. Confirmar previamente que a prova está inativa e sem submissões.
2. Parar a mesa pela central. A TI reabre **somente o banco**, mantendo gate/web/juiz parados:

```powershell
docker compose --project-name boca-si --env-file seminfo/local/si/.env -f seminfo/compose.yml up -d boca-db
```

3. Na central, salvar os dados corrigidos e confirmados.
4. Usar **Preparar prova…** para aplicar a configuração à prova ainda inativa; executar a verificação automática.
5. Iniciar a mesa e repetir os ensaios invalidados. No Lab 4, trocar projeto/caminhos para `boca-tii` e `tii`.

Se houver ativação ou submissões, esse procedimento não se aplica. Manutenção de evento em andamento exige análise e registro pela TI/coordenação.

### 12.3. Manutenção do Linux das equipes

Normalmente a equipe só informa o IP e solicita acesso. A conta de manutenção é `seminfo-admin`; sua senha fica em `maintenance-password.txt` na pasta privada da banca. Nunca entregar essa senha à equipe.

Somente a TI, fora da sessão do participante, pode executar:

```bash
sudo seminfo-network maintenance
```

Antes de devolver o computador à equipe:

```bash
sudo seminfo-network resume
```

Voltar à sessão `icpc`, solicitar nova aprovação e repetir os testes de acesso e bloqueio. Não deixar a máquina em manutenção durante a prova.

Se for necessário aplicar JSON local no Linux, usar somente o arquivo público do cliente produzido pelo kit, sem senhas/chaves. Não copiar a pasta privada da banca para um pendrive de equipe. O fluxo normal não exige editar JSON na máquina do participante.

### 12.4. Ações que não fazem parte da rotina

Não usar limpeza geral do Docker, remoção de volumes ou `down -v` durante o evento. Não regravar USB com trabalhos para tentar resolver rede. Não usar a conta `system` para ativar pela web uma prova que a central recusou. Essas ações não são atalhos de recuperação.

## 13. Entrega final e conferência de prontidão

Antes da prova, a coordenação recebe:

- Ficha de dados do evento preenchida e igual nas duas salas quanto a horários/regras.
- Ficha de homologação assinada para SI e para TII, com registros atuais na central.
- Inventário de 22 pendrives e confirmação de dez mídias mais uma reserva por sala.
- Mesas instaladas, firewall/logon testados e contatos de suporte disponíveis.
- Questões revisadas/importadas e contas entregues de forma restrita.
- Cada banca adicionada à própria central e os dois placares de categoria testados; consulta remota somente leitura, se desejada.
- Backup pré-prova conferido e segunda cópia protegida.

Depois da prova, guardar backups finais, resultados oficiais e registro de ocorrências. Recolher os USBs e confirmar o que será preservado antes de reutilizá-los. A coordenação define a guarda dos dados e dos trabalhos das equipes.

Este manual não atesta que os laboratórios passaram nos testes. Na emissão, as ISOs e testes de software existem, mas IPs, tempos, questões e homologação física ainda dependem das equipes responsáveis.

## 14. Referência rápida de comandos

Somente a TI usa esta referência; os operadores seguem os botões da central. Todos os comandos são executados na raiz do kit. Exemplo SI; substituir por TII apenas na mesa correspondente.

| Objetivo | Comando |
|---|---|
| Validar dados confirmados | python seminfo/manage.py check si --network --timing |
| Iniciar serviços existentes | python seminfo/manage.py start si |
| Parar serviços | python seminfo/manage.py stop si |
| Verificar instalação | python seminfo/manage.py verify si |
| Abrir painel de aprovação | python seminfo/manage.py admission-panel si |
| Abrir central de salas já pareada | python seminfo/manage.py hub |
| Parar somente a central de salas | python seminfo/manage.py hub-stop |
| Exportar descritores privados | python seminfo/manage.py admission-export si |
| Criar backup | python seminfo/manage.py backup si |
| Conferir recuperação | python seminfo/manage.py restore-check --backup "C:\caminho\backup" |
| Exportar dados locais para conferência | python seminfo/manage.py export si |
| Revelar após encerramento e paridade | python seminfo/manage.py reveal si |
| Publicar resultado final | python seminfo/manage.py publish-score si |

O botão de backup faz a cópia e o teste de restauração na mesma tarefa. O comando `backup` sozinho só cria a cópia; usar `restore-check` para conferi-la. Comandos de preparação, ativação, publicação e recuperação devem ser usados na etapa apropriada deste manual.
