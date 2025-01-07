import { useEffect, useState } from "react";
// import "../../styles/users.css";
import { Table, Button, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import CreateUserModal from "./create.user.modal";
import UpdateUserModal from "./update.user.modal";
export interface IUsers {
  _id: string;
  email: string;
  name: string;
  role: string;
  address: string;
  gender: string;
  password: string;
  age: string;
}
const UsersTable = () => {
  const [listUsers, setListUsers] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<null | IUsers>(null);
  const access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjc3YjM5NWQ3MzJhYjkxNjViZWRjY2Y3IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MzYxNDUxNTMsImV4cCI6MTgyMjU0NTE1M30.rjrTzFDZBjATbDvrHT-tkzRPyDOHc3FuZyizqb2yGCI";
  useEffect(() => {
    console.log(">>> check useEffect");
    // hàm useEffect chạy sau hàm render
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch("http://localhost:8000/api/v1/users/all", {
      // mặc định là method get

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
        // cấu hình
      },
    });
    const d = await res.json();
    // console.log("getData:", d.data.result);
    if (!d.data) {
      notification.error({
        message: JSON.stringify(d.message),
      });
    }
    setListUsers(d.data.result);
  };

  const columns: ColumnsType<IUsers> = [
    {
      title: "Email",
      dataIndex: "email",
      render: (value, record) => {
        // console.log("value:", value);
        //record đại diện cho từng hàng ở trên table
        return <a>{record.email}</a>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Actions",
      render: (value, record) => {
        return (
          <div>
            <button
              onClick={() => {
                setDataUpdate(record);
                setIsUpdateModalOpen(true);
              }}
            >
              Edit
            </button>
          </div>
        );
      },
    },
  ];
  console.log(">>> check render:", listUsers); // mounting

  return (
    <>
      <div
        className="vixuancu"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>HTML Table</h2>
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Add newUser
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={listUsers} rowKey={"_id"} />
      {/**thuộc tính của datasource tự động maping với dataindex ở columns */}

      <CreateUserModal
        access_token={access_token}
        getData={getData}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      <UpdateUserModal
        access_token={access_token}
        getData={getData}
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};
export default UsersTable;
