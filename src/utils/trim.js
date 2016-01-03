/**
 * Dependencies
 */

import _ from 'lodash';

/**
 * Private
 */

const LANG_WORDS = [
  'Given',
  'When',
  'Then',
  'And',
  'But',
  '*',
];

/**
 * Interface
 */

export function trim(str) {
  // Sanitize input and trim first word if Gherkin lang
  const input = str.replace(/\s\s+/g, ' ').trim();

  const words = input.split(' ');
  if (_.contains(LANG_WORDS, _.first(words))) {
    return words.slice(1).join(' ');
  }

  return input;
}
