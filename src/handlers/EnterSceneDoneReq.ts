import { ClientInfo } from 'enet.js'
import { player } from '../enet'
import { Packet } from '../network/packet'

export interface EnterSceneDoneReq { }

export interface EnterSceneDoneRsp {
  retcode?: number
}

export async function handle(host: number, client: ClientInfo, packet: Packet<EnterSceneDoneReq>) {
  const avatar = player.currentTeam.avatarEntities.find(avatar => avatar.sceneAvatarInfo.avatar.guid == player.currentTeam.currentAvatarGuid)!
  const entityId = avatar.entityId

  player.curEntityId = entityId

  const sceneEntityAppearNotify = new Packet({
    entityList: [avatar.sceneAvatarInfo],
    appearType: 12
  }, 'SceneEntityAppearNotify')

  const enterSceneDoneRsp = new Packet<EnterSceneDoneRsp>({ retcode: 0 }, 'EnterSceneDoneRsp')

  sceneEntityAppearNotify.send(host, client)
  enterSceneDoneRsp.send(host, client)
}