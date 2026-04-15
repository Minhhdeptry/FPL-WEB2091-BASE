import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Popconfirm, Table } from "antd";
import { Bookings, getAll, remove } from "../sevices/booking";
import { Link } from "react-router-dom";

function ListPage() {
    const queryClient = useQueryClient()
    const query = useQuery({
      queryKey: ['bookings'],
      queryFn: getAll
    })

    const mutation = useMutation({ 
      mutationFn: remove,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['bookings']})
      }
    })

    const handleDelete = (id: string) => {
      mutation.mutate(id)
    }

    const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (booking: Bookings) => {
        console.log(booking);
        return (
          <>
            <Link to={`/bookings/edit/${booking.id}`}>
              <Button type="primary">Edit</Button>
            </Link>
            <Popconfirm
              title="Delete the booking"
              description="Bạn có chắc chắn ko??"
              onConfirm={() => {
                handleDelete(booking.id);
              }}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  return (
    <>
    <Link to={`/bookings/add`}>
      <Button>Thêm mới</Button>
    </Link>
    <Table dataSource={query.data} columns={columns} rowKey="id" />;
    </>
  );
}

export default ListPage;
