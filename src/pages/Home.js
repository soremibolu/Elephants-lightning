import { Lightning, Router, Utils } from '@lightningjs/sdk';
import styles from '../styles';
import Card from '../components/Card';
import { getAll } from '../api/elephants';
import Navbar from "../widgets/Navbar";

export default class Home extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }

  static _template() {
    return {
      w: w => w,
      y: Navbar.height,
      flex: {
        direction: "column",
        padding: styles.spacing.large
      },
      Heading: {
        text: {
          text: "Elephants",
          fontSize: 40,
          lineHeight: 0,
          textColor: 0xffffffff,
          fontStyle: 900
        }
      },

      Items: {
        y: 30,
        w: 1920 - styles.spacing.large * 2,
        //y: Navbar.totalHeight,

        flex: {
          direction: "row",
          justifyContent: "space-between",
          wrap: true
        }
      }
    };
  }

  static columns = 6;

  _index = 0;

  get focusedItem() {
    return this.tag("Items").children[this._index];
  }

  _getFocused() {
    return this.focusedItem;
  }

  _elephantPressedHandlder(_id) {
    Router.navigate(`elephant/${_id}`);
  }

async getAllElephants() {
    this._elephants = await getAll();
    //remove empty data
    this._filteredElephants = this._elephants.filter(
      elephant => elephant.__v !== 0 && elephant._id !== ""
    );

    this.tag("Items").children = this._filteredElephants.map((elephant, index) => ({
      type: Card,
      item: elephant,
      flexItem: {
        marginLeft: index % Home.columns !== 0 ? Card.cardHorizontalOffset : 0,
        marginBottom: Card.cardVerticalOffset
      },
      signals: {
        _elephantPressed: "_elephantPressedHandlder"
      }
    }));

    this._refocus();
  }

  convertSE(sentence) {
    const newSeason = sentence.split(" ");

    const check = newSeason.map(seasonWord => {
      if (/\d/.test(seasonWord)) {
        const actualCheck = seasonWord.split("");
        const num = seasonWord.slice(1, seasonWord.length);
        if (actualCheck[0] === "S" && /\d/.test(actualCheck[1])) {
          return "Season " + num;
        } else if (actualCheck[0] === "E"  && /\d/.test(actualCheck[1])) {
          return "Episode " + num;
        } else {
          return seasonWord;
        }
      } else {
        return seasonWord;
      }
    });

    return check.toString().replace(/,/g, " ");
  }

  _setup() {
    //renders only the first time page renders and is the first to be rendered
    this.getAllElephants();


    const season = "This is the Same1 mortal kombat y22 S11 E3";
    const ns = this.convertSE(season);
    console.log('new sentence: ', ns)

  }


  _handleUp() {
    //switch focus from page to widget if countryCard elements are less than 5
     if (this._index <= 5) {
       Router.focusWidget("Navbar");
     } else if (this._index - Home.columns >= 0) {
       this._index -= Home.columns;
       this.animateToSelected();
     }
    return true;
  }

  _handleRight() {
    if (this._index + 1 < this._filteredElephants.length) {
      this._index += 1;
      this.animateToSelected();
    }
    return true;
  }

  _handleDown() {
    if (this._index + Home.columns < this._filteredElephants.length - 1) {
      this._index += Home.columns;
      this.animateToSelected();
    }
    return true;
  }

  _handleLeft() {
    if (this._index > 0) {
      this._index -= 1;
      this.animateToSelected();
    }
    return true;
  }

  animateToSelected() {
    this.patch({
      smooth: {
        y: -this.focusedItem.finalY,
      },
    });
  }

}
