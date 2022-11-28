import Home from './pages/HomeSlide'
import Elephants from './pages/Elephants'

export default {
  root: "home",
  routes: [
    {
      path: "home",
      component: Home,
      widgets: ["Navbar"]
    },
    {
      path: "elephant/:elephantId",
      component: Elephants,
      widgets: ["Navbar"],
    }
  ]
};
