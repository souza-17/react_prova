import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Context } from './Context/AuthContext';
import Login from './pages/Login';
import Users from './pages/Users';
import FormPaciente from './pages/formPaciente';
import FormProntuarios from './pages/formProntuarios';
import ListPaciente from './pages/listPaciente';
import ListProntuarios from './pages/listProntuarios';

function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute isPrivate exact path="/" component={Login} />
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute isPrivate exact path="/users" component={Users} />
      <CustomRoute isPrivate exact path="/pacientes" component={ListPaciente} />
      <CustomRoute isPrivate exact path="/prontuarios" component={ListProntuarios} />
      <CustomRoute exact path="/editarPaciente" component={FormPaciente} />
      <CustomRoute exact path="/editarProntuario" component={FormProntuarios} />
      <CustomRoute isPrivate exact path="/adicionarProntuario" component={FormProntuarios} />
      <CustomRoute exact path="/adicionarPaciente" component={FormPaciente} />
    </Switch>
  );
}