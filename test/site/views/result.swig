{% extends "layout/main.swig" %}

{% block title %}Result Page{% endblock %}

{% block content %}
<div>
    <h1>Result Page</h1>
    <div class="result">
        <h2>Parameters</h2>
        <p class="first-name">{{ request.first_name }}</p>
        <p class="last-name">{{ request.last_name }}</p>
        <p class="description">{{ request.description }}</p>
        <p class="country">{{ request.country }}</p>
        <p class="cb">{{ request.cb }}</p>

        <h2>JSON</h2>
        <pre class="code" data-language="json">{{ request | json }}</pre>
    </div>

</div>
{% endblock %}
