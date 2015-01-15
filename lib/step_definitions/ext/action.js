///////////////////

function click (Driver, sSelector, callback) {
  Driver.click(sSelector, callback);
}

///////////////////

module.exports = {
  click: click
};
