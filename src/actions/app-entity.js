import Api from '../utils/api';

var EntityActions = {

    getEntityData: function (entityId) {
        Api.getEntityData(entityId);
    }
};

export default EntityActions;
