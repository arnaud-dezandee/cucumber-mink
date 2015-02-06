{% extends "layout/main.swig" %}

{% block title %}Action{% endblock %}

{% block content %}
    <div>
        <h1>Action Test page</h1>
        <style type="text/css">
          .hover-test .one { display: inline; }
          .hover-test .two { display: none; }
          .hover-test:hover .one { display: none; }
          .hover-test:hover .two { display: inline; }
        </style>
        <div class="hover-test">
            <h2 class="one">Hover_one</h2>
            <h2 class="two">Hover_two</h2>
        </div>
    </div>
{% endblock %}
