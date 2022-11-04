import { StaticModel } from './static_model'

export class Scene extends Entity {
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
    new StaticModel('guild_hall', guildHallModel, this, new Transform({
      position: new Vector3(16, 0, 21),
      rotation: Quaternion.Euler(0, 90, 0),
      scale: new Vector3(1, 1 ,1)
    }))
  }
}
