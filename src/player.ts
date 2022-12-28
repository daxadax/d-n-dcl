import { UserData } from "@decentraland/Identity"
import { getUserData } from "@decentraland/Identity"

import { CharacterLibrary } from "./character_library"

export class Player {
  items: String[] = []

  data!: UserData

  async initialize(characterLibrary: CharacterLibrary) {
    log('initializing player')

    const userData = await getUserData()
    this.data = userData as UserData

    // set player data in character library
    characterLibrary.setPlayerCharacter(this)

    return this
  }
}

