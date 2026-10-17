# Documentação para o IF Goiano - XIX SEMINFO 2026

Evento: **29/10/2026**. Documento emitido em **16/10/2026**. Este material descreve a interface e os scripts mantidos no projeto. A prévia de interface descartada não faz parte da entrega.

**Edição 1.1:** duas bancas gerenciadoras, questões e classificações por categoria. Este material substitui a edição de 15/10 que previa questões iguais e ranking único.

## Por onde começar

| Quem vai usar | Material | Para quê |
|---|---|---|
| Coordenação e TI | [Manual completo](manual-if.md) | Preparar, instalar, configurar, homologar e encerrar |
| Pessoas da banca e monitores | [Roteiro da banca](roteiro-banca.md) | Operar o evento pelos botões da central |
| Responsável pela homologação | [Ficha por laboratório](ficha-homologacao.md) | Registrar resultados reais, responsáveis e pendências |
| Coordenação e patrimônio/TI | [Inventário dos pendrives](inventario-pendrives.csv) | Controlar 20 mídias de equipe e duas reservas |
| Banca e suporte | [Registro de ocorrências](ocorrencias.csv) | Anotar falhas, decisões e retomadas |
| Coordenação | [Dados a confirmar](dados-evento.csv) | Consolidar rede, horários, contatos e responsáveis |

Os três textos também têm versões para impressão em [output/pdf](output/pdf). O [manual em HTML](manual-if.html) pode ser aberto sem internet em qualquer navegador. Os textos Markdown são as fontes editáveis. Após alterar a documentação, o apoio técnico pode regenerar HTML/PDF com `gerar_documentos.py`, em ambiente que tenha ReportLab, markdown e fontes compatíveis.

## Regenerar os documentos - somente apoio técnico

Os PDFs/HTMLs entregues já estão prontos e não exigem instalar programas para serem lidos. Para alterar as fontes e gerar outra edição, executar na raiz do projeto, em um ambiente Python próprio para documentação:

```powershell
python -m pip install -r seminfo/documentacao/requirements.txt
python seminfo/documentacao/gerar_documentos.py
python seminfo/documentacao/validar_documentacao.py
```

A instalação das dependências é uma tarefa de preparação, com internet ou um repositório institucional de pacotes. Não faz parte da operação da maratona. Depois de gerar, renderizar os PDFs e conferir visualmente as páginas antes de distribuir. O verificador confere hashes, links, margens, inventário e ausência das credenciais locais; ele não homologa a rede ou o laboratório.

## Distribuição

Entregar à coordenação o manual e as fichas. Entregar à banca o roteiro rápido e os contatos preenchidos. O pacote de documentação pode circular entre os organizadores; **não contém senhas reais nem questões**.

Credenciais, chaves, descritores de pareamento, backups e pacotes de problemas são entregas separadas e restritas. Não anexar esses arquivos ao manual nem à pasta compartilhada dos participantes.

As fichas começam sem aprovações. Preencher uma por sala e registrar os seis ensaios na Central SEMINFO somente depois de executados. A emissão deste manual não homologa os laboratórios.

## Situação que a instituição deve tratar

São duas bancas: Graduação/SI e Médio/Técnico/TII, com questões e classificações diferentes. IP/sub-rede, duração e congelamento de cada banca continuam pendentes de confirmação. O início às 13h é uma proposta. As duas ISOs foram geradas, mas os testes em USB/hardware real e a instalação definitiva nas mesas ainda devem ser concluídos até 28/10, conforme disponibilidade dos laboratórios.
