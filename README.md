Heading Toggle — _When a dropdown just wont do_
===================================================

This plugin extends the functionality of the core [@ckeditor/ckeditor5-heading](https://github.com/ckeditor/ckeditor5-heading) plugin to give the option to use buttons to toggle a block to a heading element.

Useful for balloon editors to be able to keep a slimline bubble without the visual complexity of a dropdown.

## Documentation

Simply build your editor with this plugin and every heading element will be given a button UI component. The `HeadingToggleCommand` will execute with a button press and, as its name implies, toggle the element block between its associated heading or a paragraph.

### General Example

Using a balloon editor, we can add a toolbar item to show buttons for creating a `h2` or `h3` element. The button will have a `.ck-on` or `.ck-off` class which you can style as you see fit.

```
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';

import HeadingTogglePlugin from 'ckeditor5-heading-toggle/src/headingtoggle';

// .. all your other imports here
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import UnderlinePlugin from '@ckeditor/ckeditor5-basic-styles/src/underline';
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import HeadingPlugin from '@ckeditor/ckeditor5-heading/src/heading';

export default class MyEditor extends BalloonEditorBase { }

MyEditor.build = {
	// ... all your other configs here

	plugins: [
		EssentialsPlugin,
		HeadingPlugin,
		HeadingTogglePlugin,
		// ... all your other plugins here
		BoldPlugin,
		ItalicPlugin,
		UnderlinePlugin,
		LinkPlugin
	],
	config: {
		heading: {
			options: [
				{ modelElement: 'heading1', viewElement: 'h2', title: 'Title', class: 'ck-heading_heading1' },
				{ modelElement: 'heading2', viewElement: 'h3', title: 'Subheading', class: 'ck-heading_heading2' }
			]
		},
		toolbar: {
			items: [
				'heading1',
				'heading2',
				'|',
				'bold',
				'italic',
				'underline',
				'link',
				'|',
				'undo',
				'redo'
			]
		}

};
```

## Testing

TODO _Sorry..._

## License

Licensed under the GPL, LGPL and MPL licenses, at your choice. For full details about the license, please check the `LICENSE.md` file.
