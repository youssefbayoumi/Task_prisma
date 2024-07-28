// routes.ts
import { FastifyInstance } from 'fastify';
import userController from '../Controller/userController'
import auth from '../MiddleWare/auth'
import Val from '../MiddleWare/validationn';

async function userRoutes(server: FastifyInstance, options: any) {
        // server.post("/signup",{schema:Schemas.signUpSchema},userController.signUp);
        server.post("/signup",{preValidation:Val.signUpVal},userController.signUp);
        server.get("/",{preHandler:auth},userController.getUsers);
        server.get("/email/:email",{preValidation:Val.byEmail,preHandler:auth},userController.getUserByEmail);
        server.get("/byphone/:phone",{preValidation:Val.byPhone,preHandler:auth},userController.getUserByPhone);
        server.delete("/email/:email",{preValidation:Val.byEmail,preHandler:auth},userController.deleteUserByEmail);
        server.patch("/email/:email/:age",{preValidation:Val.byEmailAge,preHandler:auth},userController.updateAgeByEmail)
        server.post("/signin",{preValidation:Val.signInVal},userController.signIn)
        server.get("/id/:id",{preValidation:Val.byId,preHandler:auth},userController.getUserById)
        server.delete("/",{preHandler:auth},userController.deleteAllUsers)
}

export default userRoutes;
