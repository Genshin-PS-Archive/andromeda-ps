import { ClientInfo } from 'enet.js'
import { player } from '../enet'
import { Packet } from '../network/packet'

export interface EnterSceneDoneReq { }

export interface EnterSceneDoneRsp {
  retcode?: number
}

export async function handle(host: number, client: ClientInfo, packet: Packet<EnterSceneDoneReq>) {
  const avatar = player.currentAvatar
  const entityId = 16777432 + avatar?.avatarInfo?.guid

  player.curEntityId = entityId

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
          ...avatar?.avatarInfo,
          peerId: 1,
          uid: player.uid,
          equipIdList: [],
          weapon: {
            ...avatar?.weaponInfo,
            entityId: 100663513,
            gadgetId: Number(`500${avatar?.weaponInfo.itemId}`),
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
    appearType: 12
  }, 'SceneEntityAppearNotify')

  const enterSceneDoneRsp = new Packet<EnterSceneDoneRsp>({ retcode: 0 }, 'EnterSceneDoneRsp')

  sceneEntityAppearNotify.send(host, client)
  enterSceneDoneRsp.send(host, client)
}