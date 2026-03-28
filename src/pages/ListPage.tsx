import { Button, Popconfirm, Table } from "antd";
import AddPage from "./AddPage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export type Detail = {
  id: number;
  title: string;
};
function ListPage() {
  // columns

  const [detail, setDetail] = useState<Detail | null>(null);

  const handleEdit = (record: any) => {
    console.log(record);
    // TODO ?
    setDetail(record);
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "title",
      dataIndex: "title",
    },
    {
      title: "Actions",
      render: (record: any) => {
        return (
          <>
            <Popconfirm
              title={"Delete Coures"}
              onConfirm={() => mutate(record.id)}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            <Button type="primary" onClick={() => handleEdit(record)}>
              Edit
            </Button>
          </>
        );
      },
    },
  ];
  // useQuery
  const { data } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await axios.get("  http://localhost:3000/courses");
      return data;
    },
  });

  const qc = useQueryClient();
  // useMutation
  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      return await axios.delete("http://localhost:3000/courses/" + id);
    },
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });
  return (
    <div className="p-6">
      <AddPage detail={detail} onSetDetail={setDetail} />
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>

      <div className="overflow-x-auto">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

export default ListPage;
