import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import { Context } from '../Context/AuthContext';
import history from '../history';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Title from './template/Title';
import Layout from './template/Layout'

async function add() {
    history.push({
      pathname: '/adicionarPaciente'
    });
}
  
async function update(paciente_id) {
    try {
      const { data } = await api.get(`pacientes/${paciente_id}`);
      
      history.push({
        pathname: '/adicionarPaciente',
        state: data
      });
    } catch (err) {
      alert("Erro ao editar");
    } 
}
  
async function remove(paciente_id) {
    try {
        const { data } = await api.delete(`pacientes/${paciente_id}`);
        alert("Paciente Deletado com sucesso!");
        
        history.go({
            pathname: '/pacientes'
        });

      } catch (err) {
        alert("Erro ao deletar");
      } 
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));


export default function ListPaciente (){
    
    const classes = useStyles();
    const { handleLogout } = useContext(Context);
    const [usuario_id, setUsuario ] = useState();
    const [pacientes, setPacientes] = useState([]);
    const id = "";

    useEffect(() => {
        (async () => {

          const { data } = await api.get('/pacientes');
    
          setPacientes(data);
        })();
    }, []);


    return(
        <>
        <div>
            <Layout />
            <React.Fragment>
                <Title>Lista de Pacientes</Title>
                <Table size="small">
                    <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>CPF</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {pacientes.map((paciente) => (
                        <TableRow key={paciente.id}>
                            <TableCell>{paciente.nome}</TableCell>
                            <TableCell>{paciente.cpf}</TableCell>
                            <TableCell>
                                <a
                                    href=""
                                    onClick={(event) => {
                                        event.preventDefault();
                                        update(paciente.id);
                                    }}
                                >
                                <EditIcon />      
                                </a>
                                <a
                                    href=""
                                    onClick={(event) => {
                                        event.preventDefault();
                                        remove(paciente.id);
                                    }}
                                >
                                <DeleteIcon />      
                                </a>       
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                <div className={classes.seeMore}>
                    <Button
                        type="Submit"
                        color="primary"
                        variant="contained"
                        className={classes.submit}
                        onClick={(event) => {
                            add();
                        }}
                        >
                        Cadastrar Paciente
                    </Button>
                </div>
            </React.Fragment>
        </div>
        </>
    )
};

