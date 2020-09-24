# Desafio Técnico
Pessoa Desenvolvedora Backend - Estágio

*Todos os testes foram feitos no Insomnia (https://insomnia.rest/)

- Exemplo de requisição de criação de usuário: POST -> /createUser

&nbsp;
Exemplos de entrada:

--------------------------------------------
```javascript=
{
	"nome":"Guido Bernal",
	"email":"guido13bernal@gmail.com",
	"genero":"m"
}
```
---------------------
```javascript=
{
	"nome":"Juliana Souza",
	"email":"ju_za@hotmail.com",
	"genero":"f"
}
```
---------------------
```javascript=
{
	"nome":"Marcelo Nova",
	"email":"marcelonova@yahoo.com",
	"genero":"nd"
}
```
---------------------
```javascript=
{
	"nome":"Leticia Quevedo",
	"email":"leti28qvd@outlook.com",
	"genero":"o"
}
```
--------------------------------------------
Exemplos de saída:

--------------------------------------------
```javascript=
{
	"id":0,
	"nome":"Guido Bernal",
	"email":"guido13bernal@gmail.com",
	"genero":"m"
}
```
---------------------
```javascript=
{
	"id":1,
	"nome":"Juliana Souza",
	"email":"ju_za@hotmail.com",
	"genero":"f"
}
```
---------------------
```javascript=
{
	"id":2,
	"nome":"Marcelo Nova",
	"email":"marcelonova@yahoo.com",
	"genero":"nd"
}
```
---------------------
```javascript=
{
	"id":3,
	"nome":"Leticia Quevedo",
	"email":"leti28qvd@outlook.com",
	"genero":"o"
}
```
--------------------------------------------

- Exemplos de requisição de adição à fila: PUT -> /addToLine/:id 

&nbsp;
Exemplos de saída: 

--------------------------------------------
(id: 0)

&nbsp;
Usuário 0 está na posição 1.
---------------------
(id: 1)

&nbsp;
Usuário 1 está na posição 2.
---------------------
(id: 3)

&nbsp;
Usuário 3 está na posição 3.
--------------------------------------------

- Exemplo de requisição de ver fila: GET -> /showline

&nbsp;
Exemplo de saída: (caso tivesse o PUT acima)

--------------------------------------------
```javascript=
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
```
--------------------------------------------

- Exemplo de requisição de buscar usuário na fila: GET -> /findPosition

&nbsp;
Exemplo de entrada: (caso tivesse o PUT acima)

--------------------------------------------
```javascript=
{
	"email":"guido13bernal@gmail.com"
}
```
--------------------------------------------

Exemplo de saída:

--------------------------------------------
Usuário 0 está na posição: 1.
--------------------------------------------

- Exemplo de requisição de filtrar fila: GET -> /filterLine/:genero

&nbsp;
Exemplos de saída: (caso tivesse o PUT acima)

---------------------
(genero: m)
```javascript=
[
  {
    "nome": "Guido Bernal",
    "genero": "m",
    "email": "guido13bernal@gmail.com",
    "posicaoFila": 1
  }
]
```
---------------------
(genero: f)
```javascript=
[
  {
    "nome": "Juliana Souza",
    "genero": "f",
    "email": "ju_za@hotmail.com",
    "posicaoFila": 2
  }
]
```
---------------------
(genero: nd)

&nbsp;
Não existem usuários na fila com o gênero: nd.
---------------------
(genero: o)
```javascript=
[
  {
    "nome": "Leticia Quevedo",
    "genero": "o",
    "email": "leti28qvd@outlook.com",
    "posicaoFila": 3
  }
]
```
--------------------------------------------

- Exemplo de requisição de retirar primeiro da fila: DELETE -> /popLine

&nbsp;
Exemplo de saída: (caso tivesse o PUT acima)

--------------------------------------------
```javascript=
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
```
--------------------------------------------
