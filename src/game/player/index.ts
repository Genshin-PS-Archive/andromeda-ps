import { MotionInfo } from '../../handlers/SceneEntitiesMovesReq'
import { Avatar } from '../avatar'
import { Team } from '../team'
import { avatars } from './load.avatars'

interface PlayerProps {
  uid: number
  nickname: string
  sceneId: number
  teams: Team[]
  currentTeam: Team
  motionInfo: MotionInfo
}

export class Player {

  public avatars: Avatar[] = avatars
  public curEntityId: number = 0

  constructor(public props: PlayerProps) { }

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

  get teams() {
    return this.props.teams
  }

  get currentTeam() {
    return this.props.currentTeam
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