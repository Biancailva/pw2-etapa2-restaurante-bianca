import Categoria from '../models/Categoria.js'
import Prato from '../models/Prato.js'
import { validarCategoria } from '../helpers/validacao.js'

class CategoriaController {
    listar(req, res) {
        return res.status(200).json(Categoria.listar())
    }
    buscar(req, res) {
        const categoria = Categoria.buscar(req.id)
        if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada!' })
        return res.status(200).json(categoria)
    }
    listarPratos(req, res) {
        if (!Categoria.buscar(req.id)) return res.status(404).json({ message: 'Categoria não encontrada!' })
        return res.status(200).json(Prato.listarPorCategoria(req.id))
    }
    salvar(req, res) {
        const { nome, descricao } = req.body ?? {}
        const erros = validarCategoria({ nome, descricao })
        if (erros.length) return res.status(400).json({ message: 'Dados inválidos!', erros })
        const categoria = Categoria.criar({ nome: nome.trim(), descricao: descricao ?? '' })
        return res.status(201).json({ message: 'Categoria cadastrada com sucesso!', categoria })
    }
    editar(req, res) {
        if (!Categoria.buscar(req.id)) return res.status(404).json({ message: 'Categoria não encontrada!' })
        const { nome, descricao } = req.body ?? {}
        const erros = validarCategoria({ nome, descricao })
        if (erros.length) return res.status(400).json({ message: 'Dados inválidos!', erros })
        const categoria = Categoria.atualizar(req.id, { nome: nome.trim(), descricao: descricao ?? '' })
        return res.status(200).json({ message: 'Categoria editada com sucesso!', categoria })
    }
    excluir(req, res) {
        if (!Categoria.buscar(req.id)) return res.status(404).json({ message: 'Categoria não encontrada!' })
        if (Prato.listarPorCategoria(req.id).length)
            return res.status(400).json({ message: 'Não é possível excluir: a categoria possui pratos!' })
        Categoria.excluir(req.id)
        return res.status(200).json({ message: 'Categoria excluída com sucesso!' })
    }
}
export default new CategoriaController()
