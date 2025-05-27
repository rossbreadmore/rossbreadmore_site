---
title: Ross Breadmore
layout: post.njk
---
 
A collection of things I'm making and doing and thinking:

<ul>
{% for post in collections.posts %}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a> — {{ post.date | date: "%B %d, %Y" }}</li>
{% endfor %}
</ul>
