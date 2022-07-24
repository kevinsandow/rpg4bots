import { Server } from 'socket.io'

const port = +process.env.PORT || 3000

const server = new Server()
server.listen(port)
