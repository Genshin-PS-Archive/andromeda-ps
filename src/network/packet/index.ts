import { ClientInfo, enet_peer_send } from "enet.js";

import { encodePacket } from "./packet.encode";

export class Packet<T> {

  constructor(public data: T, public name: string) { }

  async encode() {
    return await encodePacket(this.name, this.data)
  }

  async send(host: number, client: ClientInfo) {
    console.log(`Packet sent. [${this.name}]`)
    enet_peer_send(host, client.host, client.port, await this.encode())
  }
}