import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Input, Form, Button } from 'antd';


const EditDrawer = ({
    show,
    handleOnClose,
    handleOnFinish,
    handleOnFinishFailed,
    initialValues,
    mode,
    handleEditOnFinish
}) => {
    const [form] = Form.useForm();
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
                initialValues={initialValues}
                onFinish={mode === "edit" ? handleEditOnFinish : handleOnFinish}
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

                {/* <Form.Item
                    label="Nhập ngày sinh"
                    name="birthDay"
                    rules={[{ required: true, message: 'Vui lòng nhập ngày tháng năm sinh!' }]}
                    >
                    <DatePicker 
                        initialValues={moment('2015/01/01', 'DD-MM-YYYY')}
                        style={{ width: '50%' }} 
                        format={'DD-MM-YYYY'}
                    />
                    </Form.Item> */}

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

EditDrawer.propTypes = {
    show: PropTypes.bool.isRequired,
    handleOnClose: PropTypes.func.isRequired,
    handleOnFinish: PropTypes.func.isRequired,
    handleOnFinishFailed: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
    handleEditOnFinish: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(["add", "edit"])
};

export default EditDrawer