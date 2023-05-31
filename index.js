import express from 'express';
import compress from 'compression';
import { dirname, sep} from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;

const cfg = {
  port: process.env.PORTC || 3000,
  dir: {
    root: __dirname,
    static: __dirname + 'static' + sep,
    views: __dirname + 'src/views' + sep
  }
};

const app = express();

app.set('view engine', 'ejs');
app.set('views', cfg.dir.views);
app.use(express.urlencoded({ extended: true }));

// app.use(compression());
// app.use( function(req, res, next) {
//   console.log(req.url);
//   next();
// });

// app.get('/', (req, res) => {
//   res.render('message', { title: 'Hello world!'});
// });
app.all('/', (req, res) => {
  res.render('form', {
    title: 'Parse HTTP GET data',
    data: req.query
  });
});

app.get('/hello/', (req, res) => {
  res.render('message', { title: 'Hello again!'});
});

app.use(express.static(cfg.dir.static));

app.use((req, res) => {
  res.status(404).render('message', { title: 'Not found'});
});


app.listen(cfg.port, () => {
  console.log('running app', cfg.port);
});

export { cfg, app }
