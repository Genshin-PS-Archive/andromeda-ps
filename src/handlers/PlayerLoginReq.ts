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
  fetterInfo: any;
  fightPropMap: { [prop: string]: number }
  propMap: {
    [prop: string]: {
      type: number
      ival?: string | number
      val?: string | number
    }
  }
}

export interface AvatarTeam {
  avatarGuidList: any[],
  teamName: string,
}

export interface AvatarDataNotify {
  avatarTeamMap: { [id: number]: AvatarTeam },
  avatarList: AvatarInfo[];
  curAvatarTeamId: number,
  chooseAvatarGuid: any,
}

export interface Vector {
  x?: number
  y?: number
  z?: number
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
      10: 1,
      5: 1,
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      31: 1,
      30: 1,
      37: 1,
      39: 1,
      45: 1,
      46: 1,
      13: 1,
      14: 1,
      15: 1,
      16: 1,
      17: 1,
      18: 1,
      19: 1,
      20: 1,
      21: 1,
      22: 1,
      23: 1,
      24: 1,
      25: 1,
      26: 1,
      27: 1,
      28: 1,
      29: 1,
      32: 1,
      33: 1,
      34: 1,
      35: 1,
      36: 1,
      38: 1,
      40: 1,
      41: 1,
      50: 1,
      51: 1,
      52: 1,
      43: 1,
      1001: 1,
      1002: 1,
      1003: 1,
      1004: 1,
      1005: 1,
      1006: 1,
      1007: 1,
      1008: 1,
      1009: 1,
      1010: 1,
      1100: 1,
      1103: 1,
      1101: 1,
      1102: 1,
      44: 1,
      47: 1,
      48: 1,
      49: 1,
      1200: 1,
      1201: 1,
      1202: 1,
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
    serverTime: Date.now(),
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

  const avatarTeamMap: { [id: number]: AvatarTeam } = {}

  player.teams.forEach(team => {
    avatarTeamMap[team.id] = {
      teamName: team.name,
      avatarGuidList: team.avatarGuidList,
    }
  })

  const avatarDataNotify = new Packet<AvatarDataNotify>({
    avatarList: player.avatars.map(avatar => avatar.avatarInfo),
    curAvatarTeamId: player.currentTeam.id,
    chooseAvatarGuid: player.avatars.find(avatar => avatar.avatarInfo.avatarId === 10000005)?.avatarInfo?.guid,
    avatarTeamMap,
  }, 'AvatarDataNotify')

  const playerEnterSceneNotify = new Packet<PlayerEnterSceneNotify>({
    sceneId: player.sceneId,
    pos: player.motionInfo.pos,
    sceneBeginTime: Date.now(),
    type: 1,
    targetUid: player.uid,
    worldLevel: 8,
    enterSceneToken: 1000,
  }, 'PlayerEnterSceneNotify')

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