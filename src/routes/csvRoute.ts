import { Router } from 'express';
import { readFile } from 'fs';
import { csvUpload } from '../controllers/csvController';
const router = Router();
router.post('/', csvUpload);

router.get('/test', (req, res) => {
  readFile('test.html', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('internal sever error');
    }
    res.status(200).send(data);
  });
});

export default router;
