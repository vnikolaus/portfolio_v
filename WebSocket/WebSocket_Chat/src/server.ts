import { serverHttp } from './http'
import './application/WebSocket/websocket'

const port = process.env.PORT ?? 3015
serverHttp.listen(+port, () => {
    console.log(`Server online...\nhttp:localhost:${port}`)
})
