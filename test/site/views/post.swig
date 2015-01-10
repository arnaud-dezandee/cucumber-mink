{% extends "layout/main.swig" %}

{% block title %}{{ post.title }}{% endblock %}

{% block content %}
    <div>
        <h1>Post Detail Page</h1>
        <div class="post">
            <h2 class="title">{{ post.title }}</h2>
            <p class="description">{{ post.description }}</p>
        </div>
    </div>
{% endblock %}
