export const dialogIvor = {
  guild_hall: {
    0: {
      dialog: '*ivor stares at you*',
      playerResponses: {
        "Can you take me to the beast?": {
          dialog: "I was told that you could take me to the beast, is that true?",
          npcResponse: {
            character: 'ivor',
            dialog: "...Yeah",
            playerResponses: {
              "How rude!": {
                dialog: "You could have at least introduced yourself",
                npcResponse: {
                  character: "ivor",
                  dialog: "Unnecessary. Let's go",
                  stageEnd: true,
                  // action: "removeModel"
                }
              },
              "*reply rudely*": {
                dialog: "I thought I was to be accompanied by a man, not a dog",
                npcResponse: {
                  character: "ivor",
                  dialog: "Look at you, not much better. Let's go",
                  stageEnd: true,
                  // action: "removeModel"
                }
              },
              "*stare at ivor*": {
                dialog: "*You stare at ivor, trying to project your confidence*",
                npcResponse: {
                  character: 'ivor',
                  dialog: "*ivor stares back at you until you feel awkward*",
                  stageEnd: true,
                  // action: "removeModel"
                }
              }
            }
          }
        },
        "*stare at ivor*": {
          dialog: "*You stare at ivor, trying to project your confidence*",
          npcResponse: {
            character: 'ivor',
            dialog: "*ivor stares at you for an uncomfortably long time*",
            npcResponse: {
              character: 'ivor',
              dialog: "Let's go",
              stageEnd: true,
              // action: "removeModel"
            }
          }
        }
      }
    },
    1: {
      dialog: "Let's go"
    }
  },
  forest: {
    0: {
      dialog: "You go that way, try not to die"
    }
  }
}

// After completing each of the options, the dialogue will continue according to one scenario
//
// Player:
// -Damn, I completely forgot, I need to take the oils, they will be useful to me.
//
// ivor:
// - ...
