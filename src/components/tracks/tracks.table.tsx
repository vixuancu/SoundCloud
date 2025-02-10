import { Button, notification, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

interface ITracks {
  _id: string;
  title: string;
  description: string;
  category: string;
  trackUrl: string;
  uploader: {
    name: string;
  };
}
const TracksTable = () => {
  const [listTracks, setListTracks] = useState([]);
  const access_token = localStorage.getItem("access_token") as string;
  useEffect(() => {
    console.log(">>> check useEffect");
    // hàm useEffect chạy sau hàm render
    getData();
  }, []);

  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 5,
    pages: 0,
    total: 0,
  });
  // get data
  const getData = async () => {
    const res = await fetch(
      `http://localhost:8000/api/v1/tracks?current=${meta.current}&pageSize=${meta.pageSize}`,
      {
        // mặc định là method get

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
          // cấu hình
        },
      }
    );
    const d = await res.json();
    // console.log("getData:", d.data.result);
    if (!d.data) {
      notification.error({
        message: JSON.stringify(d.message),
      });
    }
    setListTracks(d.data.result);
    setMeta({
      current: d.data.meta.current,
      pageSize: d.data.meta.pageSize,
      pages: d.data.meta.pages,
      total: d.data.meta.total,
    });
  };

  const confirm = async (track: ITracks) => {
    const res = await fetch(
      `http://localhost:8000/api/v1/tracks/${track._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const d = await res.json();
    if (d.data) {
      notification.success({
        message: "Xóa track thành công.",
      });
      await getData();
    } else {
      notification.error({
        message: JSON.stringify(d.message),
      });
    }
  };

  const columns: ColumnsType<ITracks> = [
    {
      dataIndex: "_id",
      title: "STT",
      render: (value, record, index) => {
        return (
          <>{(meta.current - 1) * meta.pageSize + index + 1}</> // tham khảo
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "TrackUrl",
      dataIndex: "trackUrl",
    },
    {
      title: "uploader",
      dataIndex: ["uploader", "name"], ///uploader.name
    },
    {
      title: "Actions",
      render: (value, record) => {
        return (
          <div>
            <Popconfirm
              title="Delete the track"
              description={`Are you sure to delete this track. name = ${record.title}?`}
              onConfirm={() => confirm(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button style={{ marginLeft: 20 }} danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const handleOnChange = async (page: number, pageSize: number) => {
    const res = await fetch(
      `http://localhost:8000/api/v1/tracks?current=${page}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const d = await res.json();
    if (!d.data) {
      notification.error({
        message: JSON.stringify(d.message),
      });
    }
    setListTracks(d.data.result);
    setMeta({
      current: d.data.meta.current,
      pageSize: d.data.meta.pageSize,
      pages: d.data.meta.pages,
      total: d.data.meta.total,
    });
  };
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
        <h2>Tracks Table</h2>
      </div>

      <Table
        columns={columns}
        dataSource={listTracks}
        rowKey={"_id"}
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          total: meta.total,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page: number, pageSize: number) =>
            handleOnChange(page, pageSize),
          showSizeChanger: true,
        }}
      />
      {/**thuộc tính của datasource tự động maping với dataindex ở columns */}
    </>
  );
};
export default TracksTable;
