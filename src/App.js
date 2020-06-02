import React from 'react';
import {BrowserRouter as Router, Link} from "react-router-dom";
import {Layout, Menu} from 'antd';
import {Routing} from './Routing';
import 'antd/dist/antd.css';
import './index.css';
const {Header, Content, Footer} = Layout;
const {SubMenu} = Menu;

function App() {
  return (
      <Router>
          <Layout className="layout">
              <Header>
                  <div className="logo"> 299731 </div>
                  <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
                      <Menu.Item key="1">
                          Home
                          <Link to ="/"/>
                      </Menu.Item>
                      <Menu.Item key="2">
                          Remider
                          <Link to ="/reminder"/>
                      </Menu.Item>
                      <SubMenu title="User">
                          <Menu.Item key="3">
                              User info
                              <Link to ="/userinfo"/>
                          </Menu.Item>
                          <Menu.Item key="4">
                              Login
                              <Link to ="/login"/>
                          </Menu.Item>
                          <Menu.Item key="5">
                              Logout
                              <Link to ="/logout"/>
                          </Menu.Item>
                      </SubMenu>

                  </Menu>
              </Header>
              <Content style={{ padding: '0 50px' }}>
                  <div className="site-layout-content">
                      <Routing/>
                  </div>
              </Content>
              <Footer style={{ textAlign: 'center'}}> Bartłomiej Pazdan IS WIMiIP AGH - Internet Engineering 2020 </Footer>
          </Layout>
      </Router>
  );
}

export default App;
