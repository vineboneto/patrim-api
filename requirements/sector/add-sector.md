# Adicionar Setor

> ## Caso de sucesso

1. [x] Recebe uma requisição do tipo **POST** na rota **/api/sectors**
2. [x] Valida se a requisição foi feita por um **usuário**
3. [x] Valida dados obrigatórios **name**
4. [x] **Cria** um setor com os dados fornecidos
5. [x] Retorna **204**, sem dados

> ## Exceções

1. [x] Retorna erro **404** se a API não existir
2. [x] Retorna erro **403** se não for um usuário
3. [x] Retorna erro **422** se o name já existir
4. [x] Retorna erro **400** se name não for fornecidos pelo client
5. [x] Retorna erro **500** se der erro ao tentar criar o setor