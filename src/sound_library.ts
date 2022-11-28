export class SoundLibrary {
  library: any

  constructor() {
    const tavern_music = new BackgroundSound('tavern_music.mp3')
    const tavern_voices = new BackgroundSound('tavern_voices.mp3')

    this.library =  {
      tavern_music: tavern_music,
      tavern_voices: tavern_voices
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

  // TODO: needs to be location based later (forest / tavern / boss / etc)
  playBackgroundMusic() {
    this.library['tavern_music'].getComponent(AudioSource).playing = true
    this.library['tavern_voices'].getComponent(AudioSource).playing = true
  }

  pauseBackgroundMusic() {
    this.library['tavern_music'].getComponent(AudioSource).playing = false
    this.library['tavern_voices'].getComponent(AudioSource).playing = false
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
