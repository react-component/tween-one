import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';

class Demo extends React.Component {
  constructor() {
    super(...arguments);
    this.testText = '刚开始的样式:';
    this.state = {
      style: {opacity: 1, height: 100, marginLeft: 0, transform: 'translateY(0px)'},
      test: '',
    };
  }

  componentDidMount() {
    setTimeout(()=> {
      this.setState({
        style: {opacity: 1, height: 250, transform: 'translateY(100px)', marginLeft: 100},
      });
      this.testText = '变更后的样式:';
      this.bool = false;
    }, 1000);
  }

  onChange(e) {
    if (!this.bool) {
      let text = <span>{this.testText + JSON.stringify(e.tween)}, 当前时间 moment: {e.moment}</span>;
      if (this.state.test) {
        text = <span><p>{this.state.test}</p><p>{this.testText + JSON.stringify(e.tween)}, 当前时间 moment: {e.moment}</p></span>;
      }
      this.setState({
        test: text,
      });
      this.bool = true;
    }
  }

  render() {
    return (<div>
      <p>在动画时, 变化 style, 将重新计算为 start </p>
      <Tween animation={{ translateY: 200, marginLeft: 500, duration: 5000}}
             style={this.state.style}
             onChange={this.onChange.bind(this)}>
        <div>变化的样式</div>
      </Tween>
      <div>{this.state.test}</div>
    </div>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
