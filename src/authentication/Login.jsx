import * as React from 'react';
import {useEffect, useContext} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import mainLogo from "../assets/market.png"

import AuthContext from '../context/AuthContext';
import { useCookies } from 'react-cookie';

import * as auth from "../api/auth-api.js"

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="">
                SimTrade
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function Login({values}) {

    const { loginPage, setLoginPage } = values;

    const { authenticated, setAuthenticated, username, setUsername, password, setPassword, email, setEmail, error, setError } = useContext(AuthContext) 
    const [cookies, setCookie, removeCookie] = useCookies(['simTradeServer']);

    //When submitted handle login
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            username: data.get('username'),
            password: data.get('password'),
        });

        console.log({loginPage, setLoginPage}) 
        //call backend here 
        try{
            setError("")
            const result = await auth.login(data.get('username'), data.get('password'))
            console.log(result) 
            setAuthenticated(true) 
            setUsername(result["username"]) 
            setEmail(result["email"]) 
        } catch(error){
            setError(`Failed to Login. ${error}`)
        }
    };

    const handleLogin = () => {
        setLoginPage(0)
    }

    const handleSignup = () => {
        setLoginPage(1)
    }

    const handleForgotPassword = () => {
        setLoginPage(2)
    }

    useEffect(() => {
        setError("") 
    }, [])

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <img src={mainLogo} alt="simTrade"/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="user"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <span class="text-red-600 text-font-bold">{error}</span>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" onClick={() => handleForgotPassword()}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={() => handleSignup()}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
