import { useEffect, useState } from "react";
// import "../../styles/users.css";
import { Table, Button, Modal, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
interface IUsers {
  _id: string;
  email: string;
  name: string;
  role: string;
}
const UsersTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const data = {
      name,
      email,
      password,
      age,
      gender,
      role,
      address,
    };
    console.log(">>> check data form: ", data);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [listUsers, setListUsers] = useState([]);
  useEffect(() => {
    console.log(">>> check useEffect");
    // hàm useEffect chạy sau hàm render
    getData();
  }, []);
  const getData = async () => {
    const access_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjc3YjM5NWQ3MzJhYjkxNjViZWRjY2Y3IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MzYxNDUxNTMsImV4cCI6MTgyMjU0NTE1M30.rjrTzFDZBjATbDvrHT-tkzRPyDOHc3FuZyizqb2yGCI";
    const res = await fetch("http://localhost:8000/api/v1/users/all", {
      // mặc định là method get
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
        // cấu hình
      },
    });
    const d = await res.json();
    console.log("getData:", d.data.result);
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
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            Add newUser
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={listUsers} rowKey={"_id"} />
      {/**thuộc tính của datasource tự động maping với dataindex ở columns */}

      <Modal
        title="Add newUser"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <div>
          <label>Name:</label>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <label>Age:</label>
          <Input value={age} onChange={(event) => setAge(event.target.value)} />
        </div>
        <div>
          <label>Gender:</label>
          <Input
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          />
        </div>
        <div>
          <label>Address:</label>
          <Input
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div>
          <label>Role:</label>
          <Input
            value={role}
            onChange={(event) => setRole(event.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};
export default UsersTable;
