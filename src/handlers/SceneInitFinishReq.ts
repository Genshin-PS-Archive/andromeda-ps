import { ClientInfo } from 'enet.js'

import { player } from '../enet'
import { Packet } from '../network/packet'

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
  weaponGuid: any,
  weaponEntityId: number,
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
        uid: player.uid,
        peerId: 1,
        name: player.nickname,
        sceneId: player.sceneId,
        onlinePlayerInfo: {
          uid: player.uid,
          nickName: player.nickname,
        },
      }
    ]
  }, 'ScenePlayerInfoNotify')

  const hostPlayerNotify = new Packet<HostPlayerNotify>({
    hostUid: player.uid,
    hostPeerId: 1,
  }, 'HostPlayerNotify')

  const playerEnterSceneInfoNotify = new Packet<PlayerEnterSceneInfoNotify>({
    curAvatarEntityId: 16777432 + Number(player.currentTeam.currentAvatarGuid),
    avatarEnterInfo: player.currentTeam.avatarGuidList.map((guid, index) => {
      return {
        avatarGuid: guid,
        avatarEntityId: 16777432 + Number(guid),
        weaponGuid: "2664326143951285785",
        weaponEntityId: 100663513,
      }
    }),
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
    sceneTeamAvatarList: player.currentTeam.avatarGuidList.map((guid) => {
      return {
        playerUid: player.uid,
        avatarGuid: guid,
        sceneId: player.sceneId,
        entityId: 16777432 + Number(guid),
      }
    }),
  }, 'SceneTeamUpdateNotify')

  const worldPlayerInfoNotify = new Packet<WorldPlayerInfoNotify>({
    playerInfoList: [
      {
        uid: player.uid,
        nickName: player.nickname,
      }
    ],
    playerUidList: [player.uid]
  }, 'WorldPlayerInfoNotify')

  const sceneTimeNotify = new Packet({
    sceneId: player.sceneId,
    sceneTime: 0,
  }, 'SceneTimeNotify')

  const playerGameTimeNotify = new Packet({
    uid: player.uid,
    gameTime: 0,
  }, 'PlayerGameTimeNotify')

  const sceneInitFinishRsp = new Packet<SceneInitFinishRsp>({
    retcode: 0
  }, 'SceneInitFinishRsp')

  await worldDataNotify.send(host, client)
  await hostPlayerNotify.send(host, client)
  await sceneTimeNotify.send(host, client)
  await playerGameTimeNotify.send(host, client)
  await sceneDataNotify.send(host, client)
  await playerEnterSceneInfoNotify.send(host, client)
  await worldPlayerInfoNotify.send(host, client)
  await scenePlayerInfoNotify.send(host, client)
  await sceneTeamUpdateNotify.send(host, client)
  await sceneInitFinishRsp.send(host, client)
}