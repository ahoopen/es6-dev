import React from 'react';

class Item extends React.Component {

    constructor(props) {
        super(props);
    }

    click(event) {
        console.log('event', event.target);
    }

    render() {
        return <li onClick={this.click.bind(this)}>{this.props.itemName}</li>;
    }
}

export default Item;
