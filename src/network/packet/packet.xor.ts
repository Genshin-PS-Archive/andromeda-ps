export function xor(data: Buffer, key: Buffer | undefined) {
  // get player token req
  if (!key) return data

  const ret: Buffer = Buffer.from(data);
  for (let i = 0; i < data.length; i++) {
    ret.writeUInt8(data.readUInt8(i) ^ key.readUInt8(i % key.length), i);
  }
  return ret;
}