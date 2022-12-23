import { ClientInfo } from 'enet.js'
import { player } from '../enet'
import { Packet } from '../network/packet'

export interface ChangeAvatarReq {
  guid: number
  skillId: number
}

export interface ChangeAvatarRsp {
  retcode: number
  curGuid: number
  skillId: number
}

export async function handle(host: number, client: ClientInfo, packet: Packet<ChangeAvatarReq>) {
  const oldGuid = player.currentTeam.currentAvatarGuid
  const avatar = player.currentTeam.avatarEntities.find(avatar => avatar.sceneAvatarInfo.avatar.guid == packet.data.guid)!
  player.curEntityId = avatar.entityId
  player.currentTeam.currentAvatarGuid = packet.data.guid

  avatar.sceneAvatarInfo.motionInfo = player.motionInfo

  const sceneEntityDisappearNotify = new Packet({
    entityList: [oldGuid],
    disappearType: 3,
  }, 'SceneEntityDisappearNotify')

  const sceneEntityAppearNotify = new Packet({
    entityList: [avatar.sceneAvatarInfo],
    appearType: 1
  }, 'SceneEntityAppearNotify')

  const changeAvatarRsp = new Packet<ChangeAvatarRsp>({
    retcode: 0,
    curGuid: packet.data.guid,
    skillId: packet.data.skillId,
  }, 'ChangeAvatarRsp')


  sceneEntityDisappearNotify.send(host, client)
  sceneEntityAppearNotify.send(host, client)
  changeAvatarRsp.send(host, client)
}