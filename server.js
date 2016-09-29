var http = require('http'),
    app = require('./server/config/express')(),
    config = require('./server/config/variables');
require('./server/config/passport')();
require('./server/config/database.js')('mongodb://localhost/numap');

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express Server listen at port ' + app.get('port'));
});

module.exports = app;