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
                        label: 'TeX code'
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
                        label: 'Display'
                    }
                ]
            }
        ],
        onOk: function() {
          var dialog = this;

          math = TeXZilla.toMathML(dialog.getValueOf('basic', 'tex'));
          editor.insertHtml(math.outerHTML, 'unfiltered_html'); // Strip
          // editor.insertElement(math);  // TypeError: element.getName is not a function
        }
    };
} );
