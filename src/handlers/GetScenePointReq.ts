import { ClientInfo } from 'enet.js'
import { Packet } from '../network/packet'

export interface GetScenePointReq {
  sceneId: number
}

export interface GetScenePointRsp {
  sceneId: number
  unlockedPointList: number[]
  unlockedAreaList: number[]
}

export async function handle(host: number, client: ClientInfo, packet: Packet<GetScenePointReq>) {
  const getScenePointRsp = new Packet<GetScenePointRsp>({
    sceneId: packet.data.sceneId,
    unlockedPointList: new Array(200).fill(0).map((_, index) => index),
    unlockedAreaList: new Array(200).fill(0).map((_, index) => index)
  }, 'GetScenePointRsp')

  getScenePointRsp.send(host, client)
}