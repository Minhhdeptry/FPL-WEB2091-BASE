import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import { Detail } from "./ListPage";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  detail: Detail | null;
  onSetDetail: Dispatch<SetStateAction<Detail | null>>;
};
function AddPage({ detail, onSetDetail }: Props) {
  // onFinish
  const onFinish = (values: any) => {
    mutate(values);
  };
  const qc = useQueryClient();
  // useMutation
  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      if (detail) {
        // edit
        return await axios.put(
          "http://localhost:3000/courses/" + detail.id,
          data,
        );
      } else {
        return await axios.post("http://localhost:3000/courses", data);
      }
    },
    onSuccess: () => {
      qc.invalidateQueries();
      form.resetFields();
      // reset state: detail
      onSetDetail(null);
    },
  });

  const [form] = Form.useForm();
  useEffect(() => {
    if (detail) {
      form.setFieldsValue(detail);
    }
  }, [detail]);
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

        {/* Select */}
        <Form.Item label="Danh mục" name="category">
          <Select
            placeholder="Chọn danh mục"
            options={[
              { value: "Javascript", label: "Javascript" },
              { value: "Javascript2", label: "Javascript2" },
              { value: "Javascript3", label: "Javascript3" },
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
