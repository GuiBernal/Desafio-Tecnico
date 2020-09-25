const response = require('../utils/code');

let novoID = 0;
const listaUsuarios = [];
const filaUsuarios = [];

//Adiciona um novo usuário ao sistema, utiliza as 3 funções acima para validar a entrada de dados do usuário
const createUser = (ctx) => {
    const addUsuario = ctx.request.body;
    //Confere se a sintaxe do nome é válida (nome e sobrenome)
    const validarNome = (nome) => {
        var checkNome = /^[a-zA-Z]+ [a-zA-Z]+$/;
        if(!checkNome.test(nome)){
            return false;
        }else{
            return true;
        }
    }

    //Confere se a sintaxe do e-mail é válida
    const validarEmail = (email) => {
        var checkEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!checkEmail.test(email)) {
            return (false);
        } 
        return true;
    }

    //Confere se a sintaxe do gênero é válida
    const validarGenero = (genero) => {
        if (genero != "m" && genero != "f" && genero != "nd" && genero != "o") {
            return false
        }
        return true;
    }

    const novoUsuario = {
        id: novoID,
        nome: (validarNome(addUsuario.nome) === false) ? "nomeErr" : addUsuario.nome,
        email: (validarEmail(addUsuario.email) === false) ? "emailErr" : addUsuario.email,
        genero: (validarGenero(addUsuario.genero) === false) ? "generoErr" : addUsuario.genero
    }
    if (novoUsuario.nome === "nomeErr") {
        return response(ctx, 400, {mensagem: "A sintaxe utilizada em nome é inválida."});
    } else if (novoUsuario.email === "emailErr") {
        return response(ctx, 400, {mensagem: "A sintaxe utilizada em email é inválida." });
    } else if (novoUsuario.genero === "generoErr") {
        return response(ctx, 400, {mensagem: "Apenas os gêneros 'f'(Feminino), 'm'(Masculino), 'nd'(Não declado) ou 'o'(Outros) são reconhecidos para entrada."});
    } else {
        listaUsuarios.push(novoUsuario);
        novoID++;
    }
    return response(ctx, 201, novoUsuario);
}

//Move um usuário específico para a fila de usuário, é usado o ID como filtro
const addToLine = (ctx) => {
    const idUsuario = ctx.params.id;
    for (let usuario of listaUsuarios) {
        if (usuario.id == idUsuario) {
            if (filaUsuarios.length === 0) {
                usuario.posicaoFila = 1;
                filaUsuarios.push(usuario);
                return response(ctx, 200, {mensagem: `Usuário ${usuario.id} está na posição: ${usuario.posicaoFila}.`});
            } else {
                for (let usuarioFila of filaUsuarios) {
                    if (usuario.email === usuarioFila.email) {
                        return response(ctx, 409, {mensagem: "O usuário já entrou na fila."});
                    }
                }
                usuario.posicaoFila = filaUsuarios[filaUsuarios.length - 1].posicaoFila + 1;
                filaUsuarios.push(usuario);
                return response(ctx, 200, {mensagem: `Usuário ${usuario.id} está na posição: ${usuario.posicaoFila}.`});
            }
        }
    }
    return response(ctx, 404, {mensagem: "ID não encontrado."});
}

//Retorna a fila de usuários, começando pelo primeiro da fila (posicaoFila: 1)
const showLine = (ctx) => {
    const mostrarFila = [];
    if (filaUsuarios.length === 0) {
        return response(ctx, 404, {mensagem: "A fila de usuários está vazia."});
    }
    for (let usuario of filaUsuarios) {
        const usuarioSemID = {
            nome: usuario.nome,
            genero: usuario.genero,
            email: usuario.email,
            posicaoFila: usuario.posicaoFila
        }
        mostrarFila.push(usuarioSemID);
    }
    return response(ctx, 200, mostrarFila);
}

//Retorna um usuário específico, utilizando o e-mail do mesmo como filtro
const findPosition = (ctx) => {
    const emailUsuario = ctx.request.body;
    if (filaUsuarios.length === 0) {
        return response(ctx, 404, {mensagem: "A fila de usuários está vazia."});
    }
    for (let usuario of filaUsuarios) {
        if (usuario.email == emailUsuario.email) {
            return response(ctx, 200, {mensagem: `Usuário ${usuario.id} está na posição: ${usuario.posicaoFila}.`})
        }
    }
    return response(ctx, 404, {mensagem: "E-mail não encontrado."})
}

/*
Retorna uma lista de usuários com um gênero específico,
nesse caso os gêneros testados são: 'm'(Masculino), 'f'(Feminino), 'nd'(Não declarado) e 'o'(Outros)
*/
const filterLine = (ctx) => {
    const generoUsuario = ctx.params.id;
    if (filaUsuarios.length === 0) {
        return response(ctx, 404, {mensagem: "A fila de usuários está vazia."});
    } else if (generoUsuario != "m" && generoUsuario != "f" && generoUsuario != "nd" && generoUsuario != "o") {
        return response(ctx, 404, {mensagem: "Apenas os gêneros 'f'(Feminino), 'm'(Masculino), 'nd'(Não declado) ou 'o'(Outros) são reconhecidos para entrada."});
    }
    const mostrarGenero = [];
    for (let usuario of filaUsuarios) {
        if (usuario.genero == generoUsuario) {
            const usuarioSemID = {
                nome: usuario.nome,
                genero: usuario.genero,
                email: usuario.email,
                posicaoFila: usuario.posicaoFila
            }
            mostrarGenero.push(usuarioSemID);
        }
    }
    if (mostrarGenero.length === 0) {
        if (generoUsuario == "m") {
            return response(ctx, 404, {mensagem: `Não existem usuários na fila com o gênero masculino.`});
        } else if (generoUsuario == "f") {
            return response(ctx, 404, {mensagem: `Não existem usuários na fila com o gênero feminino.`});
        } else if (generoUsuario == "nd") {
            return response(ctx, 404, {mensagem: `Não existem usuários na fila sem um gênero declarado.`});
        } else {
            return response(ctx, 404, {mensagem: `Não existem usuários na fila com outros gêneros.`})
        }
    }
    return response(ctx, 200, mostrarGenero);
}

//Retira o primeiro usuário da fila, fazendo a "fila andar"
const popLine = (ctx) => {
    if (filaUsuarios.length === 0) {
        return response(ctx, 404, {mensagem: "A fila de usuários está vazia."});
    }
    filaUsuarios.shift();
    for (let usuario of filaUsuarios) {
        usuario.posicaoFila = (usuario.posicaoFila) - 1;
    }
    showLine(ctx);
}

module.exports = { createUser, addToLine, showLine, findPosition, filterLine, popLine }

