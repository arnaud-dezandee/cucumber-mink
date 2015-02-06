///////////////////

function action(method) {
  return function(Driver, selector, callback) {
    Driver[method](selector, callback);
  };
}

function click(method, errMessage) {
  return function(Driver, mixed, callback) {
    Driver[method](mixed, function (err, WebElement) {
      if (err || !WebElement) {
        callback(new Error([errMessage, mixed].join(' ')));
      } else {
        Driver.click(WebElement, callback);
      }
    });
  };
}

///////////////////

module.exports = {
  click:  action('click'),
  hover:  action('hover'),
  submit: action('submitForm'),
  follow: click('link', 'Unable to find a link with selector or text matching'),
  press:  click('button', 'Unable to find button / input[type=submit] with selector or text matching')
};
