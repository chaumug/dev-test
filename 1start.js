var express = require('express');
var bodyParser = require('body-parser');
var app = express();


const low = require('lowdb')
const storage = require('lowdb/file-sync')
const db = low('data/users.json', { storage })

app.set('view engine', 'jade');
app.set('views', './client')
app.use('/', express.static(__dirname + '/client'));

app.get('/', function (req, res) {
  res.render('index');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/account', function (req, res) {
    console.log(req.body.email);
    console.log(req.body.pw);
    var email = req.body.email;
    var pw = req.body.pw;
    const post = db('posts').find({ email: email, password: pw });
    if (post == null) {
        res.render('index', { message: 'Sorry, invalid login.  Please try again.'});
    } else {
        res.render('account', post);
    }    
});

app.listen(3000);
