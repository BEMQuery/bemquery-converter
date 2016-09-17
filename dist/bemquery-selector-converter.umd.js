/*! bemquery-selector-converter v0.1.4 | (c) 2016 BEMQuery team | MIT license (see LICENSE) */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.bemquerySelectorConverter = global.bemquerySelectorConverter || {})));
}(this, (function (exports) { 'use strict';

/** Simple class representing selector */
class Selector {
	/**
	 * Creates new Selector instance.
	 *
	 * @param {String} BEM BEM version of selector.
	 * @param {String} CSS CSS version of selector.
	 */
	constructor( BEM, CSS ) {
		/**
		 * BEM version of selector.
		 *
		 * @property {String}
		 */
		this.BEM = BEM;

		/**
		 * CSS version of selector.
		 *
		 * @property {String}
		 */
		this.CSS = CSS;

		Object.freeze( this );
	}
}

function endsWithModifier( selector, bemConfig ) {
	const regex = new RegExp( `[^${bemConfig.elemSeparator}${bemConfig.modifierSeparator}]+${bemConfig.modifierSeparator}[^${bemConfig.elemSeparator}${bemConfig.modifierSeparator}]+$`,
		'g' );

	return !!selector.match( regex );
}

function getSelectorWithoutModifier( selector, modifierSeparator ) {
	return ` ${selector.substring( selector.lastIndexOf( '.' ), selector.lastIndexOf( modifierSeparator ) )}`;
}

const defaultConfig = {
	bem: {
		elemSeparator: '__',
		modifierSeparator: '_'
	},
	rules: {
		default( token ) {
			return `.${token}`;
		},

		' > '( token, config ) {
			return ` ${config.rules.default( token )}`;
		},

		' '( token, config, selector ) {
			if ( endsWithModifier( selector, config.bem ) ) {
				return `${getSelectorWithoutModifier( selector, config.bem.modifierSeparator )}${config.bem.elemSeparator}${token}`;
			}

			return `${config.bem.elemSeparator}${token}`;
		},

		':'( token, config ) {
			return `${config.bem.modifierSeparator}${token}`;
		}
	}
};

function convertToken( tokens, config, selector = '' ) {
	const rules = config.rules;
	const delimeter = tokens.shift();
	let rule;
	let token;

	if ( !delimeter ) {
		return selector;
	} else if ( !selector ) {
		token = delimeter;
		rule = rules.default;
	} else {
		token = tokens.shift();
		rule = rules[ delimeter ];
	}

	if ( typeof rule !== 'function' ) {
		throw new SyntaxError( 'Malformed BEM rule' );
	}

	selector += rule( token, config, selector );

	return convertToken( tokens, config, selector );
}

function convert( selector, config ) {
	const rules = Object.keys( config.rules ).filter( ( rule ) => {
		return rule !== 'default';
	} );
	const splitRule = new RegExp( `(${rules.join( '|' )})`, 'g' );
	const splittedSelector = selector.split( splitRule );

	selector = convertToken( splittedSelector, config );

	return selector;
}

/** Converter's class*/
class Converter {
	/**
	 * Create converter's instance.
	 *
	 * @param {Object} [config=defaultConfig] converter's configuration options.
	 * @class
	 */
	constructor( config = defaultConfig ) {
		/**
		 * Converter's configuration
		 *
		 * @property {Object}
		 */
		this.config = config;
	}

	/**
	 * Converts given selector to CSS.
	 *
	 * @param {String} selector BEM selector to be converted.
	 * @return {Selector} Converted selector.
	 */
	convert( selector ) {
		const convertedSelector = convert( selector, this.config );

		return new Selector( selector, convertedSelector );
	}

	/**
	 * Get state from given `[class]` attribute contents.
	 *
	 * @param {String} className HTML `[class]` attribute.
	 * @return {String|null} Fetched state.
	 */
	getStateFromClass( className ) {
		if ( typeof className !== 'string' ) {
			throw new TypeError( 'Class must be a string.' );
		}

		const bemConfig = this.config.bem;
		const regex = new RegExp( `[^${bemConfig.elemSeparator}${bemConfig.modifierSeparator}]+${bemConfig.modifierSeparator}([^${bemConfig.elemSeparator}${bemConfig.modifierSeparator}]+)$` );
		const match = className.match( regex );

		return match ? match[ 1 ] : null;
	}
}

/**
 * BEM selector converter factory.
 *
 * @param {Object} [converterConfig=defaultConverterConfig] Configuration object that
 * should be passed to the Converter constructor.
 * @return {Converter} Converter's instance.
 */
function factory( converterConfig = defaultConfig ) {
	const converter = new Converter( converterConfig );

	return converter;
}

exports.Converter = Converter;
exports.Selector = Selector;
exports['default'] = factory;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bemquery-selector-converter.umd.js.map
