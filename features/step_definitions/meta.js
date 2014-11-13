var MetaBuilder = require('../../cucumber-mink').Utils.MetaBuilder;

////////////////////////////

function submit (callback) {

  var myFormArray = [
    { field: 'first_name',  value: 'fn2' },
    { field: 'last_name',   value: 'ln2' },
    { field: 'description', value: 'd2'  }
  ];

  var stepsArray = [
    {
      name: 'visit',
      args: ['/form']
    },
    {
      name: 'fillFields',
      args: [myFormArray]
    },
    {
      name: 'pressButton',
      args: ['Register']
    }
  ];

  return MetaBuilder.call(this, stepsArray, callback);
}

////////////////////////////

module.exports = function() {
  this.Given(/^I submit the form$/, submit);
};
