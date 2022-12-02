import { ClientInfo } from 'enet.js'
import { player } from '../enet'
import { Packet } from '../network/packet'

export interface EnterSceneDoneReq { }

export interface EnterSceneDoneRsp {
  retcode?: number
}

export async function handle(host: number, client: ClientInfo, packet: Packet<EnterSceneDoneReq>) {
  const sceneEntityAppearNotify = new Packet({
    entityList: [
      {
        entityType: 1,
        entityId: 16777432,
        motionInfo: {
          pos: { X: 0, Y: 400, Z: 0 },
          rot: { Y: 0, },
          speed: {}
        },
        fightPropList: {},
        propMap: {},
        lifeState: 1,
        avatar: {
          ...player.avatars[1],
          peerId: 1,
          uid: player.uid,
          equipIdList: [],
          weapon: {
            entityId: 100663513,
            gadgetId: 50013404,
            itemId: 13404,
            guid: '2664326143951285785',
            level: 80,
            promoteLevel: 5,
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