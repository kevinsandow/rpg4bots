import { ClientSocket } from './socket'

const avg = (values: number[]) => values.reduce((a, b) => a + b) / values.length

export default class Ping {
  #socket: ClientSocket

  #timeout: NodeJS.Timeout | undefined

  readonly #pings: number[]

  constructor(socket: ClientSocket) {
    this.#socket = socket
    this.#pings = []
  }

  #update() {
    const start = Date.now()

    this.#socket.emit('ping', () => {
      this.#pings.push(Date.now() - start)

      while (this.#pings.length > 10) {
        this.#pings.shift()
      }

      // TODO: make calculations on demand and extract/remove logging of ping
      const ping = Math.round(avg(this.#pings))
      const delta = Math.round(avg(this.#pings.map((d) => Math.abs(d - ping))))

      // eslint-disable-next-line no-console
      console.debug(
        `Ping: ${ping}ms ±${delta}ms (${JSON.stringify(this.#pings)})`,
      )
    })

    this.#timeout = setTimeout(this.#update.bind(this), 10000)
  }

  start() {
    this.stop()

    this.#timeout = setTimeout(this.#update.bind(this), 1000)
  }

  stop() {
    if (!this.#timeout) {
      return
    }

    clearTimeout(this.#timeout)
    this.#timeout = undefined
  }
}
