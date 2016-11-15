import Tween from 'rc-tween-one';
import React from 'react';
import ReactDom from 'react-dom';

class Demo extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      moment: 2500, // 初始值
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        moment: 200,
      });
    }, 1000);
  }

  render() {
    return (<div>
      <div>moment初始为2500,所以第一个时间已过,而且第二个已播了2000</div>
      <Tween
        animation={[{ marginLeft: '500px', duration: 1500 }, { y: 300, duration: 5000 }]}
        moment={this.state.moment}
        style={{ opacity: 1, height: 500, transform: 'translate(50px,30px)' }}
      >
        <div>执行动效</div>
      </Tween>
    </div>);
  }
}
ReactDom.render(<Demo />, document.getElementById('__react-content'));
