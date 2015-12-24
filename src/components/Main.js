import React, { Component } from 'react';
import Form from './Form/Form';
import { Grid, Row, Col, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import xhr from 'xhr';
import Promise from 'bluebird';

import './Main.less';

//const baseApiUrl = 'http://localhost:3000';

class AppComponent extends Component {
    constructor() {
        super();
        this.state = {
            alertVisible: false,
            alertResult: {
                error: false,
                text: '',
                textLong: ''
            }
        };
        this.emailCount = 0;
        this.sendEmail = this.sendEmail.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);
    }

    send(form) {
        return new Promise((resolve, reject) => {
            let options = {
                url: '/api/send-email',
                json: form
            };
            xhr.post(options, (err, res) => {
                if (!err && res.statusCode == 200) {
                    //console.log('>> Sending res: ', res);
                    this.emailCount++;
                    resolve({
                        msg: `Sent successfully #${this.emailCount} to [${form.to}].`,
                        details: JSON.stringify(res.body.details, null, 2)
                    });
                }
                else {
                    //console.error('>> Sending failed: [%s]: ', res.statusCode, res, err);
                    reject({
                        msg: res.body.error,
                        details: JSON.stringify(res.body.details, null, 2)
                    });
                }
            });
        });
    }

    sendEmail(form) {
        return this.send(form)
            .then(({ msg, details }) => {
                this.setState({
                    alertVisible: true,
                    alertResult: {
                        error: false,
                        text: msg,
                        textLong: details
                    }
                });
            })
            .catch(({ msg, details}) => {
                this.setState({
                    alertVisible: true,
                    alertResult: {
                        error: true,
                        text: msg,
                        textLong: details
                    }
                });
            });
    }

    dismissAlert() {
        this.setState({alertVisible: false});
    }

    renderAlert() {
        const result = this.state.alertResult;
        const alertStyle = result.error ? 'danger' : 'success';
        const tooltip = (
            <Tooltip className="details-tooltip"><pre>{ result.textLong }</pre></Tooltip>
        );

        return !this.state.alertVisible ? null : (
            <Alert bsStyle={alertStyle} onDismiss={ this.dismissAlert }>
                { result.text }
                <OverlayTrigger placement="bottom" overlay={tooltip}>
                    <span className="details"> Details</span>
                </OverlayTrigger>
            </Alert>
        );
    }

    render() {
        return (
            <Grid fluid={true}>
                <Row>
                    <Col className="main-content" sm={8} smOffset={2} lg={6} lgOffset={3}>
                        { this.renderAlert() }
                        <h1>Send Test Email</h1>
                        <Form onSubmit={ this.sendEmail }/>
                        <div className="status"></div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default AppComponent;
