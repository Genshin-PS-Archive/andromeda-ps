import enet from 'enet.js'
import { ClientInfo } from '../enet'
import { Packet } from '../network/packet'
import { encodePacket } from '../network/packet/packet.encode'

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