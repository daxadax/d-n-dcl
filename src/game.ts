// TODO: require gold from madis before getting potion
// TODO: require potion and talking to ivor before leaving tavern
// TODO: lock character position when in dialog

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
const dialogHelper = new DialogHelper(canvas, characterLibrary)

player.initialize(characterLibrary)
soundLibrary.playBackgroundMusic()

// character - madis
// TODO: this makes more sense actually within the character library probably?
// and then just initialize each character
const madis = new StaticModel(
  characterLibrary.characters.madis.name,
  characterLibrary.characters.madis.model,
  scene,
  new Transform({
    position: new Vector3(8, 0.88, 16.5),
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

const ivor = new StaticModel(
  characterLibrary.characters.ivor.name,
  characterLibrary.characters.ivor.model,
  scene,
  new Transform({
    position: new Vector3(28.6, 0.88, 9.55),
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

const luri = new StaticModel(
  characterLibrary.characters.luri.name,
  characterLibrary.characters.luri.model,
  scene,
  new Transform({
    position: new Vector3(8, 0.88, 4),
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
