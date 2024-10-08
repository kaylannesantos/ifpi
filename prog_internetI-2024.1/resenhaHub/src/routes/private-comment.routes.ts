import { Router } from "express";
import { Request, Response } from "express";
import { criarComentario, atualizarComentario, deletarComentario } from "../controllers/comment.controller";
import { userAuth } from "../middlewere/user-auth.middlewere";// middleware de autenticação
import { getIdUser } from "../controllers/user.controller";

const router = Router();

// Criar um novo comentário
router.post('/criar', userAuth, async (req: Request, res: Response) => {
    try {
        const userId = req.session?.user ? await getIdUser(req.session.user) : null;
        if (!userId) {
            return res.status(401).send({ message: "Usuário não autenticado." });
        }

        const { texto, usuarioId, resenhaId, respostaAId } = req.body;
        const novoComentario = await criarComentario(texto, usuarioId, resenhaId, respostaAId);
        res.status(201).json(novoComentario);
    } catch (error) {
        res.status(500).send({ message: "Erro ao criar comentário." });
    }
});

//atualizar um comentário
router.put('/atualizar/:id', userAuth, async (req: Request, res: Response) => {
    const { id } = req.params;//obtém o id da URL
    const { texto } = req.body;//obtém o novo comentario

    try {
        const userId = req.session?.user ? await getIdUser(req.session.user) : null;
        if (!userId) {
            return res.status(401).send({ message: "Usuário não autenticado." });
        }

        if (!texto) {
            return res.status(400).send({ message: 'Texto do comentário não pode ser vazio.' });
        }

        const comentarioAtualizado = await atualizarComentario(Number(id), texto);
        if (!comentarioAtualizado) {
            return res.status(404).send({ message: 'Comentário não encontrado.' });
        }

        res.status(200).json(comentarioAtualizado);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao atualizar comentário.' })
    }
});

//deletar comentário
router.delete('/deletar/:id', userAuth, async (req: Request, res: Response) => {
    try {
        const userId = req.session?.user ? await getIdUser(req.session.user) : null;
        if (!userId) {
            return res.status(401).send({ message: "Usuário não autenticado." });
        }
        
        const id = parseInt(req.params.id.trim());
        const comentario = await deletarComentario(id);

        res.status(200).send(comentario);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: `Um erro ocorreu ao buscar o comentário.` });
    }
});

export default router;