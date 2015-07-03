var AppStores = require('../stores/AppStores');
var Child = require('./child.react');

function getNewState(){
  return  {
            "time": new Date().toString(),
            "text": 'react flux works'
          }
}
var parentComponent = React.createClass({
    getInitialState: function() {
        return {
            "time": new Date().toString(),
            "text": "hello world!"
        }
    },
    componentDidMount: function() {
        AppStores.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        AppStores.removeChangeListener(this._onChange);
    },
    /**
     * Event handler for 'change' events coming from the AppStore
     */
    _onChange: function() {
        this.setState(getNewState());
    },

    render: function() {
        return ( 
          <div>
            <div>{this.state.time}</div>
            <Child data={this.state.text}/>
          </div>
        );
    }
});

module.exports = parentComponent;