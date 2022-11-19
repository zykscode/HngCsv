type Data = {
  name: string;
  organization: string;
  award: string;
  certificate_number: string;
  description: string;
  date: string;
  logo: string;
};

export const extName = (string: string) => {
  return string.slice(string.lastIndexOf('.') + 1) === 'csv';
};

export const mimetype = (input = '') => {
  return /text\/csv/.test(input) || /text\/comma-separated-values/.test(input);
};

export const data = (row: Data) => {
  const {
    name,
    organization,
    award,
    certificate_number,
    description,
    date,
    logo
  } = row;

  return (
    name &&
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
    logo.trim() !== ''
  );
};

export const headers = (header: Data) => {
  const headers = Object.keys(header);
  return (
    headers.includes('name') &&
    headers.includes('organization') &&
    headers.includes('description') &&
    headers.includes('award') &&
    headers.includes('date') &&
    headers.includes('certificate_number')
  );
};
