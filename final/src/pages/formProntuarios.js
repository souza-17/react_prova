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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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

  const titulo = form.titulo
  const descricao = form.descricao
  const user_id = form.user_id
  const paciente_id = form.paciente_id

  try {
    const response = await api.post('/prontuarios', { titulo, descricao, user_id, paciente_id });
    console.log(response);

    alert("Cadastro realizado com sucesso!");
    history.push({
      pathname: '/prontuarios'
    });
  } catch (err) {
    alert("Erro ao Salvar Prontuario");
  } 

}

async function update(form) {

  const titulo = form.titulo
  const descricao = form.descricao
  const user_id = form.user_id
  const paciente_id = form.paciente_id
  const id = form.id

  try {
    const response = await api.put(`prontuarios/${id}`, { titulo, descricao, user_id, paciente_id });
    console.log(response);

    alert("Cadastro Alterado com sucesso!");
    history.push({
      pathname: '/prontuarios'
    });
  } catch (err) {
    alert("Erro ao Salvar paciente");
  } 

}



export default function FormProntuarios(dados) {
  const { handleLogout } = useContext(Context);
  const [titulo, setTitulo ] = useState(false);
  const [descricao, setDescricao ] = useState(false);
  const [Pacientes, setPacientes] = useState([]);
  const [user_id, setUser ] = useState();
  const [paciente_id, setPaciente ] = useState();
  const [id, setID ] = useState();
  const classes = useStyles();
  const us_id = "";

  useEffect(() => {

    (async () => {
      const { data } = await api.get('/pacientes');
      const us_id = localStorage.getItem('id');
      setUser(us_id);
      setPacientes(data);

      if (typeof dados.location.state !== 'undefined'){
        setDescricao(dados.location.state.descricao);
        setTitulo(dados.location.state.titulo);
        setID(dados.location.state.id);
        setPaciente(dados.location.state.paciente_id);
        setUser(dados.location.state.usuario_id);
  
        console.log({titulo, descricao, user_id, paciente_id, id});
      }

    })();

  }, []);



  return (
    <>
      <Layout />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Cadastro de Prontuario!
          </Typography>
          <form 
            onSubmit={(event) => {
              event.preventDefault();
            }}
            className={classes.form} 
            noValidate
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={paciente_id ? paciente_id : ''}
              onChange = {
                (event) => {
                  setPaciente(event.target.value);
                }
              }
            >
               { Pacientes.map((paci) => (
                  <MenuItem
                  value={paci.id}
                  >{paci.nome}
                  </MenuItem>
               ))}
            </Select>
            <TextField
              variant="outlined"
              margin="normal"
              value={ titulo ? titulo : ''}
              fullWidth
              id="titulo"
              label="titulo"
              name="titulo"
              onChange={(event) => {
                setTitulo(event.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="descricao"
              value={ descricao ? descricao : ''}
              name="cpf"
              type="Text"
              id="cpf"
              onChange={(event) => {
                setDescricao(event.target.value);
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
                    update({titulo, descricao, id, user_id, paciente_id})
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
                    add({titulo, descricao, user_id, paciente_id})
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
                history.push('/Prontuarios');
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
