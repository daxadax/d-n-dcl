import { ModelLibrary } from './model_library'
import { MovementBind } from './movement_bind'
import { Player } from './player'
import { Scene } from './scene'
import { StaticModel } from './static_model'

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
  items: String[]

  entity!: Entity

  private movementBind: MovementBind
  private isBound: boolean = false

  constructor(
    modelLibrary: ModelLibrary,
    name: string,
    texture: Texture | AvatarTexture,
    dimensions: any,
    items: String[]) {
    this.name = name
    this.texture = texture
    this.sourceWidth = dimensions.sourceWidth
    this.sourceHeight = dimensions.sourceHeight
    this.width = dimensions.width
    this.height = dimensions.height
    this.positionX = dimensions.positionX
    this.dialogStage = 0
    this.model = modelLibrary[name.toLowerCase()]

    // initialize movementBind
    this.movementBind = new MovementBind()

    // initialize items
    this.items = items

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

  addItem(item: string) {
    this.items.push(item)
  }

  hasItem(item: string) {
    // have to use indexOf instead of includes cause sdk hates updated js
    // https://stackoverflow.com/a/55652107
    return this.items.indexOf(item) !== -1
  }

  hideModel() {
    this.entity.removeComponent(this.model)
  }
}

export class CharacterLibrary {
  characters: any
  modelLibrary: ModelLibrary

  constructor(modelLibrary: ModelLibrary) {
    this.modelLibrary = modelLibrary

    this.characters =  {
      ivor: new Character(
        this.modelLibrary,
        'Ivor',
        new Texture('images/characters/ivor.png'),
        {
          sourceWidth: 900,
          sourceHeight: 851,
          width: 300,
          height: 300,
          positionX: -70
        },
        []
      ),
      luri: new Character(
        this.modelLibrary,
        'Luri',
        new Texture('images/characters/luri.png'),
        {
          sourceWidth: 900,
          sourceHeight: 1036,
          width: 300,
          height: 350,
          positionX: -50
        },
        []
      ),
      madis: new Character(
        this.modelLibrary,
        'Madis',
        new Texture('images/characters/madis.png'),
        {
          sourceWidth: 900,
          sourceHeight: 1036,
          width: 300,
          height: 350,
          positionX: -50
        },
        []
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
      this.modelLibrary,
      player.data.displayName,
      new Texture('images/characters/player.png'),
      {
        sourceWidth: 900,
        sourceHeight: 1098,
        width: 300,
        height: 350,
        positionX: -60
      },
      []
    )
  }
}
