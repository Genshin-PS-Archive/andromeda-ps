import enet from 'enet.js'

import { ClientInfo } from '../enet'
import { Packet } from '../network/packet'
import { encodePacket } from '../network/packet/packet.encode'

export interface SceneInitFinishReq {
  enterSceneToken: number
}

export interface SceneInitFinishRsp {
  retcode: number
}

export interface WorldDataNotify {
  propMap: {
    [prop: string]: {
      type: number
      ival: number
    }
  }
}

export interface OnlinePlayerInfo {
  uid: number
  nickName: string
}

export interface ScenePlayerInfo {
  uid: number
  peerId: number
  name: string
  sceneId: number
  onlinePlayerInfo: OnlinePlayerInfo
}

export interface ScenePlayerInfoNotify {
  playerInfoList: ScenePlayerInfo[]
}

export interface HostPlayerNotify {
  hostUid: number
  hostPeerId: number
}

export interface AvatarEnterInfo {
  avatarGuid: any,
  avatarEntityId: number,
  avatarAbilityInfo: {},
  weaponGuid: any,
  weaponEntityId: number,
  weaponAbilityInfo: {}
}

export interface TeamEnterInfo {
  teamEntityId: number
  teamAbilityInfo: {},
}

export interface MpLevelEntityInfo {
  entityId: number,
  authorityPeerId: number,
  abilityInfo: {}
}

export interface PlayerEnterSceneInfoNotify {
  curAvatarEntityId: number
  avatarEnterInfo: AvatarEnterInfo[]
  teamEnterInfo: TeamEnterInfo
  mpLevelEntityInfo: MpLevelEntityInfo
}

export interface SceneTeamUpdateNotify {
  sceneTeamAvatarList: SceneTeamAvatar[]
}

export interface SceneTeamAvatar {
  playerUid: number
  avatarGuid: any
  sceneId: number
  entityId: number
}

export interface WorldPlayerInfoNotify {
  playerInfoList: OnlinePlayerInfo[]
  playerUidList: number[]
}

export async function handle(host: number, client: ClientInfo, packet: Packet<SceneInitFinishReq>) {
  const worldDataNotify = new Packet<WorldDataNotify>({
    propMap: {
      '1': {
        type: 1,
        ival: 8
      },
      '2': {
        type: 2,
        ival: 0
      }
    }
  }, 'WorldDataNotify')

  const scenePlayerInfoNotify = new Packet<ScenePlayerInfoNotify>({
    playerInfoList: [
      {
        uid: 61,
        peerId: 1,
        name: 'andromeda',
        sceneId: 3,
        onlinePlayerInfo: {
          uid: 61,
          nickName: 'andromeda',
        },
      }
    ]
  }, 'ScenePlayerInfoNotify')

  const hostPlayerNotify = new Packet<HostPlayerNotify>({
    hostUid: 61,
    hostPeerId: 1,
  }, 'HostPlayerNotify')

  const playerEnterSceneInfoNotify = new Packet<PlayerEnterSceneInfoNotify>({
    curAvatarEntityId: 16777432,
    avatarEnterInfo: [
      {
        avatarGuid: "2664326143951479019",
        avatarEntityId: 16777432,
        avatarAbilityInfo: {},
        weaponGuid: "2664326143951285785",
        weaponEntityId: 100663513,
        weaponAbilityInfo: {}
      },
      {
        avatarGuid: "2664326143951372989",
        avatarEntityId: 16777432,
        avatarAbilityInfo: {},
        weaponGuid: "2664326143951285785",
        weaponEntityId: 100663513,
        weaponAbilityInfo: {}
      }
    ],
    teamEnterInfo: {
      teamEntityId: 150995153,
      teamAbilityInfo: {},
    },
    mpLevelEntityInfo: {
      entityId: 184549594,
      authorityPeerId: 1,
      abilityInfo: {}
    },
  }, 'PlayerEnterSceneInfoNotify')

  const sceneDataNotify = new Packet({}, 'SceneDataNotify')

  const sceneTeamUpdateNotify = new Packet<SceneTeamUpdateNotify>({
    sceneTeamAvatarList: [
      {
        playerUid: 61,
        avatarGuid: "2664326143951372989",
        sceneId: 3,
        entityId: 16777432,
      }
    ]
  }, 'SceneTeamUpdateNotify')

  const worldPlayerInfoNotify = new Packet<WorldPlayerInfoNotify>({
    playerInfoList: [
      {
        uid: 61,
        nickName: 'andromeda',
      }
    ],
    playerUidList: [61],
  }, 'WorldPlayerInfoNotify')

  const sceneTimeNotify = new Packet({
    sceneId: 3,
    sceneTime: 0,
  }, 'SceneTimeNotify')

  const playerGameTimeNotify = new Packet({
    uid: 61,
    gameTime: 0,
  }, 'PlayerGameTimeNotify')

  const sceneInitFinishRsp = new Packet<SceneInitFinishRsp>({
    retcode: 0
  }, 'SceneInitFinishRsp')

  // send
  worldDataNotify.send(host, client)
  hostPlayerNotify.send(host, client)
  sceneTimeNotify.send(host, client)
  playerGameTimeNotify.send(host, client)
  sceneDataNotify.send(host, client)
  worldPlayerInfoNotify.send(host, client)
  scenePlayerInfoNotify.send(host, client)
  sceneTeamUpdateNotify.send(host, client)
  playerEnterSceneInfoNotify.send(host, client)
  sceneInitFinishRsp.send(host, client)
}