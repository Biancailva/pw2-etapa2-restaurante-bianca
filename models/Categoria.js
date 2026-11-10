// Dados mantidos em memória enquanto o servidor estiver ligado.
const categorias = []
let proximoId = 1

export default class Categoria {
    static listar() { return categorias }
    static buscar(id) { return categorias.find(c => c.id === id) }
    static criar(dados) {
        const categoria = { id: proximoId++, ...dados }
        categorias.push(categoria)
        return categoria
    }
    static atualizar(id, dados) {
        const categoria = this.buscar(id)
        if (!categoria) return null
        Object.assign(categoria, dados)
        return categoria
    }
    static excluir(id) {
        const indice = categorias.findIndex(c => c.id === id)
        if (indice === -1) return false
        categorias.splice(indice, 1)
        return true
    }
}
