'use strict';

const inappropriateWordsCache = require('../inappropriate-words.json');

/**
 * Returns the cached array of inappropriate words.
 * @returns {string[]} An array of inappropriate words.
 */
function getInappropriateWords() {
	return inappropriateWordsCache;
}

module.exports = { getInappropriateWords };
