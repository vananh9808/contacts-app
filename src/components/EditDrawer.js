import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Input, Form, Button, DatePicker } from 'antd';
import { connect } from 'react-redux';

const EditDrawer = ({ contacts, show, handleOnClose, handleOnFinish, handleOnFinishFailed}) => {
    const initialValues = {fullName: "", birthDay: "", email: "", address: ""}
    const [form] = Form.useForm();
    return(
        <Drawer 
            placement="left"
            width={412}
            title="Edit Contact" 
            visible={show}
            onClose={handleOnClose} 
            maskClosable={true}
        >
            <Form
                form={form}
                name="basic"
                initialValues = {initialValues}
                onFinish={handleOnFinish}
                onFinishFailed={handleOnFinishFailed}
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
                    label="Nhập ngày sinh"
                    name="birthDay"
                    rules={[{ required: true, message: 'Vui lòng nhập ngày tháng năm sinh!' }]}
                    >
                    <DatePicker 
                        style={{ width: '50%' }} 
        
                    />
                    </Form.Item>

                    <Form.Item
                    label="Nhập Email"
                    name="email"
                    rules={[{ type: "email", message: 'Vui lòng nhập đúng định dạng email!' }, { required: true, message: 'Vui lòng nhập email'}]}
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
                            <Button type="primary" htmlType="submit" style={{marginRight: "20px"}}>Edit</Button>
                            <Button htmlType="button" onClick={() => form.resetFields()}>Reset</Button>
                        </Fragment>
                    </Form.Item>
            </Form>

        </Drawer>
    )

}

EditDrawer.propTypes = {
    show: PropTypes.bool.isRequired,
    handleOnClose: PropTypes.func.isRequired,
    handleOnFinish: PropTypes.func.isRequired,
    handleOnFinishFailed: PropTypes.func.isRequired,
};
const mapStateToProps = (state) =>{
    return {
      contacts: state.contacts && state.contacts.allContacts,
    }
  }
export default connect(mapStateToProps)(EditDrawer)