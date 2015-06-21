import React from 'react';
import Point from './Point';
//import tv from './tv';
//import App from './app';
//
//var TV = new tv();
//TV.tvSearch('game of thrones').then( function(body) {
//    console.log(body);
//});
//
//var host = document.getElementById('host');
//
////$(() => {
//    React.render(React.createElement(App), host);
////});

//var p = new Point();
//console.log('point..', p.getValue() );

import ItemList from './components/itemList';

var items = ['item 1', 'item 2', 'item 3'];

import Entity from './components/entity';

React.render(<Point />, document.body);

//React.render(<Entity />, document.body);
//React.render(<ItemList items={items} />, document.body);
