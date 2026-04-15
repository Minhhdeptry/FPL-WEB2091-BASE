import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import React from "react";
import { login, type Auth } from "../sevices/auth";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
    const [form] = Form.useForm()
    const nav = useNavigate()

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: async (data) => {
            localStorage.setItem('token', data.accessToken)
            await toast.success("Đăng nhập thành công"),
            form.resetFields(),
            nav('/bookings')
        }
    })

    const handleSubmit = (value: Auth) => {
        mutation.mutate(value)
    }
  return (
    <div>
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
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
                <Toaster/>
              </Form.Item>
            </Form>
          </div>
    </div>
  )
}

export default Login
