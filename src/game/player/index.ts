import { AvatarInfo } from '../../handlers/PlayerLoginReq'
import { avatars } from './load.avatars'

export class Player {

  public avatars: AvatarInfo[] = avatars

  constructor(public uid: number, public nickname: string, public sceneId: number) { }
}