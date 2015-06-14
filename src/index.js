import React from 'react';
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


import ItemList from './components/itemList';

var items = ['item 1', 'item 2', 'item 3'];

React.render(<ItemList items={items} />, document.body);
