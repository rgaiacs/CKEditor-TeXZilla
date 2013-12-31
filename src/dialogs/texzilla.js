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

CKEDITOR.dialog.add('texzilla', function( editor ) {
    return {
        title: 'TeXZilla Edit Box',
        minWidth: 200,
        minHeight: 100,
        contents: [
            {
                id: 'info',
                elements: [
                    {
                        id: 'tex',
                        type: 'textarea',
                        label: 'TeX code',
                        setup: function(widget) {
                            this.setValue(widget.data.tex);
                        },
                        commit: function(widget) {
                            widget.setData('tex', this.getValue());
                        }
                    }
                ]
            }
        ]
    };
} );
