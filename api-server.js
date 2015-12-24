var express = require('express');
var bodyParser = require('body-parser').json();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

function send(to, body, cb) {
    transporter.sendMail({
        from: 'test@address.com',
        to: to,
        subject: 'test-poc1',
        html: body
    }, cb);
}

function config(app) {
    app.post('/api/send-email', bodyParser, function (req, res) {
        var form = req.body;
        console.log('[EMAIL] Sending to [%s]', form.to);

        send(form.to, form.body,
            function (err, info) {
                if (err) {
                    console.error('[EMAIL] error:', err);
                    return res
                        .status(409)
                        .send({
                            error: err.toString(),
                            details: err.errors[0]
                        });
                }

                console.log('[EMAIL] Sent:', info.accepted);
                res.send({
                    result: 'ok',
                    details: {accepted: info.accepted}
                });
            });
    });
}

function run(app, port) {
    app = app || express();
    config(app);

    var server = app.listen(port, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('[API] listening at http://%s:%s', host, port);
    });
}


module.exports = {
    run: run
};