import { key } from '../../handlers/GetPlayerTokenReq';

import packetIds from '../packetIds.json'
import protobufjs from 'protobufjs'
import { xor } from './packet.xor';

type CmdId = keyof typeof packetIds

export const findCmdIdByProtoName = (name: string) =>
  Object.keys(packetIds).find(key => packetIds[key as CmdId] === name) as unknown as number;

export async function encodePacket(name: string, obj: any) {
  const proto = await protobufjs.load(`src/network/proto/${name}.proto`)
  const data = Buffer.from(proto.lookupTypeOrEnum(name).encode(obj).finish())

  const packetID = findCmdIdByProtoName(name)

  const magic2 = Buffer.from('89AB', 'hex')
  const part1 = Buffer.alloc(10)

  part1.writeUInt16BE(0x4567, 0)
  part1.writeUInt16BE(packetID, 2)
  part1.writeUInt8(0, 5)
  part1.writeUInt16BE(data.length, 8)

  let ret = Buffer.concat(
    [part1, data, magic2],
    part1.length + data.length + magic2.length,
  );

  return xor(ret, key);
}