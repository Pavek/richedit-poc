/*eslint no-console:0 */
require('core-js/fn/object/assign');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var open = require('open');

var api = require('./api-server').run(null, 3000);
var server = new WebpackDevServer(webpack(config), config.devServer);

server.listen(config.port, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }
    console.log('[Web] Listening at localhost:' + config.port);
    console.log('Opening your system browser...');
    open('http://localhost:' + config.port + '/index.html');
});