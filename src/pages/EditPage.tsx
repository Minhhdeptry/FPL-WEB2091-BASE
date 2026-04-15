import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Select } from "antd";
import { Bookings, edit, getById } from "../sevices/booking";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function EditPage() {
  const { id } = useParams();
  const [form] = Form.useForm();

  if (!id) return;
  const query = useQuery({
    queryKey: ['booking', id],
    queryFn: () => getById(id)
  });

  useEffect(() => {
    if(!query?.data) return;
    form.setFieldsValue(query.data)
  }, [id, query.data]);

  const queryClient = useQueryClient();
  const nav = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: Omit<Bookings, "id">) => edit(id, data),
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
        form={form}
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
          rules={[{ required: true, message: "Vui lòng chọn service" }]}
        >
          <Select options={[{ label: "Sửa điện", value:"Sửa điện" }, {label: "Vệ sinh", value:"Vệ sinh"}]} />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
        >
          <Select options={[{ label: "pending", value:"pending" }, {label: "confirmed", value:"confirmed"}]} />
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

export default EditPage;
