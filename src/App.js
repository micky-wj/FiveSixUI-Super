import React, { Component } from 'react';
import logo from './logo.svg';
import Menu from './components/Menu/index.tsx';
import Button from './components/Button/index.tsx';
import './App.css';
import './components/Menu/style/index.less';
import './components/Button/style/index.less';

const SubMenu = Menu.SubMenu;
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div style={{ width: 250, float: 'left' }}>
          <Menu selectedKeys={['item3']} defaultOpenKeys={['subMenu']}>
            <Menu.Item key="item1">item1</Menu.Item>
            <Menu.Item key="item2">item2</Menu.Item>
            <SubMenu title="subMenu" key="subMenu">
              <Menu.Item key="item3">item3</Menu.Item>
            </SubMenu>
          </Menu>
          <Menu
            openKeys={["22"]}
            defaultSelectedKeys={["2"]}
            selectedKeys={["1"]}
            mode="inline"
            onClick={(params) => console.log(params)}
          >
            <Menu.Item key="1" disabled={true}>导航1</Menu.Item>
            <Menu.Item key="2">再导航2</Menu.Item>
            <Menu.SubMenu
              key="22"
              title="子导航22"
            >
              <Menu.Item key="3">子导航项3</Menu.Item>
              <Menu.Item key="4">子导航项4</Menu.Item>
              <Menu.SubMenu
                key="333"
                title="子导航333"
              >
                <Menu.Item key="5">子子导航5</Menu.Item>
                <Menu.Item key="6">子子导航5</Menu.Item>
              </Menu.SubMenu>
            </Menu.SubMenu>
          </Menu>
        </div>
        <div style={{ marginTop: '10px', background: '#fff' }}>
          <Button type="primary" style={{ marginRight: 10 }} loading>按钮</Button>
          <Button type="dashed" style={{ marginRight: 10 }} >按钮</Button>
          <Button type="danger" style={{ marginRight: 10 }} >按钮</Button>
          <Button style={{ marginRight: 10 }} size="large" loading shape="circle"></Button>
          <Button style={{ marginRight: 10 }} size="large" disabled>按钮</Button>
        </div>
      </div>
    );
  }
}

export default App;
