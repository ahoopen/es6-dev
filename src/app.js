import React from 'react';
//import { Router, Route, Link } from 'react-router';

const App = React.createClass({

    getInitialState() {
        return {
            time: 10
        };
    },

    tick() {
        var actualTimeRemaining = this.state.time - 1;
        if (actualTimeRemaining === 0) {
            this.setState({time: 'Boom'});
            clearInterval(this.interval);
        } else {
            this.setState({time: actualTimeRemaining});
        }
    },

    componentDidMount() {
        console.log('component is geladen!');
        this.interval = setInterval(this.tick, 1000);
    },

    render() {
        return <p>Hello { this.state.time}!</p>;
    }
});

export default App;
