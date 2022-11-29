import packetIds from '../packetIds.json'
import protobufjs from 'protobufjs'
import { key } from '../../handlers/GetPlayerTokenReq';

type CmdId = keyof typeof packetIds

export const magics = [0x4567, 0x89ab]

export const findCmdIdByProtoName = (name: string) =>
  Object.keys(packetIds).find(key => packetIds[key as CmdId] === name) as unknown as number;

export async function encodePacket(name: string, obj: any) {
  const proto = await protobufjs.load(`src/proto/${name}.proto`)
  const data = Buffer.from(proto.lookupTypeOrEnum(name).encode(obj).finish())

  const cmdId = findCmdIdByProtoName(name)

  const resultLen = 12 + data.length
  const result = Buffer.allocUnsafe(resultLen)
  result.writeInt16BE(magics[0], 0)
  result.writeUInt16BE(cmdId!, 2)
  result.writeInt16BE(0, 4)
  result.writeInt32BE(data.length, 6)
  data.copy(result, 10, 0, data.length)
  result.writeUInt16BE(magics[1], resultLen - 2)

  if (key) {
    const mtKey = key

    for (let i = 0; i < resultLen; i++) {
      result.writeUInt8(result.readUInt8(i) ^ mtKey.readUInt8(i % mtKey.length), i)
    }
  }

  return result
}