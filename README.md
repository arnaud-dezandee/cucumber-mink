# AGS Cucumber.js Mink

Step definitions library, see [`doc/steps.md`](https://github.com/AXA-GROUP-SOLUTIONS/ags-cucumber-mink/blob/master/doc/steps.md)

## Getting Started

To use this library for your own End-to-End Cucumber tests :

Install cucumber-js globally on your host : `npm install -g cucumber`

Add this to your package.json

```javascript
"dependencies": {
  "ags-cucumber-mink": "git+ssh://git@github.com:AXA-GROUP-SOLUTIONS/ags-cucumber-mink.git",
}
```

Create `cucumber-mink.js` file a the root of your project

```javascript
var mink = require('ags-cucumber-mink');

module.exports = function () {
  mink.call(this);
};
```

Run your test suite with `cucumber-js --require cucumber-mink.js`

Now you can use library steps inside your `features/__.feature` files !
