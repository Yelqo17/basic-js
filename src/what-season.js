const { NotImplementedError } = require('../extensions/index.js');

/**
 * Extract season from given date and expose the enemy scout!
 * 
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 * 
 * @example
 * 
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 * 
 */
function getSeason(date) {
  if (date === undefined) {
    return 'Unable to determine the time of year!';
  }

  try {
    if (isNaN(date)) {
      throw new Error('Invalid date!');
    }

    const month = date.getMonth();
    let season;
  
    if (month === 0 || month === 11 || month === 1) {
      season = 'winter';
    } else if (month === 2 || month === 3 || month === 4) {
      season = 'spring';
    } else if (month === 5 || month === 6 || month === 7) {
      season = 'summer';
    } else if (month === 8 || month === 9 || month === 10) {
      season = 'autumn';
    }
  
    return season;
  } catch {
    throw new Error('Invalid date!');
  }
}

module.exports = {
  getSeason
};
