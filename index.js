import express from 'express'
import categoria from './routes/categoria.js'
import prato from './routes/prato.js'

const app = express()
const PORTA = process.env.PORT || 3000
app.use(express.json())
app.get('/', (req, res) => res.status(200).json({ message: 'API Restaurante online!' }))
app.use('/categorias', categoria)
app.use('/pratos', prato)
app.use((req, res) => res.status(404).json({ message: 'Rota não encontrada!' }))
app.use((erro, req, res, next) => {
    if (erro.status === 400) return res.status(400).json({ message: 'JSON inválido no corpo da requisição!' })
    console.error(erro)
    return res.status(500).json({ message: 'Erro interno do servidor!' })
})
app.listen(PORTA, () => console.log('Servidor rodando na porta ' + PORTA + '...'))
