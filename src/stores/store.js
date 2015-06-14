import { EventEmitter } from 'events';
//import { debug } from 'debug';
import { _ } from 'lodash';
import { CHANGE } from './../const';

class Store extends EventEmitter {

    constructor(dispatcher, state) {
        super();

        state = state || {};
        state = _.merge({}, Store.defaultState, state);

        dispatcher.register(action => {
            if (action.actionType === 'ADDED') {
                this.emit(CHANGE);
            }
        });

        this.state = state;
    }

    getState() {
        return this.state;
    }
}

// Default state
Store.defaultState = {
    cart: {
        title: null,
        items: []
    }
};

export default Store;
