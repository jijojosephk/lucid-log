const chalk = require('chalk');

const supportedLevels = [
	'error',
	'warn',
	'info',
	'debug'
]

let _LucidLogOptions_levels = new WeakMap();
class LucidLogOptions {
	/**
	 * @param {LucidLogOptions} options 
	 */
	constructor(options) {
		const ops = options || {};
		this.levels = ops.levels;
	}

	/**
	 * @type {Array<string>}
	 */
	get levels() {
		return _LucidLogOptions_levels.get(this);
	}

	set levels(value) {
		_LucidLogOptions_levels.set(this, getAvailableLevels(value))
	}
}

function getAvailableLevels(levels) {
	var lookupLevels = createLevelsLookup(levels);
	return supportedLevels.filter(level => {
		return isLevelMatching(lookupLevels, level)
	})
}

class LucidLog {
	/**
	 * @param {LucidLogOptions} options 
	 */
	constructor(options) {
		const ops = new LucidLogOptions(options);
		this.error = createConsoleWriter({
			title: '[ERROR]',
			titleBackground: chalk.bgRedBright,
			titleForeground: chalk.black,
			textBackground: chalk.bgBlack,
			textForeground: chalk.white,
			options: ops,
			level: 'error'
		});

		this.warn = createConsoleWriter({
			title: '[WARN]',
			titleBackground: chalk.bgYellowBright,
			titleForeground: chalk.black,
			textBackground: chalk.bgBlack,
			textForeground: chalk.white,
			options: ops,
			level: 'warn'
		});

		this.info = createConsoleWriter({
			title: '[INFO]',
			titleBackground: chalk.bgCyanBright,
			titleForeground: chalk.black,
			textBackground: chalk.bgBlack,
			textForeground: chalk.white,
			options: ops,
			level: 'info'
		});

		this.debug = createConsoleWriter({
			title: '[DEBUG]',
			titleBackground: chalk.bgBlueBright,
			titleForeground: chalk.black,
			textBackground: chalk.bgBlack,
			textForeground: chalk.white,
			options: ops,
			level: 'debug'
		});
	}
}

/**
 * @param {{title: string, titleBackground: chalk.Chalk, titleForeground: chalk.Chalk, textBackground: chalk.Chalk, textForeground: chalk.Chalk, options: LucidLogOptions, level:string}} options
 */
function createConsoleWriter(options) {
	return (...data) => {
		if (isLevelMatching(options.options.levels, options.level)) {
			console.log(options.titleBackground(options.titleForeground(options.title)), options.textForeground(data));
		}
	}
}

/**
 * @param {Array<string>|string} levels 
 * @returns {Array<string>}
 */
function createLevelsLookup(levels) {
	return Array.isArray(levels) ? levels : typeof (levels) === 'string' ? [levels] : [];
}

/**
 * @param {Array<string>} levels 
 * @param {string} level 
 * @returns {boolean}
 */
function isLevelMatching(levels, level) {
	return levels.some(lookupLevel => {
		return lookupLevel === level;
	});
}



module.exports = {
	LucidLogOptions,
	LucidLog
}