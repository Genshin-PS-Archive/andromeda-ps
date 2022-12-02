import { ClientInfo } from 'enet.js'
import { Packet } from '../network/packet'

export interface PostEnterSceneReq { }

export interface PostEnterSceneRsp {
  retcode: number
}

export async function handle(host: number, client: ClientInfo, packet: Packet<PostEnterSceneReq>) {
  const postEnterSceneRsp = new Packet<PostEnterSceneRsp>({
    retcode: 0,
  }, 'PostEnterSceneRsp')

  postEnterSceneRsp.send(host, client)
}