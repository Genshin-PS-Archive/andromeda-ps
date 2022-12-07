import { AvatarInfo } from "../handlers/PlayerLoginReq";

interface AvatarProps {
  avatarInfo: AvatarInfo
  weaponInfo: any
}

export class Avatar {

  constructor(public props: AvatarProps) {}

  get avatarInfo() {
    return this.props.avatarInfo
  }

  get weaponInfo() {
    return this.props.weaponInfo
  }
}