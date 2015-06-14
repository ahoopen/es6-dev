import React from 'react';
import Item from './item';

const ItemList = React.createClass({

    componentDidMount() {
        console.log('component finished loading..');
    },

    render() {
        return (
            <ul>
                {this.props.items.map((item, index) => {
                    return <Item key={index} itemName={item}/>;
                })}
            </ul>
        );
    }
});

export default ItemList;
