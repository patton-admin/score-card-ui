import { library } from "@fortawesome/fontawesome-svg-core";
import { fab, faBitbucket } from "@fortawesome/free-brands-svg-icons";
import {
  faCaretDown,
  faClipboard,
  faCloudMoonRain,
  faCoffee,
  faCouch,
  faHandsHelping,
  faHome,
  faInfo,
  faLightbulb,
  faLock,
  faShoppingBasket,
  faSignOutAlt,
  faSnowman,
  faUser,
  faUserPlus,
  faUsers,
  faFire,
  faCogs,
  faUserCog,
  faShoppingBag,
  faShoppingCart,
  faHeartbeat,
  faGlobeAmericas,
  faTachometerAlt,
  faCompass,
  faPeopleCarry,
  faListOl,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import AppRouters from "./routers/AppRouters";
import configureStore from "./store/configureStore";
library.add(
  fab,
  faHandsHelping,
  faInfo,
  faUserPlus,
  faUsers,
  faCoffee,
  faCouch,
  faUser,
  faSnowman,
  faLock,
  faCloudMoonRain,
  faHome,
  faLightbulb,
  faCaretDown,
  faSignOutAlt,
  faShoppingBasket,
  faBitbucket,
  faClipboard,
  faFire,
  faCogs,
  faUserCog,
  faShoppingBag,
  faShoppingCart,
  faHeartbeat,
  faGlobeAmericas,
  faTachometerAlt,
  faPeopleCarry,
  faCompass,
  faListOl
);

export const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <div>
      {/**console.log("value from environment...", process.env.REACT_APP_API_URL)**/}
      <AppRouters />
    </div>
  </Provider>,
  document.getElementById("root")
);

// ReactDOM.render(<Provider store={store}>
//     <App />
// </Provider>, document.getElementById('root'));
