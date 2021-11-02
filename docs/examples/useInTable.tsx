import React, { useState } from 'react';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import TweenOneGroup from 'rc-tween-one/es/TweenOneGroup';
import 'antd/dist/antd.css';
import './useInTable.less';

const TableContext = React.createContext<{ enter: any; leave: any }>({ enter: null, leave: null });

const data: { key: string; name: string; age: number; address: string; tags?: string[] }[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

// 动画标签，页面切换时改用 context 传递参数；
const animTag = ($props: any) => {
  return (
    <TableContext.Consumer key="1">
      {({ enter, leave }) => {
        console.log(enter);
        const children = React.Children.toArray($props.children);

        return (
          <TweenOneGroup
            component={React.Fragment}
            enter={enter}
            leave={leave}
            appear={false}
            exclusive
            key="twnnone"
          >
            {children.map((item: any) => (
              <tbody key={item.key} {...$props}>
                {item}
              </tbody>
            ))}
          </TweenOneGroup>
        );
      }}
    </TableContext.Consumer>
  );
};

export default ({ className = 'table-enter-leave-demo' }) => {
  const [isPageTween, setPageTween] = useState(false);
  const [tableData, setTableData] = useState(data);

  const onEnd = () => {
    setPageTween(false);
  };

  const rmStyle = (e: any) => {
    const { targets } = e;
    // callback in render before
    setTimeout(() => {
      targets.style = '';
    });
  };

  const onAdd = () => {
    const newData = [...tableData];
    const i = Math.round(Math.random() * (tableData.length - 1));
    newData.unshift({
      key: `${Date.now()}`,
      name: tableData[i].name,
      age: tableData[i].age,
      address: tableData[i].address,
    });
    setTableData(newData);
  };

  const onDelete = (key: string, e: any) => {
    e.preventDefault();
    const newData = tableData.filter((item) => item.key !== key);
    setTableData(newData);
    setPageTween(false);
  };

  const pageChange = () => {
    setPageTween(true);
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text: string, record: any) => (
        <span
          className={`${className}-delete`}
          onClick={(e) => {
            onDelete(record.key, e);
          }}
        >
          Delete
        </span>
      ),
    },
  ];
  const enterAnim = [
    {
      opacity: 0,
      x: 30,
      // backgroundColor: '#fffeee', // tbody no backgroundColor
      duration: 0,
    },
    {
      height: 0,
      duration: 200,
      type: 'from',
      delay: 250,
      ease: 'easeOutQuad',
      onComplete: onEnd,
    },
    {
      opacity: 1,
      x: 0,
      duration: 250,
      ease: 'easeOutQuad',
      onComplete: rmStyle,
    },
    // { delay: 1000, backgroundColor: '#fff', onComplete: rmStyle },
  ];
  const pageEnterAnim = [
    {
      opacity: 0,
      duration: 0,
    },
    {
      height: 0,
      duration: 150,
      type: 'from',
      delay: 150,
      ease: 'easeOutQuad',
      onComplete: onEnd,
    },
    {
      opacity: 1,
      duration: 150,
      ease: 'easeOutQuad',
      onComplete: rmStyle,
    },
  ];
  const leaveAnim = [
    { duration: 250, opacity: 0 },
    { height: 0, duration: 200, ease: 'easeOutQuad' },
  ];
  const pageLeaveAnim = [
    { duration: 150, opacity: 0 },
    { height: 0, duration: 150, ease: 'easeOutQuad' },
  ];

  return (
    <div>
      <div className={`${className}-action-bar`}>
        <Button type="primary" onClick={onAdd}>
          Add
        </Button>
      </div>
      <TableContext.Provider
        value={{
          enter: !isPageTween ? enterAnim : pageEnterAnim,
          leave: !isPageTween ? leaveAnim : pageLeaveAnim,
        }}
      >
        <Table
          columns={columns}
          pagination={{ pageSize: 4 }}
          dataSource={tableData}
          className={`${className}-table`}
          components={{ body: { wrapper: animTag } }}
          onChange={pageChange}
        />
      </TableContext.Provider>
    </div>
  );
};
