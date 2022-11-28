import { Player } from './player'

class Character {
  name: string
  model: GLTFShape
  texture: Texture | AvatarTexture
  sourceWidth: number
  sourceHeight: number
  width: number
  height: number
  dialogStage: number

  constructor(
    name: string,
    texture: Texture | AvatarTexture,
    dimensions: any) {
    this.name = name
    this.texture = texture
    this.sourceWidth = dimensions.sourceWidth
    this.sourceHeight = dimensions.sourceHeight
    this.width = dimensions.width
    this.height = dimensions.height
    this.dialogStage = 0
    this.model = new GLTFShape('models/characters/'+ name +'.glb')

    return this
  }

  incrementDialogStage() {
    this.dialogStage ++
  }
}

export class CharacterLibrary {
  characters: any

  constructor() {
    this.characters =  {
      ivor: new Character(
        'Ivor',
        new Texture('images/characters/ivor.png'),
        {
          sourceWidth: 900,
          sourceHeight: 1036,
          width: 300,
          height: 350
        }
      ),
      luri: new Character(
        'Luri',
        new Texture('images/characters/luri.png'),
        {
          sourceWidth: 900,
          sourceHeight: 1036,
          width: 300,
          height: 350
        }
      ),
      madis: new Character(
        'Madis',
        new Texture('images/characters/madis.png'),
        {
          sourceWidth: 900,
          sourceHeight: 1036,
          width: 300,
          height: 350
        }
      ),
      player: null
    }
  }

  setPlayerCharacter(player: Player) {
    this.characters.player = new Character(
      player.data.displayName,
      new Texture('images/characters/player.png'),
      {
        sourceWidth: 900,
        sourceHeight: 1098,
        width: 300,
        height: 350
      }
    )
  }

  incrementDialogStage(name: string) {
    this.characters[name].incrementDialogStage()
  }
}
