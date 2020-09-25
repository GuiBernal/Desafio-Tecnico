const Router = require("koa-router");
const router = new Router();

const createUser = require("./controllers/functions").createUser;
const addToLine = require("./controllers/functions").addToLine;
const showLine = require("./controllers/functions").showLine;
const findPosition = require("./controllers/functions").findPosition;
const filterLine = require("./controllers/functions").filterLine;
const popLine = require("./controllers/functions").popLine;
 
router.post('/createUser', (ctx) => createUser(ctx));

router.put('/addToLine/:id', (ctx) => addToLine(ctx));

router.get('/showLine', (ctx) => showLine(ctx));

router.get('/findPosition', (ctx) => findPosition(ctx));

router.get('/filterLine/:id', (ctx) => filterLine(ctx));

router.delete('/popLine', (ctx) => popLine(ctx));

module.exports = router; 