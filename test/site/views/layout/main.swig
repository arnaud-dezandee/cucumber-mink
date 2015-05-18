<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="A layout example that shows off a blog page with a list of posts.">
        {#<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css">#}
        {#<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/grids-responsive-min.css">#}
        {#<link rel="stylesheet" href="http://purecss.io/combo/1.17.16?/css/layouts/blog.css">#}
        <title>{% block title %}Example{% endblock %}</title>
    </head>
    <body>
        <div id="layout" class="pure-g">
            <div class="sidebar pure-u-1 pure-u-md-1-4">
                <div class="header">
                    <h1 class="brand-title">Test Pages</h1>
                    <nav class="nav">
                        <ul class="nav-list">
                            <li class="nav-item">
                                <a class="pure-button" href="/">Home</a>
                                <a class="pure-button" href="/form">Forms</a>
                                <a href="/form">Follow me to form !</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div class="content pure-u-1 pure-u-md-3-4">
                {% block content %}
                {% endblock %}
            </div>
        </div>
    </body>
</html>
