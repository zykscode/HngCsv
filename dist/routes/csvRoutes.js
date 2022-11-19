"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = require("fs");
const csvController_1 = require("../controllers/csvController");
(0, express_1.Router)().post('/', csvController_1.csvUpload);
(0, express_1.Router)().get('/test', (req, res) => {
    (0, fs_1.readFile)('test.html', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('internal sever error');
        }
        res.status(200).send(data);
    });
});
