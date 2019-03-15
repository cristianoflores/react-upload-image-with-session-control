import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { withStyles, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import api from '../../services/api';
import { login } from '../../services/auth';
import { isAuthenticated } from "../../services/auth";

const styles = createStyles({
    main: {
        width: 400,
        display: 'block', // Fix IE 11 issue.
        margin: '0 auto'
    },
    paper: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 25,
    },
    avatar: {
        margin: '20px 20px'
    },
    typography: {
        marginTop: 20,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 20,
    },
    submit: {
        marginTop: 20,
    },
});

class LoginBox extends Component {
    state = {
        email: '',
        password: '',
    };

    handleEmail = (event) => {
        this.setState({ email: event.target.value });
    };

    handlePassword = (event) => {
        this.setState({ password: event.target.value });
    };

    handleSubmit = async (ev) => {
        console.log(this.props)
        ev.preventDefault()

        const email = this.state.email
        const password = this.state.password

        const data = {
            email,
            password
        }
        
        await api.post('/auth/authenticate', data)
            .then(res => {
                console.log(res);
                console.log(res.data.token)
                login(res.data.token)
                this.props.history.push("/posts/upload");
            })
            .catch(err => { console.log(err) })
    }

    render() {
        if (isAuthenticated()) {
            return <Redirect to='/posts/upload' />
        }
        return (
            <main className={this.props.classes.main}>
                <CssBaseline />
                <Paper className={this.props.classes.paper}>
                    <Avatar className={this.props.classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography className={this.props.classes.typography} component="h1" variant="h4" align='center'>
                        Observatório da Educação Básica
                    </Typography>
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
                                type="password"
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handlePassword}
                                autoComplete="current-password"
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Lembre-me"
                        />
                        <Link to="/auth/register">Criar uma conta</Link>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={this.props.classes.submit}
                        >
                            Entrar
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

export default withStyles(styles)(LoginBox);