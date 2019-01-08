// @flow
'use strict';
const { expect } = require('chai');
const {
    atom,
    undefinedAtom,
    ref,
    error,
    pathValue,
    pathInvalidation
} = require('../src');

describe('atom', function() {
    it('undefined atom', () => expect(atom()).to.deep.equal({ $type: 'atom' }));
    it('atom of string', () =>
        expect(atom('foo')).to.deep.equal({ $type: 'atom', value: 'foo' }));
    it('atom with props', () =>
        expect(atom('foo', { $expires: 0 })).to.deep.equal({
            $type: 'atom',
            value: 'foo',
            $expires: 0
        }));
});

describe('undefinedAtom', function() {
    it('undefined atom', () =>
        expect(undefinedAtom()).to.deep.equal({ $type: 'atom' }));
});

describe('ref', function() {
    it('ref', () =>
        expect(ref(['foo'])).to.deep.equal({ $type: 'ref', value: ['foo'] }));
    it('ref with props', () =>
        expect(ref(['foo'], { $expires: 0 })).to.deep.equal({
            $type: 'ref',
            value: ['foo'],
            $expires: 0
        }));
});

describe('error', function() {
    it('error', () =>
        expect(error('foo')).to.deep.equal({ $type: 'error', value: 'foo' }));
    it('error with props', () =>
        expect(error('foo', { $expires: 0 })).to.deep.equal({
            $type: 'error',
            value: 'foo',
            $expires: 0
        }));
});

describe('pathValue', function() {
    it('pathValue of string', () =>
        expect(pathValue(['foo'], 'bar')).to.deep.equal({
            path: ['foo'],
            value: 'bar'
        }));
    it('pathValue of atom of string', () =>
        expect(pathValue(['foo'], atom('bar'))).to.deep.equal({
            path: ['foo'],
            value: { $type: 'atom', value: 'bar' }
        }));
});

describe('pathInvalidation', function() {
    it('pathInvalidation', () =>
        expect(pathInvalidation(['foo'])).to.deep.equal({
            path: ['foo'],
            invalidated: true
        }));
});
