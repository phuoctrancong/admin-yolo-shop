import React, { useEffect, useState } from "react";
import MainLayout from "../../containers/MainLayout";
import { Table, Pagination, Switch, Row, Col, Input, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { formatTime } from "../../common/common";
import { UserStatus } from "./user-status.const";
import { listUser, updateUser } from "../../redux/actions/user.action";

export default function User() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    if (keyword) {
      dispatch(listUser({ page, keyword }));
    } else {
      dispatch(listUser({ page }));
    }
  }, [dispatch, page, keyword]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      render: (record) => UserStatus[record],
    },
    {
      title: "Quyền",
      dataIndex: "role",
      render: (record, row) => (
        <Switch
          checkedChildren="Admin"
          unCheckedChildren="User"
          checked={+record === 1 ? true : false}
          onChange={(checked) => {
            dispatch(
              updateUser(row.id, { role: checked ? 1 : 0 }, () =>
                dispatch(listUser({ page }))
              )
            );
          }}
        />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",

      render: (record, row) => (
        <Switch
          checkedChildren="Hoạt động"
          unCheckedChildren="Bị khoá"
          checked={+record === 1 ? true : false}
          onChange={(checked) => {
            dispatch(
              updateUser(row.id, { isActive: checked ? 1 : 0 }, () =>
                dispatch(listUser({ page }))
              )
            );
          }}
        />
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",

      render: (record) => formatTime(record),
    },
  ];

  const onChange = (page) => {
    setPage(page);
  };
  const onSearchKeyword = (val) => {
    dispatch(listUser({ page: 1, keyword: val }));
    setKeyword(val);
  };

  console.log("🚀 ~ file: index.js:95 ~ User ~ page:", page);
  console.log("🚀 ~ file: index.js:97 ~ User ~ state?.meta?.total:", state);
  return (
    <MainLayout>
      <h2>Danh sách người dùng</h2>
      <Row gutter={[16, 16]}>
        <Col offset={8} span={8} style={{ marginBottom: 20 }}>
          <Input.Search
            placeholder="Nhập từ khoá"
            onSearch={onSearchKeyword}
            enterButton
          />
        </Col>
      </Row>
      <Table columns={columns} dataSource={state?.items} pagination={false} />
      <Pagination
        style={{ marginTop: 10 }}
        current={page}
        total={state?.meta?.total}
        onChange={onChange}
      />
    </MainLayout>
  );
}
