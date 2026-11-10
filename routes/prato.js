import express from 'express'
const router = express.Router()
import PratoController from '../controllers/PratoController.js'
import { validarId } from '../helpers/validacao.js'

router.param('id', validarId)

router.get('/', PratoController.listar)
router.get('/:id', PratoController.buscar)
router.post('/', PratoController.salvar)
router.put('/:id', PratoController.editar)
router.delete('/:id', PratoController.excluir)

export default router
