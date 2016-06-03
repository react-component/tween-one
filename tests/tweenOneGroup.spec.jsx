import React from 'react';
import ReactDom from 'react-dom';
import expect from 'expect.js';
import { TweenOneGroup } from '../index';
import TestUtils from 'react-addons-test-utils';

describe('rc-tween-one-group', () => {
  let div;
  let instance;
  let children;

  function createTweenGroupInstance(props) {
    class TweenGroupDemo extends React.Component {
      constructor() {
        super(...arguments);
        this.state = {
          children: [
            <p key="0">demo</p>,
          ],
        };
      }

      removeAll() {
        this.setState({
          children: null,
        });
      }

      add() {
        children = this.state.children || [];
        const elem = (<p key={Date.now() + Math.random()}>demo</p>);
        children.push(elem);
        this.setState({
          children,
        });
      }

      render() {
        return (<TweenOneGroup {...props}>
          {this.state.children}
        </TweenOneGroup>);
      }
    }
    const objectOrArray = React.PropTypes.oneOfType([React.PropTypes.object,
      React.PropTypes.array]);

    TweenGroupDemo.propTypes = {
      animation: objectOrArray,
      style: React.PropTypes.object,
    };

    return ReactDom.render(<TweenGroupDemo {...props} />, div);
  }

  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    try {
      ReactDom.unmountComponentAtNode(div);
      document.body.removeChild(div);
    } catch (e) {
      console.log(e);
    }
  });

  function getFloat(str) {
    return parseFloat(str);
  }

  it('should render children', () => {
    instance = createTweenGroupInstance();
    children = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'p');
    expect(children.length).to.be(1);
  });

  it('is normal tween', (done) => {
    instance = createTweenGroupInstance({
      enter: { marginLeft: 100, opacity: 0, type: 'from' },
    });
    setTimeout(() => {
      children = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'p')[0];
      console.log('marginLeft > 95:', children.style.marginLeft);
      expect(getFloat(children.style.marginLeft)).to.above(95);
      setTimeout(() => {
        console.log('marginLeft is 0:', children.style.marginLeft);
        expect(getFloat(children.style.marginLeft)).to.be(0);
        done();
      }, 500);
    }, 50);
  });

  it('appear is false', () => {
    instance = createTweenGroupInstance({
      appear: false,
    });
    children = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'p')[0];
    expect(children.style.opacity).to.be('');
  });

  it('add and remove', (done) => {
    instance = createTweenGroupInstance();
    setTimeout(() => {
      instance.add();
      children = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'p');
      console.log('length is 2:', children.length);
      expect(children.length).to.be(2);
      setTimeout(() => {
        instance.removeAll();
        setTimeout(() => {
          children = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'p');
          console.log('length is 0:', children.length);
          expect(children.length).to.be(0);
          done();
        }, 500);
      }, 500);
    }, 500);
  });
});
