const { LucidLog } = require('.');
const logger = new LucidLog({
	levels: ['error','warn']
});
logger.error('Unauthorized\n');
logger.debug('Welcome!\n');
logger.warn('Some functions might not work\n');
logger.info('You are using the latest version\n');