// base scene element
import { Scene } from './scene'
const scene = new Scene()

// internals
import { CharacterLibrary } from './character_library'
import { DialogHelper } from './dialog_helper'
import { Player } from './player'

// initializers
scene.initialize()
const canvas = new UICanvas()
const player = new Player()
const characterLibrary = new CharacterLibrary()
const dialogHelper = new DialogHelper(canvas, characterLibrary)

player.initialize(characterLibrary)

///////////////////////
const dialog = {
  madis: {
    0: {
      dialog: 'Oooh, looks like we have a new addition to our ranks. Make yourself comfortable, my friend, and tell us why you have come to the home of all former, living, and future legends!',
      playerResponses: {
        "I'm looking for work": {
          dialog: "*You place an order for a tortoise on the broad countertop*\nI’ve heard there’s money to be made here. And I could use it.",
          npcResponse: {
            character: 'madis',
            dialog: "Do you like to get right to the point? I like that. Then I won’t keep you.\n*Madis slips his hand under the table, flips through the stacks of paper for a few minutes, and pulls out an old, dusty map.*",
            npcResponse: {
              character: 'madis',
              dialog: "This is a map of our forest. I hope you know how to navigate. It marks the location of the snapping turtle, which has scattered all the animals and birds in the neighboring woods. We should kill it, but there is a problem...",
              npcResponse: {
                character: 'madis',
                dialog: "Our weapons do not harm it. Take some gold and buy some oil for weapons, I can recommend a flame, it will both illuminate the target and cause a good wound. When you figure it out, bring something to prove it, and I’ll give you the rest of the reward. \n*Madis holds out a purse of money and a map.*",
                stageEnd: true
              }
            }
          }
        },
        "I'm here to make a name for myself!": {
          dialog: "You have correctly noticed about the legends, here is a representative of young stars who are about to shine, and I have come here to replenish my collection of exploits!",
          npcResponse: {
            character: 'madis',
            dialog: "And you are overconfident. In my youth I was the same. Let's get down to business.\n*Madis takes a dusty map out from under the table.*",
            npcResponse: {
              character: 'madis',
              dialog: "This is a map of our forest. I hope you know how to navigate. It marks the location of the snapping turtle, which has scattered all the animals and birds in the neighboring woods. We should kill it, but there is a problem...",
              npcResponse: {
                character: 'madis',
                dialog: "Our weapons do not harm it. Take some gold and buy some oil for weapons, I can recommend a flame, it will both illuminate the target and cause a good wound. When you figure it out, bring something to prove it, and I’ll give you the rest of the reward. \n*Madis holds out a purse of money and a map.*",
                stageEnd: true
              }
            }
          }
        },
        "[you think you recognize this man] Aren't you...?": {
          dialog: "Do I see well? isn’t it the legendary pyro magician, Madis the Flame, in front of me?",
          npcResponse: {
            character: 'madis',
            dialog: "Come on, it was a hundred years ago, but still I’m glad to be remembered. So why did you come to the abode of adventurers?",
            playerResponses: {
              "I heard there's a job that needs doing": {
                dialog: "I saw this order and needed some money. So, what about your job, is that still available? Or has it already been done?",
                npcResponse: {
                  character: 'madis',
                  dialog: "Fortunately, or unfortunately not yet, depending on which way you look at it.\n*Madis reaches under the table and looks for a map.*",
                  npcResponse: {
                    character: 'madis',
                    dialog: "This is a map of our forest. I hope you know how to navigate. It marks the location of the snapping turtle, which has scattered all the animals and birds in the neighboring woods. We should kill it, but there is a problem...",
                    npcResponse: {
                      character: 'madis',
                      dialog: "Our weapons do not harm it. Take some gold and buy some oil for weapons, I can recommend a flame, it will both illuminate the target and cause a good wound. When you figure it out, bring something to prove it, and I’ll give you the rest of the reward. \n*Madis holds out a purse of money and a map.*",
                      stageEnd: true
                    }
                  }
                }
              }
            }
          },
          skill_check: 14
        }
      }
    },
    1: {
      dialog: "Remember, our weapons do not harm the turtle, so buy some oil for your weapons. When you figure it out, bring something to prove it, and I’ll give you the rest of the reward.",
      playerResponses: {
        "I can't find the forest": {
          dialog: "I’m having trouble with the map you gave me. Is there anyone who can take me out?",
          npcResponse: {
            character: 'madis',
            dialog: "Yes, there’s a silent man sitting over there in the corner, Ivor Bloodhound. He is not much of a talker, but he’s an excellent woodsman"
          }
        },
        "Where can I buy oil?": {
          dialog: "I haven't found the trader. Where are they?",
          npcResponse: {
            character: 'madis',
            dialog: "The trader is named Lurie, she's usually around here somewhere"
          }
        }
      }
    }
  }
}

// character - madis
const mat_1 = new Material()
mat_1.metallic = 0
mat_1.roughness = 1
mat_1.specularIntensity = 0
mat_1.albedoTexture = characterLibrary.characters.madis.texture

const madis = new Entity('madis')
madis.setParent(scene)
engine.addEntity(madis)

madis.addComponent(new PlaneShape())
madis.addComponent(new Transform({
  position: new Vector3(8, 2, 8),
  rotation: Quaternion.Euler(180, 0, 0),
  scale: new Vector3(2, 2, 2)
}))
madis.addComponent(mat_1)
madis.addComponent(
  new OnPointerDown(
    (e) => { dialogHelper.say('madis', dialog.madis) },
    { button: ActionButton.PRIMARY, hoverText: "Speak to Madis" }
  )
)
