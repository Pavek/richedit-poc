import React, { Component } from 'react';
import Form from './Form/Form';
import { Grid, Row, Col } from 'react-bootstrap';
import xhr from 'xhr';

import './Main.less';

//const baseApiUrl = 'http://localhost:3000';

class AppComponent extends Component {
    constructor() {
        super();
        this.sendEmail = this.sendEmail.bind(this);
    }

    sendEmail(form) {
        //console.log('>> Sending: ', form);
        let options = {
            url: '/api/send-email',
            json: form
        };
        xhr.post(options, function (err, res) {
            if (!err && res.statusCode == 200) {
                //console.log('>> Sending res: ', res);
            }
            else {
                //console.error('>> Sending failed: [%s]: ', res.statusCode, res);
            }
        });
    }

    render() {
        return (
            <Grid fluid={true}>
                <Row>
                    <Col className="main-content" sm={8} smOffset={2} lg={6} lgOffset={3}>
                        <h1>Send Test Email</h1>
                        <Form onSubmit={ this.sendEmail }/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default AppComponent;
