import packetIds from '../packetIds.json'

import { protobufDecode } from '../tools/protobuf.decode';

type CmdId = keyof typeof packetIds

export async function decodePacket(data: Buffer) {
  const packetID = data.readUInt16BE(2) as unknown as CmdId;
  const name = packetIds[packetID]

  const sliced = Buffer.from(data.subarray(10)).subarray(0, -2);
  const packetData = sliced.subarray(data.readUInt8(5))

  const protoBuf = await protobufDecode(name, packetData)

  return {
    name, protoBuf
  }
}