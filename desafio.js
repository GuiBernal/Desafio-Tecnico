const Koa = require("koa");
const server = new Koa();
const bodyparser = require("koa-bodyparser");
server.use(bodyparser());

let novoID = 0;
const listaUsuarios = [];
const filaUsuarios = [];

//Retorna um status de erro e um contexto (body)
const err = (ctx, statusErr, bodyErr) => {
    ctx.status = statusErr;
    ctx.body = bodyErr;
}

//Retorna um status de sucesso e um contexto (body)
const done = (ctx, statusDone, bodyDone) => {
    ctx.status = statusDone;
    ctx.body = bodyDone;
}

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
    var checkGenero = /^[a-zA-Z]+$/;
    if(!checkGenero.test(genero)) {
        return false;
    }
    return true;
}

//Adiciona um novo usuário ao sistema, utiliza as 3 funções acima para validar a entrada de dados do usuário
const createUser = (ctx, addUsuario) => {
    const novoUsuario = {
        id: novoID,
        nome: (validarNome(addUsuario.nome) === false) ? "nomeErr" : addUsuario.nome,
        email: (validarEmail(addUsuario.email) === false) ? "emailErr" : addUsuario.email,
        genero: (validarGenero(addUsuario.genero) === false) ? "generoErr" : addUsuario.genero
    }
    if (novoUsuario.nome === "nomeErr") {
        return err(ctx, 400, "A sintaxe utilizada em nome é inválida.");
    } else if (novoUsuario.email === "emailErr") {
        return err(ctx, 400, "A sintaxe utilizada em email é inválida.");
    } else if (novoUsuario.genero === "generoErr") {
        return err(ctx, 400, "A sintaxe utilizada em genero é inválida.");
    } else {
        listaUsuarios.push(novoUsuario);
        novoID++;
    }
    return done(ctx, 201, novoUsuario);
} 

//Move um usuário específico para a fila de usuário, é usado o ID como filtro
const addToLine = (ctx, idUsuario) => {
    for (let usuario of listaUsuarios) {
        if (usuario.id == idUsuario) {
            if (filaUsuarios.length === 0) {
                usuario.posicaoFila = 1;
                filaUsuarios.push(usuario);
                return done(ctx, 200, `Usuário ${usuario.id} está na posição: ${usuario.posicaoFila}.`);
            } else {
                for (let usuarioFila of filaUsuarios) {
                    if (usuario.email === usuarioFila.email) {
                        return err(ctx, 409, "O usuário já entrou na fila.");
                    }
                }
                usuario.posicaoFila = filaUsuarios[filaUsuarios.length - 1].posicaoFila + 1;
                filaUsuarios.push(usuario);
                return done(ctx, 200, `Usuário ${usuario.id} está na posição: ${usuario.posicaoFila}.`);
            }
        }
    }
    return err(ctx, 404, "ID não encontrado.");
}

//Retorna a fila de usuários, começando pelo primeiro da fila (posicaoFila: 1)
const showLine = (ctx) => {
    const mostrarFila = [];
    if (filaUsuarios.length === 0) {
        return err(ctx, 404, "A fila de usuários está vazia.");
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
    return done(ctx, 200, mostrarFila);
}

//Retorna um usuário específico, utilizando o e-mail do mesmo como filtro
const findPosition = (ctx, emailUsuario) => {
    if (filaUsuarios.length === 0) {
        return err(ctx, 404, "A fila de usuários está vazia.");
    }
    for (let usuario of filaUsuarios) {
        if (usuario.email == emailUsuario.email) {
            return done(ctx, 200, `Usuário ${usuario.id} está na posição: ${usuario.posicaoFila}.`)
        }
    }
    return err(ctx, 404, "E-mail não encontrado.")
}

/*
Retorna uma lista de usuários com um gênero específico,
nesse caso os gêneros testados são: 'm'(Masculino), 'f'(Feminino), 'nd'(Não declarado) e 'o'(Outros)
*/
const filterLine = (ctx, generoUsuario) => {
    if (filaUsuarios.length === 0) {
        return err(ctx, 404, "A fila de usuários está vazia.");
    } else if (generoUsuario != "m" && generoUsuario != "f" && generoUsuario != "nd" && generoUsuario != "o") {
        return err(ctx, 404, "Apenas os gêneros 'f'(Feminino), 'm'(Masculino), 'nd'(Não declado) ou 'o'(Outros) são reconhecidos para entrada.");
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
        return err(ctx, 404, `Não existem usuários na fila com o gênero: ${generoUsuario}.`)
    }
    return done(ctx, 200, mostrarGenero);
}

//Retira o primeiro usuário da fila, fazendo a "fila andar"
const popLine = (ctx) => {
    if (filaUsuarios.length === 0) {
        return err(ctx, 404, "A fila de usuários está vazia.");
    }
    filaUsuarios.shift();
    for (let usuario of filaUsuarios) {
        usuario.posicaoFila = (usuario.posicaoFila) - 1;
    }
    showLine(ctx);
}

server.use((ctx) => {
    const path = ctx.url;
    const method = ctx.method;
    const body = ctx.request.body;
    
    if (method === "POST") {
        if (path === "/createUser") {
            //Cadastra um novo usuário na fila
            createUser(ctx, body);
        } else {
            err(ctx, 404, "Não encontrado - O método POST não está sendo utilizado OU URL inválida.")
        }
    } else if (method === "PUT") {
        if (path.includes("/addToLine/")) {
            const pathSplitPUT = path.split("/");
            if (pathSplitPUT[1] === "addToLine") {
                if (pathSplitPUT[2]) {
                    //Adiciona um usuário na fila, pathSplitPUT[2] = ID de usuário desejado
                    addToLine(ctx, pathSplitPUT[2]);
                } else {
                    err(ctx, 404, "ID não encontrado.");
                }
            } else {
                err(ctx, 404, "URL não encontrada.");
            }
        } else {
            err(ctx, 404, "Não encontrado - O método PUT não está sendo utilizado OU URL não encontrada.");
        }
    } else if (method === "GET") {
        if (path === "/showLine") {
            //Mostra a fila de usuários
            showLine(ctx);
        } else if (path.includes("/filterLine/")) {
            const pathSplitGET = path.split("/");
            if (pathSplitGET[1] === "filterLine") {
                if (pathSplitGET[2]) {
                    //Retorna todos os usuários do gênero requisitado, pathSplitGET[2] = genero ('f', 'm', 'o' ou 'nd')
                    filterLine(ctx, pathSplitGET[2]);
                }
            }
        } else if (path === "/findPosition") {
            //Retorna um usuário específico utilizando o e-mail como filtro, body -> bodyJson: "email":"email@email.com"
            findPosition(ctx, body);
        } else {
            err(ctx, 404, "Não encontrado - O método GET não está sendo utilizado OU URL não encontrada.");
        }
    } else if (method === "DELETE") {
        if (path === "/popLine") {
            //Retira o primeiro usuário da fila
            popLine(ctx);
        } else {
            err(ctx, 404, "Não encontrado - O método DELETE não está sendo utilizado OU URL não encontrada.");
        }
    } else {
        err(ctx, 404, "URL não encontrada.");
    }
});

server.listen(8081, () => console.log("Rodando na porta 8081."));