///////////////////

var Action = module.exports = {};

///////////////////

Action.click = function(Driver, selector, callback) {
  Driver.click(selector, callback);
};

Action.follow = function(Driver, mixed, callback) {
  Driver.link(mixed, function (err, WebElement) {
    if (err) { callback.fail(err); }
    else if (!WebElement) {
      callback.fail(new Error('Unable to find a link with selector or text matching: ' + mixed));
    } else {
      Driver.click(WebElement, callback);
    }
  });
};

Action.press = function(Driver, mixed, callback) {
  Driver.button(mixed, function (err, WebElement) {
    if (err) { callback.fail(err); }
    else if (!WebElement) {
      callback.fail(new Error('Unable to find button / input[type=submit] with selector or text matching: ' + mixed));
    } else {
      Driver.click(WebElement, callback);
    }
  });
};
