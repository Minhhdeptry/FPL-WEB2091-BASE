import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Select } from "antd";
import { add } from "../sevices/booking";
import { useNavigate } from "react-router-dom";

function AddPage() {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  const mutation = useMutation({
    mutationFn: add,
    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: ["booking"] }),
        nav("/bookings"));
    },
  });
  const handleSubmit = (value: any) => {
    mutation.mutate(value);
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Customer"
          name="customer"
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          label="Service"
          rules={[{ required: true, message: "Vui lòng chọn service" }]}
        >
          <Select options={[{ label: "Sửa điện" }, {label: "Vệ sinh"}]} />
        </Form.Item>

        <Form.Item
          label="Status"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
        >
          <Select options={[{ label: "pending" }, { label: "confirmed" }]} />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddPage;
