# Roteiro da banca e dos monitores

XIX SEMINFO 2026 - Caramel Contest | 29/10/2026

Uso no dia da prova. A instalação e a homologação devem estar concluídas pela TI. A interface usada é a Central SEMINFO mantida no projeto.

## 1. Preencher e deixar ao lado da mesa

| Informação | Preencher antes da prova |
|---|---|
| Sala / perfil | Lab 3 - SI OU Lab 4 - TII |
| IP da própria banca | __________________________________________ |
| Início confirmado | __________________________________________ |
| Duração e congelamento | __________________________________________ |
| Responsável pela banca / contato | __________________________________________ |
| Apoio técnico / contato | __________________________________________ |
| Coordenação / contato | __________________________________________ |

As 13h são uma proposta até a coordenação confirmar. Não deduzir duração ou congelamento. Cada banca confirma seus próprios tempos e usa questões diferentes. Graduação/SI e Médio/Técnico/TII têm classificações independentes, sem ranking único.

## 2. Abrir a sala

1. Ligar a mesa e entrar na conta do organizador preparada pela TI.
2. Abrir Docker Desktop e aguardar.
3. Abrir o atalho **Central SEMINFO**. Aceitar a permissão do Windows com a conta preparada pela TI; se não for possível, chamar o suporte.
4. Conferir **Esta banca gerencia**: Lab 3/SI ou Lab 4/TII.
5. Usar **Iniciar mesa**, aguardar a tarefa e clicar em **Atualizar diagnóstico**.
6. Conferir **Banca funcionando** e abrir **Diagnóstico dos serviços** se houver pendência.
7. Conferir horário, questões e autorização de ativação com o responsável.
8. Deixar no projetor somente a janela de placar.

Iniciar serviços não ativa uma prova que estava inativa. A ativação é do responsável autorizado, pelo botão **Revisar e ativar prova…**, depois das seis homologações e da revisão dos problemas.

## 3. Autorizar cada computador

1. Conferir o USB, a sala e o número da equipe.
2. Na janela Linux com **Meu IP**, informar o IP da própria banca e selecionar a equipe.
3. A equipe clica em **Solicitar acesso à mesa da banca**.
4. Na central, abrir **Abrir solicitações da sala**. Se usar a central de salas, selecionar a própria categoria. A outra categoria está disponível apenas para consulta de placar.
5. Usar **Atualizar solicitações** e localizar a equipe/IP/dispositivo.
6. Pedir o código de oito caracteres exibido no PC da equipe. Digitar no registro correspondente e clicar em **Conferir código e liberar**.
7. Aguardar **Acesso liberado**. A equipe abre o BOCA e entra com sua própria conta.

| Sala | Contas das equipes | Usuário do placar |
|---|---|---|
| Lab 3 / SI | si01 a si10 | placar |
| Lab 4 / TII | tii01 a tii10 | placar |

As senhas são consultadas em **Consultar contas e senhas…**, com o projetor fora dessa tela. Entregar a cada equipe somente sua conta. Aprovação de rede não substitui login no BOCA.

Orientar: salvar os arquivos em `~/trabalhos`, não retirar o USB com o sistema ligado e chamar um monitor se o acesso cair.

## 4. Acompanhar e projetar

1. Pressionar **Win + P** e escolher **Estender**.
2. Na central já pareada, usar **Preparar central de salas** e aguardar.
3. Abrir **Graduação / SI · Lab 3** ou **Médio/Técnico / TII · Lab 4**. Cada página contém só as equipes da categoria.
4. Mover a janela escolhida para o projetor e pressionar **F11**.
5. Manter administração, contas e aprovações no monitor da mesa.

Cada placar é independente. Se um estiver indisponível ou divergente, usar o placar oficial do BOCA correspondente e avisar a TI. A outra banca pode continuar sua prova e publicar seu resultado. Não divulgar resultados ocultos pelo congelamento.

## 5. Se houver um problema

| Situação | O que a banca faz |
|---|---|
| Pedido não aparece | Conferir IP da banca, sala e equipe; atualizar a lista; chamar TI se persistir |
| Código recusado | Conferir o código atual no PC e o registro da mesma equipe |
| PC reiniciou ou mudou de IP | Pedir nova solicitação e aprovar com novo código |
| Troca de computador | Conferir e revogar o acesso anterior, confirmar a revogação e aprovar o novo pedido |
| Mesa/BOCA parou | Conferir energia e Docker; atualizar diagnóstico e usar Iniciar mesa; registrar e avisar TI |
| Trabalho não reapareceu no USB | Parar o uso dessa mídia e chamar TI; não regravar nem formatar |
| Tarefa interrompida | Conferir seu resultado com TI antes de repetir ativação, publicação ou restauração |

Anotar horário, sala, equipe, sintoma, ação e responsável no registro de ocorrências. A coordenação decide mudanças excepcionais e comunicação aos participantes.

Durante a prova, não usar **Preparar prova**, reinstalar, alterar tempos ou apagar dados para resolver falhas. A conta de manutenção Linux é exclusiva da TI.

## 6. Fazer backup e encerrar

1. Em **Backup e recuperação**, combinar a breve pausa e clicar em **Criar backup e verificar restauração**.
2. Aguardar a conclusão e a indicação de restauração aprovada. Pedir à TI uma segunda cópia protegida da pasta completa.
3. No fim, aguardar todos os julgamentos e rejulgamentos. Conferir os resultados oficiais com o responsável.
4. O responsável usa **Publicar resultado final…** em cada sala e confirma o laboratório solicitado. Cada categoria publica sem aguardar a outra banca.
5. Se houver Animeitor, o responsável técnico executa a revelação local por sala. Em caso de falha, usar o resultado oficial web.
6. Recolher os USBs e guardar resultados, backups e ocorrências conforme a orientação da coordenação.

**Parar mesa…** interrompe o acesso das equipes e exige confirmação. Usar somente quando o responsável determinar. A restauração de uma mesa com falha é tarefa da TI e exige destino vazio.
