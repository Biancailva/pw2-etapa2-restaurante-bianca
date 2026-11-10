import express from 'express'
const router = express.Router()
import CategoriaController from '../controllers/CategoriaController.js'
import { validarId } from '../helpers/validacao.js'

router.param('id', validarId)

router.get('/', CategoriaController.listar)
router.get('/:id', CategoriaController.buscar)
router.get('/:id/pratos', CategoriaController.listarPratos)
router.post('/', CategoriaController.salvar)
router.put('/:id', CategoriaController.editar)
router.delete('/:id', CategoriaController.excluir)

export default router
