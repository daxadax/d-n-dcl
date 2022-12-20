export const dialogLuri = {
  guild_hall: {
    0: {
      dialog: "Oh, new faces, yeah, plain-looking, dirty cloak, means adventurer, means healing potions, wound ointments, antidote. Would you like a purse?",
      playerResponses: {
        "I'd just like some oil..": {
          dialog: "I just need some fuel oil for my axe, that’s all",
          npcResponse: {
            character: 'luri',
            dialog: "Ah, sorry, excuse me. By the way, my name is Lurie, if you survive, come again, I’ll give you a discount as a regular customer. Here’s your oil, you owe me 30 gold pieces",
            playerResponses: {
              "*Give 30 gold pieces.*": {
                dialog: "Here you go",
                npcResponse: {
                  character: 'luri',
                  dialog: "*Luri hands you a small jar with a viscous liquid inside*",
                  stageEnd: true
                }
              }
            }
          }
        },
        "I need oil, not a passive agressive merchant": {
          dialog: "I'm in a hurry, I don't have time for your sterotypes - just give me the oil and we'll be done here",
          npcResponse: {
            character: 'luri',
            dialog: "Yes, yes, of course. But you could have been more polite. I hope this is the last time we see each other. Here’s your oil, you owe me 30 gold pieces.",
            stageEnd: true,
            playerResponses: {
              "*pay and walk away*": {
                  dialog: "*You silently give her the gold and leave*",
              },
              "I hope so too!": {
                dialog: "*You pluck the gold from your purse and throw it at Luri* I hope so too!",
              }
            }
          }
        },
        "*Attempt to charm Luri*": {
          skillCheck: 16,
          success: {
            dialog: "I’d love to buy this whole shop, but I can’t afford it right now. But there are some things I can afford. Flammable oil, is there such a thing?",
            npcResponse: {
              character: 'luri',
              dialog: "I’d be glad if you’d come back here with a cartload of gold. Here’s your oil, let's call it 15 gold pieces. I hope to see you again.",
              stageEnd: true,
              npcResponse: {
                character: 'player',
                dialog: "For the sake of such a shopkeeper I'll certainly be back",
              }
            }
          },
          failure: {
            dialog: "*You try to make a comparison between the flammable oil and her bright red hair, but it sounds super weird*",
            npcResponse: {
              character: 'luri',
              dialog: "...that will be 30 gold",
              stageEnd: true,
              npcResponse: {
                character: 'player',
                dialog: "*You refrain from making eye contact, place the money on the counter and leave*",
              }
            }
          }
        }
      }
    },
    1: {
      dialog: "Come see me again after you've used up that oil"
    }
  }
}
