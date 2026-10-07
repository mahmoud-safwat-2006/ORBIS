import {describe, expect, it} from '@jest/globals'

import {parseSearchQuery} from '#/screens/Search/utils'

describe(`parseSearchQuery`, () => {
  const tests = [
    {
      input: `orbis`,
      output: {query: `orbis`, params: {}},
    },
    {
      input: `orbis from:esb.lol`,
      output: {query: `orbis`, params: {from: `esb.lol`}},
    },
    {
      input: `orbis "from:esb.lol"`,
      output: {query: `orbis "from:esb.lol"`, params: {}},
    },
    {
      input: `orbis mentions:@esb.lol`,
      output: {query: `orbis`, params: {mentions: `@esb.lol`}},
    },
    {
      input: `orbis since:2021-01-01:00:00:00`,
      output: {query: `orbis`, params: {since: `2021-01-01:00:00:00`}},
    },
    {
      input: `orbis lang:"en"`,
      output: {query: `orbis`, params: {lang: `en`}},
    },
    {
      input: `orbis "literal" lang:en "from:invalid"`,
      output: {query: `orbis "literal" "from:invalid"`, params: {lang: `en`}},
    },
  ]

  it.each(tests)(
    `$input -> $output.query $output.params`,
    ({input, output}) => {
      expect(parseSearchQuery(input)).toEqual(output)
    },
  )
})
