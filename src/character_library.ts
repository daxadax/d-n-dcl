import { Player } from './player'
import { StaticModel } from './static_model'
import { Scene } from './scene'
import { MovementBind } from './movementBind'

class Character {
  name: string
  model: GLTFShape
  texture: Texture | AvatarTexture
  sourceWidth: number
  sourceHeight: number
  width: number
  height: number
  positionX: number
  dialogStage: number

  entity!: Entity

  private movementBind: MovementBind
  private isBound: boolean = false

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
    this.positionX = dimensions.positionX
    this.dialogStage = 0
    this.model = new GLTFShape('models/characters/'+ name +'.glb')

    // initialize movementBind
    this.movementBind = new MovementBind()

    return this
  }

  incrementDialogStage() {
    this.dialogStage ++
  }

  restrictMovement() {
    if ( this.isBound ) { return null }

    this.movementBind.bind()
    this.isBound = true
  }

  unrestrictMovement() {
    if ( !this.isBound ) { return null }

    this.movementBind.loose()
    this.isBound = false
  }

  hideModel() {
    this.entity.removeComponent(this.model)
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
          sourceHeight: 851,
          width: 300,
          height: 300,
          positionX: -70
        }
      ),
      luri: new Character(
        'Luri',
        new Texture('images/characters/luri.png'),
        {
          sourceWidth: 900,
          sourceHeight: 1036,
          width: 300,
          height: 350,
          positionX: -50
        }
      ),
      madis: new Character(
        'Madis',
        new Texture('images/characters/madis.png'),
        {
          sourceWidth: 900,
          sourceHeight: 1036,
          width: 300,
          height: 350,
          positionX: -50
        }
      ),
      player: null
    }
  }

  initializeCharacter(name: string, scene: Scene, transform: Transform) {
    this.characters[name].entity = new StaticModel(
      this.characters[name].name,
      this.characters[name].model,
      scene,
      transform
    )

    return this.characters[name].entity
  }

  setPlayerCharacter(player: Player) {
    this.characters.player = new Character(
      player.data.displayName,
      new Texture('images/characters/player.png'),
      {
        sourceWidth: 900,
        sourceHeight: 1098,
        width: 300,
        height: 350,
        positionX: -60
      }
    )
  }
}
