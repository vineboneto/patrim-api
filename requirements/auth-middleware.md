# Autenticação

> ## Caso de sucesso

1. [ ] Recebe uma requisição para alguma rota protegida
2. [ ] Valida se possui o accessToken no header da requisição
3. [ ] Valida se o accessToken é valido
4. [ ] **Busca** a conta do usuário pelo accessToken 
5. [ ] Retorna **200**, com o id da conta do usuário

> ## Exceções

1. [ ] Retorna erro **404** se a API não existir
2. [ ] Retorna erro **403** se não for um admin
3. [ ] Retorna erro **403** se não for um usuário
4. [ ] Retorna erro **400** se accessToken não for fornecidos pelo client
5. [ ] Retorna erro **500** se der erro ao tentar buscar a conta