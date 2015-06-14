import React from 'react';

const Item = React.createClass({

    click(event) {
        console.log('event', event.target);
    },

    render() {
        return <li onClick={this.click}>{this.props.itemName}</li>;
    }
});

export default Item;
