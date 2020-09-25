# Desafio Técnico
Pessoa Desenvolvedora Backend - Estágio

*Todos os testes foram feitos no Insomnia (https://insomnia.rest/)
*É possível alterar a porta pelo arquivo '.env-exemplo', PORT='porta desejada' e apagar '-exemplo' do nome do arquivo,
caso o arquivo não seja alterado o server irá rodar na porta '8000'.

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
  "status": "sucesso",
  "dados": {
    "id": 0,
    "nome": "Guido Bernal",
    "email": "guido13bernal@gmail.com",
    "genero": "m"
  }
}
```
---------------------
```javascript=
{
  "status": "sucesso",
  "dados": {
    "id": 1,
    "nome": "Juliana Souza",
    "email": "ju_za@hotmail.com",
    "genero": "f"
  }
}
```
---------------------
```javascript=
{
  "status": "sucesso",
  "dados": {
    "id": 2,
    "nome": "Marcelo Nova",
    "email": "marcelonova@yahoo.com",
    "genero": "nd"
  }
}
```
---------------------
```javascript=
{
  "status": "sucesso",
  "dados": {
    "id": 3,
    "nome": "Leticia Quevedo",
    "email": "leti28qvd@outlook.com",
    "genero": "o"
  }
}
```
--------------------------------------------

- Exemplos de requisição de adição à fila: PUT -> /addToLine/:id 

&nbsp;
Exemplos de saída: 

--------------------------------------------
(/addToLine/0)
{
  "status": "sucesso",
  "dados": {
    "mensagem": "Usuário 0 está na posição: 1."
  }
}

---------------------
(/addToLine/1)
{
  "status": "sucesso",
  "dados": {
    "mensagem": "Usuário 1 está na posição: 2."
  }
}

---------------------
(/addToLine/3)
{
  "status": "sucesso",
  "dados": {
    "mensagem": "Usuário 3 está na posição: 3."
  }
}

--------------------------------------------

- Exemplo de requisição de ver fila: GET -> /showline

&nbsp;
Exemplo de saída: (caso tivesse o PUT acima)

--------------------------------------------
```javascript=
{
  "status": "sucesso",
  "dados": [
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
}
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
{
  "status": "sucesso",
  "dados": {
    "mensagem": "Usuário 0 está na posição: 1."
  }
}

--------------------------------------------

- Exemplo de requisição de filtrar fila: GET -> /filterLine/:genero

&nbsp;
Exemplos de saída: (caso tivesse o PUT acima) *Os gêneros testados são: 'm'(Masculino), 'f'(Feminino), 'nd'(Não declarado) e 'o'(Outros)

---------------------
(/filterLine/m)
```javascript=
{
  "status": "sucesso",
  "dados": [
    {
      "nome": "Guido Bernal",
      "genero": "m",
      "email": "guido13bernal@gmail.com",
      "posicaoFila": 1
    }
  ]
}
```
---------------------
(/filterLine/f)
```javascript=
{
  "status": "sucesso",
  "dados": [
    {
      "nome": "Guido Bernal",
      "genero": "m",
      "email": "guido13bernal@gmail.com",
      "posicaoFila": 1
    }
  ]
}
```
---------------------
(/filterLine/nd)
{
  "status": "erro",
  "dados": {
    "mensagem": "Não existem usuários na fila sem um gênero declarado."
  }
}

---------------------
(/filterLine/o)
```javascript=
{
  "status": "sucesso",
  "dados": [
    {
      "nome": "Leticia Quevedo",
      "genero": "o",
      "email": "leti28qvd@outlook.com",
      "posicaoFila": 3
    }
  ]
}
```
--------------------------------------------

- Exemplo de requisição de retirar primeiro da fila: DELETE -> /popLine

&nbsp;
Exemplo de saída: (caso tivesse o PUT acima)

--------------------------------------------
```javascript=
{
  "status": "sucesso",
  "dados": [
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
}
```
--------------------------------------------
