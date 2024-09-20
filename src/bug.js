'use strict';

// const { promisify } = require('util');
const async = require('async');
const db = require('./database');

const Bug = {};

Bug.create = async function (data) {
	const bugId = await db.incrObjectField('global', 'nextBugId');
	data.id = bugId;
	await db.setObject(`bug:${bugId}`, data);
	await db.sortedSetAdd('bugs:created', Date.now(), bugId);
	return bugId;
};

Bug.get = async function (bugId) {
	return await db.getObject(`bug:${bugId}`);
};

Bug.getAll = async function () {
	const bugIds = await db.getSortedSetRange('bugs:created', 0, -1);
	const bugs = await async.map(bugIds, Bug.get);
	return bugs;
};

Bug.delete = async function (bugId) {
	await db.delete(`bug:${bugId}`);
	await db.sortedSetRemove('bugs:created', bugId);
};

module.exports = Bug;
