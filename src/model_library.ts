export class ModelLibrary {
  forest: GLTFShape
  guildHall: GLTFShape
  guildHallDoors: GLTFShape
  ivor: GLTFShape
  ivorStanding: GLTFShape
  luri: GLTFShape
  madis: GLTFShape

  constructor() {
    this.forest = new GLTFShape('models/forest.glb')
    this.guildHall = new GLTFShape('models/guild_hall.glb')
    this.guildHallDoors = new GLTFShape('models/guild_hall_doors.glb')
    this.ivor = new GLTFShape('models/characters/ivor.glb')
    this.ivorStanding = new GLTFShape('models/characters/ivor_standing.glb')
    this.luri = new GLTFShape('models/characters/luri.glb')
    this.madis = new GLTFShape('models/characters/madis.glb')
  }
}
