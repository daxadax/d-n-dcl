// TODO
// * talking to ivor brings him to the forest (otherwise not there)
// * clean up dialog
// * make a way to exit game after the ending
// * load forest at start of game so delay isn't super long

// base scene element
import { Scene } from './scene'

// internals
import { CharacterLibrary } from './character_library'
import { DialogHelper } from './dialog_helper'
import { Player } from './player'

// initializers
const canvas = new UICanvas()
const player = new Player()
const characterLibrary = new CharacterLibrary()
const dialogHelper = new DialogHelper(canvas, characterLibrary)

player.initialize(characterLibrary)

// build scene
const scene = new Scene(characterLibrary, dialogHelper)
scene.initializeGuildHall()
