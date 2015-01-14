#Available steps

Steps are defined by a regular expression usable inside .features files.

# Utility

#####`/^(?:|I )browse "([^"]*)"$/`

Set driver's baseUrl. Useful to use short path in subsequent navigation (ex: "/login")

``` gherkin
Background:
  Given I browse "http://127.0.0.1:3000/"
```

---

#####`/^I wait (\d+) seconds?$/`

Wait for X seconds.

``` gherkin
Given I wait 10 seconds
```

---

#####`/^the viewport is (\d+)px width and (\d+)px height$/`

Set browser viewport size, width and height in pixel.
The default viewport is: { width: 1366, height: 768 } (most used screen resolution).

``` gherkin
Given the viewport is 360px width and 568px height
```

# Navigation

---

#####`/^(?:|I )am on (?:|the )homepage$/`
#####`/^(?:|I )go to (?:|the )homepage$/`

Navigate to homepage, ie: baseUrl + '/'

``` gherkin
Given I am on the homepage
Given I go to the homepage
```

---

#####`/^(?:|I )am on "([^"]*)"$/`
#####`/^(?:|I )go to "([^"]*)"$/`

Browse given URL or path.

``` gherkin
Given I am on "/post/2"
Given I go to "/form"
```

---

#####`/^(?:|I )reload the page$/`

Refresh the current page.

``` gherkin
And I reload the page
```

---

#####`/^(?:|I )move backward one page$/`

Navigate backwards in the browser history, if possible.

``` gherkin
Then I move backward one page
```

# Action

#####`/^I click on "([^"]*)"$/`
#####`/^(?:|I )press "([^"]*)"$/`
#####`/^I follow "([^"]*)"$/`

Click on an element based on given selector.

``` gherkin
Then I click on "button.showModal"
  And I press "button.register"
  And I follow "a[href='/about']"
```

# Form manipulation

#####`/^(?:|I )fill in "([^"]*)" with "([^"]*)"$/`
#####`/^(?:|I )fill in "([^"]*)" with:$/`

Send a sequence of key strokes to an element (clears value before). You can also use unicode characters like Left arrow or Back space.
You’ll find all supported characters [here](https://code.google.com/p/selenium/wiki/JsonWireProtocol#/session/:sessionId/element/:id/value). To do that, the value has to correspond to a key from the table.

``` gherkin
Then I fill in "input[name='first_name']" with "My text"
Then I fill in "input[name='first_name']" with:
  """
  My long multi-line text ...
  """
```

---

#####`/^(?:|I )fill in the following:$/`

Fill multiples fields at once. Internally uses the above step.

``` gherkin
When I fill in the following:
  | input[name='first_name']     | John          |
  | input[name='last_name']      | Doe           |
  | textarea[name='description'] | Some text ... |
```

---

#####`/^(?:|I )select "([^"]*)" from "([^"]*)"$/`

Select option that display text matching the argument.

``` gherkin
And I select "France" from "select.country"
```

---

#####`/^(?:|I )check "([^"]*)"$/`
#####`/^(?:|I )uncheck "([^"]*)"$/`

``` gherkin
Then I check "#checkbox-input"
  And I uncheck "#checkbox-input-next"
```

---

# Assertion
## URL

#####`/^(?:|I )should be on "([^"]*)"$/`

Assert current URL pathname equals the given string.

``` gherkin
Then I should be on "/post/1"
```

---

#####`/^I should be on (?:|the )homepage$/`

Assert current URL pathname equals '/'.

``` gherkin
Then I should be on the homepage
```

---

#####`/^the url should match (.+)$/`

Assert current URL pathname match against provided RegExp.

``` gherkin
And the url should match ^\/post\/\d+
```

---

#####`/^the url parameter should match (.+)$/`

Assert current URL query string match against provided RegExp.

``` gherkin
And the url parameter should match ^\/post\/\d+
```

## DOM

#####`/^I should see "([^"]*)"$/`
#####`/^I should not see "([^"]*)"$/`

Assert page sources (with tags) contains / not contains the provided string.

``` gherkin
Then I should see "Home Page"
  And I should not see "Detail Page"
```

---

#####`/^I should see text matching (.+)$/`
#####`/^I should not see text matching (.+)$/`

Assert page sources (with tags) match / does not match with the provided RegExp.

``` gherkin
Then I should see text matching Post-\d+
    And I should not see text matching .+@.+
```

---

#####`/^I should see (\d+) "([^"]*)" elements?$/`

Assert page contains X DOM-elements with the provided CSS Selector.

``` gherkin
And I should see 3 "section.post" elements
```

---

#####`/^(?:|I )should see "([^"]*)" in the "([^"]*)" element$/`
#####`/^(?:|I )should not see "([^"]*)" in the "([^"]*)" element$/`

Assert DOM-element(s) with the provided CSS Selector contains / not contains the provided text.

``` gherkin
And I should see "Home Page" in the "h1" element
And I should not see "Post Detail Page" in the "h1" element
```

---

#####`/^I should see an? "([^"]*)" element$/`
#####`/^I should not see an? "([^"]*)" element$/`
#####`/^the "([^"]*)" element should be visible$/`
#####`/^the "([^"]*)" element should not be visible$/`

Assert if the selected DOM-element found by given selector is visible / not visible.

``` gherkin
And I should see an "h2.content-subhead" element
And I should not see an "p.description" element

And the "h2.content-subhead" element should be visible
And the "p.description" element should not be visible
```

---

#####`/^the "([^"]*)" element should exist$/`
#####`/^the "([^"]*)" element should not exist$/`

Assert if at least one element is existing by given selector

``` gherkin
And the "h2.content-subhead" element should exist
And the "p.description" element should not exist
```

## Form

#####`/^the "([^"]*)" field should contain "([^"]*)"$/`
#####`/^the "([^"]*)" field should not contain "([^"]*)"$/`

Assert if at least one element is existing by given selector

``` gherkin
Then the "textarea[name='description']" field should contain "My text"
Then the "textarea[name='description']" field should not contain "My first name"
```

---

#####`/^the "([^"]*)" checkbox should be checked$/`
#####`/^the "([^"]*)" checkbox should not be checked$/`
#####`/^the checkbox "([^"]*)" (?:is|should be) checked$/`
#####`/^the checkbox "([^"]*)" is (?:unchecked|not checked)$/`
#####`/^the checkbox "([^"]*)" should (?:be unchecked|not be checked)$/`

Assert if the selected DOM-element checkboxes is checked / unchecked.

``` gherkin
Then the "#checkbox-input" checkbox should be checked
Then the "#checkbox-input" checkbox should not be checked
```
