/////////////////// Exporting namespace-ed Mink's functions

module.exports = {
  Action:     require('./action'),
  Assert: {
    Dom:      require('./assert-dom'),
    Form:     require('./assert-form'),
    Url:      require('./assert-url')
  },
  Form:       require('./form'),
  Navigation: require('./navigation'),
  Utility:    require('./utility')
};
