{% extends "layout/main.swig" %}

{% block title %}Form Page{% endblock %}

{% block content %}
<div>
    <h1>Form Page</h1>
    <form method="post" id="register-form" class="pure-form pure-form-aligned" action="/result">
        <fieldset>
            <div class="pure-control-group">
                <label for="first-name">First Name</label>
                <input id="first-name" name="first_name" type="text" placeholder="First Name">
            </div>

            <div class="pure-control-group">
                <label for="last-name">Last Name</label>
                <input id="last-name" name="last_name" type="text" placeholder="Last Name">
            </div>

            <div class="pure-control-group">
              <label for="disabled-input">Disabled Input</label>
              <input id="disabled-input" name="disabled_input" type="text" value="Static value" disabled>
            </div>

            <div class="pure-control-group">
                <label for="description">Description</label>
                <textarea id="description" name="description" placeholder="Description"></textarea>
            </div>

            <div class="pure-control-group">
                <label for="country">Country</label>
                <select name="country" id="country">
                    <option value="0">France</option>
                    <option value="1">Italy</option>
                    <option value="2">USA</option>
                    <option value="3">UK</option>
                </select>
            </div>

            <div class="pure-controls">
                <label for="cb" class="pure-checkbox">
                    <input id="cb" name="cb" type="checkbox"> Accept ?
                </label>
            </div>
            <input type="submit" class="pure-button pure-button-primary" value="Input-Register" />
            <button type="submit" class="pure-button pure-button-primary">Button-Register</button>
            <button type="submit" class="pure-button pure-button-primary">Weird button '-' <span>text</span></button>
        </fieldset>
    </form>
</div>
{% endblock %}
