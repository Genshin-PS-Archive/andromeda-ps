import { ClientInfo } from '../enet'
import { Packet } from '../network/packet'

export interface PingReq {
  clientTime: number
}

export interface PingRsp {
  clientTime: number
  seq?: number
}

export async function handle(host: number, client: ClientInfo, packet: Packet<PingReq>) {
  const pingRsp = new Packet<PingRsp>({
    clientTime: packet.data.clientTime,
  }, 'PingRsp')

  pingRsp.send(host, client)
}