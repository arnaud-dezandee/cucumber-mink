# PhantomJS

## Prerequisites

* [PhantomJS](http://phantomjs.org/download.html)

The binary `phantomjs` should be ready to use:

``` bash
$ phantomjs -v
1.9.8
```

## Usage

* Enable cucumber-mink with WebDriverIO driver using [phantomjs.js](phantomjs.js) as an example bootstrap file.
* Launch Phantomjs in "Remote WebDriver mode": `phantomjs -w`

## Additional Options
### HTTPS
If your site runs over HTTPS with an untrusted certificate, launch phantomjs using:
``` bash
phantomjs -w --ignore-ssl-errors=yes
```

### Custom Headers
You can pass in custom HTTP Header through phantomjs if needed. Here is an example for a Basic Authentication header:

``` javascript
var parameters = {
  driver: {
    type: 'webdriverio',
    options : {
      desiredCapabilities: {
        'browserName': 'phantomjs',
        'phantomjs.page.customHeaders.Authorization' : 'Basic '+ new Buffer('login:password').toString('base64')
      },
      logLevel: 'silent',
      port: 8910
    }
  }
};
```
