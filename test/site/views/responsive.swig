{% extends "layout/main.swig" %}

{% block title %}Responsive Page{% endblock %}

{% block content %}
  <style>
    p.large, p.medium, p.small { display: none; }
    @media (min-width: 1200px){
      p.large { display: block; }
    }
    @media (min-width: 992px){
      p.medium { display: block; }
    }
    @media (min-width: 768px){
      p.small { display: block; }
    }
  </style>
  <div>
    <h1>Responsive Page</h1>
    <p class="large">Large content</p>
    <p class="medium">Medium content</p>
    <p class="small">Small content</p>
  </div>
{% endblock %}
