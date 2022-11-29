import { ClientInfo } from '../enet'
import { Packet } from '../network/packet'

export interface GetSceneAreaReq {
  sceneId: number
}

export interface GetSceneAreaRsp {
  sceneId: number
  areaIdList: number[]
}

export async function handle(host: number, client: ClientInfo, packet: Packet<GetSceneAreaReq>) {
  const getSceneAreaRsp = new Packet({
    sceneId: packet.data.sceneId,
    areaIdList: new Array(200).fill(0).map((_, index) => index),
  }, 'GetSceneAreaRsp')

  getSceneAreaRsp.send(host, client)
}