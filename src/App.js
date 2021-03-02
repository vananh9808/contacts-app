import './App.css';
import React, { useState } from 'react';
import { Button, Table, Layout, Popconfirm } from 'antd';
import { PlusCircleFilled, DeleteOutlined } from '@ant-design/icons';
import AddDrawer from './components/AddDrawer';
import EditDrawer from './components/EditDrawer';
import DetailPage from './components/DetailPage';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { addContact, deleteContact, editContact } from './redux/contacts/action';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const { Header, Content } = Layout;


const App = ({ contacts, addContact, deleteContact, editContact}) =>{
    
    const [showDrawer, setShowDrawer] = useState(false)
    const [showEditDrawer, setShowEditDrawer] = useState(false)
    const [errorInfo, setErrorInfo] = useState({})


    const handleAddFormOnFinish = (data) => {
    
        // setValues([...values, {
        //         key: values.length + 1,
        //         stt: values.length +1,
        //         ...data
        // },])
        addContact({
          key: contacts.length + 1,
          stt: contacts.length + 1,
          ...data
        })
        setShowDrawer(false)
    }
    
    const handleEditFormOnFinish = (data) => {
      editContact({
        key: contacts.length + 1,
        stt: contacts.length + 1,
        ...data
      })
      setShowEditDrawer(false)
  }
    const handleAddFormOnFinishFailed = (errorInfo) => {
        setErrorInfo(errorInfo)
    }
    const handleEditFormOnFinishFailed = (errorInfo) => {
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
        title: 'Action',
        dataIndex: 'delete',
        render: (_, record) =>
          contacts.length >= 1 ? (
            <Fragment>
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteContact(record.key)}>
              <Button style={{marginRight: "20px"}}>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
            <Button type="primary" style={{marginRight: "20px"}} onClick={()=> setShowEditDrawer(true)} >
              Edit
            </Button>
            <Router>
            <Link to={"/detail"}>
              <Button type="primary">
                  Detail
              </Button>
            </Link>
            </Router>
            </Fragment>
          ) : null,
      },
      ];
        return (
          <Layout style={{ minHeight: '100vh' }}>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }} />
              <Content style={{ margin: '0 16px' }}>
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
                    <EditDrawer 
                        show={showEditDrawer}
                        handleOnClose={() => setShowEditDrawer(false)} 
                        handleOnFinish={handleEditFormOnFinish}
                        handleOnFinishFailed={handleEditFormOnFinishFailed}
                    />
                    <Switch>
                    <Router>
                      <Route path="/detail">
                        <DetailPage />
                      </Route>
                    </Router>
                    </Switch>
                </Fragment>
                </div>
              </Content>
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
    editContact:(key)=>{
      dispatch(editContact(key))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
