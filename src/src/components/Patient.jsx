import { useEffect, useState } from "react";
import dbData from "../../db.json";
import { Pagination, Popover, Button, Modal, Input, Form } from "antd";

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Trạng thái phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);

  // Trạng thái để hiển thị modal chỉnh sửa bệnh nhân
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  useEffect(() => {
    setPatients(dbData.patients);
    setLoading(false);
    console.log("Data loaded from db.json:", dbData.patients);
  }, []);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Tính toán các bệnh nhân hiển thị trên trang hiện tại
  const paginatedPatients = patients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleView = (patient) => {
    setCurrentPatient(patient);
    setIsModalVisible(true);
  };

  const handleDelete = (patientId) => {
    // Xử lý sự kiện khi chọn "Delete"
    setPatients(patients.filter((patient) => patient.id !== patientId));
    console.log("Deleted patient:", patientId);
  };

  const handleFormSubmit = (values) => {
    // Cập nhật bệnh nhân với thông tin mới từ form
    const updatedPatients = patients.map((patient) =>
      patient.id === currentPatient.id ? { ...patient, ...values } : patient
    );
    setPatients(updatedPatients); // Cập nhật lại danh sách bệnh nhân
    setIsModalVisible(false); // Đóng modal
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); // Đóng modal
  };

  const renderMenu = (patient) => (
    <div>
      <Button onClick={() => handleView(patient)} type="text" block>
        View
      </Button>
      <Button onClick={() => handleDelete(patient.id)} type="text" block danger>
        Delete
      </Button>
    </div>
  );

  if (loading) {
    return <p className="text-center p-4">Loading patients data...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-4">
        {patients.length === 0 ? (
          <p className="text-center p-4">No patients available</p>
        ) : (
          paginatedPatients.map((patient) => (
            <div
              key={patient.id}
              className="w-60 h-70 mx-6 my-2 bg-gray-100 shadow-lg rounded-lg p-2 space-y-4 group flex flex-col relative"
            >
              {/* Dấu 3 chấm ngang sử dụng Popover */}
              <div className="group-hover:scale-102 transition-transform duration-500 ease-in-out flex-grow">
                <div className="flex justify-center">
                  <Popover
                    content={renderMenu(patient)}
                    trigger="click"
                    placement="bottomRight"
                  >
                    <span className="absolute top-0 right-2 text-2xl font-semibold text-gray-500 cursor-pointer">
                      ...
                    </span>
                  </Popover>
                  <img
                    src={
                      patient.avatar ||
                      "https://randomuser.me/api/portraits/lego/1.jpg"
                    }
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://randomuser.me/api/portraits/lego/1.jpg";
                    }}
                  />
                </div>

                <div className="text-center mt-4">
                  <h2 className="text-xl font-semibold truncate">
                    {patient.name}
                  </h2>
                  <p className="text-gray-600 truncate">{patient.email}</p>
                  <p className="text-gray-600 truncate">{patient.phone}</p>
                </div>

                <div className="flex justify-center mt-4">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

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

      {/* Modal để chỉnh sửa bệnh nhân */}
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

export default Patient;
