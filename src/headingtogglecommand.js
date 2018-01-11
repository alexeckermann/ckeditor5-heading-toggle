import Command from '@ckeditor/ckeditor5-core/src/command';
import Position from '@ckeditor/ckeditor5-engine/src/model/position';
import first from '@ckeditor/ckeditor5-utils/src/first';

export default class HeadingToggleCommand extends Command {
	/**
	 * Creates an instance of the command.
	 *
	 * @param {module:core/editor/editor~Editor} editor Editor instance.
	 * @param {String} modelElement Name of the element which this command will apply in the model.
	 */
	constructor( editor, modelElement ) {
		super( editor );

		/**
		 * Unique identifier of the command, also element's name in the model.
		 * See {@link module:heading/heading~HeadingOption}.
		 *
		 * @readonly
		 * @member {String}
		 */
		this.modelElement = modelElement;
	}

	/**
	 * @inheritDoc
	 */
	refresh() {
		const block = first( this.editor.document.selection.getSelectedBlocks() );

		this.value = !!block && block.is( this.modelElement );
		this.isEnabled = !!block && checkCanBecomeHeading( block, this.modelElement, this.editor.document.schema );
	}

	/**
	 * Executes the command. Applies the heading to the selected blocks or, if the first selected
	 * block is a heading already, turns selected headings (of this level only) to paragraphs.
	 *
	 * @fires execute
	 * @param {Object} [options] Options for executed command.
	 * @param {module:engine/model/batch~Batch} [options.batch] Batch to collect all the change steps.
	 * New batch will be created if this option is not set.
	 */
	execute( options = {} ) {
		const editor = this.editor;
		const document = editor.document;

		document.enqueueChanges( () => {
			const batch = options.batch || document.batch();
			const blocks = Array.from( document.selection.getSelectedBlocks() )
				.filter( block => {
					return checkCanBecomeHeading( block, this.modelElement, document.schema );
				} );

			for ( const block of blocks ) {
				if ( !block.is( this.modelElement ) ) {
					batch.rename( block, this.modelElement );
				} else {
					batch.rename( block, 'paragraph' );
				}
			}
		} );
	}
}

// Checks whether the given block can be replaced by a specific heading.
//
// @private
// @param {module:engine/model/element~Element} block A block to be tested.
// @param {module:heading/headingcommand~HeadingCommand#modelElement} heading Command element name in the model.
// @param {module:engine/model/schema~Schema} schema The schema of the document.
// @returns {Boolean}
function checkCanBecomeHeading( block, heading, schema ) {
	return schema.check( {
		name: heading,
		inside: Position.createBefore( block )
	} );
}
