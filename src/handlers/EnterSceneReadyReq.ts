import enet from 'enet.js'

import { ClientInfo } from '../enet'
import { Packet } from '../network/packet'
import { encodePacket } from '../network/packet/packet.encode'

export interface EnterSceneReadyReq {
  enterSceneToken: number
}

export interface EnterSceneReadyRsp {
  retcode: number
}

export interface EnterScenePeerNotify {
  destSceneId: number,
  peerId: number,
  hostPeerId: number
}

export async function handle(host: number, client: ClientInfo, packet: Packet<EnterSceneReadyReq>) {
  const enterScenePeerNotify = new Packet<EnterScenePeerNotify>({
    destSceneId: 3,
    peerId: 1,
    hostPeerId: 1,
  }, 'EnterScenePeerNotify')
  const enterSceneReadyRsp = new Packet<EnterSceneReadyRsp>({
    retcode: 0,
  }, 'EnterSceneReadyRsp')

  enterScenePeerNotify.send(host, client)
  enterSceneReadyRsp.send(host, client)
}