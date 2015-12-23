var express = require('express');
var bodyParser = require('body-parser').json();
var app = express();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

app.post('/api/send-email', bodyParser, function (req, res) {
    var form = req.body;

    console.log('[EMAIL] Sending to [%s]', form.to);

    send(form.to, form.body,
        function (err, info) {
            if (err) {
                console.error('[EMAIL] error:', err);
                return res.send({error: err});
            }

            console.log('[EMAIL] Sent:', info);
            res.send({ result: 'ok'});
        });
});

function send(to, body, cb) {
    transporter.sendMail({
            from: 'test@address.com',
            to: to,
            subject: 'test-poc1',
            html: body
        }, cb);
}

function run(port) {
    var server = app.listen(port, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('[API] listening at http://%s:%s', host, port);
    });
}

module.exports = {
    run: run
};