CKEditor TeXZilla Plugin
========================

This is a plugin for [CKEditor](http://ckeditor.com) that use
[TeXZilla](https://github.com/fred-wang/TeXZilla) to insert MathML from TeX
input.

Dependencies
------------

All dependencies of TeXZilla must be satisfied.

Building
--------

First you have to download CKEditor and TeXZilla:

  $ git submodule update --init

After that just

  $ make build

See sample
----------

First

  $ make deploy

Than open `ckeditor/plugins/texzilla/samples/index.html` with a web browser that
support MathML (e.g. Firefox).

Missing Features (Easy to implement)
------------------------------------

- Set icon properly

Missing Features (Hard to implement)
------------------------------------

Bugs
----
