import { ClientInfo } from 'enet.js'
import { player } from '../enet'
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
  propMap: {
    [prop: string]: {
      type: number;
      ival?: string | number
      val?: string | number
    }
  }
}

export interface AvatarInfo {
  avatarId: number
  guid: any
  skillDepotId: number
  lifeState: number
  avatarType: number,
  fightPropMap: { [prop: string]: number }
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
    nickName: player.nickname,
    serverTime: Date.now() / 1000,
    isFirstLoginToday: false,
    regionId: 1,
    propMap: {
      '10004': { type: 10004, ival: 1, val: 1 },
      '10005': { type: 10005, ival: 0, val: 50 },
      '10006': { type: 10006, ival: 1, val: 1 },
      '10009': { type: 10009, ival: 1, val: 1 },
      '10011': { type: 10011, ival: 24000, val: 24000 },
      '10010': { type: 10010, ival: 24000, val: 24000 },
      '10013': { type: 10013, ival: 60, val: 60 },
      '10014': { type: 10014, ival: 0, val: 0 },
    }
  }, 'PlayerDataNotify')

  const playerEnterSceneNotify = new Packet<PlayerEnterSceneNotify>({
    sceneId: player.sceneId,
    pos: { X: 0, Y: 600, Z: 0 },
    sceneBeginTime: Date.now(),
    type: 1,
    targetUid: player.uid,
    worldLevel: 8,
    enterSceneToken: 1000,
  }, 'PlayerEnterSceneNotify')

  const avatarDataNotify = new Packet<AvatarDataNotify>({
    avatarTeamMap: {
      '1': {
        avatarGuidList: [player.avatars[1].guid],
        teamName: "Andromeda PS",
      }
    },
    avatarList: player.avatars,
    curAvatarTeamId: 1,
    chooseAvatarGuid: player.avatars[1].guid,
  }, 'AvatarDataNotify')

  const playerLoginRsp = new Packet<PlayerLoginRsp>(
    { retcode: 0 }, 'PlayerLoginRsp')

  await playerStoreNotify.send(host, client)
  await openStateUpdateNotify.send(host, client)
  await storeWeightLimit.send(host, client)
  await playerDataNotify.send(host, client)
  await avatarDataNotify.send(host, client)
  await playerEnterSceneNotify.send(host, client)
  await playerLoginRsp.send(host, client)
}