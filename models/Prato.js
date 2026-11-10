// Dados mantidos em memória enquanto o servidor estiver ligado.
const pratos = []
let proximoId = 1

export default class Prato {
    static listar() { return pratos }
    static buscar(id) { return pratos.find(p => p.id === id) }
    static listarPorCategoria(categoriaId) { return pratos.filter(p => p.categoria_id === categoriaId) }
    static criar(dados) {
        const prato = { id: proximoId++, ...dados }
        pratos.push(prato)
        return prato
    }
    static atualizar(id, dados) {
        const prato = this.buscar(id)
        if (!prato) return null
        Object.assign(prato, dados)
        return prato
    }
    static excluir(id) {
        const indice = pratos.findIndex(p => p.id === id)
        if (indice === -1) return false
        pratos.splice(indice, 1)
        return true
    }
}
