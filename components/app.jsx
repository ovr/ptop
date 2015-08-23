
import React from 'react';
import Router from 'react-router';

import { RouteHandler, Route, Navigation } from 'react-router';
import { Nav, Navbar } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';
import { HomePage, CpuPage, MemoryPage, NetworkPage} from './pages';

var remote = window.require('remote');

const App = React.createClass({
    mixins: [ Navigation ],

    componentDidMount() {
        var ipc = window.require('ipc');
        ipc.on('transitionTo', function(routeName) {
            //this.transitionTo(routeName, { the: 'params' }, { the: 'query' });
            this.transitionTo(routeName);
        }.bind(this));
    },

    render() {
        var navbar = [
            {
                route: "cpu",
                text: "CPU"
            },
            {
                route: "memory",
                text: "Memory"
            },
            {
                route: "network",
                text: "Network"
            }
        ];

        var links = navbar.map(function (r) {
            return (
                <NavItemLink key={r.route} to={r.route}>{r.text}</NavItemLink>
            );
        });

        return (
            <div>
                <Navbar fixedTop fluid>
                <Nav>
                    {links}
                </Nav>
                </Navbar>

                <RouteHandler/>
            </div>
        );
    }
});

var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="home" path="/home" handler={HomePage} />
        <Route name="cpu" path="/cpu" handler={CpuPage} />
        <Route name="memory" path="/memory" handler={MemoryPage} />
        <Route name="network" path="/network"  handler={NetworkPage} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler />, document.body);
});
