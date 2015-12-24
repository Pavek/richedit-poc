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
            form: {
                to: localStorage['email'] || '',
                body: ''
            },
            loading: false
        };
    }

    submit(e) {
        e.preventDefault();

        this.setState({loading: true});

        this.props.onSubmit(this.state.form)
            .finally(() => {
                this.setState({loading: false});
            });
    }

    onEmailChange() {
        let value = this.refs.email.getValue();
        this.setState({
            form: {
                ...this.state.form,
                to: value
            }
        });
        localStorage['email'] = value;
    }

    onTextChange(value) {
        this.setState({
            form: {
                ...this.state.form,
                body: value
            }
        });
    }

    render() {
        let form = this.state.form;
        let disabled = !(form.to && form.body) || this.state.loading;
        let btnText = !this.state.loading ? 'Send' : 'Sending';

        return (
            <form onSubmit={ this.submit }>
                <Input ref="email" type="email" label="To:" placeholder="Your email"
                       value={ form.to }
                       onChange={ this.onEmailChange }/>
                <ReactQuill theme="snow"
                            className="editor form-control"
                            value={ form.body }
                            onChange={ this.onTextChange }/>
                <ButtonInput type="submit" value={btnText}
                             disabled={ disabled }/>
            </form>
        );
    }
}

Form.PropTypes = {
    onSubmit: PropTypes.func
};

export default Form;
