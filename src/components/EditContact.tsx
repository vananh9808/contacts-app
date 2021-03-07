import type { FC } from 'react'
import React, { Fragment, useEffect } from 'react'
import { Drawer, Input, Form, Button } from 'antd'
import type {ContactType} from '../ContactManage'
type Props = {
  show: boolean
  handleOnClose: () => void
  handleOnFinish: (data: ContactType[]) => void
  mode: 'edit' | 'add'
  handleEditOnFinish: (data: ContactType[]) => void
  contact: ContactType
}

const EditDrawer: FC<Props> = ({
  show,
  handleOnClose,
  handleOnFinish,
  mode,
  handleEditOnFinish,
  contact
}) => {
  const [form] = Form.useForm()
  console.log(contact)

  useEffect(() => {
   if(mode === 'edit'){
     form.setFieldsValue(contact)
   }
}, [contact, form, mode])

  return (
    <Drawer
      placement="left"
      width={412}
      title={`${mode === "edit" ? "Edit Contact" : "Add Contact"} `}
      visible={show}
      onClose={handleOnClose}
      maskClosable={true}
      destroyOnClose={true}
    >
      <Form
        form={form}
        onFinish={mode === "edit" ? handleEditOnFinish : handleOnFinish}
        layout="vertical"

      >
        <Form.Item
          label="Nhập tên"
          name="fullName"
          rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nhập Email"
          name="email"
          rules={[{ type: "email", message: 'Vui lòng nhập đúng định dạng email!' }, { required: true, message: 'Vui lòng nhập email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nhập địa chỉ"
          name="address"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Fragment>
            <Button type="primary" htmlType="submit" style={{ marginRight: "20px" }}>
              {mode === "edit" ? "Edit" : "Add"}
            </Button>
            <Button htmlType="button" onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Fragment>
        </Form.Item>
      </Form>
    </Drawer>
  )

}


export default EditDrawer