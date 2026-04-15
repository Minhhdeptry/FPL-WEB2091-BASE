import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import React from "react";
import { register, type Auth } from "../sevices/auth";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
    const [form] = Form.useForm()
    const notify = () => toast('')
    const nav = useNavigate()

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: async () => {
            toast.success("Đăng ký thành công"),
            form.resetFields(),
            nav('/login')
        }
    })

    const handleSubmit = (value: Auth) => {
        mutation.mutate(value)
    }
  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            {type: "email", message: "Email không hợp lệ"}
          ]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập password!" },
            {min: 6, message: "Password phải lớn hơn hoặc bằng 6 ký tự"}
        ]}
        >
          <Input.Password type="password" />
        </Form.Item>

        <Form.Item label={null}>
          <Button onClick={notify} type="primary" htmlType="submit">
            Register
          </Button>
          <Toaster/>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register
