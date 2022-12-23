import { Player } from ".";
import { Avatar } from "../avatar";
import { AvatarEntity } from "../entity/avatar";

export function avatarsToEntity(player: Player, avatars: Avatar[]) {
  return avatars.map((avatar) => {
    const entityType = 1 // PROT_ENTITY_AVATAR
    const entityId = player.world.nextEntityId(entityType)

    return new AvatarEntity({
      sceneAvatarInfo: {
        entityId, entityType,
        lifeState: 1,
        motionInfo: player.motionInfo,
        fightPropList: {},
        propMap: {},
        avatar: {
          ...avatar.avatarInfo,
          uid: player.uid,
          peerId: 1,
          equipIdList: [],
          reliquaryList: [],
          inherentProudSkillList: [],
          skillLevelMap: {},
          proudSkillExtraLevelMap: {},
          teamResonanceList: [],
          weapon: {
            ...avatar?.weaponInfo,
            entityId: 100663513,
            gadgetId: Number(`500${avatar?.weaponInfo.itemId}`),
            level: 90,
            promoteLevel: 6,
            abilityInfo: {},
            affixMap: {},
          },
          bornTime: Date.now() / 1000,
        },
      }
    }, entityId, entityType)
  });
}