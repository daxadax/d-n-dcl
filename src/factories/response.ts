export class Response {
  responseWrapper: UIContainerRect
  selector: UIImage
  key: UIText

  constructor(wrapperElement: UIContainerRect, positionY: number) {

    this.responseWrapper = new UIContainerRect(wrapperElement)
    this.responseWrapper.vAlign = 'center'
    this.responseWrapper.hAlign = 'center'
    this.responseWrapper.width = 500
    this.responseWrapper.height = 23
    this.responseWrapper.positionX = -25
    this.responseWrapper.positionY = positionY

    this.selector = new UIImage(this.responseWrapper, new Texture('images/response_selector_overlay.png'))
    this.selector.vAlign = 'bottom'
    this.selector.hAlign = 'left'
    this.selector.width = 500
    this.selector.height = 23
    this.selector.sourceWidth = 500
    this.selector.sourceHeight = 23
    this.selector.sourceTop = 0
    this.selector.sourceLeft = 0
    this.selector.isPointerBlocker = true

    this.key = new UIText(this.responseWrapper)
    this.key.width = '80%'
    this.key.font = new Font(Fonts.SanFrancisco)
    this.key.fontSize = 20
    this.key.vAlign = 'bottom'
    this.key.hAlign = 'left'
    this.key.positionX = 5
    this.key.color = Color4.Yellow()
    this.key.isPointerBlocker = false
    // this.key.value = key
  }

  setKey(str: string) {
    this.key.value = str
  }
}
