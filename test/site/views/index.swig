{% extends "layout/main.swig" %}

{% block title %}Example Home{% endblock %}

{% block content %}
    <div>
        <h1>Home Page</h1>
        <div class="posts">
            <h2 class="content-subhead">All Post</h2>
            {% for post in posts %}
                {% include "partials/compact-post.swig" with { post: post } %}
            {% endfor %}
        </div>
    </div>
{% endblock %}
