# Pokédex API

Uma API de gerenciamento de times de Pokémon! Com ela, você pode criar, atualizar, excluir e gerenciar seus times de Pokémon de maneira rápida e fácil. A API permite que você acesse uma ampla lista de Pokémons e adicione-os ao seu time.

## API Reference

### Como rodar

1. Clone este repositório.

2. Popule o arquivo `.env` como exemplificado no `.env.example`.

3. Suba os contêiners do app.

```bash
docker-compose up --build
```

### Endpoints

GET `/health`
Para verificar se a API está funcionando.

POST `/authentication/sign-up`
Realiza o cadastro de usuários.

```bash
{
   "nickname": "mynick",
   "password": "mypassword"
}
```

POST `/authentication/sign-in`
Realiza a autenticação de usuários por senha.

```bash
{
   "nickname": "mynick",
   "password": "mypassword"
}
```

POST `/poketeams`
Cria um PokeTeam.

```bash
{
   "title": "mypoketeamtitle"
}
```

GET `/poketeams`
Lista os PokeTeams.

DELETE `/poketeams/:title`
Deleta um PokeTeam pelo título.

POST `/pokemon`
Atribui um Pokemon á um PokeTeam.

```bash
{
   "pokemonId": 5,
   "pokeTeamId": 12
}
```
