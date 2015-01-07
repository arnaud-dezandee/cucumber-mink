var Mink        = require('../../mink'),
    Ext         = Mink.Steps.Ext,
    MetaBuilder = Mink.Utils.MetaBuilder;

////////////////////////////

function submit (callback) {

  var myFormArray = [
    { field: 'input[name="first_name"]',      value: 'fn2' },
    { field: 'input[name="last_name"]',       value: 'ln2' },
    { field: 'textarea[name="description"]',  value: 'd2'  }
  ];

  var stepsArray = [
    {
      stepFunc: Ext.Navigation.browse,
      args: ['/form']
    },
    {
      stepFunc: Ext.Form.fillFields,
      args: [myFormArray]
    },
    {
      stepFunc: Ext.Action.click,
      args: ['button[type="submit"]']
    }
  ];

  return MetaBuilder.call(this, stepsArray, callback);
}

////////////////////////////

module.exports = function() {
  this.Given(/^I submit the form$/, submit);
};
