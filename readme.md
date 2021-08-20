## APLICAÇÃO DESENVOLVIDA EM CLIENT : REACT.JS - SERVIDOR : NODEJS 

REGRA DE NEGOCIO

- cadastro de usuario (MEDICO)
	- ID
	- nome
	- email
	- senha

- modulo de paciente (CRUD) - ACESSO GERAL A TODOS OS USUARIOS
	- id
	- nome
	- cpf

- modulo de Prontuario (CRUD) - SÓ TEM ACESSO A DADOS REALIZADOS PELO O USUARIO
	- vinculo com medico
	- vinculo com um paciente
	- titulo
	- descricao

- Estrutura SERVIDOR
    - app/
    - app/API - controllers da aplicação
    - app/infra - Dão do sistema onde mandei toda regra de comunicação com banco
    - app/routes - rotas do sistema
    - config/database - banco


- Estrutura client
    - final/ - estrutura do projeto
    - src/pages  - componentes do projeto
    - app/infra - Dão do sistema onde mandei toda regra de comunicação com banco
    - src/routes - rotas do sistema
    - config/database - banco	
 


## INSTALAÇÃO E EXECUÇÃO DO SOFTWARE
- REQUISITO DO SISTEMA
- TER NODEJS INSTALADO COM NPM
- NAVEGAR ATE A RAIZ COM TERMINAL DOS DIRETORIOS DE CADA PROJETO 
	- final - executar npm start
	- prova_api - executar npm start

- USUARIOS PARA ACESSO DO SISTEMA  
	- login - senha
	- Kynn - 12345
	- Medico - 123456

  






























