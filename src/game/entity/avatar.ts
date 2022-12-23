import { Entity } from ".";
import { AvatarInfo } from "../../handlers/PlayerLoginReq";
import { MotionInfo } from "../../handlers/SceneEntitiesMovesReq";

export interface SceneAvatar extends AvatarInfo {
  uid: number
  peerId: number
  equipIdList?: number[]
  reliquaryList?: number[]
  inherentProudSkillList?: number[]
  skillLevelMap: { [skill: number]: number }
  proudSkillExtraLevelMap: { [skill: number]: number }
  teamResonanceList: number[]
  weapon: any // todo: make this type
  bornTime: number
}

export interface SceneAvatarInfo {
  entityId: number
  entityType: number
  lifeState: number
  fightPropList: { [key: string]: number }
  propMap: {
    [key: string]: {
      type: number
      ival?: string | number
      val?: string | number
    }
  }
  motionInfo: MotionInfo,
  avatar: SceneAvatar
}

export interface AvatarEntityProps {
  sceneAvatarInfo: SceneAvatarInfo
}

export class AvatarEntity extends Entity<AvatarEntityProps> {
  get sceneAvatarInfo() {
    return this.props.sceneAvatarInfo
  }
}