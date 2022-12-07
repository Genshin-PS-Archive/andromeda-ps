import { ClientInfo } from 'enet.js'
import { player } from '../enet'
import { Packet } from '../network/packet'
import { PlayerEnterSceneNotify } from './PlayerLoginReq'

export interface SceneTransToPointReq {
  sceneId: number
  pointId: number
}

export interface SceneTransToPointRsp extends SceneTransToPointReq { }

export async function handle(host: number, client: ClientInfo, packet: Packet<SceneTransToPointReq>) {
  player.sceneId = packet.data.sceneId

  const scenePointInfo = await import(`../../resources/binoutput/Scene/Point/scene${packet.data.sceneId}_point.json`)
  const point = scenePointInfo.points[packet.data.pointId]

  const motionInfo = {
    pos: point.tranPos,
    rot: point.tranRot,
    speed: {},
  }

  const playerEnterSceneNotify = new Packet<PlayerEnterSceneNotify>({
    sceneId: player.sceneId,
    pos: motionInfo.pos,
    sceneBeginTime: Date.now(),
    type: 2,
    targetUid: player.uid,
    worldLevel: 8,
    enterSceneToken: 1000,
  }, 'PlayerEnterSceneNotify')

  player.motionInfo = motionInfo

  const sceneTransToPointRsp = new Packet<SceneTransToPointRsp>(packet.data, 'SceneTransToPointRsp')

  playerEnterSceneNotify.send(host, client)
  sceneTransToPointRsp.send(host, client)
}