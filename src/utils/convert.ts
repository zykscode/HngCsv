import path, { resolve } from 'path';
import csv from 'csv-parser';
import { data } from './validator';
import { createReadStream } from 'fs';

export const convertCsv = (filePath: string) => {
  const jsonData = [];
  return new Promise((resolve, reject) => {
    createReadStream(filePath)
      .pipe(csv())
      .on('error', () => {
        reject('Error reading file');
      })
      .on('data', (row) => {
        if (data(row)) {
          jsonData.push({
            message: 'invalid entries'
          });
        } else {
          jsonData.push(row);
        }
      })
      .on('end', () => {
        resolve(jsonData);
      });
  });
};
