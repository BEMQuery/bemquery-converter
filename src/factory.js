'use strict';

import Converter from './Converter';
import defaultConverterConfig from './defaultConfig';

/**
 * BEM selector converter factory.
 *
 * @param {Object} [converterConfig=defaultConverterConfig] Configuration object that
 * should be passed to the Converter constructor.
 * @return {Converter} Converter's instance.
 */
function factory( converterConfig = defaultConverterConfig ) {
	const converter = new Converter( converterConfig );

	return converter;
}

export default factory;
