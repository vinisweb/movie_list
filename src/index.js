import React from "react";
import ReactDOM from 'react-dom';
import App from "./App.js";
import { Route, BrowserRouter as Router} from "react-router-dom";
import Group from "./components/Group/group.js";

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/group" component={Group} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));