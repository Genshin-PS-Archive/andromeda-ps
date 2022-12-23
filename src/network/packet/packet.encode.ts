import { key } from '../../handlers/GetPlayerTokenReq';
import { xor } from './packet.xor';
import { protobufEncode } from '../tools/protobuf.encode';

import packetIds from '../packetIds.json'

type CmdId = keyof typeof packetIds

export const findCmdIdByProtoName = (name: string) =>
  Object.keys(packetIds).find(key => packetIds[key as CmdId] === name) as unknown as number;

export async function encodePacket(name: string, obj: any) {
  const data = await protobufEncode(name, obj)
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