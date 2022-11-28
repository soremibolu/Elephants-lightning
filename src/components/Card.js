import { Lightning, Utils } from '@lightningjs/sdk'
import styles from '../styles';

export default class Card extends Lightning.Component {
  static getFonts() {
    return [
      {
        family: 'Regular',
        url: Utils.asset('fonts/Roboto-Regular.ttf'),
      },
    ]
  }

  static _template() {
    const rotate45 = Math.PI * 0.25;
    return {
      w: Card.cardWidth,
      h: Card.cardHeight,
      alpha: 0.7,
      color: 0xffffffff,
      //clipping: true,
      flex: {
        direction: "column"
      },
      shader: {
        type: Lightning.shaders.Light3d,
        ry: rotate45,
        strength: 0.5
      },
      Image: {
        //src: null,
        //w: w => w,
        src: null,
        w: Card.cardWidth,
        h: Card.cardHeight,
        Info: {
          w: w => w - 20,
          h: 100,
          y: 300,
          color: 0xffffffff,
          rect: true,
          flex: {
            direction: "column",
            padding: 10
          },
          Name: {
            text: {
              text: " ",
              fontSize: 20,
              lineHeight: 0,
              textColor: 0xff333333,
              fontStyle: 900,
              verticalAlign: "middle"
            }
          },
          Species: {
            text: {
              text: " ",
              textColor: 0xff333333,
              fontSize: 10,
              lineHeight: 10,
              fontStyle: 600
            }
          },
          Sex: {
            text: {
              text: " ",
              textColor: 0xff333333,
              fontSize: 10,
              lineHeight: 10
            }
          }
        }
      }
    };
  }

  static cardWidth = 300;
  static cardHeight = 300;
  static cardHorizontalOffset = styles.spacing.medium;
  static cardVerticalOffset = styles.spacing.large;


  _init() {
    const { name, image, species, sex } = this.item
    if (image) {
      this.tag('Image').patch({
        src: image,
      })
    }
    //Tag gets reference to elements/components then patch changes its state
    this.tag('Name').patch({
      text: {
        text: name,
      },
    })

    this.tag("Species").patch({
      Content: {
        text: {
          text: species,
          textColor: 0xff333333,
          fontSize: 10,
          lineHeight: 10,
          fontStyle: 600
        }
      }
    });
    this.tag("Sex").patch({
      Content: {
        text: {
          text: sex,
          textColor: 0xff333333,
          fontSize: 10,
          lineHeight: 10
        }
      }
    });
  }

  /** Focus */
  _focus() {
    this.patch({
      smooth: {
        h: Card.cardHeight + 100,
        scale: 1.2,
        alpha: 1,
        zIndex: 2
      },
      shader: null
    });
  }

  //Tag gets reference to elements/components then patch changes its state
  // patch is like a state change; it changes what is currently being rendered || patch = useState
  _unfocus() {
    const rotate45 = Math.PI * 0.25;
    this.patch({
      smooth: {
        h: Card.cardHeight,
        scale: 1,
        alpha: 0.9,
        zIndex: 0,
      },
      shader: {
        type: Lightning.shaders.Light3d,
        ry: rotate45,
        strength: 0.5
      }
    });
  }
  //configures the enter handler to navigate to the country age when entered
  _handleEnter() {
    const { _id } = this.item
    //Router.navigate(`country/${cioc}`);
    this.signal('_elephantPressed', _id)
  }
}
