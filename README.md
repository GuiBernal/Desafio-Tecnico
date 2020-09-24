# Desafio-Técnico
Pessoa Desenvolvedora Backend - Estágio

*Todos os testes foram feitos no Insomnia (https://insomnia.rest/)

- Exemplo de requisição de criação de usuário:
POST -> /createUser
Exemplos de entrada:

--------------------------------------------
{
	"nome":"Guido Bernal",
	"email":"guido13bernal@gmail.com",
	"genero":"m"
}
---------------------
{
	"nome":"Juliana Souza",
	"email":"ju_za@hotmail.com",
	"genero":"f"
}
---------------------
{
	"nome":"Marcelo Nova",
	"email":"marcelonova@yahoo.com",
	"genero":"nd"
}
---------------------
{
	"nome":"Leticia Quevedo",
	"email":"leti28qvd@outlook.com",
	"genero":"o"
}
--------------------------------------------
Exemplos de saída:

--------------------------------------------
{
	"id":0,
	"nome":"Guido Bernal",
	"email":"guido13bernal@gmail.com",
	"genero":"m"
}
---------------------
{
	"id":1,
	"nome":"Juliana Souza",
	"email":"ju_za@hotmail.com",
	"genero":"f"
}
---------------------
{
	"id":2,
	"nome":"Marcelo Nova",
	"email":"marcelonova@yahoo.com",
	"genero":"nd"
}
---------------------
{
	"id":3,
	"nome":"Leticia Quevedo",
	"email":"leti28qvd@outlook.com",
	"genero":"o"
}
--------------------------------------------

- Exemplo de requisição de adição à fila:
PUT -> /addToLine/:id
Exemplos de saída: 

--------------------------------------------
(id: 0)
Usuário 0 está na posição 1.
---------------------
(id: 1)
Usuário 1 está na posição 2.
---------------------
(id:3)
Usuário 3 está na posição 3.
--------------------------------------------

- Exemplo de requisição de ver fila:
GET -> /showline
Exemplo de saída: (caso tivesse o PUT acima)

--------------------------------------------
[
  {
    "nome": "Guido Bernal",
    "genero": "m",
    "email": "guido13bernal@gmail.com",
    "posicaoFila": 1
  },
  {
    "nome": "Juliana Souza",
    "genero": "f",
    "email": "ju_za@hotmail.com",
    "posicaoFila": 2
  },
  {
    "nome": "Leticia Quevedo",
    "genero": "o",
    "email": "leti28qvd@outlook.com",
    "posicaoFila": 3
  }
]
--------------------------------------------

- Exemplo de requisição de buscar usuário na fila:
GET -> /findPosition
Exemplo de entrada: (caso tivesse o PUT acima)

--------------------------------------------
{
	"email":"guido13bernal@gmail.com"
}
--------------------------------------------

Exemplo de saída:

--------------------------------------------
Usuário 0 está na posição: 1.
--------------------------------------------

- Exemplo de requisição de filtrar fila:
GET -> /filterLine/:genero
Exemplos de saída: (caso tivesse o PUT acima)

---------------------
(genero: m)
[
  {
    "nome": "Guido Bernal",
    "genero": "m",
    "email": "guido13bernal@gmail.com",
    "posicaoFila": 1
  }
]
---------------------
(genero: f)
[
  {
    "nome": "Juliana Souza",
    "genero": "f",
    "email": "ju_za@hotmail.com",
    "posicaoFila": 2
  }
]
---------------------
(genero: nd)
Não existem usuários na fila com o gênero: nd.
---------------------
(genero: o)
[
  {
    "nome": "Leticia Quevedo",
    "genero": "o",
    "email": "leti28qvd@outlook.com",
    "posicaoFila": 3
  }
]
--------------------------------------------

- Exemplo de requisição de retirar primeiro da fila:
DELETE -> /popLine
Exemplo de saída: (caso tivesse o PUT acima)

--------------------------------------------
[
  {
    "nome": "Juliana Souza",
    "genero": "f",
    "email": "ju_za@hotmail.com",
    "posicaoFila": 1
  },
  {
    "nome": "Leticia Quevedo",
    "genero": "o",
    "email": "leti28qvd@outlook.com",
    "posicaoFila": 2
  }
]
--------------------------------------------
