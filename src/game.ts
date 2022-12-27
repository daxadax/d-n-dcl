// TODO
// * indicate success or failure of dice rolls in dialog
// * require gold from madis before getting potion
// * require potion and talking to ivor before leaving tavern
// * add forest portion (incl sounds)
// * clean up dialog

// base scene element
import { Scene } from './scene'
const scene = new Scene()

// internals
import { CharacterLibrary } from './character_library'
import { SoundLibrary } from './sound_library'
import { DialogHelper } from './dialog_helper'
import { Player } from './player'
import { StaticModel } from './static_model'

import { dialog } from './dialog_library'

// initializers
scene.initialize()
const canvas = new UICanvas()
const player = new Player()
const characterLibrary = new CharacterLibrary()
const soundLibrary = new SoundLibrary()
const dialogHelper = new DialogHelper(canvas, characterLibrary, scene)

player.initialize(characterLibrary)
// soundLibrary.playBackgroundMusic()

// character - madis
const madis = characterLibrary.initializeCharacter(
  'madis',
  scene,
  new Transform({
    position: new Vector3(8, 0.75, 16.5),
    rotation: Quaternion.Euler(0, 0, 0),
    scale: new Vector3(1, 1 ,1)
  })
)

madis.addComponent(
  new OnPointerDown(
    (e) => { dialogHelper.say('madis', dialog.madis) },
    { button: ActionButton.PRIMARY, hoverText: "Speak to Madis" }
  )
)

const ivor = characterLibrary.initializeCharacter(
  'ivor',
  scene,
  new Transform({
    position: new Vector3(28.6, 0.75, 9.55),
    rotation: Quaternion.Euler(0, 240, 0),
    scale: new Vector3(1, 1 ,1)
  })
)

ivor.addComponent(
  new OnPointerDown(
    (e) => { dialogHelper.say('ivor', dialog.ivor) },
    { button: ActionButton.PRIMARY, hoverText: "Speak to Ivor" }
  )
)

const luri = characterLibrary.initializeCharacter(
  'luri',
  scene,
  new Transform({
    position: new Vector3(8, 0.75, 4),
    rotation: Quaternion.Euler(0, 45, 0),
    scale: new Vector3(1, 1 ,1)
  })
)

luri.addComponent(
  new OnPointerDown(
    (e) => { dialogHelper.say('luri', dialog.luri) },
    { button: ActionButton.PRIMARY, hoverText: "Speak to Luri" }
  )
)
