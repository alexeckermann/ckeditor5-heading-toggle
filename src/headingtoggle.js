import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import HeadingToggleCommand from './headingtogglecommand';

export default class HeadingTogglePlugin extends Plugin {

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'HeadingToggle';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const options = this.editor.config.get( 'heading.options' );

		for (const option of options) {
			if ( option.modelElement !== 'paragraph' ) {
				let commandName = option.modelElement;

				editor.commands.add( commandName, new HeadingToggleCommand( editor, commandName ) );
				const command = editor.commands.get( commandName );

				editor.ui.componentFactory.add( commandName, locale => {
					const view = new ButtonView( locale );

					view.set( {
						label: option.title,
						icon: option.icon,
						tooltip: true
					} );

					view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

					this.listenTo( view, 'execute', () => editor.execute( commandName ) );

					return view;
				} );
			}

		}

	}

}
