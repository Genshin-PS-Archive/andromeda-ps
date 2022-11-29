import { enet_peer_send } from "enet.js";
import { ClientInfo } from "../../enet";
import { encodePacket } from "./packet.encode";

export class Packet<T> {

  constructor(public data: T, public name: string) {
  }

  async encode() {
    return await encodePacket(this.name, this.data)
  }

  async send(host: number, client: ClientInfo) {
    console.log(`Packet sent. [${this.name}]`)
    const encoded = await this.encode()

    enet_peer_send(host, client.host, client.port, encoded)
  }
}