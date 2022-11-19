"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCsv = void 0;
const csv_parser_1 = __importDefault(require("csv-parser"));
const validator_1 = require("./validator");
const fs_1 = require("fs");
const convertCsv = (filePath) => {
    const jsonData = [];
    return new Promise((resolve, reject) => {
        (0, fs_1.createReadStream)(filePath)
            .pipe((0, csv_parser_1.default)())
            .on('error', () => {
            reject('Error reading file');
        })
            .on('data', (row) => {
            if ((0, validator_1.data)(row)) {
                jsonData.push({
                    message: 'invalid entries'
                });
            }
            else {
                jsonData.push(row);
            }
        })
            .on('end', () => {
            resolve(jsonData);
        });
    });
};
exports.convertCsv = convertCsv;
