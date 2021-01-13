const { conversation } = require("@assistant/conversation");
const woodScrewHandlers = require("./wood-screws");

const app = conversation();

Object.entries(woodScrewHandlers).forEach(([name, handler]) => {
    app.handle(name, handler);
});

module.exports = app;
