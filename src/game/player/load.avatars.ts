import { AvatarData } from "../../resource/avatar.data.loader";
import { Avatar } from "../avatar";

let guid = 1

export const avatars: Avatar[] = AvatarData.map((avatar: any) => {
  return new Avatar({
    avatarInfo: {
      avatarId: avatar.ID,
      guid: guid++,
      avatarType: 1,
      fightPropMap: {
        "1": 7648.4521484375,
        "4": 550.0421142578125,
        "6": 0.11999999731779099,
        "7": 480.02520751953125,
        "20": 0.05000000074505806,
        "21": 0,
        "22": 0.5,
        "23": 1.5586652755737305,
        "26": 0,
        "27": 0,
        "28": 0,
        "29": 0,
        "30": 0,
        "40": 0,
        "41": 0,
        "42": 0,
        "43": 0,
        "44": 0,
        "45": 0,
        "46": 0,
        "50": 0,
        "51": 0,
        "52": 0,
        "53": 0,
        "54": 0,
        "55": 0,
        "56": 0,
        "76": 60,
        "1006": 60,
        "1010": 7648.4521484375,
        "2000": 7648.4521484375,
        "2001": 616.0471801757812,
        "2002": 480.02520751953125,
        "2003": 0
      },
      fetterInfo: {
        expLevel: 10,
        rewardedFetterLevelList: [10],
        fetterList: [],
      },
      propMap: {
        "1001": {
          "type": 1001,
          "ival": 0,
          "val": 0
        },
        "1002": {
          "type": 1002,
          "ival": 4,
          "val": 4
        },
        "4001": {
          "type": 4001,
          "ival": 80,
          "val": 80
        }
      },
      lifeState: 1,
      skillDepotId: avatar['技能库ID'],
    },
    weaponInfo: {
      itemId: avatar['初始武器'],
      guid: guid++,
    }
  })
})