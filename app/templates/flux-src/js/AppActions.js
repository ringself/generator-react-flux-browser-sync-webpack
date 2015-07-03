var AppDispatcher = require('../dispatcher/AppDispatcher');
var actionType = require('./ActionType');

var AppActions = {
    log: function(params) {
        AppDispatcher.dispatch({
            actionType: actionType.ACTION_NAME,
            params: params
        });
    }
};

module.exports = AppActions;