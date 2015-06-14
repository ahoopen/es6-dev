import React from 'react';

const Item = React.createClass({

    render() {
        return <li>{this.props.itemName}</li>;
    }
});

export default Item;
