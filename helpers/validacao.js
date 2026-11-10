// Valida o parâmetro :id da rota (usado com router.param)
export function validarId(req, res, next, valor) {
    const id = Number(valor)
    if (!Number.isInteger(id) || id <= 0)
        return res.status(400).json({ message: 'Id inválido!' })
    req.id = id
    next()
}

function textoValido(valor, minimo = 2) {
    return typeof valor === 'string' && valor.trim().length >= minimo
}

// Retorna uma lista de erros (lista vazia = dados válidos)
export function validarCategoria({ nome, descricao }) {
    const erros = []
    if (!textoValido(nome)) erros.push('nome é obrigatório (mínimo 2 caracteres)')
    if (descricao !== undefined && typeof descricao !== 'string')
        erros.push('descricao deve ser um texto')
    return erros
}

export function validarPrato({ nome, descricao, preco, categoria_id }) {
    const erros = []
    if (!textoValido(nome)) erros.push('nome é obrigatório (mínimo 2 caracteres)')
    if (descricao !== undefined && typeof descricao !== 'string')
        erros.push('descricao deve ser um texto')
    if (typeof preco !== 'number' || !Number.isFinite(preco) || !(preco > 0))
        erros.push('preco é obrigatório e deve ser um número maior que zero')
    if (!Number.isInteger(categoria_id) || categoria_id <= 0)
        erros.push('categoria_id é obrigatório e deve ser um número inteiro')
    return erros
}
