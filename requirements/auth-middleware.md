# Autenticação

> ## Caso de sucesso

1. [x] Recebe uma requisição para alguma rota protegida
2. [x] Valida se possui o accessToken no header da requisição
3. [x] Valida se o accessToken é valido
4. [x] **Busca** a conta do usuário pelo accessToken 
5. [x] Retorna **200**, com o id da conta do usuário

> ## Exceções

1. [x] Retorna erro **404** se a API não existir
2. [x] Retorna erro **403** se não for um admin
3. [x] Retorna erro **403** se não for um usuário
4. [x] Retorna erro **400** se accessToken não for fornecidos pelo client
5. [x] Retorna erro **500** se der erro ao tentar buscar a conta