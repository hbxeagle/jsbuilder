express = require('express')
routes = require(__dirname + '/server/routes')
app = express()

app.set('port', (process.env.PORT || 5000))
app.set('views',__dirname + '/server/views')
app.set('view engine','ejs')
app.use(express.static(__dirname + '/statics'))

app.route('/').all(routes.index)

app.listen(app.get('port'), ()->
  console.log("Node app is running at localhost:" + app.get('port'))
)