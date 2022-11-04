import { Response } from './factories/response'
import { CharacterLibrary } from './character_library'

export class DialogHelper {
  canvas: UICanvas
  characterLibrary: CharacterLibrary
  private promptWrapper: UIContainerRect
  private nametagWrapper: UIContainerRect
  private nametag: UIText
  private portrait: UIImage
  private dialog: UIText
  private response0: Response
  private response1: Response
  private response2: Response

  constructor(canvas: UICanvas, characterLibrary: CharacterLibrary) {
    this.canvas = canvas
    this.characterLibrary = characterLibrary

    this.promptWrapper = new UIContainerRect(canvas);
    this.promptWrapper.color = Color4.Black()
    this.promptWrapper.width  = '75%'
    this.promptWrapper.height = '30%'
    this.promptWrapper.hAlign = 'right'
    this.promptWrapper.vAlign = 'bottom'
    this.promptWrapper.positionX = -15
    this.promptWrapper.positionY = -20
    this.promptWrapper.visible = false

    this.nametagWrapper = new UIContainerRect(this.promptWrapper)
    this.nametagWrapper.color = Color4.Black()
    this.nametagWrapper.width  = 250
    this.nametagWrapper.height = 50
    this.nametagWrapper.hAlign = 'left'
    this.nametagWrapper.vAlign = 'top'
    // this.nametagWrapper.positionX = -15
    this.nametagWrapper.positionY = 40
    this.nametagWrapper.visible = true

    this.nametag = new UIText(this.nametagWrapper)
    this.nametag.width = 100
    this.nametag.font = new Font(Fonts.SanFrancisco)
    this.nametag.fontSize = 18
    this.nametag.vAlign = 'top'
    this.nametag.hAlign = 'right'
    this.nametag.positionX = 20
    this.nametag.positionY = 20
    this.nametag.color = Color4.White()
    this.nametag.value = 'Madis'

    this.portrait = new UIImage(this.promptWrapper, new Texture(''))
    this.portrait.hAlign = 'left'
    this.portrait.vAlign = 'bottom'
    this.portrait.positionX = -50
    this.portrait.width = 300
    this.portrait.height = 350
    this.portrait.sourceWidth = 900
    this.portrait.sourceHeight = 1036
    this.portrait.sourceTop = 0
    this.portrait.sourceLeft = 0

    this.dialog = new UIText(this.promptWrapper)
    this.dialog.width = '80%'
    this.dialog.font = new Font(Fonts.SanFrancisco)
    this.dialog.fontSize = 20
    this.dialog.vAlign = 'center'
    this.dialog.hAlign = 'center'
    this.dialog.positionX = '15%'
    this.dialog.positionY = '21%'
    this.dialog.color = Color4.White()

    this.response0 = new Response(this.promptWrapper, -10)
    this.response1 = new Response(this.promptWrapper, -40)
    this.response2 = new Response(this.promptWrapper, -70)
  }

  say(characterName: string, dialogOptions: any) {
    const character = this.characterLibrary.characters[characterName]
    this.resetDialog(character)

    // i fucking hate this, but not sure a cleaner way to test if i'm at the top level
    if ( parseInt(Object.keys(dialogOptions)[0]) === 0 ) {
      dialogOptions = dialogOptions[character.dialogStage]
    }

    const chunkedText = dialogOptions.dialog.match(/.{1,80}(\s|$)/g) || []

    if ( dialogOptions.playerResponses ) {
      const self = this

      Object.keys(dialogOptions.playerResponses).forEach(function(key: string, i: number) {
        var response = self['response'+ i as any]

        self['response'+ i].setKey(key)
        self['response'+ i].selector.onClick = new OnClick(() => {
          self.say('player', dialogOptions.playerResponses[key])
        })
      })
    }

    if ( dialogOptions.npcResponse ) {
      this.response2.setKey('next')
      this.response2.selector.onClick = new OnClick(() => {
        this.say(dialogOptions.npcResponse.character, dialogOptions.npcResponse)
      })
    }

    if ( !dialogOptions.playerResponses && !dialogOptions.npcResponse ) {
      // TODO: this should be on the character model directly
      if ( dialogOptions.stageEnd ) { character.dialogStage += 1 }

      this.response2.setKey('end conversation')
      this.response2.selector.onClick = new OnClick(() => { this.hideDialogBox() })
    }

    this.dialog.value = chunkedText.join("\n")
    this.showDialogBox()
  }

  private resetDialog(character: any) {
    // reset portrait
    this.portrait.source = character.texture
    this.portrait.sourceWidth = character.sourceWidth
    this.portrait.sourceHeight = character.sourceHeight
    this.portrait.width = character.width
    this.portrait.height = character.height

    // reset nametag
    this.nametag.value = character.name

    // reset text
    this.response0.setKey('')
    this.response0.selector.onClick = null

    this.response1.setKey('')
    this.response1.selector.onClick = null

    this.response2.setKey('')
    this.response2.selector.onClick = null
  }

  private showDialogBox() {
    this.promptWrapper.visible = true
    this.promptWrapper.visible = true
  }

  private hideDialogBox() {
    this.promptWrapper.visible = false
    this.promptWrapper.visible = false
  }
}
