import { ClientSocket } from './socket'

const initialDelay = 1000
const delayBetweenPings = 10000
const keepRecentPingCount = 10

const avg = (values: number[]) => values.reduce((a, b) => a + b) / values.length

export default class Ping {
  #socket: ClientSocket

  #timeout: NodeJS.Timeout | undefined

  readonly #pings: number[]

  #average: number

  #delta: number

  #isDirty: boolean

  constructor(socket: ClientSocket) {
    this.#socket = socket
    this.#pings = []
    this.#average = NaN
    this.#delta = NaN
    this.#isDirty = false
  }

  #update() {
    const start = Date.now()

    this.#socket.emit('ping', () => {
      this.#pings.push(Date.now() - start)

      while (this.#pings.length > keepRecentPingCount) {
        this.#pings.shift()
      }

      this.#isDirty = true
    })

    this.#timeout = setTimeout(this.#update.bind(this), delayBetweenPings)
  }

  #updateCache() {
    this.#average = Math.round(avg(this.#pings))
    this.#delta = Math.round(
      avg(this.#pings.map((d) => Math.abs(d - this.#average))),
    )
    this.#isDirty = false
  }

  get average(): number {
    if (this.#isDirty) {
      this.#updateCache()
    }

    return this.#average
  }

  get delta(): number {
    if (this.#isDirty) {
      this.#updateCache()
    }

    return this.#delta
  }

  start() {
    this.stop()

    this.#timeout = setTimeout(this.#update.bind(this), initialDelay)
  }

  stop() {
    if (!this.#timeout) {
      return
    }

    clearTimeout(this.#timeout)
    this.#timeout = undefined
  }
}
