const { NotImplementedError } = require('../extensions/index.js');

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;
const regexp = /^\s*$/;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 * 
 * @param {String} sampleActivity string representation of current activity 
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 * 
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
function dateSample(sampleActivity) {
  if (typeof sampleActivity !== 'string' || regexp.test(sampleActivity)) {
    return false;
  }

  const sampleActivityNum = Number(sampleActivity);

  if (Number.isNaN(sampleActivityNum) || sampleActivityNum > 15 || sampleActivityNum <= 0) {
    return false;
  }

  const k = Math.LN2 / HALF_LIFE_PERIOD;

  const age = Math.ceil(Math.log(MODERN_ACTIVITY / sampleActivityNum) / k);
  
  return age;
}

module.exports = {
  dateSample
};
