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
      (queryClient.invalidateQueries({ queryKey: ["bookings"] }),
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
          name="service"
          rules={[{ required: true, message: "Vui lòng nhập service!" }]}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
        >
          <Select options={[{ label: "pending", value:"pending" }, { label: "confirmed", value:"confirmed" }]} />
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
