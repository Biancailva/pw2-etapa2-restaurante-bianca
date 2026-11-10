import Prato from '../models/Prato.js'
import Categoria from '../models/Categoria.js'
import { validarPrato } from '../helpers/validacao.js'

class PratoController {
    listar(req, res) {
        const { categoria_id, nome, precoMax } = req.query
        if (categoria_id !== undefined && (!/^\d+$/.test(String(categoria_id)) || Number(categoria_id) <= 0))
            return res.status(400).json({ message: 'categoria_id deve ser um inteiro positivo!' })
        if (precoMax !== undefined && (String(precoMax).trim() === '' || !Number.isFinite(Number(precoMax)) || Number(precoMax) < 0))
            return res.status(400).json({ message: 'precoMax deve ser um número não negativo!' })
        if (nome !== undefined && typeof nome !== 'string')
            return res.status(400).json({ message: 'nome deve ser um texto!' })
        let pratos = Prato.listar()
        if (categoria_id !== undefined) pratos = pratos.filter(p => p.categoria_id === Number(categoria_id))
        if (precoMax !== undefined) pratos = pratos.filter(p => p.preco <= Number(precoMax))
        if (nome) pratos = pratos.filter(p => p.nome.toLowerCase().includes(nome.toLowerCase()))
        return res.status(200).json(pratos)
    }
    buscar(req, res) {
        const prato = Prato.buscar(req.id)
        if (!prato) return res.status(404).json({ message: 'Prato não encontrado!' })
        return res.status(200).json(prato)
    }
    salvar(req, res) {
        const { nome, descricao, preco, categoria_id } = req.body ?? {}
        const erros = validarPrato({ nome, descricao, preco, categoria_id })
        if (erros.length) return res.status(400).json({ message: 'Dados inválidos!', erros })
        if (!Categoria.buscar(categoria_id)) return res.status(400).json({ message: 'A categoria informada não existe!' })
        const prato = Prato.criar({ nome: nome.trim(), descricao: descricao ?? '', preco, categoria_id })
        return res.status(201).json({ message: 'Prato cadastrado com sucesso!', prato })
    }
    editar(req, res) {
        if (!Prato.buscar(req.id)) return res.status(404).json({ message: 'Prato não encontrado!' })
        const { nome, descricao, preco, categoria_id } = req.body ?? {}
        const erros = validarPrato({ nome, descricao, preco, categoria_id })
        if (erros.length) return res.status(400).json({ message: 'Dados inválidos!', erros })
        if (!Categoria.buscar(categoria_id)) return res.status(400).json({ message: 'A categoria informada não existe!' })
        const prato = Prato.atualizar(req.id, { nome: nome.trim(), descricao: descricao ?? '', preco, categoria_id })
        return res.status(200).json({ message: 'Prato editado com sucesso!', prato })
    }
    excluir(req, res) {
        if (!Prato.buscar(req.id)) return res.status(404).json({ message: 'Prato não encontrado!' })
        Prato.excluir(req.id)
        return res.status(200).json({ message: 'Prato excluído com sucesso!' })
    }
}
export default new PratoController()
