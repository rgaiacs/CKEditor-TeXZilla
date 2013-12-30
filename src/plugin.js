CKEDITOR.plugins.add( 'texzilla', {
    requires: 'widget',
    icons: 'texzilla',

    init: function( editor ) {
        editor.widgets.add('texzilla', {
            button: 'Insert MathML',

            template:'<math xmlns="http://www.w3.org/1998/Math/MathML"><msqrt><mn>2</mn></msqrt></math>'
        });
    }
});
