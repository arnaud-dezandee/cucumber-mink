///////////////////

function click (sSelector, callback) {
  this.driver.click(sSelector, callback);
}

///////////////////

module.exports = {
  click: click
};
