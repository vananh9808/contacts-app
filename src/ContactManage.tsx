import 'antd/dist/antd.css';
import type { FC } from 'react'
import React, { useState } from 'react'
import { Button, Table, Layout, Popconfirm } from 'antd'
import { PlusCircleFilled, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import EditContact from './components/EditContact'
import { Fragment } from 'react'
import { connect } from 'react-redux'
import { addContact, deleteContact, editContact } from './redux/contacts/action'
import {
  BrowserRouter as Router,
} from "react-router-dom"
import { useHistory } from "react-router-dom"

export type ContactType = {
  stt?: number
  key?: number
  fullName?: string
  email?: string
  address?: string
}

type Props = {
  contacts: ContactType[],
  addContact: (data:ContactType[])=>void,
  deleteContact: (data:ContactType[])=>void,
  editContact: (data:ContactType)=>void,
}

const ContactManage: FC<Props>= ({
  contacts,
  addContact,
  deleteContact,
  editContact
}) => {

  const [showDrawer, setShowDrawer] = useState(false)
  const [contact, setContact] = useState<ContactType>({})
  const [mode, setMode] = useState<'add' | 'edit'>('add')
  const [key, setEditKey] = useState<number>()
  const history = useHistory()

  const handleAddFormOnFinish = (data: any) => {
    addContact({
      key: contacts.length + 1,
      stt: contacts.length + 1,
      ...data
    })
    setShowDrawer(false)
  }

  const handleEditFormOnFinish = (data: ContactType[] = []) => {
    editContact({ key, stt: key, ...data })
    setShowDrawer(false)
  }

  const openEditDrawer = (contact: any=[], key: number) => {
    setEditKey(key)
    setContact(contact)
    setShowDrawer(true)
    setMode("edit")
  }

  const handleOnClose = () => {
    setMode("add")
    setEditKey(key)
    setShowDrawer(false)
  }
  // log test


  // Modified table data
  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      defaultSortOrder: 'ascend',
      sorter: (a: any, b: any) => a.stt - b.stt,
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    // {
    //   title: 'Ngày sinh',
    //   key: 'birthDay',  
    //   render: text => moment(text.birthDay).format("DD-MM-YYYY"),
    // },
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
      render: (_:any, contact:any) =>
        contacts.length >= 1 ? (
          <Fragment>
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteContact(contact.key)}>
              <Button style={{ marginRight: "20px" }}>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
            <Button type="primary" style={{ marginRight: "20px" }} onClick={() => openEditDrawer(contact, contact.key)} >
              <EditOutlined />
            </Button>
            <Router>
              <Button type="primary" onClick={() => { history.push(`/detail/${contact.key}`) }}>
                Detail
              </Button>
            </Router>
          </Fragment>
        ) : null,
    },
  ]
  return (
    <Fragment>
      <Button type="primary" onClick={() => setShowDrawer(true)}>
        <PlusCircleFilled />
            Add
        </Button>
      <Layout.Content>
        <Table
          dataSource={contacts}
          columns={columns}
          rowKey="key"
        />
      </Layout.Content>
      {showDrawer && (
        <EditContact
          show={showDrawer}
          handleOnClose={handleOnClose}
          handleOnFinish={handleAddFormOnFinish}
          mode={mode}
          contact={contact}
          handleEditOnFinish={handleEditFormOnFinish}
        />
      )}
    </Fragment>
  )
}

const mapStateToProps = (state: any) => {
  return {
    contacts: state.contacts && state.contacts.allContacts,
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    addContact: (contact: any) => {
      dispatch(addContact(contact))
    },
    deleteContact: (key:any) => {
      dispatch(deleteContact(key))
    },
    editContact: (contact: any) => {
      dispatch(editContact(contact))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactManage)