import React, { useState, useEffect, useContext } from 'react';
import Layout from './template/Layout'
import Title from './template/Title';



export default function Users(usuario) {
  const [nome, setUsuario ] = useState();

  useEffect(() => {
    (async () => {
      setUsuario(usuario.location.state);
    })();
  }, []);

  return (
    <>
      <Layout /> 
      <Title>Seja Bem vindo <br/><h3>{nome}</h3></Title>
    </> 
  );
}
