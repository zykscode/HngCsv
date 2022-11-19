"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const fs_1 = require("fs");
const csvRoute_1 = __importDefault(require("./routes/csvRoute"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use('api/upload', csvRoute_1.default);
app.get('/', (req, res) => {
    (0, fs_1.readFile)('index.html', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('internal sever error');
        }
        res.status(200).send(data);
    });
});
app.use((req, res, next) => {
    const url = req.url;
    res.status(404).json({
        error: 'no resource available here' + ' - ' + url
    });
});
// catch all handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(8000, () => {
    console.log(`Server started...`);
});
function helmet() {
    throw new Error('Function not implemented.');
}
