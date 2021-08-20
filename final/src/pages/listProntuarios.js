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
    try {
        history.push({
          pathname: '/adicionarProntuario'
        });
      } catch (err) {
        alert("Erro ao editar");
      } 
}
  
async function update(prontuario_id) {
    try {
      const { data } = await api.get(`/prontuarios/${prontuario_id}`);
      
      history.push({
        pathname: '/adicionarProntuario',
        state: data
      });
    } catch (err) {
      alert("Erro ao editar");
    } 
}
  
async function remove(prontuario_id) {
    try {
        const response = await api.delete(`prontuarios/${prontuario_id}`);
        alert("Prontuario Deletado com sucesso!");
        
        history.go({
            pathname: '/prontuarios'
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


export default function ListProntuarios (){
    const classes = useStyles();
    const [prontuarios, setProntuarios] = useState([]);
    const us_id = "";


    useEffect(() => {
        (async () => {
            const us_id = localStorage.getItem('id');
 
            const { data } = await api.get(`/prontuario_list/${us_id}`);
            setProntuarios(data);
            
        })();
    }, []);


    return(
        <>
        <div>
            <Layout />
            <React.Fragment>
                <Title>Lista de Prontuarios</Title>
                <Table size="small">
                    <TableHead>
                    <TableRow>
                        <TableCell>Titulo</TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell>Paciente</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {prontuarios.map((prontuario) => (
                        <TableRow key={prontuario.id}>
                            <TableCell>{prontuario.titulo}</TableCell>
                            <TableCell>{prontuario.descricao}</TableCell>
                            <TableCell>{prontuario.paciente}</TableCell>
                            <TableCell>
                                <a
                                    href=""
                                    onClick={(event) => {
                                        event.preventDefault();
                                        update(prontuario.id);
                                    }}
                                >
                                <EditIcon />      
                                </a>
                                <a
                                    href=""
                                    onClick={(event) => {
                                        event.preventDefault();
                                        remove(prontuario.id);
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
                        Cadastrar Prontuario
                    </Button>
                </div>
            </React.Fragment>
        </div>
        </>
    )
};


