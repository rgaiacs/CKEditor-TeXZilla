// CKEditor TeXZilla Plugin
// Copyright (C) 2014  Raniere Silva
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

CKEDITOR.dialog.add('texzillaDialog', function( editor ) {
    return {
        title: 'TeXZilla Edit Box',
        minWidth: 300,
        minHeight: 300,
        contents: [
            {
                id: 'basic',
                label: 'Basic Settings',
                elements: [
                    {
                        id: 'tex',
                        type: 'textarea',
                        label: '(La)TeX code (Click outside the textarea to update the preview)',
                        setup: function(element) {
                            this.setValue(TeXZilla.getTeXSource(element.$));
                        },
                        onChange: function() {
                            var preview = document.getElementById('Preview');
                            // Clean previous preview
                            var previous = preview.childNodes;
                            for(i = 0; i < previous.length; i++) {
                                preview.removeChild(previous[i]);
                            }
                            var mathElement = TeXZilla.toMathML(this.getValue());
                            preview.appendChild(mathElement);
                        }
                    },
                    {
                        id: 'display',
                        type: 'checkbox',
                        label: 'Display',
                        setup: function(element) {
                            var display = element.getAttribute("display");
                            if (display === 'block') {
                                this.setValue(true);
                            }
                            else {
                                this.setValue(false);
                            }
                        }
                    },
                    {
                        id: 'preview',
                        type: 'html',
                        label: 'Preview',
                        html: '<div><p>Preview:</p><div id="Preview"></div>',
                        setup: function(element) {
                            var preview = document.getElementById('Preview');
                            // Clean previous preview
                            var previous = preview.childNodes;
                            for(i = 0; i < previous.length; i++) {
                                preview.removeChild(previous[i]);
                            }
                            preview.appendChild(element.$.cloneNode(true));
                        }
                    }
                ]
            },
            {
                id: 'advanced',
                label: 'Advanced Settings',
                elements: [
                    {
                        id: 'direction',
                        type: 'checkbox',
                        label: 'RTL',
                        setup: function(element) {
                            var direction = element.getAttribute("dir");
                            if (direction === 'rtl') {
                                this.setValue(true);
                            }
                            else {
                                this.setValue(false);
                            }
                        }
                    }
                ]
            }
        ],
        onShow: function() {
            var selection = editor.getSelection();
            var element = selection.getStartElement();
            // Try to locate a `math` or `body` tag.
            while (element.getName() != 'math' &&
                    element.getName() != 'body') {
                element = element.getParent();
            }
            if (!element || element.getName() != 'math') {
                this.insertMode = true;
            }
            else {
                this.insertMode = false;
                this.mathRoot = element;
            }
            if (!this.insertMode) {
                // invoke the setup functions for the element
                this.setupContent( element );
            }
        },
        onOk: function() {
          var dialog = this;

          // This is the better way to insert the MathML, although we got
          //
          //     TypeError: element.getName is not a function
          //
          // when using it.
          //
          // var mathElement = TeXZilla.toMathML(dialog.getValueOf('basic', 'tex'));

          // This is a hack found at
          // http://stackoverflow.com/a/17339275/1802726.
          var math = TeXZilla.toMathMLString(
                  dialog.getValueOf('basic', 'tex'),
                  dialog.getValueOf('basic', 'display'),
                  dialog.getValueOf('advanced', 'direction'));
          var mathElement = CKEDITOR.dom.element.createFromHtml(math, editor.document);

          if(!this.insertMode) {
              // Remove old equation
              this.mathRoot.$.parentNode.removeChild(this.mathRoot.$);
          }
          editor.insertElement(mathElement);
        }
    };
} );
