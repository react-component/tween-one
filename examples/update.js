import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.testText = '刚开始的样式:';
    this.state = {
      style: { opacity: 1, height: 200, marginLeft: 0, transform: 'translateY(0px)' },
      test: '',
      animation: { translateY: 200, marginLeft: 500, duration: 5000 },
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        style: { opacity: 1, height: 250, transform: 'translateY(100px)', marginLeft: 100 },
      });
      this.bool = false;
    }, 1000);
  }

  onChange = (e) => {
    if (!this.bool) {
      let text = (<div> 当前时间 moment: {e.moment}</div>);
      if (this.state.test) {
        text = (<div>{this.state.test}
          <p>当前时间 moment: {e.moment}</p>
        </div>);
      }
      this.setState({
        test: text,
      });
      this.bool = true;
    }
  }

  onClick = () =>{
    this.setState({
      style: { transform: 'translateY(10px)', marginLeft: 30, height: 300 },
      animation: { translateY: 100, marginLeft: 100, duration: 1000 },
    });
    this.bool = false;
  }

  onClick2 = () => {
    this.setState({
      style: { transform: 'translateY(0px)', marginLeft: 130, height: 300 },
      animation: { translateY: 200, marginLeft: 500, duration: 1000 },
    });
    this.bool = false;
  }

  render() {
    return (<div>
      <p>在动画时, 变化 style, 将重新计算为 start </p>
      <div>
        <button onClick={this.onClick}>点击改变样式</button>
        <button onClick={this.onClick2}>点击改变样式2</button>
      </div>
      <Tween animation={this.state.animation}
        style={this.state.style}
        onChange={this.onChange}
      >
        <div>变化的样式</div>
      </Tween>
      <div>{this.state.test}</div>
    </div>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
