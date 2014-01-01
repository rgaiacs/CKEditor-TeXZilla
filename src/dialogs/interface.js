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
        minHeight: 200,
        contents: [
            {
                id: 'basic',
                label: 'Basic Settings',
                elements: [
                    {
                        id: 'tex',
                        type: 'textarea',
                        label: 'TeX code',
                        setup: function(element) {
                            // TODO Look for <annotation encoding="TeX">
                            // TODO Look for <math alttext=""> as fallback
                        }
                    }
                ]
            },
            {
                id: 'advanced',
                label: 'Advanced Settings',
                elements: [
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
                this.mathRoot = element;
            }
            if (!this.insertMode) {
                // invoke the setup functions for the element
                this.setupContent( element );
            }
        },
        onOk: function() {
          var dialog = this;

          math = TeXZilla.toMathML(dialog.getValueOf('basic', 'tex'));
          editor.insertHtml(math.outerHTML, 'unfiltered_html'); // Strip
          // editor.insertElement(math);  // TypeError: element.getName is not a function
        }
    };
} );
