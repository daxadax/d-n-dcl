export class StaticModel extends Entity {
  constructor(
    name: string,
    model: GLTFShape,
    parent: Entity,
    transform: Transform
  ) {
    super(name)
    engine.addEntity(this)
    this.setParent(parent)
    this.addComponent(transform)

    model.withCollisions = true
    model.isPointerBlocker = true
    model.visible = true
    this.addComponent(model)

    return this
  }
}
