import * as ui from '@dcl/ui-scene-utils'
import * as utils from '@dcl/ecs-scene-utils'

import { Response } from './factories/response'
import { CharacterLibrary } from './character_library'

export class DialogHelper {
  canvas: UICanvas
  characterLibrary: CharacterLibrary
  currentLocation!: string

  private loadingScreen: UIContainerRect
  private logo: UIImage
  private loadingScreenText: UIText
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

    this.loadingScreen = new UIContainerRect(this.canvas)
    this.loadingScreen.width = '100%'
    this.loadingScreen.height = '125%'
    this.loadingScreen.color = Color4.Black()
    this.loadingScreen.visible = false

    this.logo = new UIImage(this.loadingScreen, new Texture('images/logo.png'))
    this.logo.width = 800
    this.logo.height = 600
    this.logo.sourceWidth = 800
    this.logo.sourceHeight = 600
    this.logo.sourceTop = 0
    this.logo.sourceLeft = 0
    this.logo.vAlign = "top"
    this.logo.positionY = -20
    this.logo.visible = true

    this.loadingScreenText = new UIText(this.loadingScreen)
    this.loadingScreenText.color = Color4.White()
    this.loadingScreenText.width  = 60
    this.loadingScreenText.height = 600
    this.loadingScreenText.hAlign = 'center'
    this.loadingScreenText.vAlign = 'center'
    this.loadingScreenText.positionY = 40
    this.loadingScreenText.visible = true
    this.loadingScreenText.fontSize = 24
    this.loadingScreenText.value = "loading..."

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
    this.nametagWrapper.width = 275
    this.nametagWrapper.height = 50
    this.nametagWrapper.hAlign = 'left'
    this.nametagWrapper.vAlign = 'top'
    // this.nametagWrapper.positionX = -15
    this.nametagWrapper.positionY = 40
    this.nametagWrapper.visible = true

    this.nametag = new UIText(this.nametagWrapper)
    this.nametag.width = 200
    this.nametag.font = new Font(Fonts.SanFrancisco)
    this.nametag.fontSize = 18
    this.nametag.vAlign = 'top'
    this.nametag.hAlign = 'right'
    this.nametag.positionX = -100
    this.nametag.positionY = 20
    this.nametag.color = Color4.White()
    this.nametag.value = 'Madis'

    this.portrait = new UIImage(this.promptWrapper, new Texture(''))
    this.portrait.hAlign = 'left'
    this.portrait.vAlign = 'bottom'
    this.portrait.positionX = 100
    this.portrait.width = 300
    this.portrait.height = 350
    this.portrait.sourceWidth = 900
    this.portrait.sourceHeight = 1036
    this.portrait.sourceTop = 0
    this.portrait.sourceLeft = 0

    this.dialog = new UIText(this.promptWrapper)
    this.dialog.adaptWidth = false
    this.dialog.textWrapping = true
    this.dialog.width = '80%'
    // this.dialog.height = '200%'
    this.dialog.font = new Font(Fonts.SanFrancisco)
    this.dialog.fontSize = 20
    this.dialog.hAlign = 'center'
    this.dialog.vAlign = 'top'
    this.dialog.positionX = '15%'
    this.dialog.positionY = -55
    this.dialog.color = Color4.White()

    this.response0 = new Response(this.promptWrapper, -10)
    this.response1 = new Response(this.promptWrapper, -40)
    this.response2 = new Response(this.promptWrapper, -70)
  }

  setCurrentLocation(location: string) {
    this.currentLocation = location
  }

  say(characterName: string, dialogOptions: any) {
    const character = this.characterLibrary.characters[characterName]
    const player = this.characterLibrary.characters['player']
    const currentLocation = this.currentLocation

    // lock player character so they can't move until dialog is finished
    player.restrictMovement()

    // reset dialog box
    this.resetDialog(character)

    // i don't love this, but not sure a cleaner way to test if i'm at the top level
    // have to use indexOf instead of includes cause sdk hates updated js
    // https://stackoverflow.com/a/55652107
    if ( Object.keys(dialogOptions).indexOf(currentLocation) !== -1 ) {
      dialogOptions = dialogOptions[currentLocation][character.dialogStage]
    }

    // mark the end of a dialog stage if indicated
    if ( dialogOptions.stageEnd ) { character.incrementDialogStage() }

    // handle skill checks
    if ( dialogOptions.skillCheck ) {
      var outcome = this.rollD20() > dialogOptions.skillCheck ? 'success' : 'failure'

      return this.say(characterName, dialogOptions[outcome])
    }

    // TODO: this should be on the character model directly
    // perform any actions as a result of dialog choice
    const self = this
    const actions = dialogOptions.actions || []
    actions.forEach(function(action: any) {
      self.performAction(action)
    })

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
      this.response2.setKey('end conversation')
      this.response2.selector.onClick = new OnClick(() => {
        this.hideDialogBox()
        player.unrestrictMovement()
      })
    }

    // TODO: this is pretty messy
    var chunkedText = dialogOptions.dialog.match(/.{1,80}(\s|$)/g) || []
    chunkedText = chunkedText.flatMap(function(e) { return e.split("\n") })
    const linesToAdd = 4 - chunkedText.length
    var i

    for(i = 1; i <= linesToAdd; i ++) {
      chunkedText.push(" ")
    }

    this.dialog.value = chunkedText.join("\n")
    this.showDialogBox()
  }

  displayText(textToDisplay: string) {
    ui.displayAnnouncement(textToDisplay)
  }

  displayLoadingScreen() {
    this.loadingScreen.visible = true

    utils.setTimeout(4000, ()=>{
      this.loadingScreen.visible = false
    })
  }

  private rollD20() {
    return Math.floor(Math.random() * ((20 - 1) + 1) + 1)
  }

  private resetDialog(character: any) {
    // reset portrait
    this.portrait.positionX = character.positionX
    this.portrait.source = character.texture
    this.portrait.sourceWidth = character.sourceWidth
    this.portrait.sourceHeight = character.sourceHeight
    this.portrait.width = character.width
    this.portrait.height = character.height

    // reset nametag
    this.nametag.value = character.name
    if ( character.name.length > 4 ) {
      this.nametagWrapper.width = 250 + character.name.length * 5
      this.nametag.positionX = 120 - character.name.length * 5
    } else {
      this.nametagWrapper.width = 275
      this.nametag.positionX = 120
    }

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
  }

  private hideDialogBox() {
    this.promptWrapper.visible = false
  }

  private performAction(action: any) {
    if ( action === undefined ) { return null }

    log("performing action: "+ action.type)
    const character = this.characterLibrary.characters[action.character]

    if ( action.type === "removeModel" ) {
      character.hideModel()
    }

    if ( action.type === "unlockDialog" ) {
      // NOTE: In theory, dialog stage should be unlocked for a location
      // (forest, guild_hall, etc) - but that is not needed rn so won't
      // implement as it causes extra complexity.
      character.incrementDialogStage()
    }

    if ( action.type === "receiveItem" ) {
      character.addItem(action.item)
    }

    if ( action.type === "updateAvatar" ) {
      character.texture = new Texture('images/characters/'+ action.path)
    }
  }
}
