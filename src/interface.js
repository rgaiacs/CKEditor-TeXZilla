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
    icons: 'texzilla',

    init: function( editor ) {
        CKEDITOR.dialog.add('texzillaDialog', this.path + 'dialogs/texzilla.js');

        editor.addCommand('texzillaDialog', new CKEDITOR.dialogCommand('texzillaDialog', {
          // Advanced Content Filter
          // TODO Add more tags
          allowedContent: 'math[xmlns] semantics mn mo msqrt annotation[encoding]',
          requiredContent: 'math mn mo msqrt'
        }));
        editor.ui.addButton('Insert MathML', {
            label: 'Insert MathML based on (La)TeX',
            command: 'texzillaDialog',
            toolbar: 'insert'
        });
    }
});
