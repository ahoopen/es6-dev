import React from 'react';
import EntityStore from '../stores/EntityStore';
import EntityActions from '../actions/app-entity';

const Entity = React.createClass({

    getInitialState() {
        return {
            'entityList': EntityStore.getState()
        };
    },

    componentDidMount() {
        EntityStore.addChangeListener(this._onChange);
        this.getEntityDataIfNeeded(this.props);
    },

    componentWillUnmount() {
        EntityStore.removeChangeListener(this._onChange);
    },

    componentWillReceiveProps(nextProps) {
        this.getEntityDataIfNeeded(nextProps);
    },

    getEntityDataIfNeeded(props) {
        var entityList = EntityStore.getState();
        if (entityList.length === 0) {
            let entityId = '1';// this just example .. you can use this.props.entity_id
            EntityActions.getEntityData(entityId);
        }
    },

    _onChange() {
        this.setState(EntityStore.getState());
    },

    render() {
        console.log('web api data while rendering..');
        console.log(this.state);

        return (
            <div className="well"> This is Entity Component Uses Proper Flux Architecture for Getting Async Web Api
                Calls (check console log for more details) </div>
        );
    }

});

export default Entity;
