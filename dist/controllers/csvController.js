"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvUpload = void 0;
const path_1 = require("path");
const convert_1 = require("../utils/convert");
const validator_1 = require("../utils/validator");
const formidable_1 = __importDefault(require("formidable"));
const csvUpload = (req, res, next) => {
    const form = new formidable_1.default.IncomingForm();
    form.parse(req, function (err, fields, files) {
        const filePath = files.csv.filepath;
        if (!((0, path_1.extname)(files.csv.originalFilename) && (0, validator_1.mimetype)(files.csv.mimetype))) {
            return res.status(400).json({
                success: false,
                message: 'File not supprted, only CSV files are accepted'
            });
        }
        (0, convert_1.convertCsv)(filePath)
            .then((data) => {
            if (!(0, validator_1.headers)(data[0])) {
                return res.status(406).json({
                    message: 'invalid headers, accepted headers are : name, organization, award, description, date, certificate_number'
                });
            }
            res.status(200).json(data);
        })
            .catch((error) => {
            res.status(400).send(error);
        });
    });
};
exports.csvUpload = csvUpload;
