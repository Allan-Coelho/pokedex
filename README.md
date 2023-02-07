# Pokédex API

Uma API de gerenciamento de times de Pokémon! Com ela, você pode criar, atualizar, excluir e gerenciar seus times de Pokémon de maneira rápida e fácil. A API permite que você acesse uma ampla lista de Pokémons e adicione-os ao seu time.

## API Reference

GET `/health`
Para verificar se a API esta funcionando.

POST `/authentication/sign-up`
Realizar o cadastro de usuários.

POST `/authentication/sign-in`
Realizar a autenticacao de usuários por senha.

POST `/poketeams`
Criar um poketeam.

GET `/poketeams`
Listar os poketeams.

DELETE `/poketeams/:title`
Deletar um poketeam pelo título.

POST `/pokemon`
Atribuir um pokemon á um poketeam.
