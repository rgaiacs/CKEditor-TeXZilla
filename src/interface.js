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

CKEDITOR.plugins.add( 'texzilla', {
    requires: 'widget',
    icons: 'texzilla',

    init: function( editor ) {
        CKEDITOR.dialog.add('texzilla', this.path + 'dialogs/texzilla.js');

        editor.widgets.add('texzilla', {
            button: 'Insert MathML',

            // The MathML element will be place inside the span
            template: "<span class='texzilla'><span>",

            parts: {
                span: 'span'
            },

            defaults: {
                // This is the default example.
                // TODO: Replace the example with something better.
                tex: '\\sqrt{2}'
            },

            dialog: 'texzilla',

            // read the data of the widget from DOM and set this data.
            init: function() {
                // Look like that CKEditor store the text in the widget by
                // default.
            },

            // is executed every time the widget data is changed
            data: function() {
                // Parse the TeX to MathML
                math = TeXZilla.toMathML(this.data.tex, false);
                // Add MathML in the widget
                this.element.setHtml(math.outerHTML);
            }
        });
    }
});
