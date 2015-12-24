import React, { Component, PropTypes } from 'react';
import { Input, ButtonInput, FormControls } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import TinyMCE from 'react-tinymce'; // requires global tinymce var!

import './quill.base.css';
import './quill.snow.css';

class Form extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.libs = ['Quill', 'TinyMCE'];

        this.state = {
            form: {
                to: localStorage['email'] || '',
                body: ''
            },
            loading: false,
            selectedLib: this.libs[0]
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

    onTextChange(fn) {
        return (arg) => {
            this.setState({
                form: {
                    ...this.state.form,
                    body: fn(arg)
                }
            });
        };
    }

    onSwitchLib(name) {
        this.setState({
            selectedLib: name
        })
    }

    renderRichEdit() {
        if ('Quill' === this.state.selectedLib) {
            return (
                <ReactQuill theme="snow"
                            className="editor form-control"
                            value={ this.state.form.body }
                            onChange={ this.onTextChange(t => t) }/>
            );
        } else if ('TinyMCE' === this.state.selectedLib) {
            return (
                <TinyMCE
                    content={ this.state.form.body }
                    config={{
                      plugins: 'autolink link image lists print preview',
                      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
                    }}
                    onChange={ this.onTextChange((e) => e.target.getContent()) }
                />
            );
        }
    }

    render() {
        let form = this.state.form;
        let disabled = !(form.to && form.body) || this.state.loading;
        let btnText = !this.state.loading ? 'Send' : 'Sending';
        let panelList = this.libs.map((name) => {
            let selectedClass = (this.state.selectedLib === name) ? 'selected' : '';
            return (
                <span className={'li ' + selectedClass} onClick={ this.onSwitchLib.bind(this, name) }>{ name }</span>
            );
        });

        return (
            <form onSubmit={ this.submit }>
                <Input ref="email" type="email" label="To:" placeholder="Your email"
                       value={ form.to }
                       onChange={ this.onEmailChange }/>

                <div className="form-horizontal select-lib">
                    <FormControls.Static label="Select lib:" labelClassName="col-sm-3" wrapperClassName="col-sm-9">
                        { panelList }
                    </FormControls.Static>
                </div>

                { this.renderRichEdit() }

                <ButtonInput type="submit" value={btnText}
                             disabled={ disabled } />
            </form>
        );
    }
}

Form.PropTypes = {
    onSubmit: PropTypes.func
};

export default Form;
