import './App.css';
import React from 'react';
import { Layout } from 'antd';
import ContactManage from './ContactManage';
import DetailPage from './components/DetailPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const { Header, Content } = Layout;


const App = () =>{
        return (
          <Layout style={{ minHeight: '100vh' }}>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }} />
              <Content style={{ margin: '0 16px' }}>
              <Router>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Switch>
                    <Route path={"/detail/:key"} children={<DetailPage />}>
                      <DetailPage />
                    </Route>
                    <Router path={"/"} >
                      <ContactManage />
                    </Router>
                    </Switch> 
                </div>
                </Router>
              </Content>
            </Layout>
          </Layout>
        )
    }
export default App