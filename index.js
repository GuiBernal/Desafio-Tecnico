const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const router = require("./src/routes");
require('dotenv').config();

const server = new Koa();
const PORT = process.env.PORT || 8000;

server.use(bodyparser());
server.use(router.routes());
server.use((ctx) => {
    ctx.status = 404;
    ctx.body = {
        status: "erro",
        dados: {
            mensagem: "Recurso não encontrado."
        }
    }
});

server.listen(PORT, () => console.log("Rodando na porta", PORT));
