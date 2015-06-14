import React from 'react';
import Item from './item';

const ItemList = React.createClass({

    render() {
        return (
            <ul>
                {this.props.items.map((item) => {
                    return <Item key={item.id} itemName={item} />;
                })}
            </ul>
        );
    }
});

export default ItemList;
