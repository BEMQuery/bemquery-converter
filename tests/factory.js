/* global chai */

'use strict';

import factory from '../src/factory';
import Converter from '../src/Converter';
import defaultConverterConfig from '../src/defaultConfig';

const expect = chai.expect;

describe( 'factory', () => {
	it( 'is a function', () => {
		expect( factory ).to.be.a( 'function' );
	} );

	it( 'returns a Converter instance', () => {
		const result = factory();

		expect( result ).to.be.an.instanceof( Converter );
	} );

	it( 'pass default configuration to Converter instance', () => {
		const converter = factory();

		expect( converter.config ).to.deep.equal( defaultConverterConfig );
	} );

	it( 'could alter Converter configuration', () => {
		const config = {
			'hublabubla': true
		};
		const converter = factory( config );

		expect( converter.config ).to.deep.equal( config );
	} );
} );
