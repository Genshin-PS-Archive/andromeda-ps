import { AvatarEntity } from "./entity/avatar"
import { Player } from "./player"
import { avatarsToEntity } from "./player/avatars.to.entity"

interface TeamProps {
  id: number
  name: string
  avatarGuidList: number[]
  currentAvatarGuid: number
  player: Player
}

export class Team {
  public avatarEntities: AvatarEntity[]

  constructor(public props: TeamProps) {
    this.avatarEntities = avatarsToEntity(this.props.player, this.props.player.avatars.filter(avatar =>
      props.avatarGuidList.includes(avatar.avatarInfo.guid)))
  }

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get avatarGuidList() {
    return this.props.avatarGuidList
  }

  get currentAvatarGuid() {
    return this.props.currentAvatarGuid
  }

  set currentAvatarGuid(guid: number) {
    this.props.currentAvatarGuid = guid
  }

  get player() {
    return this.props.player
  }
}