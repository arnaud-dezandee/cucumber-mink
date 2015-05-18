var Mink  = require('../../../lib/mink'),
    Ext   = Mink.Ext;

////////////////////////////

function submit (callback) {
  var myFormArray = [
    { field: 'input[name="first_name"]',      value: 'fn2' },
    { field: 'input[name="last_name"]',       value: 'ln2' },
    { field: 'textarea[name="description"]',  value: 'd2'  }
  ];

  var stepsArray = [
    {
      fn:   Ext.Navigation.browse,
      args: ['/form']
    },
    {
      fn:   Ext.Form.fillFields,
      args: [myFormArray]
    },
    {
      fn:   Ext.Action.click,
      args: ['button[type="submit"]']
    }
  ];

  return Mink.metaStep(stepsArray, callback);
}

////////////////////////////

module.exports = function() {
  this.Given(/^I submit the form$/, submit);
};
