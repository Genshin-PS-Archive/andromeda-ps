import { MT19937_64 } from '../network/mt'
import { Packet } from '../network/packet'
import { ClientInfo } from '../enet'

export let key: Buffer | undefined = undefined

export interface GetPlayerTokenReq {
  accountType: string
  accountToken: string
}

export interface GetPlayerTokenRsp {
  uid: number;
  accountType: string;
  accountUid: string;
  token: string;
  gmUid: number;
  secretKeySeed: number;
}

export async function handle(host: number, client: ClientInfo, packet: Packet<GetPlayerTokenReq>) {
  const getPlayerTokenReq = packet.data

  const getPlayerTokenRsp = new Packet<GetPlayerTokenRsp>({
    uid: 61,
    accountType: getPlayerTokenReq.accountType,
    accountUid: '61',
    token: getPlayerTokenReq.accountToken,
    gmUid: 61,
    secretKeySeed: 2,
  }, 'GetPlayerTokenRsp')

  await getPlayerTokenRsp.send(host, client)

  const generator = new MT19937_64();
  generator.seed(BigInt(2));
  const mtKey = Buffer.alloc(512);
  for (let i = 0; i < 512; i += 8) {
    const val = generator.int64();
    mtKey.writeBigUInt64BE(val, i);
  }

  key = mtKey
}