import { Lightning, Router } from "@lightningjs/sdk";
import styles from "../styles";

export default class Navbar extends Lightning.Component {
  static selectedTextHighlightStyles = {
    highlight: true,
    highlightOffset: 2,
    highlightColor: 0xffc09d7b,
  };

  static _template() {
    return {
      w: 1920,
      h: Navbar.height,
      rect: true,
      color: 0xfffafafa,
      flex: {
        alignItems: "center",
        paddingTop: styles.spacing.small,
        paddingRight: styles.spacing.large,
        paddingBottom: styles.spacing.small,
        paddingLeft: styles.spacing.large
      },

      HomeLink: {
        text: {
          textColor: 0xff333333,
          text: "Stacked",
          fontSize: styles.fontSizes.large.size,
          lineHeight: styles.fontSizes.large.lineHeight,
          ...Navbar.selectedTextHighlightStyles,
          highlight: false
        }
      },
      RailLink: {
        text: {
          textColor: 0xff333333,
          text: "Rail",
          fontSize: styles.fontSizes.large.size,
          lineHeight: styles.fontSizes.large.lineHeight,
          ...Navbar.selectedTextHighlightStyles,
          highlight: false
        }
      },
      NegativeToggler: {
        text: {
          textColor: 0xff333333,
          text: "☀️",
          fontSize: styles.fontSizes.large.size,
          lineHeight: styles.fontSizes.large.lineHeight,
          ...Navbar.selectedTextHighlightStyles,
          highlight: false
        }
      }
    };
  }

  static height = 60;
  static totalHeight = Navbar.height + styles.spacing.small * 2;

  focusedChild = "HomeLink";

  _handleChildFocus() {
    this.patch({
      HomeLink: {
        text: {
          highlight: this.focusedChild === "HomeLink"
        }
      },
      RailLink: {
        text: {
          highlight: this.focusedChild === "Raillink"
        }
      },
      NegativeToggler: {
        text: {
          highlight: this.focusedChild === "NegativeToggler"
        }
      }
    });
  }

  _focus() {
    this._handleChildFocus();
  }

  _unfocus() {
    this.patch({
      HomeLink: {
        text: {
          highlight: false
        }
      },
      RailLink: {
        text: {
          highlight: false
        }
      },
      NegativeToggler: {
        text: {
          highlight: false
        }
      }
    });
  }

  _handleEnter() {
    if (this.focusedChild === "HomeLink") {
      Router.navigate("home");
    } else {
      const negativeToggler = this.tag("NegativeToggler");
      negativeToggler.patch({
        text: {
          text: negativeToggler.text.text === "☀️" ? "🌙" : "☀️",
        },
      });

      this.fireAncestors("$toggleDarkMode");
    }
  }

  _handleRight() {
    if (this.focusedChild === "HomeLink") {
      this.focusedChild = "NegativeToggler";
    }
    this._handleChildFocus();
  }

  _handleLeft() {
    if (this.focusedChild === "NegativeToggler") {
      this.focusedChild = "HomeLink";
    }
    this._handleChildFocus();
  }
  //switch focus from widget to page
  _handleDown() {
    Router.focusPage();
  }
}
