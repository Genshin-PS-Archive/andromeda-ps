import 'dotenv/config'

import { EnetPacket, enet_host_create, enet_host_service } from 'enet.js'

import { decodePacket } from './network/packet/packet.decode'
import { xor } from './network/packet/packet.xor'
import { Player } from './game/player/'
import { Packet } from './network/packet'
import { key } from './handlers/GetPlayerTokenReq'
import { Team } from './game/team'

export const player = new Player({
  uid: 61,
  nickname: 'andromeda',
  sceneId: 3,
  motionInfo: { pos: { x: 0, y: 300, z: 0, }, rot: { y: 0 }, speed: {} }
})

export function startEnet() {
  const host = enet_host_create(process.env.GAME_SERVER_HOST!,
    Number(process.env.GAME_SERVER_PORT), 1)

  console.log(`Game server is running at port ${process.env.GAME_SERVER_PORT}`)

  setInterval(async () => handlePackets(host), 50)
}

const isValidPacket = (raw: Buffer) => raw.length > 5 && raw.readInt16BE(0) == 0x4567 &&
  raw.readUInt16BE(raw.byteLength - 2) == 0x89ab

export async function handlePackets(host: number) {
  const enetPacket = enet_host_service(host)
  if (!enetPacket || !enetPacket.data) {
    return
  }

  const clientInfo = { ip: enetPacket.ip, host: enetPacket.host, port: enetPacket.port }
  const data = xor(enetPacket.data, key)

  if (!isValidPacket(data)) {
    return
  }

  try {
    const { name, protoBuf } = await decodePacket(data)
    const packet = new Packet(protoBuf, name)

    console.log(`New packet received. [${name}]`)

    await require(`./handlers/${name}`).handle(host, clientInfo, packet)
  } catch (ignore) { }
}