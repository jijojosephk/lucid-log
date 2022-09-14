const { LucidLog } = require('.');
const logger = new LucidLog({
	levels: ['info','error','debug','warn']
});
logger.debug('Test',["Hello","how are you"]);