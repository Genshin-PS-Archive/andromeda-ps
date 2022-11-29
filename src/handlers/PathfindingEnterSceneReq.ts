import enet from 'enet.js'
import { ClientInfo } from '../enet'
import { Packet } from '../network/packet'
import { encodePacket } from '../network/packet/packet.encode'

export interface PathfindingEnterSceneReq { }

export interface PathfindingEnterSceneRsp {
  retcode: number
}

export async function handle(host: number, client: ClientInfo, packet: Packet<PathfindingEnterSceneReq>) {
  const pathfindingEnterSceneRsp = new Packet<PathfindingEnterSceneRsp>({
    retcode: 0,
  }, 'PathfindingEnterSceneRsp')

  pathfindingEnterSceneRsp.send(host, client)
}