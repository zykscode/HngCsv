import { extname } from 'path';
import { convertCsv } from '../utils/convert';
import { mimetype, headers } from '../utils/validator';
import formidable from 'formidable';

export const csvUpload = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    const filePath = files.csv.filepath;

    if (
      !(extname(files.csv.originalFilename) && mimetype(files.csv.mimetype))
    ) {
      return res.status(400).json({
        success: false,
        message: 'File not supprted, only CSV files are accepted'
      });
    }

    convertCsv(filePath)
      .then((data) => {
        if (!headers(data[0])) {
          return res.status(406).json({
            message:
              'invalid headers, accepted headers are : name, organization, award, description, date, certificate_number'
          });
        }
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });
};
