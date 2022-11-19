import express from 'express';
import cors from 'cors';
import helmets from 'helmet';
import { readFile } from 'fs';
import router from './routes/csvRoute';

const app = express();

app.use(cors());
app.use(helmets());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use('api/upload', router);

app.get('/', (req, res) => {
  readFile('index.html', 'utf-8', (err, data) => {
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
function helmet(): any {
  throw new Error('Function not implemented.');
}
