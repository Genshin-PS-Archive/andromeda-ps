declare module "enet.js" {
  export interface EnetPacket {
    ip: string
    host: string
    port: number
    data?: Buffer
  }

  export function enet_host_create(host: string, port: number, peersCount: number): number

  export function enet_host_service(host: number): EnetPacket

  export function enet_peer_send(host: number, clientHost: string, clientPort: number, data: Buffer): void
}