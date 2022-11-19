import { Player } from './player'

export class CharacterLibrary {
  characters: any

  constructor() {
    this.characters =  {
      madis: this.buildCharacterAttributes(
        'Madis',
        new Texture('images/characters/madis.png'),
        900,
        1036,
        300,
        350
      ),
      player: null
    }
  }

  setPlayerCharacter(player: Player) {
    this.characters.player = this.buildCharacterAttributes(
      player.data.displayName,
      new Texture('images/characters/player.png'),
      900,
      1098,
      300,
      350
    )
  }

  incrementDialogStage(name: string) {
    this.characters[name].dialogStage ++
  }

  // TODO: makes way more sense for this to be its own "character" class
  private buildCharacterAttributes(
    name: string,
    texture: Texture | AvatarTexture,
    sourceWidth: number,
    sourceHeight: number,
    width: number,
    height: number
  ) {
    return {
      name: name,
      texture: texture,
      sourceWidth: sourceWidth,
      sourceHeight: sourceHeight,
      width: width,
      height: height,
      dialogStage: 0
    }
  }
}
