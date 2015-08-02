{% extends "layout/main.swig" %}

{% block title %}Keys Page{% endblock %}

{% block content %}
  <div>
    <h1>Keys Page</h1>
    <label for="keys">Type here:</label>
    <input id="keys" type="text"/>
    <p id="result"></p>
  </div>
  <script>
    var input = document.getElementById('keys');
    var result = document.getElementById('result');
    input.onkeydown = function(event) {
      result.innerHTML = event.keyCode;
    };
  </script>
{% endblock %}
