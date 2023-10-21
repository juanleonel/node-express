import express from 'express'
import compress from 'compression'
import { dirname, sep} from 'path'
import { fileURLToPath } from 'url'
import compression from 'compression'
import dotenv from 'dotenv';

import { createEmploye, deleteEmploye, getAllEmploye, getEmployeById, updateEmploye } from './src/repository/employe.repository.js'
import { isIdValid, toBoolean } from './src/utils/utils.js'

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;

const cfg = {
  port: process.env.PORTC || 3000,
  dir: {
    root: __dirname,
    static: __dirname + 'static' + sep,
    views: __dirname + 'src/views' + sep
  }
}

const app = express();
app.set('view engine', 'ejs');
app.set('views', cfg.dir.views);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(cfg.dir.static));

// app.use(compression());
// app.use( function(req, res, next) {
//   console.log(req.url);
//   next();
// });

// app.get('/', (req, res) => {
//   res.render('message', { title: 'Hello world!'});
// });

app.post('/add', async (req, res) => {
  try {
    const data = req.body
    const prossesData = {
      name: data.name,
      last_name: data.last_name || 'default',
      job: data.job,
      like_node: toBoolean(data.like_node),
      created_at: new Date()
    }
    await createEmploye(prossesData)

    return res.redirect('/')
  } catch (error) {
    return res.render('error', {
      errorMessage: error.message
    })
  }
})

app.get('/add', (req, res) => {
  try {
    return res.render('add', {
      title: 'Add new employe',
      data: undefined
    })
  } catch (error) {
    return res.render('error', {
      errorMessage: error.message
    })
  }
})

app.get('/edit/:id', async (req, res) => {
  try {
    const id = isIdValid(req.params.id, 'number')
    const data = await getEmployeById(id)

    return res.render('edit', {
      title: 'Edit ' + data.name ,
      data: data
    })
  } catch (error) {
    return res.render('error', {
      errorMessage: error.message
    })
  }
})

app.post('/edit/:id', async (req, res) => {
  try {
    const id = isIdValid(req.params.id, 'number')
    const data = req.body
    const prossesData = {
      name: data.name,
      last_name: data.last_name || 'default',
      job: data.job,
      like_node: toBoolean(data.like_node),
      updated_at: new Date(),
      employe_id: id
    }

     await updateEmploye(prossesData)

    return res.redirect('/')
  } catch (error) {
    return res.render('error', {
      errorMessage: error.message
    })
  }
})

app.post('/delete/:id', async (req, res) => {
  try {
    const id = isIdValid(req.params.id, 'number')
    await deleteEmploye(id)

    return res.redirect('/')
  } catch (error) {
    return res.render('error', {
      errorMessage: error.message
    })
  }
})

app.get('/', async (req, res) => {
  try {
    const result = await getAllEmploye()
    return res.render('employe', {
      title: 'CRUD',
      employes: result
    })
  } catch (error) {
    return res.render('error', {
      errorMessage: error.message
    })
  }
})

app.get('/hello/', (req, res) => {
  res.render('message', { title: 'Hello again!'})
})



app.use((req, res) => {
  res.status(404).render('message', { title: 'Not found'})
})

app.listen(cfg.port, () => {
  console.log('running app', cfg.port)
})

export { cfg, app }
