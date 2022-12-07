import { Avatar } from '../avatar'
import { avatars } from './load.avatars'

interface PlayerProps {
  uid: number
  nickname: string
  sceneId: number
}

export class Player {

  public avatars: Avatar[] = avatars

  constructor(public props: PlayerProps) {}

  get uid() {
    return this.props.uid
  }

  get nickname() {
    return this.props.nickname
  }

  get sceneId() {
    return this.props.sceneId
  }
}