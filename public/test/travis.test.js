const test = QUnit.test;

QUnit.module('');

test('travis', assert => {

    // arrange
    const expected = 'travis';

    // act
    const result = 'travis';

    // assert
    assert.equal(result, expected);
});