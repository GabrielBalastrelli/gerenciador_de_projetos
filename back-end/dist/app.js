"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const PORT = 3000;
server_1.default.use((0, cors_1.default)());
server_1.default.get('/', (req, res) => {
    res.send('Hello World!');
});
server_1.default.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
