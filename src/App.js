import { Utils, Router } from '@lightningjs/sdk'
import routes from './routes';
import Navbar from "./widgets/Navbar";

export default class App extends Router.App {
  _setup() {
    Router.startRouter(routes)
  }

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
      ...super._template(),
      w: 1920,
      h: 1080,
      rect: true,
      color: 0xff111111,
      Widgets: {
        Navbar: {
          type: Navbar
        }
      }
    };
  }
}
