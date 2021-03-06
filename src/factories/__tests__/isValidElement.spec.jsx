import { expect } from 'chai';
import createElement from 'inferno-create-element';
import isValidElement from '../isValidElement';
import h from 'inferno-hyperscript';
import Component from 'inferno-component';
import Inferno, { cloneVNode } from 'inferno';


describe('isValidElement', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
    });

    afterEach(() => {
        container.innerHTML = '';
    });

    it('Should not work with non-object', () => {
        expect(isValidElement(33)).to.equal(false);
        expect(isValidElement(false)).to.equal(false);
        expect(isValidElement(true)).to.equal(false);
        expect(isValidElement('some text')).to.equal(false);
        expect(isValidElement(0)).to.equal(false);
        expect(isValidElement(undefined)).to.equal(false);
    });

    it('Should not work with invalid object', () => {
        expect(isValidElement(null)).to.equal(false, 'object should not be null');
        expect(isValidElement({})).to.equal(false, 'object should not be empty');
        expect(isValidElement({ dom: 'fake data' })).to.equal(false, 'object should not have just a dom property');
    });

    it('Should not work with a number', () => {
        expect(isValidElement(33)).to.equal(false);
    });

    it('Should work with createElement (element)', () => {
        const el = createElement('div', null, 'Do a thing');
        expect(isValidElement(el)).to.equal(true);
    });

    it('Should work with createElement (stateless component)', () => {
        const el = createElement('div', null, 'Do a thing');
        const Comp = () => el;
        const comp = createElement(Comp);
        expect(isValidElement(comp)).to.equal(true);
    });

    it('Should work with createElement (stateful component)', () => {
        class Comp extends Component {
            render() {
                return createElement('div', null, 'Do a thing');
            }
        }
        const comp = createElement(Comp);
        expect(isValidElement(comp)).to.equal(true);
    });

    it('Should work with JSX', () => {
        const node = <div>Hello world</div>;
        expect(isValidElement(node)).to.equal(true);
    });

    it('Should work with cloneVNode', () => {
        const node = <div>Hello world</div>;
        const clonedNode = cloneVNode(node, null, 'Hello world 2!');
        expect(isValidElement(clonedNode)).to.equal(true);
    });

    it('Should work with hyperscript (element)', () => {
        const el = h('div', 'Do a thing');
        expect(isValidElement(el)).to.equal(true);
    });

    it('Should work with hyperscript (stateless component)', () => {
        const el = h('div', 'Do a thing');
        const Comp = () => el;
        const comp = h(Comp);
        expect(isValidElement(comp)).to.equal(true);
    });

    it('Should work with hyperscript (stateful component)', () => {
        class Comp extends Component {
            render() {
                return h('div', 'Do a thing');
            }
        }
        const comp = h(Comp);
        expect(isValidElement(comp)).to.equal(true);
    });

    it('Should not work with a stateless component (using createElement)', () => {
        const el = createElement('div', null, 'Do a thing');
        const Comp = () => el;
        expect(isValidElement(Comp)).to.equal(false);
    });

    it('Should not work with a stateless component (using hyperscript)', () => {
        const el = h('div', 'Do a thing');
        const Comp = () => el;
        expect(isValidElement(Comp)).to.equal(false);
    });

    it('Should not work with a stateful component (using createElement)', () => {
        class Comp extends Component {
            render() {
                return createElement('div', null, 'Do a thing');
            }
        }
        expect(isValidElement(Comp)).to.equal(false);
    });

    it('Should not work with a stateful component (using hyperscript)', () => {
        class Comp extends Component {
            render() {
                return h('div', 'Do a thing');
            }
        }
        expect(isValidElement(Comp)).to.equal(false);
    });
});
