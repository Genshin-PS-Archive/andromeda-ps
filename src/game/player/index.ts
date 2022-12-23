import { MotionInfo } from '../../handlers/SceneEntitiesMovesReq'
import { Avatar } from '../avatar'
import { Team } from '../team'
import { World } from '../world'
import { avatars } from './load.avatars'

interface PlayerProps {
  uid: number
  nickname: string
  sceneId: number
  motionInfo: MotionInfo
}

export class Player {
  public avatars: Avatar[] = avatars
  public world: World
  public teams: Team[]
  public currentTeam: Team
  public curEntityId: number = 0

  constructor(public props: PlayerProps) {
    this.world = new World({ level: 8 })
    this.teams = [new Team({ id: 1, name: 'Andromeda', avatarGuidList: [19, 17, 31], currentAvatarGuid: 19, player: this, })]
    this.currentTeam = this.teams[0]
  }

  get uid() {
    return this.props.uid
  }

  get nickname() {
    return this.props.nickname
  }

  get sceneId() {
    return this.props.sceneId
  }

  set sceneId(sceneId: number) {
    this.props.sceneId = sceneId
  }

  get motionInfo() {
    return this.props.motionInfo
  }

  set motionInfo(motionInfo: MotionInfo) {
    this.props.motionInfo = motionInfo
  }

  get currentAvatar() {
    return this.avatars.find(avatar => avatar.avatarInfo.guid == this.currentTeam.currentAvatarGuid)
  }
}