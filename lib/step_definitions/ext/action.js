///////////////////

function click() {
  return function(Driver, selector, callback) {
    Driver.click(selector, callback);
  };
}

function action(method, errMessage) {
  return function(Driver, mixed, callback) {
    Driver[method](mixed, function (err, WebElement) {
      if (err || !WebElement) {
        callback.fail(new Error([errMessage, mixed].join(' ')));
      } else {
        Driver.click(WebElement, callback);
      }
    });
  };
}

///////////////////

module.exports = {
  click:  click(),
  follow: action('link', 'Unable to find a link with selector or text matching'),
  press:  action('button', 'Unable to find button / input[type=submit] with selector or text matching')
};
