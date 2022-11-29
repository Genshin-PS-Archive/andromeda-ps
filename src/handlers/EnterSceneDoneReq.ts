import { ClientInfo } from '../enet'
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
          pos: { X: 0, Y: 300, Z: 0 },
          rot: { Y: 0, },
          speed: {}
        },
        fightPropList: {},
        propMap: {
          '4001': 70,
        },
        lifeState: 1,
        avatar: {
          uid: 61,
          avatarId: 10000029,
          guid: "2664326143951372989",
          peerId: 1,
          skillDepotId: 2901,
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
          bornTime: 1620699348,
        }
      }
    ],
    appearType: 12
  }, 'SceneEntityAppearNotify')

  const enterSceneDoneRsp = new Packet({ retcode: 0 }, 'EnterSceneDoneRsp')

  sceneEntityAppearNotify.send(host, client)
  enterSceneDoneRsp.send(host, client)
}