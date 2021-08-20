import React, { useContext, useState } from 'react';
import { TextField, Button } from "@material-ui/core";
import { Context } from '../Context/AuthContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Minha Prova
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function Login() {
  const { handleLogin } = useContext(Context); 
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form 
            onSubmit={(event) => {
              event.preventDefault();
              handleLogin({login, password});
            }}
            className={classes.form} 
            noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="login"
              label="Login"
              name="login"
              onChange={(event) => {
                setLogin(event.target.value);
              }}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />

            <Button
              type="Submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Entrar
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
}
  
