import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden_error_model";
import JWT from "jsonwebtoken";
import UserRepository from "../repositories/user_repository";

async function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) : Promise<void>{
    try {
        const authorizationHeader = req.headers['authorization']

        if(!authorizationHeader){
            throw new ForbiddenError('Credenciais não informadas')
        }

        const [authenticationType, token] = authorizationHeader.split(' ')
        
        if(authenticationType !== 'Bearer' || !token){
            throw new ForbiddenError('Tipo de autenticação inválido')
        }

        try {
            const tokenPayload = JWT.verify(token, 'my_secret_key')

            if(typeof tokenPayload === 'object' || !tokenPayload.sub){
                throw new ForbiddenError('Token inválido')
            }
    
            const user = await UserRepository.findByUuid(tokenPayload.sub.toString())
            req.user = user
            next()
        } catch (error) {
            throw new ForbiddenError('Token inválido')
        }
    } catch (error) {
        next(error)
    }
}

export default jwtAuthenticationMiddleware