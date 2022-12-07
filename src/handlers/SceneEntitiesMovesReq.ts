import { ClientInfo } from 'enet.js'
import { player } from '../enet'
import { Packet } from '../network/packet'

export interface EntityMoveInfo {
  entityId: number
  motionInfo: MotionInfo
}

export interface SceneEntitiesMovesReq {
  entityMoveInfoList: EntityMoveInfo[]
}

export interface MotionInfo {
  pos: { x: number, y: number, z: number }
  rot: { y: number }
  speed: {}
}

export interface SceneEntitiesMovesRsp { }

export async function handle(host: number, client: ClientInfo, packet: Packet<SceneEntitiesMovesReq>) {
  const { motionInfo, entityId } = packet.data.entityMoveInfoList[0]

  if (entityId == player.curEntityId) {
    player.motionInfo = motionInfo
  }

  const sceneEntitiesMovesRsp = new Packet<SceneEntitiesMovesRsp>({}, 'SceneEntitiesMovesRsp')

  sceneEntitiesMovesRsp.send(host, client)
}