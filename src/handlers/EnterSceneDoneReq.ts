import { ClientInfo } from 'enet.js'
import { player } from '../enet'
import { Packet } from '../network/packet'

export interface EnterSceneDoneReq { }

export interface EnterSceneDoneRsp {
  retcode?: number
}

let avatar = player.avatars[1]

export async function handle(host: number, client: ClientInfo, packet: Packet<EnterSceneDoneReq>) {
  const sceneEntityAppearNotify = new Packet({
    entityList: [
      {
        entityType: 1,
        entityId: 16777432,
        motionInfo: {
          pos: { x: 0, y: 400, z: 0 },
          rot: { y: 0, },
          speed: {}
        },
        fightPropList: {},
        propMap: {},
        lifeState: 1,
        avatar: {
          ...avatar.avatarInfo,
          peerId: 1,
          uid: player.uid,
          equipIdList: [],
          weapon: {
            ...avatar.weaponInfo,
            entityId: 100663513,
            gadgetId: Number(`500${avatar.weaponInfo.itemId}`),
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