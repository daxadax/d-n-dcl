import { StaticModel } from './static_model'

export class Scene extends Entity {
  GUILD_HALL = 'guild_hall'
  GUILD_HALL_DOORS_INNER = 'guild_hall_doors_inner'
  GUILD_HALL_DOORS_OUTER = 'guild_hall_doors_outer'
  MADIS = 'madis'

  TAVERN_ENTITIES = [
    this.GUILD_HALL,
    this.GUILD_HALL_DOORS_INNER,
    this.GUILD_HALL_DOORS_OUTER,
    this.MADIS
  ]

  constructor() {
    super('_scene')
    engine.addEntity(this)
    const basePosition = new Transform({
      position: new Vector3(0, 0, 0),
      rotation: new Quaternion(0, 0, 0, 1),
      scale: new Vector3(1, 1, 1)
    })
    this.addComponentOrReplace(basePosition)
  }

  initialize() {
    // place guild hall
    const guildHallModel = new GLTFShape('models/guild_hall.glb')
    const guildHall = new StaticModel(this.GUILD_HALL, guildHallModel, this, new Transform({
      position: new Vector3(16, 0, 21),
      rotation: Quaternion.Euler(0, 90, 0),
      scale: new Vector3(1, 1 ,1)
    }))

    // place guild hall doors
    const guildHallDoorsModel = new GLTFShape('models/guild_hall_doors.glb')

    const guildHallDoorsInner = new StaticModel(
      this.GUILD_HALL_DOORS_INNER,
      guildHallDoorsModel,
      this,
      new Transform({
        position: new Vector3(15.99, 0, 21),
        rotation: Quaternion.Euler(0, 90, 0),
        scale: new Vector3(1, 1, 1)
      })
    )

    guildHallDoorsInner.addComponent(
      new OnPointerDown(
        (e) => { this.transitionToForest() },
        { button: ActionButton.PRIMARY, hoverText: "Exit the Smoldering Widow" }
      )
    )

    const guildHallDoorsOuter = new StaticModel(
      this.GUILD_HALL_DOORS_OUTER,
      guildHallDoorsModel,
      this,
      new Transform({
        position: new Vector3(16.01, 0, 21),
        rotation: Quaternion.Euler(0, 90, 0),
        scale: new Vector3(1, 1, 1)
      })
    )

    guildHallDoorsOuter.addComponent(
      new OnPointerDown(
        (e) => { log('yo') },
        { button: ActionButton.PRIMARY, hoverText: "Enter the Smoldering Widow" }
      )
    )
  }

  transitionToForest() {
    for (const child in this.children) {
      const entity = this.children[child] as Entity

      this.TAVERN_ENTITIES.forEach(function(e) {
        if ( e === entity.name ) { engine.removeEntity(entity) }
      })
    }
    // engine.removeEntity(engine.entities[this.GUILD_HALL])
    // engine.removeEntity(engine.entities[this.GUILD_HALL_DOORS_INNER])
    // engine.removeEntity(engine.entities[this.GUILD_HALL_DOORS_OUTER])
  }
}
