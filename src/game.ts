// TODO
// * add sound back in
// * add standing ivor model in forest

// base scene element
import { Scene } from './scene'

// internals
import { CharacterLibrary } from './character_library'
import { DialogHelper } from './dialog_helper'
import { ModelLibrary } from './model_library'
import { Player } from './player'

// initializers
const canvas = new UICanvas()
const player = new Player()
const modelLibrary = new ModelLibrary()

const characterLibrary = new CharacterLibrary(modelLibrary)
const dialogHelper = new DialogHelper(canvas, characterLibrary)

dialogHelper.displayLoadingScreen()
player.initialize(characterLibrary)

// build scene
const scene = new Scene(characterLibrary, dialogHelper, modelLibrary)
scene.initializeGuildHall()
