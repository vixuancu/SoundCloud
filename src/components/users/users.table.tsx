import { useEffect, useState } from "react";
import "../../styles/users.css";
interface IUsers {
  _id: string;
  email: string;
  name: string;
  role: string;
}
const UsersTable = () => {
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
    console.log("getData1:", d.data.result);
    setListUsers(d.data.result);
  };

  console.log(">>> check render:", listUsers); // mounting
  return (
    <>
      <h2>HTML Table</h2>

      <table>
        <thead>
          <tr>
            <td>Email</td>
            <td>Name</td>
            <td>Role</td>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((item: IUsers, index) => {
            return (
              <tr key={item._id}>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default UsersTable;
