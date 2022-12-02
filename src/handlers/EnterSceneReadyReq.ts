import { ClientInfo } from 'enet.js'
import { Packet } from '../network/packet'
import { player } from '../enet'

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
    destSceneId: player.sceneId,
    peerId: 1,
    hostPeerId: 1,
  }, 'EnterScenePeerNotify')

  const enterSceneReadyRsp = new Packet<EnterSceneReadyRsp>({
    retcode: 0,
  }, 'EnterSceneReadyRsp')

  enterScenePeerNotify.send(host, client)
  enterSceneReadyRsp.send(host, client)
}