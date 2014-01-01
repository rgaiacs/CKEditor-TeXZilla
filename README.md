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

Bugs
----

1. Use the source view break the widgets.

When change to the source code editor the widget is lost and because of this
when back to the WYSIWYG it just show MathML.

If it strip the MathML you need to add `config.allowedContent = true;`. More
information at http://docs.ckeditor.com/#!/api/CKEDITOR.config.

2. Can't place text around the MathML element.

CKEditor insert a `div` tag for the widget and some information in the first tag
of the template:

```
<div class="cke_widget_wrapper cke_widget_block cke_widget_selected"
contenteditable="false" tabindex="-1" data-cke-widget-wrapper="1"
data-cke-filter="off" data-cke-display-name="p" data-cke-widget-id="0">
  <p class="texzilla cke_widget_element" data-cke-widget-keep-attr="0"
  data-widget="texzilla" data-cke-widget-data="{"tex":"\\sqrt{2}"}">
    <math xmlns="http://www.w3.org/1998/Math/MathML"></math>
  </p>
  <span class="cke_reset cke_widget_drag_handler_container"
  style="background:
  url('file:///home/raniere/src/ck-texzilla/ckedit…or/plugins/widget/images/handle.png"></span>
</div>
```
