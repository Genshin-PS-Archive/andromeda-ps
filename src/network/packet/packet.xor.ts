export function xor(data: Buffer, key: Buffer | undefined) {
  // get player token req
  if (key == undefined) return data

  for (let i = 0; i < data.length; i++) {
    data.writeUInt8(data.readUInt8(i) ^ key.readUInt8(i % key.length), i);
  }
  return data;
}