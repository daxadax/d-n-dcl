export class SoundLibrary {
  library: any

  private backgroundMusicMap = {
    "guild_hall": ["tavern_music", "tavern_voices"],
    "forest": ["forest_music"]
  }

  constructor() {
    const tavern_music = new BackgroundSound('tavern_music.mp3')
    const tavern_voices = new BackgroundSound('tavern_voices.mp3')
    const forest_music = new BackgroundSound('forest_music.mp3')
    const turtle = new Sound('turtle.mp3')

    this.library =  {
      tavern_music: tavern_music,
      tavern_voices: tavern_voices,
      forest_music: forest_music,
      turtle: turtle
    }
  }

  play(name: string) {
    this.library[name].getComponent(AudioSource).playOnce()
  }

  loop(name: string) {
    this.library[name].getComponent(AudioSource).playing = true
  }

  stopLoop(name: string) {
    this.library[name].getComponent(AudioSource).playing = false
  }

  playBackgroundMusic(location: string) {
    const self = this

    this.backgroundMusicMap[location].forEach(function(track) {
      self.library[track].getComponent(AudioSource).playing = true
    })
  }

  pauseBackgroundMusic(location: string) {
    const self = this

    this.backgroundMusicMap[location].forEach(function(track) {
      self.library[track].getComponent(AudioSource).playing = false
    })
  }
}

class Sound extends Entity {
  constructor(assetPath: string) {
    super()

    this.addComponent(new Transform())
    engine.addEntity(this)

    this.setParent(Attachable.AVATAR)
    this.addComponent(
      new AudioSource(new AudioClip('sounds/'+ assetPath))
    )
  }
}

class BackgroundSound extends Entity {
  constructor(assetPath: string) {
    super()

    this.addComponent(new Transform())
    engine.addEntity(this)

    const source = new AudioSource(new AudioClip('sounds/'+ assetPath))
    source.loop = true
    source.volume = 0.3

    this.setParent(Attachable.AVATAR)
    this.addComponent(source)
  }
}
