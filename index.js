var express = require('express'),
    routes = require('./server/routes');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('views',__dirname + '/views');
app.set('view engine','ejs');
app.use(express.static(__dirname + '/dist'));

app.get('/', function(request, response) {
  var result = '------';
  response.send(result);
});

/*app.route('/index')
   .all(routes.index);*/

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

