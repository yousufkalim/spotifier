// Init
import React, { useEffect, useState } from "react";
import { Table, Space, Button, Modal, Input, Result } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { URLs } from "../utils/config";
import { SmileOutlined } from "@ant-design/icons";
import { handleOk, handleCancel } from "../utils/albums";

// Album Component
const Albums = () => {
  // Initializing States
  const [albums, setAlbums] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [albumName, setAlbumName] = useState("");
  const [albumReleaseDate, setAlbumReleaseDate] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetching data from our respected backend
  const fetchData = async () => {
    const response = await axios.get(`${BaseURL}/api/spotify/getAlbums`);
    setAlbums(response.data);
    setLoading(false);
  };

  // Ant Design
  const { TextArea } = Input;

  // Getting base url
  const { BaseURL, DummyURL } = URLs;

  // Initializing Table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 500,
    },
    {
      title: "Total Tracks",
      dataIndex: "total_tracks",
      key: "total_tracks",
      width: 300,
    },
    {
      title: "Release Date",
      dataIndex: "release_date",
      key: "release_date",
      width: 300,
    },
    {
      title: "Action",
      key: "action",
      width: 300,
      render: (action) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setOpenModal(true);
              setAlbumName(action.name);
              setAlbumReleaseDate(action.release_date);
            }}
          >
            Create Note
          </Button>
        </Space>
      ),
    },
  ];

  // Render
  return (
    <div>
      {/* Table */}
      <Table
        loading={loading}
        columns={columns}
        bordered={true}
        dataSource={albums.map((album) => ({
          name: album.name,
          total_tracks: album.total_tracks,
          release_date: album.release_date,
          action: {
            name: album.name,
            release_date: album.release_date,
          },
        }))}
      />

      {/* Create Note Modal */}
      <Modal
        title={!submitted && "Add Note"}
        visible={openModal}
        okText="Submit"
        onOk={() =>
          handleOk(
            setButtonLoading,
            note,
            albumName,
            albumReleaseDate,
            DummyURL,
            setSubmitted
          )
        }
        onCancel={() => handleCancel(setOpenModal, setNote)}
        cancelButtonProps={submitted && { style: { display: "none" } }}
        okButtonProps={{
          loading: buttonLoading,
          style: { display: submitted && "none" },
        }}
        closable={false}
        maskClosable={false}
      >
        {/* Note */}
        {!submitted ? (
          <TextArea
            showCount
            maxLength={244}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        ) : (
          // Success
          <Result
            icon={<SmileOutlined />}
            title="Great, note have been submitted!"
            extra={
              <Button
                type="primary"
                onClick={() => {
                  setOpenModal(false);
                  setSubmitted(false);
                  setNote("");
                }}
              >
                Close
              </Button>
            }
          />
        )}
      </Modal>
    </div>
  );
};

// Export
export default Albums;
