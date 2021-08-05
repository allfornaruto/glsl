const { ccclass, property } = cc._decorator;

cc.macro.ENABLE_MULTI_TOUCH = false;

@ccclass
export class HappyColor extends cc.Component {
  touchPointNum = 0;

  colorInHandRgb: cc.Color = null;

  @property(cc.Node)
  img: cc.Node = null;

  @property(cc.Node)
  color1: cc.Node = null;

  @property(cc.Node)
  color2: cc.Node = null;

  @property(cc.Node)
  color3: cc.Node = null;

  @property(cc.Node)
  colorInHand: cc.Node = null;

  onLoad() {}

  onClickImg(event: cc.Event.EventTouch) {
    const img: cc.Node = event.target;

    this.touchPointNum++;

    const relativeLocation = img.convertToNodeSpaceAR(event.getLocation());
    cc.log(`relativeLocation.x=${relativeLocation.x}, relativeLocation.y=${relativeLocation.y}`);
    const uv = new cc.Vec2(relativeLocation.x / img.width, -relativeLocation.y / img.height);
    cc.log(`uv.x=${uv.x}, uv.y=${uv.y}`);

    const sprite = img.getComponent(cc.Sprite);
    const happyColor = sprite.getMaterial(0);

    happyColor.setProperty(`touchData`, [
      uv.x,
      uv.y,
      this.colorInHandRgb.r,
      this.colorInHandRgb.g,
      this.colorInHandRgb.b,
    ]);
  }

  onClickColor(event: cc.Event.EventTouch, rgbHex: string) {
    const rgb = this.rgbHex2Rgb(rgbHex);
    this.colorInHandRgb = new cc.Color(rgb[0], rgb[1], rgb[2]);
    this.colorInHand.color = this.colorInHandRgb;
  }

  private rgbHex2Rgb(rgbHex: string) {
    // 把颜色值变成小写
    var color = rgbHex.toLowerCase();
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      var colorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    // 处理六位的颜色值，转为RGB
    var colorChange = [];
    for (var i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    return colorChange;
  }
}
