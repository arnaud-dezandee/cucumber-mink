/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

import _ from 'lodash';

const debug = require('debug')('mink:findStep');
const LANG_WORDS = ['Given', 'When', 'Then', 'And', 'But', '*'];

// Sanitize input and trim first word if Gherkin lang
function trim(str) {
  const input = str.replace(/\s\s+/g, ' ').trim();

  const words = input.split(' ');
  if (_.contains(LANG_WORDS, _.first(words))) {
    return words.slice(1).join(' ');
  }
  return input;
}

/**
 * Find a matching registered step and build a stepObj from Mink context
 * @param {String} input
 */
export default function findStep(input) {
  const text = trim(input);
  const step = _.find(this.steps, minkStep => {
    return text.match(minkStep.pattern);
  });

  debug(text, '=>', step && step.pattern || null);

  if (!step) {
    throw new Error('Could not find matching step for text: ' + text);
  }

  return _.assign(step, {
    input: text,
    args: text.match(step.pattern).slice(1),
  });
}
