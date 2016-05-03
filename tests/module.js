/* global chai */

'use strict';

import * as bsc from '../src/index';
import bsc2 from '../src/index';

import factory from '../src/factory';
import Converter from '../src/Converter';
import Selector from '../src/Selector';

const expect = chai.expect;

describe( 'module', () => {
	it( 'exports factory', () => {
		expect( bsc.default ).to.equal( factory );
		expect( bsc2 ).to.equal( factory );
	} );

	it( 'exports Converter', () => {
		expect( bsc.Converter ).to.equal( Converter );
	} );

	it( 'exports Selector', () => {
		expect( bsc.Selector ).to.equal( Selector );
	} );
} );
