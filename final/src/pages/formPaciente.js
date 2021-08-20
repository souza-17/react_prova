import React, { useState, useEffect, useContext } from 'react';
import history from '../history';
import api from '../api';
import { TextField, Button } from "@material-ui/core";
import { Context } from '../Context/AuthContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Layout from './template/Layout'
import { SettingsRemoteOutlined, Update } from '@material-ui/icons';

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

async function add(form) {

  const nome = form.nome
  const cpf = form.cpf

  try {
    const response = await api.post('/pacientes', { nome, cpf });
    console.log(response);

    alert("Cadastro realizado com sucesso!");
    history.push({
      pathname: '/pacientes'
    });
  } catch (err) {
    alert("Erro ao Salvar paciente");
  } 

}

async function update(form) {

  const id = form.id  
  const nome = form.nome
  const cpf = form.cpf

  try {
    const response = await api.put(`pacientes/${id}`, { nome, cpf });
    console.log(response);

    alert("Cadastro Alterado com sucesso!");
    history.push({
      pathname: '/pacientes'
    });
  } catch (err) {
    alert("Erro ao Salvar paciente");
  } 

}


export default function FormPaciente(dados) {
  const { handleLogout } = useContext(Context);
  const [paciente, setPaciente ] = useState();
  const [nome, setNome ] = useState(false);
  const [cpf, setCPF ] = useState(false);
  const [id, setID ] = useState(false);
  const classes = useStyles();

  useEffect(() => {
      if (typeof dados.location.state !== 'undefined'){
        console.log("editando esse paciente");
        setNome(dados.location.state.nome);
        setCPF(dados.location.state.cpf);
        setID(dados.location.state.id);
      }
  }, []);



  return (
    <>
      <Layout />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Cadastro Paciente!
          </Typography>
          <form 
            onSubmit={(event) => {
              event.preventDefault();
            }}
            className={classes.form} 
            noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              value={ nome ? nome : ''}
              fullWidth
              id="nome"
              label="Nome Paciente"
              name="nome"
              onChange={(event) => {
                setNome(event.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="CPF - Paciente"
              value={ cpf ? cpf : ''}
              name="cpf"
              type="Text"
              id="cpf"
              onChange={(event) => {
                setCPF(event.target.value);
              }}
            />
            {id
              ? 
                <Button
                  type="Submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(event) => {
                    update({id, nome, cpf});
                  }}
                >
                  Editar
                </Button>
              : 
                <Button
                  type="Submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(event) => {
                    add({nome, cpf});
                }}
              >
                Cadastrando
              </Button>
            }
              <Button
                type="Submit"
                variant="contained"
                className={classes.submit}
                onClick={(event) => {
                  history.push('/pacientes');
                }}
              >
                Voltar
              </Button>
          </form>
        </div>
      </Container>
    </>
  );
}
