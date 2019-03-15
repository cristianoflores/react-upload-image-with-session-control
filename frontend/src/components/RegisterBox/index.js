import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, createStyles } from '@material-ui/core/styles';

import api from '../../services/api';

const styles = createStyles({
    main: {
        width: 400,
        display: 'block', // Fix IE 11 issue.
        margin: '0 auto'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 20,
    },
    submit: {
        marginTop: 20,
    },
    h1: {
        fontFamily: 'Arial',
        color: 'blue'
    }
});

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handlePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleSubmit = (ev) => {
        ev.preventDefault()

        const email = this.state.email
        const password = this.state.password

        const data = {
            email,
            password
        }

        api.post('/auth/register', data)
            .then(res => { console.log(res) })
            .catch(err => { console.log(err) })
    }

    render() {
        return (
            <main className={this.props.classes.main}>
                <CssBaseline />
                <h1 className={this.props.classes.h1}>Register</h1>
                <form className={this.props.classes.form} onSubmit={this.handleSubmit}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">E-mail</InputLabel>
                        <Input
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleEmail}
                            autoComplete="email"
                            autoFocus
                            />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Senha</InputLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePassword}
                            autoComplete="current-password"
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={this.props.classes.submit}
                    >
                        Criar conta
                            </Button>
                </form>
            </main>
        )
    }
}

export default withStyles(styles)(Register);