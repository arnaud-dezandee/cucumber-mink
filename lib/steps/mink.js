var async   = require('async'),
    chai    = require('chai'),
    expect  = chai.expect;

module.exports = {
  setBaseUrl: setBaseUrl,
  iAmOnHomepage: iAmOnHomepage,
  visit: visit,
  visitWithError: visitWithError,
  reload: reload,
  back: back,
  click: click,
  wait: wait,
  pressButton: pressButton,
  clickLink: clickLink,
  fillField: fillField,
  fillFieldsHashDataTable: fillFieldsHashDataTable,
  fillFields: fillFields,
  selectOption: selectOption,
  checkOption: checkOption,
  uncheckOption: uncheckOption,
  assertPageAddress: assertPageAddress,
  assertHomepage: assertHomepage,
  assertUrlRegExp: assertUrlRegExp,
  assertResponseStatus: assertResponseStatus,
  assertResponseStatusIsNot: assertResponseStatusIsNot,
  assertPageContainsText: assertPageContainsText,
  assertPageNotContainsText: assertPageNotContainsText,
  assertPageMatchesText: assertPageMatchesText,
  assertPageNotMatchesText: assertPageNotMatchesText,
  assertElementContainsText: assertElementContainsText,
  assertElementNotContainsText: assertElementNotContainsText,
  assertElementOnPage: assertElementOnPage,
  assertElementNotOnPage: assertElementNotOnPage,
  assertFieldContains: assertFieldContains,
  assertFieldNotContains: assertFieldNotContains,
  assertCheckboxChecked: assertCheckboxChecked,
  assertCheckboxNotChecked: assertCheckboxNotChecked,
  assertNumElements: assertNumElements
};

////////////////////////////

function setBaseUrl (url, callback) {
  this.browser.site = url;
  callback();
}

function iAmOnHomepage (callback) {
  this.browser.visit('/', function (error) {
    if (error) {
      callback.fail(new Error('Can\'t load Homepage page !'));
    } else {
      callback();
    }
  });
}

function visit (url, callback) {
  this.browser.visit(url, function (error) {
    if (error) {
      callback.fail(new Error('Can\'t load requested url ! ' + error));
    } else {
      callback();
    }
  });
}

function visitWithError (url, code, callback) {
  this.browser.visit(url, function (error) {
    expect(error).to.exist
      .and.be.instanceof(Error)
      .and.have.property('message').to.contain(code);
    callback();
  });
}

function reload (callback) {
  this.browser.reload(function (error) {
    if (error) {
      callback.fail(new Error('Can\'t reload current page ! ' + error));
    } else {
      callback();
    }
  });
}

function back (callback) {
  this.browser.back(function (error) {
    if (error) {
      callback.fail(new Error('Can\'t navigate to the previous page ! ' + error));
    } else {
      callback();
    }
  });
}

// CSS selector, button name or button text
function pressButton (button, callback) {
  var element = this.browser.button(button);
  if (element) {
    this.browser.pressButton(button, callback);
  } else {
    callback.fail(new Error('Unable to find button|input with selector : ' + button));
  }
}

// CSS selector or text contents (case sensitive, but ignores leading/trailing spaces)
function clickLink (link, callback) {
  var element = this.browser.link(link);
  if (element) {
    this.browser.clickLink(link, callback);
  } else {
    callback.fail(new Error('Unable to find link with selector : ' + link));
  }
}

function fillField (field, value, callback) {
  var element = this.browser.field(field);
  if (element) {
    this.browser.fill(field, value);
    callback();
  } else {
    callback.fail(new Error('Unable to find form field with selector|name : ' + field));
  }
}

function fillFieldsHashDataTable (hashDataTable, callback) {
  var fieldsArray = [];

  hashDataTable.raw().forEach(function (element) {
    fieldsArray.push({
      field: element[0],
      value: element[1]
    });
  });

  return fillFields.call(this, fieldsArray, callback);
}

function fillFields (fieldsArray, callback) {
  var self = this;

  async.eachSeries(
    fieldsArray,

    function (object, cb) {
      var element = self.browser.field(object.field);
      if (element) {
        self.browser.fill(object.field, object.value);
        cb();
      } else {
        cb('Unable to find form field with selector|name|title : ' + object.field);
      }
    },

    function (err) {
      if (err) {
        callback.fail(new Error(err));
      } else {
        callback();
      }
    }

  );
}

function selectOption (option, select, callback) {
  var element = this.browser.field(select);
  if (element) {
    this.browser.select(select, option);
    callback();
  } else {
    callback.fail(
      new Error('Unable to find select field with selector : ' + select + ' or unavailable option : ' + option)
    );
  }
}

function checkOption (option, callback) {
  var element = this.browser.field(option);
  if (element) {
    this.browser.check(option);
    callback();
  } else {
    callback.fail(new Error('Unable to find checkbox field with selector|name : ' + option));
  }
}

function uncheckOption (option, callback) {
  var element = this.browser.field(option);
  if (element) {
    this.browser.uncheck(option);
    callback();
  } else {
    callback.fail(new Error('Unable to find checkbox field with selector|name : ' + option));
  }
}

function assertPageAddress (url, callback) {
  expect(this.browser.location.pathname).to.equal(url);
  callback();
}

function assertHomepage (callback) {
  expect(this.browser.location.pathname).to.equal('/');
  callback();
}

function assertUrlRegExp (pattern, callback) {
  expect(this.browser.location.pathname).to.match(new RegExp(pattern));
  callback();
}

function assertResponseStatus (code, callback) {
  expect(this.browser.statusCode).to.equal(parseInt(code));
  callback();
}

function assertResponseStatusIsNot (code, callback) {
  expect(this.browser.statusCode).to.not.equal(parseInt(code));
  callback();
}

function assertPageContainsText (text, callback) {
  expect(this.browser.html()).to.contain(text);
  callback();
}

function assertPageNotContainsText (text, callback) {
  expect(this.browser.html()).to.not.contain(text);
  callback();
}

function assertPageMatchesText (pattern, callback) {
  expect(this.browser.html()).to.match(new RegExp(pattern));
  callback();
}

function assertPageNotMatchesText (pattern, callback) {
  expect(this.browser.html()).to.not.match(new RegExp(pattern));
  callback();
}

function assertElementContainsText (text, element, callback) {
  expect(this.browser.html(element)).to.contain(text);
  callback();
}

function assertElementNotContainsText (text, element, callback) {
  expect(this.browser.html(element)).to.not.contain(text);
  callback();
}

function assertElementOnPage (element, callback) {
  var nodeElement = this.browser.query(element);
  if (nodeElement) {
    callback();
  } else {
    callback.fail(new Error('Unable to find element with selector : ' + element));
  }
}

function assertElementNotOnPage (element, callback) {
  var nodeElement = this.browser.query(element);
  if (nodeElement) {
    callback.fail(new Error('Found an element with selector : ' + element + ', but it should not.'));
  } else {
    callback();
  }
}

function assertFieldContains (field, value, callback) {
  var fieldNode = this.browser.field(field);
  if (fieldNode) {
    expect(fieldNode.value).to.contain(value);
    callback();
  } else {
    callback.fail(new Error('Unable to find form field with selector|name : ' + field));
  }
}

function assertFieldNotContains (field, value, callback) {
  var fieldNode = this.browser.field(field);
  if (fieldNode) {
    expect(fieldNode.value).to.not.contain(value);
    callback();
  } else {
    callback.fail(new Error('Unable to find form field with selector|name : ' + field));
  }
}

function assertCheckboxChecked (checkbox, callback) {
  var checkboxNode = this.browser.field(checkbox);
  if (checkboxNode) {
    expect(checkboxNode.checked).to.be.true;
    callback();
  } else {
    callback.fail(new Error('Unable to find checkbox field with selector|name : ' + checkbox));
  }
}

function assertCheckboxNotChecked (checkbox, callback) {
  var checkboxNode = this.browser.field(checkbox);
  if (checkboxNode) {
    expect(checkboxNode.checked).to.be.false;
    callback();
  } else {
    callback.fail(new Error('Unable to find checkbox field with selector|name : ' + checkbox));
  }
}

function assertNumElements (num, element, callback) {
  var nodes = this.browser.queryAll(element);
  if (nodes.length === 0) {
    callback.fail(new Error('Unable to elements with selector : ' + element));
  } else {
    expect(nodes.length).to.equal(parseInt(num));
    callback();
  }
}

function click (element, callback) {
  var node = this.browser.query(element);
  if (node) {
    this.browser.click(element, callback);
  } else {
    callback.fail(new Error('Unable to find element to click on with selector : ' + element));
  }
}

function wait (sec, callback) {
  setTimeout(callback, parseInt(sec) * 1000);
}
