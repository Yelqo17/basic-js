const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  checkArguments(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }
  }

  processText(text, key, encrypt) {
    text = text.toUpperCase();
    key = key.toUpperCase();
    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (this.alphabet.indexOf(char) === -1) {
        result += char;
        continue;
      }

      const keyChar = key[keyIndex % key.length];
      const keyShift = this.alphabet.indexOf(keyChar);
      const shift = encrypt ? keyShift : -keyShift;

      const charIndex = this.alphabet.indexOf(char);
      const newIndex = (charIndex + shift + this.alphabet.length) % this.alphabet.length;

      result += this.alphabet[newIndex];
      keyIndex++;
    }

    return result;
  }

  encrypt(message, key) {
    this.checkArguments(message, key);
    const result = this.processText(message, key, this.isDirect);
    return this.isDirect ? result : result.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    this.checkArguments(encryptedMessage, key);
    const result = this.processText(encryptedMessage, key, !this.isDirect);
    return this.isDirect ? result : result.split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
