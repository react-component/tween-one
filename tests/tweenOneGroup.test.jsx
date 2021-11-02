/* eslint no-console:0 */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TweenOneGroup from '../src/TweenOneGroup';

Enzyme.configure({ adapter: new Adapter() });

const TweenOneGroupComp = (props) => {
  return (
    <span className="wrapper">
      <TweenOneGroup {...props} />
    </span>
  );
};

describe('rc-tween-one-group', () => {
  let instance;
  function getFloat(str) {
    return parseFloat(str);
  }

  it('should render children', (done) => {
    instance = mount(
      <TweenOneGroup>
        <p key="a">a</p>
      </TweenOneGroup>,
    );
    const children = instance.find('p');
    console.log(children.length, instance.find('p'));
    expect(children.length).toBe(1);
    done();
  });
  it('appear is false', () => {
    instance = mount(
      <TweenOneGroup appear={false}>
        <p key="a">a</p>
      </TweenOneGroup>,
    );
    const children = instance.find('p').instance();
    console.log('opacity:', children.style.opacity);
    expect(children.style.opacity).toBe('');
  });
  it('component is null', () => {
    instance = mount(
      <div className="wrapper">
        <TweenOneGroup component={null}>
          <p key="a">a</p>
        </TweenOneGroup>
      </div>,
    );
    const children = instance.find('.wrapper').instance().children[0];
    console.log('tagName:', children.tagName);
    expect(children.tagName).toEqual('P');
  });
  it('is normal tween', (done) => {
    instance = mount(
      <TweenOneGroup enter={{ marginLeft: 100, opacity: 0, type: 'from' }}>
        <p key="a">a</p>
      </TweenOneGroup>,
    );

    setTimeout(() => {
      const children = instance.find('p').instance();
      console.log('marginLeft < 100:', children.style.marginLeft);
      expect(getFloat(children.style.marginLeft)).toBeLessThan(100);
      setTimeout(() => {
        console.log('marginLeft is 0:', children.style.marginLeft);
        expect(getFloat(children.style.marginLeft)).toBe(0);
        done();
      }, 500);
    }, 50);
  });
  it('is switch children', (done) => {
    instance = mount(<TweenOneGroupComp />);
    let children = instance.find('p').children();
    console.log('children length:', children.length);
    expect(children.length).toBe(0);
    setTimeout(() => {
      instance.setProps({
        children: [<p key="a">a</p>, <p key="b">b</p>],
      });

      setTimeout(() => {
        children = instance.find('.wrapper').instance().children[0].children;
        console.log('children length:', children.length);
        expect(children.length).toBe(2);

        instance.setProps({
          children: [<p key="a">a</p>],
        });
        setTimeout(() => {
          children = instance.find('.wrapper').instance().children[0].children;
          console.log('children length:', children.length);
          expect(children.length).toBe(1);
          done();
        }, 500);
      }, 500);
    }, 50);
  });
});
