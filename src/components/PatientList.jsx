import { useEffect, useState } from "react";
import dbData from "../../db.json";
import {
  Button,
  List,
  Avatar,
  Skeleton,
  Row,
  Col,
  Pagination,
  Modal,
  Form,
  Input,
  message, // Import message từ Ant Design để hiển thị thông báo
} from "antd";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Các biến phục vụ cho List
  const [initLoading, setInitLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);

  // Trạng thái phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);

  // Trạng thái modal và dữ liệu của bệnh nhân cần chỉnh sửa
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  useEffect(() => {
    setPatients(dbData.patients);
    setLoading(false);
    setInitLoading(false);
    console.log("Data loaded from db.json:", dbData.patients);
  }, []);

  const loadMoreHandler = () => {
    setLoadMore(true);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedPatients = patients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleViewClick = (patient) => {
    setCurrentPatient(patient);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = (values) => {
    // Cập nhật dữ liệu bệnh nhân trong trạng thái
    const updatedPatients = patients.map((patient) =>
      patient.id === currentPatient.id ? { ...patient, ...values } : patient
    );
    setPatients(updatedPatients);
    setIsModalVisible(false);
  };

  const handleDeleteClick = (patientId) => {
    // Xóa bệnh nhân khỏi danh sách
    const updatedPatients = patients.filter(
      (patient) => patient.id !== patientId
    );
    setPatients(updatedPatients);
    message.success("Patient deleted successfully!"); // Hiển thị thông báo khi xóa thành công
  };

  if (loading) {
    return <p className="text-center p-4">Loading patients data...</p>;
  }

  return (
    <div>
      {/* Thanh tiêu đề */}
      <Row className="bg-gray-100 p-4" justify="space-between">
        <Col span={6} className="font-semibold text-lg">
          Name
        </Col>
        <Col span={6} className="font-semibold text-lg">
          Email
        </Col>
        <Col span={6} className="font-semibold text-lg">
          Phone
        </Col>
        <Col span={6} className="font-semibold text-lg">
          Status
        </Col>
      </Row>

      {/* Danh sách bệnh nhân */}
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={
          loadMore && (
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <Button onClick={loadMoreHandler}>Load more</Button>
            </div>
          )
        }
        dataSource={paginatedPatients}
        renderItem={(patient) => (
          <List.Item
            actions={[
              <a
                key="list-loadmore-edit"
                onClick={() => handleViewClick(patient)}
              >
                view
              </a>,
              <a
                key="list-loadmore-delete"
                onClick={() => handleDeleteClick(patient.id)}
              >
                delete
              </a>,
            ]}
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                title={
                  <Row className="bg-white p-0" justify="space-between">
                    <Col span={6} className="flex items-center">
                      <Avatar
                        src={
                          patient.avatar ||
                          "https://randomuser.me/api/portraits/lego/1.jpg"
                        }
                      />
                      <span className="font-bold text-black ml-5">
                        {patient.name}
                      </span>
                    </Col>
                    <Col span={6}>
                      <span className="text-black ml-10">{patient.email}</span>
                    </Col>
                    <Col span={6}>
                      <span className="text-black ml-16">{patient.phone}</span>
                    </Col>
                    <Col span={6}>
                      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 ml-22">
                        Contact
                      </button>
                    </Col>
                  </Row>
                }
              />
            </Skeleton>
          </List.Item>
        )}
      />

      {/* Phân trang */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Pagination
          current={currentPage}
          total={patients.length}
          pageSize={pageSize}
          onChange={onPageChange}
          showSizeChanger={false}
        />
      </div>

      {/* Modal để hiển thị và chỉnh sửa thông tin bệnh nhân */}
      <Modal
        title="Edit Patient"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        {currentPatient && (
          <Form
            initialValues={currentPatient}
            onFinish={handleFormSubmit}
            layout="vertical"
          >
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default PatientList;
