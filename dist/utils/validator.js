"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headers = exports.data = exports.mimetype = exports.extName = void 0;
const extName = (string) => {
    return string.slice(string.lastIndexOf('.') + 1) === 'csv';
};
exports.extName = extName;
const mimetype = (input = '') => {
    return /text\/csv/.test(input) || /text\/comma-separated-values/.test(input);
};
exports.mimetype = mimetype;
const data = (row) => {
    const { name, organization, award, certificate_number, description, date, logo } = row;
    return (name &&
        name.trim() !== '' &&
        award &&
        award.trim() !== '' &&
        date &&
        date.trim() !== '' &&
        organization &&
        organization.trim() !== '' &&
        description &&
        description.trim() !== '' &&
        certificate_number &&
        certificate_number.trim() !== '' &&
        logo &&
        logo.trim() !== '');
};
exports.data = data;
const headers = (header) => {
    const headers = Object.keys(header);
    return (headers.includes('name') &&
        headers.includes('organization') &&
        headers.includes('description') &&
        headers.includes('award') &&
        headers.includes('date') &&
        headers.includes('certificate_number'));
};
exports.headers = headers;
