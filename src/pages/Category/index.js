import React, { useEffect, useState } from "react";
import MainLayout from "../../containers/MainLayout";
import {
  Button,
  Modal,
  Space,
  Table,
  Form,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Col,
  Select,
  InputNumber,
  Tabs,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  detailCategory,
  listCategory,
  updateCategory,
} from "../../redux/actions/category.action";
import {
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { formatTime } from "../../common/common";
import { isEmpty } from "lodash";

export default function Category() {
  const [visible, setVisible] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState();
  const [id, setId] = useState();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(listCategory({ page }));
  }, [dispatch, page]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (record) => formatTime(record),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      render: (record) => formatTime(record),
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "id",
      render: (item) => {
        return (
          <>
            <EyeOutlined
              style={{
                cursor: "pointer",
                paddingRight: 10,
              }}
              onClick={() => showModalDetail(item.id)}
            />
            <Popconfirm
              title="Bạn có muốn xoá bản ghi này?"
              onConfirm={() =>
                dispatch(
                  deleteCategory(item.id, () =>
                    dispatch(listCategory({ page }))
                  )
                )
              }
              okText="Có"
              cancelText="Không"
            >
              <DeleteOutlined
                style={{
                  cursor: "pointer",
                  paddingRight: 10,
                }}
              />
            </Popconfirm>
            <EditOutlined
              style={{
                cursor: "pointer",
              }}
              onClick={() => showModalUpdate(item.id)}
            />
          </>
        );
      },
    },
  ];

  const onChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    form.setFieldsValue({
      name: state.item.name,
      description: state.item.description,
      subCategories: state?.item?.subCategories?.map((e) => ({
        name: e?.name,
        description: e?.description,
      })),
    });
  }, [form, state.item]);

  const showModal = () => {
    form.resetFields();
    setMode("CREATE");
    setVisible(true);
  };

  const showModalUpdate = (id) => {
    setId(id);
    setMode("UPDATE");
    setVisible(true);
    dispatch(detailCategory(id));
  };

  const showModalDetail = (id) => {
    setId(id);
    setMode("DETAIL");
    setVisibleDetail(true);
    dispatch(detailCategory(id));
  };

  const showTitle = (mode) => {
    switch (mode) {
      case "CREATE":
        return "Tạo mới danh mục";
      case "UPDATE":
        return "Cập nhật danh mục";
      case "DETAIL":
        return "Chi tiết danh mục";
      default:
        break;
    }
  };

  const showLableButton = (mode) => {
    switch (mode) {
      case "CREATE":
        return "Tạo mới";
      case "UPDATE":
        return "Cập nhật";
      default:
        break;
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setVisibleDetail(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    switch (mode) {
      case "CREATE":
        dispatch(
          createCategory(values, () => dispatch(listCategory({ page })))
        );
        break;
      case "UPDATE":
        dispatch(
          updateCategory(id, values, () => dispatch(listCategory({ page })))
        );
        break;
      default:
        break;
    }

    setVisible(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <MainLayout>
      <h2>Danh sách danh mục</h2>
      <Space style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={showModal}>
          Tạo mới
        </Button>
      </Space>
      {/* Modal create / update */}
      <Modal
        title={showTitle(mode)}
        // open={visible}
        visible={visible}
        onCancel={handleCancel}
        width={1000}
        footer={false}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Tên danh mục"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên danh mục" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Mô tả"
                name="description"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                rules={[{ required: false }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Danh mục con"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                required={true}
              >
                <Form.List name="subCategories">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            label="Tên danh mục con"
                            name={[name, "name"]}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập tên danh mục con",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Mô tả danh mục con"
                            name={[name, "description"]}
                            rules={[{ required: false }]}
                          >
                            <Input />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Thêm danh mục con
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {showLableButton(mode)}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal detail */}

      <Modal
        title={showTitle(mode)}
        visible={visibleDetail}
        onCancel={handleCancel}
        width={1000}
        footer={false}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Tên danh mục"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                name="name"
              >
                {state?.item?.name}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Mô tả"
                name="description"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                rules={[{ required: false }]}
              >
                {state?.item?.description}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Danh mục con"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
              >
                {!isEmpty(state.item.subCategories)
                  ? state.item.subCategories.map((e, index) => (
                      <Space
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          label="Tên danh mục con"
                          name={["subCategories", index, "name"]}
                        >
                          <Input disabled value={e?.name} />
                        </Form.Item>
                        <Form.Item
                          label="Mô tả danh mục con"
                          name={["subCategories", index, "description"]}
                        >
                          <Input disabled value={e?.description} />
                        </Form.Item>
                      </Space>
                    ))
                  : []}
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {showLableButton(mode)}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Table columns={columns} dataSource={state?.items} pagination={false} />
      <Pagination
        style={{ marginTop: 10 }}
        current={page}
        total={state.meta?.total}
        onChange={onChange}
      />
    </MainLayout>
  );
}
