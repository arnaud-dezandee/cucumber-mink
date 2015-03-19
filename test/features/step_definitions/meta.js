var mink  = require('../../../lib/mink'),
    Ext   = mink.Ext;

////////////////////////////

function submit (Driver, callback) {
  var myFormArray = [
    { field: 'input[name="first_name"]',      value: 'fn2' },
    { field: 'input[name="last_name"]',       value: 'ln2' },
    { field: 'textarea[name="description"]',  value: 'd2'  }
  ];

  var stepsArray = [
    {
      stepFunc: Ext.Navigation.browse,
      args:     ['/form']
    },
    {
      stepFunc: Ext.Form.fillFields,
      args:     [myFormArray]
    },
    {
      stepFunc: Ext.Action.click,
      args:     ['button[type="submit"]']
    }
  ];

  return mink.metaStep(Driver, stepsArray, callback);
}

////////////////////////////

function steps() {
  this.Given(/^I submit the form$/, submit);
}

module.exports = function() {
  steps.call(mink);
};
