var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var actionType = require('../actions/ActionType');

var EVENT_CHANGE = 'store::change';
var AppStores = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
        this.on(EVENT_CHANGE, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(EVENT_CHANGE, callback);
    },
    emitChange: function() {
        this.emit(EVENT_CHANGE);
    },
});

AppDispatcher.register(function(payload) {
    var action = payload;
    switch (action.actionType) {
        case actionType.ACTION_NAME:
            return doSomeThing(action.params);
        default:
            return true;
    }
});

function doSomeThing(params) {
    console.log(params);
    // update render
    AppStores.emitChange();
}

module.exports = AppStores;