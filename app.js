var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes')
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extend: true
}));

app.get('/', routes.index);
app.get('/list', routes.list);
app.post('/insert', routes.insert);
app.delete('/movie/:id', routes.remove);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
	console.log('Server started in port ' + server.address().port);
})