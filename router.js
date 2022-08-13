const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/:folderName', (req, res) => {
    const {folderName} = req.params;
    res.render('inFolder', {folderName});
})

app.listen(3000, () => {
    console.log('PORT 3000 OPEN!')
})