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
  const oldAvatar = player.currentAvatar

  player.currentTeam.currentAvatarGuid = packet.data.guid

  const newAvatar = player.currentAvatar

  const sceneEntityDisappearNotify = new Packet({
    entityList: [oldAvatar?.avatarInfo?.guid],
    disappearType: 3,
  }, 'SceneEntityDisappearNotify')

  const entityId = 16777432 + newAvatar?.avatarInfo?.guid

  const sceneEntityAppearNotify = new Packet({
    entityList: [
      {
        entityType: 1,
        entityId,
        motionInfo: player.motionInfo,
        fightPropList: {},
        propMap: {},
        lifeState: 1,
        avatar: {
          ...newAvatar?.avatarInfo,
          peerId: 1,
          uid: player.uid,
          equipIdList: [],
          weapon: {
            ...newAvatar?.weaponInfo,
            entityId: 100663513,
            gadgetId: Number(`500${newAvatar?.weaponInfo.itemId}`),
            level: 90,
            promoteLevel: 6,
            abilityInfo: {},
            affixMap: {},
          },
          reliquaryList: [],
          inherentProudSkillList: [],
          skillLevelMap: {},
          proudSkillExtraLevelMap: {},
          teamResonanceList: [],
          bornTime: Date.now() / 1000,
        }
      }
    ],
    appearType: 1
  }, 'SceneEntityAppearNotify')

  const changeAvatarRsp = new Packet<ChangeAvatarRsp>({
    retcode: 0,
    curGuid: packet.data.guid,
    skillId: packet.data.skillId,
  }, 'ChangeAvatarRsp')

  player.curEntityId = entityId

  sceneEntityDisappearNotify.send(host, client)
  sceneEntityAppearNotify.send(host, client)
  changeAvatarRsp.send(host, client)
}