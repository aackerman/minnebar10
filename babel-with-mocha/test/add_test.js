import assert from 'assert';
import add from '../src/add';

describe("add", () => {
  it('adds numbers together', () => {
    assert(add(1,2,3), 6);
  });
});
