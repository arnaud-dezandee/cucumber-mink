var async   = require('async'),
    chai    = require('chai'),
    expect  = chai.expect;

module.exports = {

  setBaseUrl: function (url, callback) {
    this.browser.site = url;
    callback();
  },

  iAmOnHomepage: function (callback) {
    this.browser.visit('/', function (error) {
      if (error) callback.fail(new Error("Can't load Homepage page !"));
      else callback();
    });
  },

  visit: function (url, callback) {
    this.browser.visit(url, function (error) {
      if (error) callback.fail(new Error("Can't load requested url ! " + error));
      else callback();
    });
  },

  visitWithError: function (url, code, callback) {
    this.browser.visit(url, function (error) {
      expect(error).to.exist
        .and.be.instanceof(Error)
        .and.have.property('message').to.contain(code);
      callback();
    });
  },

  reload: function (callback) {
    this.browser.reload(function (error) {
      if (error) callback.fail(new Error("Can't reload current page ! " + error));
      else callback();
    });
  },

  back: function (callback) {
    this.browser.back(function (error) {
      if (error) callback.fail(new Error("Can't navigate to the previous page ! " + error));
      else callback();
    });
  },

  // CSS selector, button name or button text
  pressButton: function (button, callback) {
    var element = this.browser.button(button);
    if (element) {
      this.browser.pressButton(button, callback);
    } else {
      callback.fail(new Error("Unable to find button|input with selector : " + button));
    }
  },

  // CSS selector or text contents (case sensitive, but ignores leading/trailing spaces)
  clickLink: function (link, callback) {
    var element = this.browser.link(link);
    if (element) {
      this.browser.clickLink(link, callback);
    } else {
      callback.fail(new Error("Unable to find link with selector : " + link));
    }
  },

  fillField: function (field, value, callback) {
    var element = this.browser.field(field);
    if (element) {
      this.browser.fill(field, value);
      callback();
    } else {
      callback.fail(new Error("Unable to find form field with selector|name : " + field));
    }
  },

  fillFields: function (fields, callback) {
    var self = this;

    async.each(fields.raw(), function (row, cb) {
      var element = self.browser.field(row[0]);
      if (element) {
        self.browser.fill(row[0], row[1]);
        cb();
      } else {
        cb("Unable to find form field with selector|name|title : " + row[0]);
      }
    }, function (err) {
      if (err) callback.fail(new Error(err));
      else callback();
    });
  },

  selectOption: function (option, select, callback) {
    var element = this.browser.field(select);
    if (element) {
      this.browser.select(select, option);
      callback();
    } else {
      callback.fail(new Error("Unable to find select field with selector : " + select + " or unavailable option : " + option));
    }
  },

  checkOption: function (option, callback) {
    var element = this.browser.field(option);
    if (element) {
      this.browser.check(option);
      callback();
    } else {
      callback.fail(new Error("Unable to find checkbox field with selector|name : " + option));
    }
  },

  uncheckOption: function (option, callback) {
    var element = this.browser.field(option);
    if (element) {
      this.browser.uncheck(option);
      callback();
    } else {
      callback.fail(new Error("Unable to find checkbox field with selector|name : " + option));
    }
  },

  assertPageAddress: function (url, callback) {
    expect(this.browser.location.pathname).to.equal(url);
    callback();
  },

  assertHomepage: function (callback) {
    expect(this.browser.location.pathname).to.equal('/');
    callback();
  },

  assertUrlRegExp: function (pattern, callback) {
    expect(this.browser.location.pathname).to.match(new RegExp(pattern));
    callback();
  },

  assertResponseStatus: function (code, callback) {
    expect(this.browser.statusCode).to.equal(parseInt(code));
    callback();
  },

  assertResponseStatusIsNot: function (code, callback) {
    expect(this.browser.statusCode).to.not.equal(parseInt(code));
    callback();
  },

  assertPageContainsText: function (text, callback) {
    expect(this.browser.html()).to.contain(text);
    callback();
  },

  assertPageNotContainsText: function (text, callback) {
    expect(this.browser.html()).to.not.contain(text);
    callback();
  },

  assertPageMatchesText: function (pattern, callback) {
    expect(this.browser.html()).to.match(new RegExp(pattern));
    callback();
  },

  assertPageNotMatchesText: function (pattern, callback) {
    expect(this.browser.html()).to.not.match(new RegExp(pattern));
    callback();
  },

  assertElementContainsText: function (text, element, callback) {
    expect(this.browser.html(element)).to.contain(text);
    callback();
  },

  assertElementNotContainsText: function (text, element, callback) {
    expect(this.browser.html(element)).to.not.contain(text);
    callback();
  },

  assertElementOnPage: function (element, callback) {
    var nodeElement = this.browser.query(element);
    if (nodeElement) callback();
    else {
      callback.fail(new Error("Unable to find element with selector : " + element));
    }
  },

  assertElementNotOnPage: function (element, callback) {
    var nodeElement = this.browser.query(element);
    if (nodeElement) {
      callback.fail(new Error("Found an element with selector : " + element + ", but it should not."));
    }
    else callback();
  },

  assertFieldContains: function (field, value, callback) {
    var fieldNode = this.browser.field(field);
    if (fieldNode) {
      expect(fieldNode.value).to.contain(value);
      callback();
    } else {
      callback.fail(new Error("Unable to find form field with selector|name : " + field));
    }
  },

  assertFieldNotContains: function (field, value, callback) {
    var fieldNode = this.browser.field(field);
    if (fieldNode) {
      expect(fieldNode.value).to.not.contain(value);
      callback();
    } else {
      callback.fail(new Error("Unable to find form field with selector|name : " + field));
    }
  },

  assertCheckboxChecked: function (checkbox, callback) {
    var checkboxNode = this.browser.field(checkbox);
    if (checkboxNode) {
      expect(checkboxNode.checked).to.be.true;
      callback();
    } else {
      callback.fail(new Error("Unable to find checkbox field with selector|name : " + checkbox));
    }
  },

  assertCheckboxNotChecked: function (checkbox, callback) {
    var checkboxNode = this.browser.field(checkbox);
    if (checkboxNode) {
      expect(checkboxNode.checked).to.be.false;
      callback();
    } else {
      callback.fail(new Error("Unable to find checkbox field with selector|name : " + checkbox));
    }
  },

  assertNumElements: function (num, element, callback) {
    var nodes = this.browser.queryAll(element);
    if (nodes.length == 0) {
      callback.fail(new Error("Unable to elements with selector : " + element));
    } else {
      expect(nodes.length).to.equal(parseInt(num));
      callback();
    }
  },

  click: function (element, callback) {
    var node = this.browser.query(element);
    if (node) {
      this.browser.click(element, callback);
    } else {
      callback.fail(new Error("Unable to find element to click on with selector : " + element));
    }
  },

  wait: function (sec, callback) {
    setTimeout(callback, parseInt(sec) * 1000);
  }

};
