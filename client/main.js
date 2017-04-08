import React                                       from 'react';
import ReactDOM                                    from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            {/*<IndexRoute component={} />*/}
        </Route>
    </Router>
);

Meteor.startup(()=>{
    ReactDOM.render(routes, document.querySelector('.container'));
});