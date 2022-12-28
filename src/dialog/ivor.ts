export const dialogIvor = {
  guild_hall: {
    0: {
      dialog: '*the man stares at you*'
    },
    1: {
      dialog: '*ivor stares at you*',
      actions: [{character: "player", type: "receiveItem", item: "ivors_assistance"}],
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
                }
              },
              "*reply rudely*": {
                dialog: "I thought I was to be accompanied by a man, not a dog",
                npcResponse: {
                  character: "ivor",
                  dialog: "Look at you, not much better. Let's go",
                  stageEnd: true,
                }
              },
              "*stare at ivor*": {
                dialog: "*You stare at ivor, trying to project your confidence*",
                npcResponse: {
                  character: 'ivor',
                  dialog: "*ivor stares back at you until you feel awkward*",
                  stageEnd: true,
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
            }
          }
        }
      }
    },
    2: {
      dialog: "Let's go"
    }
  },
  forest: {
    0: {
      dialog: "You go that way, try not to die"
    }
  }
}
