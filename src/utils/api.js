import { TIMEOUT, ERROR, PENDING, GET_ENTITY_DATA } from '../const';
import AppDispatcher from '../dispatchers/app-dispatcher';
// TODO replace superagent
import request from 'superagent';

var API_URL = '/assets/api.json';
var TIME_OUT = 10000;

var _pendingRequests = {};


function abortPendingRequests(key) {
    if (_pendingRequests[key]) {
        _pendingRequests[key]._callback = function () {
        };
        _pendingRequests[key].abort();
        _pendingRequests[key] = null;
    }
}

function token() {
    return 'test'; // TODO authentication with using AuthStore.getState().token;
}

function makeUrl(part) {
    return API_URL + part;
}

function dispatch(key, response, params) {
    var payload = {actionType: key, response: response};
    if (params) {
        payload.queryParams = params;
    }
    AppDispatcher.handleRequestAction(payload);
}

// return successful response, else return request Constants
function makeDigestFun(key, params) {
    return function (err, res) {
        if (err && err.timeout === TIMEOUT) {
            dispatch(key, TIMEOUT, params);
        } else if (res.status === 400) {
            //UserActions.logout();
        } else if (!res.ok) {
            dispatch(key, ERROR, params);
        } else {
            dispatch(key, res, params);
        }
    };
}

// a get request with an authtoken param
function get(url) {
    return request
        .get(url)
        .timeout(TIME_OUT)
        .query({authtoken: token()});
}

var Api = {
    getEntityData: function (entityId) {
        var url = makeUrl('?test=' + entityId);
        var key = GET_ENTITY_DATA;
        var params = {entityId: entityId};
        abortPendingRequests(key);
        dispatch(key, PENDING, params);
        _pendingRequests[key] = get(url).end(
            makeDigestFun(key, params)
        );
    }
};

export default Api;
