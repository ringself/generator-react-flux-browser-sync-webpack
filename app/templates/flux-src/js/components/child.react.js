var AppActions = require('../actions/AppActions');

var childComponent = React.createClass({
  handlerClick:function(){
    AppActions.log("react flux works");
  },
  render: function () {
    var text = this.props.data;
    return (
        <p onClick={this.handlerClick}>
          {text}
        </p>
    );
  }
});

module.exports = childComponent; 

