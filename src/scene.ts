import { movePlayerTo } from '@decentraland/RestrictedActions'
import * as utils from '@dcl/ecs-scene-utils'

import { CharacterLibrary } from './character_library'
import { ModelLibrary } from './model_library'
import { DialogHelper } from './dialog_helper'
import { StaticModel } from './static_model'
import { SoundLibrary } from './sound_library'

import { dialog } from './dialog_library'

export class Scene extends Entity {
  characterLibrary: CharacterLibrary
  dialogHelper: DialogHelper
  modelLibrary: ModelLibrary
  soundLibrary: SoundLibrary

  // location entities to preload
  forest: StaticModel
  guildHall: StaticModel

  currentLocation!: string

  // locations
  GUILD_HALL = 'guild_hall'
  FOREST = 'forest'

  // tavern entities
  GUILD_HALL_DOORS_INNER = 'guild_hall_doors_inner'
  GUILD_HALL_DOORS_OUTER = 'guild_hall_doors_outer'
  IVOR = 'Ivor'
  LURI = 'Luri'
  MADIS = 'Madis'

  TAVERN_ENTITIES = [
    this.GUILD_HALL,
    this.GUILD_HALL_DOORS_INNER,
    this.GUILD_HALL_DOORS_OUTER,
    this.IVOR,
    this.LURI,
    this.MADIS
  ]


  constructor(characterLibrary: CharacterLibrary, dialogHelper: DialogHelper, modelLibrary: ModelLibrary) {
    super('_scene')
    engine.addEntity(this)
    const basePosition = new Transform({
      position: new Vector3(0, 0, 0),
      rotation: new Quaternion(0, 0, 0, 1),
      scale: new Vector3(1, 1, 1)
    })
    this.addComponentOrReplace(basePosition)

    this.characterLibrary = characterLibrary
    this.dialogHelper = dialogHelper
    this.modelLibrary = modelLibrary
    this.soundLibrary = new SoundLibrary()

    this.forest = new StaticModel(
      this.FOREST,
      this.modelLibrary.forest,
      this,
      new Transform({
        position: new Vector3(16, 0, 24),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(1, 1 ,1)
      })
    )

    this.guildHall = new StaticModel(
      this.GUILD_HALL,
      this.modelLibrary.guildHall,
      this,
      new Transform({
        position: new Vector3(16, 0, 24),
        rotation: Quaternion.Euler(0, 90, 0),
        scale: new Vector3(1, 1 ,1)
      })
    )

    engine.removeEntity(this.forest)
    engine.removeEntity(this.guildHall)
  }

  initializeGuildHall() {
    // set current location
    this.currentLocation = this.GUILD_HALL
    this.dialogHelper.setCurrentLocation(this.currentLocation)

    // start background music loop
    // this.soundLibrary.playBackgroundMusic(this.currentLocation)

    // place guild hall
    engine.addEntity(this.guildHall)

    // place guild hall doors
    const guildHallDoorsInner = new StaticModel(
      this.GUILD_HALL_DOORS_INNER,
      this.modelLibrary.guildHallDoors,
      this,
      new Transform({
        position: new Vector3(15.89, 0, 24),
        rotation: Quaternion.Euler(0, 90, 0),
        scale: new Vector3(1, 1, 1)
      })
    )

    guildHallDoorsInner.addComponent(
      new OnPointerDown(
        (e) => {
          if ( !this.characterLibrary.characters['player'].hasItem('flammable_oil') ) {
            return this.dialogHelper.displayText("You need to collect supplies before leaving!")
          }

          if ( !this.characterLibrary.characters['player'].hasItem('ivors_assistance') ) {
            return this.dialogHelper.displayText("You leave the tavern and nearly get lost, you need more help than just this old map")
          }

          this.transitionToForest()
        },
        { button: ActionButton.PRIMARY, hoverText: "Exit the Smoldering Widow" }
      )
    )

    // character - madis
    const madis = this.characterLibrary.initializeCharacter(
      'madis',
      this,
      new Transform({
        position: new Vector3(8, 0.75, 19.5),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(1, 1 ,1)
      })
    )

    madis.addComponent(
      new OnPointerDown(
        (e) => { this.dialogHelper.say('madis', dialog.madis) },
        { button: ActionButton.PRIMARY, hoverText: "Speak to Madis" }
      )
    )

    const ivor = this.characterLibrary.initializeCharacter(
      'ivor',
      this,
      new Transform({
        position: new Vector3(28.6, 0.75, 12.55),
        rotation: Quaternion.Euler(0, 240, 0),
        scale: new Vector3(1, 1 ,1)
      })
    )

    ivor.addComponent(
      new OnPointerDown(
        (e) => { this.dialogHelper.say('ivor', dialog.ivor) },
        { button: ActionButton.PRIMARY, hoverText: "Speak to Ivor" }
      )
    )

    const luri = this.characterLibrary.initializeCharacter(
      'luri',
      this,
      new Transform({
        position: new Vector3(8, 0.75, 7),
        rotation: Quaternion.Euler(0, 45, 0),
        scale: new Vector3(1, 1 ,1)
      })
    )

    luri.addComponent(
      new OnPointerDown(
        (e) => { this.dialogHelper.say('luri', dialog.luri) },
        { button: ActionButton.PRIMARY, hoverText: "Speak to Luri" }
      )
    )
  }

  initializeForest() {
    this.currentLocation = this.FOREST
    this.dialogHelper.setCurrentLocation(this.currentLocation)

    // start background music loop
    this.soundLibrary.playBackgroundMusic(this.currentLocation)

    // place forest
    engine.addEntity(this.forest)

    // move character next to ivor at "start" of the forest path
    movePlayerTo({ x: 12, y: 0, z: 40 }, { x: 32, y: 2, z: 32 })

    // TODO: shouldn't reinitialize, just re-place
    // TODO: need to specify which model (in this case standing vs sitting ivor)
    const ivor = this.characterLibrary.initializeCharacter(
      'ivor',
      this,
      new Transform({
        position: new Vector3(12, 0, 41),
        rotation: Quaternion.Euler(0, 90, 0),
        scale: new Vector3(1, 1 ,1)
      })
    )

    ivor.addComponent(
      new OnPointerDown(
        (e) => { this.dialogHelper.say('ivor', dialog.ivor) },
        { button: ActionButton.PRIMARY, hoverText: "Speak to Ivor" }
      )
    )

    // trigger area for turtle sound
    const triggerArea = new Entity()

    triggerArea.addComponent(
      new Transform({
        position: new Vector3(20, 0, 11),
        scale: new Vector3(15, 10, 15)
      })
    )

    const triggerShape = new utils.TriggerBoxShape(
      new Vector3(18, 10, 18),
      new Vector3(0, 3, 0)
    )

    const triggerActions = {
      onCameraEnter :() => {
        this.soundLibrary.play('turtle')
        this.dialogHelper.displayText("You can complete this task in the full version of the game. To restart the game, please refresh the page")
      },
      enableDebug: false
    }

    // debugging
    // triggerArea.addComponent(new BoxShape()).withCollisions = false

    // add everything to engine
    triggerArea.addComponent(new utils.TriggerComponent(triggerShape, triggerActions))
    engine.addEntity(triggerArea)
  }

  transitionToForest() {
    this.dialogHelper.displayLoadingScreen()

    for (const child in this.children) {
      const entity = this.children[child] as Entity

      this.TAVERN_ENTITIES.forEach(function(e) {
        if ( e === entity.name ) { engine.removeEntity(entity) }
      })
    }

    // this.soundLibrary.pauseBackgroundMusic(this.currentLocation)
    this.initializeForest()
  }
}
