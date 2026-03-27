import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Popconfirm, Table } from "antd";
import axios from "axios";
import AddPage from "./AddPage";
import { useState } from "react";

function ListPage() {
  const [idEdit, setIdEdit] = useState<number | null>(null);
  // get data
  const { data } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3000/books");
      return data;
    },
  });

  const { data: bookDetail } = useQuery({
    queryKey: ["book-detail", idEdit],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3000/books/" + idEdit);
      return data;
    },
    enabled: !!idEdit, //co idEdit => true => chay call API
  });

  // columns
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
      title: "coverImage",
      dataIndex: "coverImage",
    },
    {
      title: "Actions",
      render: (record: any) => {
        return (
          <>
            <Popconfirm
              title="Delete Book"
              onConfirm={() => deleteBook(record.id)}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            <Button
              type="primary"
              onClick={() => {
                setIdEdit(record.id);
              }}
            >
              Edit
            </Button>
          </>
        );
      },
    },
  ];

  const qc = useQueryClient();

  // useMutation: deleteBook
  const { mutate: deleteBook } = useMutation({
    mutationFn: async (id: number) => {
      return await axios.delete("http://localhost:3000/books/" + id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["books"] });
    },
  });
  return (
    <div className="p-6">
      <AddPage
        bookDetail={bookDetail}
        idEdit={idEdit}
        onSetIdEdit={setIdEdit}
      />
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>

      <div className="overflow-x-auto">
        <Table columns={columns} dataSource={data} rowKey="id" />
      </div>
    </div>
  );
}

export default ListPage;
