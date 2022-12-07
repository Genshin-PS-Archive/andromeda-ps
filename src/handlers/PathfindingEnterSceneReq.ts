import { ClientInfo } from 'enet.js'
import { Packet } from '../network/packet'

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