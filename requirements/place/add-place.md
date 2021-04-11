# Adicionar Lugar

> ## Caso de sucesso

1. [x] Recebe uma requisição do tipo **POST** na rota **/api/places**
2. [x] Valida se a requisição foi feita por um **usuário**
3. [x] Valida dados obrigatórios **name**
4. [x] caso exista valida se **userId** é valido
5. [x] **Cria** um lugar com os dados fornecidos
6. [x] Retorna **204**, sem dados

> ## Exceções

1. [x] Retorna erro **404** se a API não existir
2. [x] Retorna erro **403** se o name já existir
3. [x] Retorna erro **403** se o userId não existir
4. [x] Retorna erro **403** se não for um usuário
5. [x] Retorna erro **400** se name não for fornecidos pelo client
6. [x] Retorna erro **400** se o userId ou id não for um número
7. [x] Retorna erro **500** se der erro ao tentar criar o lugar