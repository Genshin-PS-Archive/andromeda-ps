interface TeamProps {
  id: number
  name: string
  avatarGuidList: number[]
  currentAvatarGuid: number
}

export class Team {
  constructor(public props: TeamProps) { }

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
}