import React, { Component, PropTypes } from 'react';
import { Input, ButtonInput } from 'react-bootstrap';
import ReactQuill from 'react-quill';

import './quill.base.css';
import './quill.snow.css';

class Form extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.state = {
            to: localStorage['email'] || '',
            body: ''
        };
    }

    submit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state);
    }

    onEmailChange() {
        let value = this.refs.email.getValue();
        this.setState({to: value});
        localStorage['email'] = value;
    }

    onTextChange(value) {
        this.setState({body: value});
    }

    render() {
        let disabled = (!this.state.to || !this.state.body);
        return (
            <form onSubmit={ this.submit }>
                <Input ref="email" type="email" label="To:" placeholder="Your email"
                       value={ this.state.to }
                       onChange={ this.onEmailChange }/>
                <ReactQuill theme="snow"
                            className="editor form-control"
                            value={ this.state.body }
                            onChange={ this.onTextChange }/>
                <ButtonInput type="submit" value="Send"
                             disabled={ disabled }/>
            </form>
        );
    }
}

Form.PropTypes = {
    onSubmit: PropTypes.func
};

export default Form;
