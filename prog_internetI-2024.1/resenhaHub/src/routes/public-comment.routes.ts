import { Router } from "express";
import { Request, Response } from "express";
import { listarComentarios, criarComentario, atualizarComentario, deletarComentario } from "../controllers/comment.controller";
import { userAuth } from "../middlewere/user-auth.middlewere";// middleware de autenticação

const router = Router();

//listar os comentários de uma resenha
router.get('/resenhas/:resenhaId/listar', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.resenhaId.trim());
        const comentarios = await listarComentarios(id);

        res.status(200).send(comentarios);
    } catch (error) {
        res.status(500).send({ message: "Erro ao buscar comentários." });
    }
});


export default router;