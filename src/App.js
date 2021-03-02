import './App.css';
import React, { useState } from 'react';
import { Button, Table, Layout, Popconfirm } from 'antd';
import { Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import { PlusCircleFilled, DeleteOutlined } from '@ant-design/icons';
import AddDrawer from './AddDrawer';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { addContact, deleteContact } from './redux/contacts/action';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const App = ({ contacts, addContact, deleteContact}) =>{
    const [showDrawer, setShowDrawer] = useState(false)
    const [errorInfo, setErrorInfo] = useState({})
    const [collapsed, setCollapsed] = useState({})

    const onCollapse = isCollapsed => {
        setCollapsed(isCollapsed)
    }

    const handleAddFormOnFinish = (data) => {
    
        // setValues([...values, {
        //         key: values.length + 1,
        //         stt: values.length +1,
        //         ...data
        // },])
        addContact({
          key: contacts.length + 1,
          stt: contacts.length +1,
          ...data
        })
        setShowDrawer(false)
    }
   
    const handleAddFormOnFinishFailed = (errorInfo) => {
        setErrorInfo(errorInfo)
    }
    console.log("values: ",contacts)
    console.log("error: ",errorInfo)
      
      const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
          },
        {
          title: 'Họ tên',
          dataIndex: 'fullName',
          key: 'fullName',
        },
        {
          title: 'Ngày sinh',
          dataIndex: 'birthDay',
          key: 'birthDay',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
          },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      {
        title: 'delete',
        dataIndex: 'delete',
        render: (_, record) =>
          contacts.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteContact(record.key)}>
              <Button>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          ) : null,
      },
      ];
        return (
          <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                  Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                  Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                  <Menu.Item key="3">Tom</Menu.Item>
                  <Menu.Item key="4">Bill</Menu.Item>
                  <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                  <Menu.Item key="6">Team 1</Menu.Item>
                  <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined />}>
                  Files
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }} />
              <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Fragment>
                    <Button type="primary" onClick={()=> setShowDrawer(true)}>
                        <PlusCircleFilled />
                        Add
                    </Button>
                    <Layout.Content>
                        <Table dataSource={contacts} columns={columns} />;
                    </Layout.Content>
                    <AddDrawer 
                        show={showDrawer}
                        handleOnClose={() => setShowDrawer(false)} 
                        handleOnFinish={handleAddFormOnFinish}
                        handleOnFinishFailed={handleAddFormOnFinishFailed}
                    />
                </Fragment>
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Quản lý người dùng design bởi antd</Footer>
            </Layout>
          </Layout>
        );
    }   
const mapStateToProps = (state) =>{
  return {
    contacts: state.contacts && state.contacts.allContacts,
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    addContact:(contact)=>{
      dispatch(addContact(contact))
    },
    deleteContact:(key)=>{
      dispatch(deleteContact(key))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps )(App);
