import ReactDOM from "react-dom";

import "antd-mobile/dist/antd-mobile.css";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "./routes";

ReactDOM.render(<BrowserRouter> {renderRoutes(routes)} </BrowserRouter>, document.getElementById("root"));
