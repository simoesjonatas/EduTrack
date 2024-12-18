# Descrição Geral da PoC

Para essa Prova de Conceito, você receberá dois templates (um frontend com React e um backend com Node.js) para agilizar a implementação e concentrar os esforços na funcionalidade. **Para um passo-a-passo de como executá-los, leia o README de cada um**. Além disso, você receberá as senhas de acesso para um banco MongoDB. Não esqueça de alterar as informações de conexão no backend.

Nesta PoC, você deve implementar uma página que exiba uma lista de Instituições de Ensino Superior, acompanhada por um gráfico mostrando a quantidade de alunos por estado. A página deve incluir:

## 1. Formulário para Adicionar Instituição
- Já está implementado no template um botão para adicionar Instituição. Este botão abre um modal ao ser clicado. Deve-se construir o formulário dentro deste modal.
- O formulário deve permitir inserir as seguintes informações sobre a instituição: Nome, UF e Quantidade de alunos.
- Ao clicar em Salvar, esses dados devem ser enviados via API para o backend e serem salvos no banco.
- Após o envio dos dados, a tabela deve ser atualizada sem que a página seja recarregada.

---

## 2. Tabela de Listagem de Instituições
- Atualmente a tabela conta com dados mockados, apenas para exemplo. Esses dados não devem constar na versão final do código. Você deve alterá-la para recuperar os dados das Instituições inseridas no banco. Já existe uma rota do backend para listar todas as Instituições. Pode utilizá-la ou modificá-la se julgar necessário.
- A tabela inicialmente contém três colunas: Nome, UF e Qtd Alunos. Você deve adicionar mais duas colunas para que cada linha da tabela inclua botões para editar e excluir a instituição (cada botão em uma coluna).
- O botão de editar deve abrir o modal com as informações da instituição já preenchidas, e os dados alterados devem ser persistidos no banco (cuidado para não criar um novo registro).
- O botão de exclusão deve excluir o dado do banco.
- As alterações (edição ou exclusão) devem refletir na tabela.

---

## 3. Gráfico com Dados Agregados
- Abaixo da tabela, deve ser criado um gráfico de barras criado com **Amcharts** para exibir a quantidade total de alunos por UF. O gráfico a ser criado está indicado no código. Pode substituir todas as informações abaixo do título do gráfico para exibir o gráfico no lugar.
- O backend deve buscar essas informações do banco e já recebê-las agregadas. O backend **NÃO DEVE** fazer os cálculos, apenas buscar a informação e devolver para o frontend. O cálculo agregado deve ser feito pelo MongoDB.
- O gráfico deve exibir apenas as UFs que possuírem instituições cadastradas.
- O gráfico deve ser atualizado automaticamente sempre que uma instituição for adicionada, editada ou removida.
