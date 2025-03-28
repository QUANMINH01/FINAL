import { useEffect, useState } from "react";
import dbData from "../../db.json";
import { Pagination, Popover, Button } from "antd";

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Trạng thái phân trang
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize] = useState(8); // Số bệnh nhân mỗi trang

  useEffect(() => {
    setPatients(dbData.patients);
    setLoading(false);
    console.log("Data loaded from db.json:", dbData.patients);
  }, []);

  const onPageChange = (page) => {
    setCurrentPage(page); // Cập nhật trang khi người dùng chuyển trang
  };

  // Tính toán các bệnh nhân hiển thị trên trang hiện tại
  const paginatedPatients = patients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleView = (patientId) => {
    // Xử lý sự kiện khi chọn "View"
    console.log("View patient:", patientId);
  };

  const handleDelete = (patientId) => {
    // Xử lý sự kiện khi chọn "Delete"
    setPatients(patients.filter((patient) => patient.id !== patientId));
    console.log("Deleted patient:", patientId);
  };

  const renderMenu = (patient) => (
    <div>
      <Button onClick={() => handleView(patient.id)} type="text" block>
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
          current={currentPage} // Trang hiện tại
          total={patients.length} // Tổng số bệnh nhân
          pageSize={pageSize} // Số bệnh nhân mỗi trang
          onChange={onPageChange} // Xử lý khi người dùng chuyển trang
          showSizeChanger={false} // Tắt tính năng thay đổi số lượng trang trên một trang
        />
      </div>
    </div>
  );
};

export default Patient;
