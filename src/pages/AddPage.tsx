import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import { useEffect } from "react";
type Book = {
  id: number;
};
type Props = {
  idEdit?: number | null;
  bookDetail?: Book | undefined;
  onSetIdEdit: (id: number | null) => void;
};

function AddPage({ bookDetail, idEdit, onSetIdEdit }: Props) {
  const qc = useQueryClient();
  // onFinish
  const onFinish = (values: any) => {
    mutate(values);
  };
  // useMutation
  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      if (idEdit) {
        return await axios.put("http://localhost:3000/books/" + idEdit, data);
      } else {
        return await axios.post("http://localhost:3000/books", data);
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["books"] });
      form.resetFields();
      onSetIdEdit(null);
    },
  });

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(bookDetail);
    if (bookDetail) {
      // reset form
    }
  }, [bookDetail]);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="space-y-6"
      >
        {/* Text input */}
        <Form.Item label="Title" name="title">
          <Input placeholder="Nhập thông tin" />
        </Form.Item>

        <Form.Item label="Cover Image" name="coverImage">
          <Input placeholder="Nhập thông tin" />
        </Form.Item>
        {/* Select */}
        <Form.Item label="Danh mục" name="category">
          <Select
            placeholder="Chọn danh mục"
            options={[
              { value: "Tiểu thuyết", label: "Tiểu thuyết" },
              { value: "Tiểu thuyết 2", label: "Tiểu thuyết 2" },
              { value: "Tiểu thuyết 3", label: "Tiểu thuyết 3" },
            ]}
          />
        </Form.Item>

        {/* Submit button */}
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddPage;
