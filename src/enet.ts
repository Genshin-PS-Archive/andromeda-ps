import 'dotenv/config'

import { enet_host_create, enet_host_service } from 'enet.js'

import { decodePacket } from './network/packet/packet.decode'
import { xor } from './network/packet/packet.xor'
import { Player } from './game/player/'
import { Packet } from './network/packet'
import { key } from './handlers/GetPlayerTokenReq'

export const player = new Player(61, 'andromeda', 3)

export function startEnet() {
  const host = enet_host_create(process.env.GAME_SERVER_HOST!,
    Number(process.env.GAME_SERVER_PORT), 1)

  console.log(`Game server is running at port ${process.env.GAME_SERVER_PORT}`)

  setInterval(async () => {
    const enetPacket = enet_host_service(host)
    if (!enetPacket || !enetPacket.data) {
      return
    }

    const data: Buffer = xor(enetPacket.data, key)

    try {
      const { name, protoBuf } = await decodePacket(data)
      const packet = new Packet(protoBuf, name)

      console.log(`New packet received. [${name}]`)

      await require(`./handlers/${name}`).handle(host,
        { ip: enetPacket.ip, host: enetPacket.host, port: enetPacket.port }, packet)
    } catch (ignore) {}
  }, 100)
}