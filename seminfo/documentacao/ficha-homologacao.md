# Ficha de homologação por laboratório

XIX SEMINFO 2026 - Caramel Contest | Evento em 29/10/2026

Imprimir uma ficha para SI/Lab 3 e outra para TII/Lab 4. Todos os resultados começam **PENDENTES**. Registrar somente testes realmente executados. Entregar à coordenação e registrar os seis ensaios também na Central SEMINFO.

## 1. Identificação e configuração

| Campo | Preenchimento |
|---|---|
| Laboratório / perfil | _________________________________________________ |
| Data e horário do ensaio | _________________________________________________ |
| Responsável / contato | _________________________________________________ |
| Mesa: patrimônio / modelo | _________________________________________________ |
| PC da equipe: patrimônio / modelo | _________________________________________________ |
| USB: etiqueta / série / capacidade | _________________________________________________ |
| Nome da ISO e SHA256 conferido | _________________________________________________ |
| IP da banca / sub-rede | _________________________________________________ |
| IP observado da equipe | _________________________________________________ |
| Início / duração / congelamento confirmados | _________________________________________________ |
| Kit/versão de configuração identificada | _________________________________________________ |
| Instalação de ensaio das questões/carga | _________________________________________________ |

Se uma etapa falhar, marcar REPROVADO e descrever a correção necessária. Não aprovar o laboratório com base apenas em um teste de software executado fora dele.

## 2. Inicialização e linguagens - client_boot

Confirmar: boot pelo USB no PC real, sessão icpc sem sudo, fundo Claro ou Espresso estável, janela com Meu IP e execução de C, C++20, Python 3 e Java 17 por `seminfo-verify --offline`.

Resultado: PENDENTE / APROVADO / REPROVADO

Evidência, máquina e observações: __________________________________________________

________________________________________________________________________________

## 3. Persistência - client_persistence

Criar `~/trabalhos/ensaio.txt`, desligar corretamente, iniciar novamente pelo mesmo USB e conferir o conteúdo. Confirmar que o arquivo não depende do disco interno.

Resultado: PENDENTE / APROVADO / REPROVADO

Evidência e observações: ___________________________________________________________

________________________________________________________________________________

## 4. Rede e autorização - network_isolation

Confirmar todos os itens abaixo. Anotar o resultado de cada verificação; deixar vazio significa pendente.

| Verificação | Resultado / evidência |
|---|---|
| Antes de aprovar, BOCA e internet bloqueados | ______________________________ |
| Código incorreto recusado; correto libera só a própria sala | ______________________________ |
| Internet IPv4 e IPv6 externo bloqueados | ______________________________ |
| Outro BOCA, PC vizinho e outras portas bloqueados | ______________________________ |
| Revogação bloqueia novamente | ______________________________ |
| Reinício/mudança de IP exige nova aprovação | ______________________________ |
| Perda de contato expira a autorização em até 60 s | ______________________________ |
| Firewall real da mesa e início no logon testados | ______________________________ |
| Verificador completo executado depois de aprovar | ______________________________ |

Resultado geral: PENDENTE / APROVADO / REPROVADO

Responsável e observações: _________________________________________________________

## 5. Projetores e placares - projector

Conferir área estendida, somente placar na projeção, títulos e equipes de cada categoria, SI e TII separados, indisponibilidade de uma banca sem bloquear a outra, congelamento e publicação final independentes, revelação, empates e igualdade com o BOCA correspondente no ambiente de ensaio identificado.

Resultado: PENDENTE / APROVADO / REPROVADO

Evidência e observações: ___________________________________________________________

________________________________________________________________________________

## 6. Juiz e carga - judge_load

No ambiente de homologação separado, testar acerto, resposta incorreta, erro de compilação e limite de tempo; executar nas quatro linguagens aplicáveis; acompanhar a fila com dez equipes. Identificar PC, versão, ambiente e teste, sem contaminar a prova oficial.

Resultado: PENDENTE / APROVADO / REPROVADO

Evidência, tempo de esvaziamento da fila e observações: _______________________________

________________________________________________________________________________

## 7. Problemas reais - problems_reviewed

Conferir pacotes da Cristiane, enunciados, entradas/saídas, limites, scripts e julgamentos. Confirmar os ZIPs destinados à própria categoria, problemas consecutivos e seus tempos confirmados. A outra banca tem questões diferentes. Não importar o pacote da outra categoria por padrão. O ensaio sintético de soma não substitui revisar os pacotes reais.

Resultado: PENDENTE / APROVADO / REPROVADO

Responsável pelos problemas / identificação da revisão: _______________________________

________________________________________________________________________________

## 8. Recuperação e entrega

| Verificação | Resultado / evidência |
|---|---|
| Backup completo criado e restauração isolada conferida | ______________________________ |
| Recuperação de contingência em destino vazio ensaiada | ______________________________ |
| Segunda cópia guardada em mídia protegida | ______________________________ |
| Seis registros atuais feitos na central, com responsável | ______________________________ |
| Dez USBs e uma reserva da sala conferidos e inventariados | ______________________________ |
| Contas, contatos e roteiro entregues à banca | ______________________________ |

Pendências e responsável pela solução: ______________________________________________

________________________________________________________________________________

Conclusão: NÃO HOMOLOGADO / HOMOLOGADO

Responsável técnico: ______________________________ Data: ___________________________

Responsável pela organização: _____________________ Data: ___________________________

Mudança de configuração ou de versão depois deste registro exige nova conferência. A assinatura da ficha não substitui os registros de ensaios na central para ativação.
