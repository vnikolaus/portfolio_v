import app from './app'
import './infra/registry/index'

const PORT = process.env.PORT ?? 3000
app.listen(+PORT, async () => {
    console.log(`API running at http://localhost:${PORT}`)
})
