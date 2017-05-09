const cookieExists = function (name) {
  return this.driver.client.getCookie(name).then(cookie => {
    if (!cookie) {
      throw new Error(`${name} cookie does not exist`);
    }
  });
};

const cookieDoesNotExist = function (name) {
  return this.driver.client.getCookie(name).then(cookie => {
    if (cookie) {
      throw new Error(`${name} cookie exists`);
    }
  });
};

const cookieValue = function (name, expected) {
  return this.driver.client.getCookie(name).then(cookie => {
    if (cookie.value !== expected) {
      throw new Error(`${name} cookie does not have expected value`);
    }
  });
};

/**
 * Interface
 */

export default [
  [/a cookie "([^"]*)" exists/, cookieExists],
  [/a cookie "([^"]*)" does not exist/, cookieDoesNotExist],
  [/cookie "([^"]*)" has value "([^"]*)"/, cookieValue],
];
