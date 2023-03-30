const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact } = require('./util/contacts')

const app = express()
const port = 3000

//EJS Settings
app.set('view engine', 'ejs');

// Thride-Party Middleware
app.use(expressLayouts);

//Buildin Middleware
app.use(express.static('public'));
app.use(express.urlencoded());

app.get('/', (req, res) => {
    // res.sendFile('./index.html', {root: __dirname});
    const mahasiswa = [
    {
        nama:'rojani am',
        email: 'rojani@gmail.com',
    },
    {
        nama:'Rudi',
        email: 'rudi@gmail.com',
    },
    {
        nama:'bagas',
        email: 'bagas@gmail.com',
    },
];
    res.render('index', 
    {
        nama:'Rojani AM', 
        title:'Home',
        mahasiswa,
        layout: 'layout/main-layout'
    });
})
app.get('/about', (req, res) => {
    // res.sendFile('./about.html', {root: __dirname});
    res.render('about', {
        layout: 'layout/main-layout', 
        title: 'Halaman About',
    });
})
app.get('/contact', (req, res) => {
    const contacts = loadContact();
    
    res.render('contact', {
        layout: 'layout/main-layout', 
        title: 'Halaman Contact',
        contacts,
    });
})

// halaman form tambah data contak
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Form Tambah Data Kontak',
        layout: 'layout/main-layout',
    });
})

//proses data kontak
app.post('/contact', (req, res) => {
    res.send(req.body);
})

//halaman detail contact
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    
    res.render('detail', {
        layout: 'layout/main-layout', 
        title: 'Detail Contact',
        contact,
    });
})

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
