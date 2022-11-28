import { Lightning, Router } from '@lightningjs/sdk';
import styles from '../styles';
import { getAll } from '../api/elephants';

export default class Elephant extends Lightning.Component {
  static getFonts() {
    return [
      {
        family: 'Regular',
        url: Utils.asset('fonts/Roboto-Regular.ttf'),
      },
    ]
  }

  static _template() {
    return {
      w: 1920,
      h: 1080,
      rect: true,
      color: 0xff111111,
      flex: {
        direction: "column"
      },
      BackButton: {
        rect: true,
        color: 0xff111111,
        w: 200,
        flex: {
          alignItems: "center",
          justifyContent: "center"
        },
        Label: {
          text: {
            text: "← Back",
            verticalAlign: "middle",
            fontSize: styles.fontSizes.large.size,
            lineHeight: styles.fontSizes.large.height,
            textColor: 0xffffd900,
            fontStyle: 700
          }
        }
      },
      MainData: {
        h: h => h * 0.8,
        w: w => w,
        y: 30,
        flex: {
          direction: "row",
          justifyContent: "center",
          alignItems: "center"
        },
        Image: {
          h: h => h,
          w: w => w * 0.4,
          rect: true
        },
        Details: {
          h: h => h - 40,
          w: w => {
            return w * 0.3 - 40;
          },
          color: 0xffffd900,
          rect: true,
          padding: 40,
          flex: {
            direction: "column",
            padding: 20
          },
          Header: {
            flex: {
              direction: "row",
              alignItems: "center",
              justifyContent: "space-between"
            },
            Name: {
              text: {
                text: " ",
                fontSize: 40,
                lineHeight: 0,
                textColor: 0xff333333,
                fontStyle: 900,
                verticalAlign: "middle"
              }
            },

            Dob: {
              text: {
                text: " ",
                textColor: 0xff333333,
                fontSize: 18,
                lineHeight: 10,
                fontStyle: 600
              }
            }
          },
          Species: {
            text: {
              text: " ",
              textColor: 0xff333333,
              fontSize: 18,
              lineHeight: 10,
              fontStyle: 600
            }
          },

          Sex: {
            text: {
              text: " ",
              textColor: 0xff333333,
              fontSize: 18,
              lineHeight: 10,
              fontStyle: 600
            }
          },
          Note: {
            text: {
              text: " ",
              textColor: 0xff333333,
              fontSize: 18,
              lineHeight: 20,
              fontStyle: 600,
              wordWrapWidth: 500,
              wordWrap: true
            }
          },
          Affiliation: {
            text: {
              text: " ",
              textColor: 0xff333333,
              fontSize: 18,
              lineHeight: 10,
              fontStyle: 600
            }
          }
        }
      }
    };
  }

  async getAllElephants() {
    this._elephants = await getAll();
    this.filteredElephant = this._elephants.filter(
      elephant => elephant._id === this.params.elephantId
    );
    this.elephant = this.filteredElephant[0];
  }

  _active(){
    this.getAllElephants();
  }

  set elephant(elephant){
    const {name, note, dob, sex, image, affiliation, species} = elephant;

    this.tag('Name').patch({
      text:{
        text: name
      }
    })

    this.tag("Dob").patch({
      text: {
        text: dob
      }
    });

    this.tag("Species").patch({
      text: {
        text: species
      }
    });

    this.tag("Sex").patch({
      text: {
        text: sex
      }
    });

    this.tag("Note").patch({
      text: {
        text: note
      }
    });

    this.tag("Affiliation").patch({
      Content: {
        text: {
          text: `Affiliation: ${affiliation}`,
          textColor: 0xff333333,
          fontSize: 18,
          fontStyle: 600
        }
      }
    });

    this.tag("Image").patch({
      src: image
    });

  }


  _focus() {
    this.tag("BackButton").patch({
      color: 0xffffd900,
      Label: {
        text: {
          textColor: 0xff111111,
        }
      }
    });
  }

  _unfocus() {
    this.tag("BackButton").patch({
      color: 0xff111111,
      Label: {
        text: {
          textColor: 0xffffd900,
        }
      }
    });
  }

  _handleEnter() {
    Router.navigate("home");
    //OR Router.back();
  }

}


