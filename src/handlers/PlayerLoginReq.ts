import { ClientInfo } from '../enet'
import { Packet } from '../network/packet'

export interface PlayerLoginReq { }

export interface PlayerLoginRsp {
  retcode: number
}

export interface OpenStateUpdateNotify {
  openStateMap: { [openState: string]: number }
}

export interface PlayerStoreNotify extends StoreWeightLimitNotify {
  itemList: any[]
}

export interface StoreWeightLimitNotify {
  storeType: 'STORE_NONE' | 'STORE_PACK' | 'STORE_DEPOT'
  weightLimit: number
}

export interface PlayerDataNotify {
  nickName: string
  serverTime: number
  isFirstLoginToday: boolean
  regionId: number
  propMap: { [prop: string]: number }
}

export interface AvatarInfo {
  avatarId: number
  guid: any
  skillDepotId: number
  lifeState: number
  avatarType: number,
  propMap: {
    [prop: string]: {
      type: number
      ival?: string | number
      val?: string | number
    }
  }
}

export interface AvatarDataNotify {
  avatarTeamMap: {
    [id: number]: {
      avatarGuidList: any[],
      teamName: string,
    }
  },
  avatarList: AvatarInfo[];
  curAvatarTeamId: number,
  chooseAvatarGuid: any,
}

export interface Vector {
  X?: number
  Y?: number
  Z?: number
}

export interface PlayerEnterSceneNotify {
  sceneId: number,
  pos: Vector,
  sceneBeginTime: number,
  type: number,
  targetUid: number,
  worldLevel: number,
  enterSceneToken: number,
}

export async function handle(host: number, client: ClientInfo, packet: Packet<PlayerLoginReq>) {
  const openStateUpdateNotify = new Packet<OpenStateUpdateNotify>({
    openStateMap: {
      1: 1,
      2: 1,
      3: 1,
      4: 1,
      5: 1,
      6: 1,
      7: 0,
      8: 1,
      10: 1,
      11: 1,
      12: 1,
      13: 1,
      14: 1,
      15: 1,
      16: 1,
      18: 1,
      19: 1,
      21: 1,
      22: 1,
      23: 1,
      25: 1,
      27: 1,
      28: 1,
      29: 1,
      30: 1,
      31: 1,
      32: 1,
      33: 1,
      35: 1,
      36: 1,
      37: 1,
      38: 1,
      39: 1,
      40: 1,
      44: 0,
      45: 1,
      47: 1,
      49: 1,
      50: 1,
      51: 1,
      52: 1,
      53: 1,
      54: 1,
      55: 1,
      56: 1,
      57: 1,
      58: 1,
      59: 1,
      60: 1,
      61: 1,
      62: 1,
      64: 1,
      65: 1,
      66: 1,
      74: 1,
      76: 1,
      77: 1,
      78: 1,
      79: 1,
      80: 1,
      81: 1,
      82: 1,
      83: 1,
      84: 1,
    }
  }, 'OpenStateUpdateNotify')

  const playerStoreNotify = new Packet<PlayerStoreNotify>({
    itemList: [],
    storeType: 'STORE_PACK',
    weightLimit: 10000,
  }, 'PlayerStoreNotify')

  const storeWeightLimit = new Packet<StoreWeightLimitNotify>({
    storeType: 'STORE_PACK',
    weightLimit: 10000,
  }, 'StoreWeightLimitNotify')

  const playerDataNotify = new Packet<PlayerDataNotify>({
    nickName: 'andromeda',
    serverTime: Date.now() / 1000,
    isFirstLoginToday: false,
    regionId: 1,
    propMap: {}
  }, 'PlayerDataNotify')

  const playerEnterSceneNotify = new Packet<PlayerEnterSceneNotify>({
    sceneId: 3,
    pos: { X: 0, Y: 600, Z: 0 },
    sceneBeginTime: Date.now(),
    type: 1,
    targetUid: 61,
    worldLevel: 8,
    enterSceneToken: 1000,
  }, 'PlayerEnterSceneNotify')

  const avatarDataNotify = new Packet<AvatarDataNotify>({
    avatarTeamMap: {
      '1': {
        avatarGuidList: ["2664326143951479019"],
        teamName: "Andromeda PS",
      }
    },
    avatarList: [
      {
        avatarId: 10000026,
        guid: "2664326143951479019",
        skillDepotId: 2601,
        lifeState: 1,
        avatarType: 1,
        propMap: {
          '1001': {
            type: 1001,
            ival: '0',
          },
          '1002': {
            type: 1002,
            ival: 4,
            val: 4,
          },
          '1003': {
            type: 1003,
            ival: '0',
          },
          '1004': {
            type: 1004,
            ival: '0',
          },
          '4001': {
            type: 4001,
            ival: 20,
            val: 20,
          },
        },
      },
      {
        avatarId: 10000029,
        guid: "2664326143951372989",
        skillDepotId: 2901,
        lifeState: 1,
        avatarType: 1,
        propMap: {
          '1001': {
            type: 1001,
            ival: '0',
          },
          '1002': {
            type: 1002,
            ival: 4,
            val: 4,
          },
          '1003': {
            type: 1003,
            ival: '0',
          },
          '1004': {
            type: 1004,
            ival: '0',
          },
          '4001': {
            type: 4001,
            ival: 20,
            val: 20,
          },
        },
      }
    ],
    curAvatarTeamId: 1,
    chooseAvatarGuid: "2664326143951479019",
  }, 'AvatarDataNotify')

  const playerLoginRsp = new Packet<PlayerLoginRsp>(
    { retcode: 0 }, 'PlayerLoginRsp')

  playerStoreNotify.send(host, client)
  openStateUpdateNotify.send(host, client)
  storeWeightLimit.send(host, client)
  playerDataNotify.send(host, client)
  avatarDataNotify.send(host, client)
  playerEnterSceneNotify.send(host, client)
  playerLoginRsp.send(host, client)
}