import express from 'express';
import statusRoute from './routes/statusRoute';
import usersRoute from './routes/usersRoute';
import errorHandler from './middlewares/error_handler_middleware';
import authorizationRoute from './routes/authorization_route';
import jwtAuthenticationMiddleware from './middlewares/jwt_authentication_middleware';

const app = express()

// Configurações da aplicação
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Configurações de Rotas
app.use(statusRoute)
app.use(authorizationRoute)

app.use(jwtAuthenticationMiddleware)
app.use(usersRoute)

// Configuração dos Handlers de Erro
app.use(errorHandler)

// Inicialização do servidor
app.listen(3000, () => {
    console.log('Aplicação executando na porta 3000!')
})