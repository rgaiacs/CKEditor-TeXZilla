CKEditor TeXZilla Plugin
========================

This is a plugin for [CKEditor](http://ckeditor.com) that use
[TeXZilla](https://github.com/fred-wang/TeXZilla) to insert MathML from TeX
input.

Dependencies
------------

All dependencies of TeXZilla must be satisfied.

Build
-----

First you have to download CKEditor and TeXZilla:

  $ git submodule update --init

After that just

  $ make build

Install
-------

Just

  $ make deploy

To see the plugin in action,
open `ckeditor/plugins/texzilla/samples/index.html` with a web browser that
support MathML (e.g. Firefox).

TODO
----

- Test the plugin with [Kuma](https://github.com/mozilla/kuma)

Missing Features (Easy to implement)
------------------------------------

Missing Features (Hard to implement)
------------------------------------

Bugs
----

- The direction option is ignored in the preview.
