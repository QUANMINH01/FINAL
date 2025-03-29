import React, { useState, useEffect } from "react";
import {
  UserAddOutlined,
  UnorderedListOutlined,
  GoldOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Hàm để lấy dữ liệu từ API
  const fetchPatients = async (query = "") => {
    try {
      const response = await fetch("http://localhost:5000/patients");
      const data = await response.json();

      // Nếu có query tìm kiếm, lọc dữ liệu trước khi cập nhật state
      if (query) {
        const filteredData = data.filter(
          (patient) =>
            patient.name.toLowerCase().includes(query.toLowerCase()) ||
            patient.email.toLowerCase().includes(query.toLowerCase()) ||
            patient.phone.includes(query)
        );
        setPatients(filteredData);
      } else {
        setPatients(data);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Gọi API khi component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  const handleListClick = () => {
    navigate("/list");
  };

  const handleGoldClick = () => {
    navigate("/items");
  };

  const handleAddContactClick = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newContactWithId = {
      ...newContact,
      id: Date.now(),
    };

    try {
      const response = await fetch("http://localhost:5000/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContactWithId),
      });

      if (response.ok) {
        const addedContact = await response.json();
        console.log("New contact added:", addedContact);
        alert("Thêm liên hệ mới thành công!");

        setPatients((prevPatients) => [addedContact, ...prevPatients]);

        setNewContact({ name: "", email: "", phone: "", avatar: "" });
        setShowForm(false);
      } else {
        console.error("Failed to add contact", response);
        alert("Thêm liên hệ thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error adding contact:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  // Hàm khi nhấn Enter trong ô tìm kiếm
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      fetchPatients(searchQuery);
    }
  };

  return (
    <div className="p-4 flex items-center justify-between bg-white relative">
      <button
        onClick={handleAddContactClick}
        className="bg-blue-500 text-white mt-3 ml-3 px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-4"
      >
        <UserAddOutlined className="mr-2" />
        Thêm liên hệ mới
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      )}

      {showForm && (
        <div className="absolute top-20 right-0 w-1/3 p-4 bg-gray-100 rounded-lg shadow-md z-50">
          <h3 className="text-xl font-semibold mb-4">Thêm Liên Hệ Mới</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newContact.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={newContact.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Số điện thoại
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={newContact.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              >
                URL Avatar
              </label>
              <input
                type="text"
                id="avatar"
                name="avatar"
                value={newContact.avatar}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-4 mt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Gửi
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="ml-auto flex items-center mt-4 space-x-4">
        <input
          type="text"
          placeholder="Nhập tìm kiếm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchSubmit} // Lắng nghe sự kiện khi nhấn Enter
          className="px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleListClick}
          className="text-black p-2 rounded-md hover:bg-gray-200"
        >
          <UnorderedListOutlined style={{ fontSize: "25px" }} />
        </button>

        <button
          onClick={handleGoldClick}
          className="text-black p-2 rounded-md hover:bg-gray-200"
        >
          <GoldOutlined style={{ fontSize: "25px" }} />
        </button>
      </div>

      <div className="mt-8">
        {patients.length > 0 && (
          <ul>
            {patients.map((patient) => (
              <li key={patient.id}>
                <div className="flex items-center">
                  <img
                    src={patient.avatar}
                    alt={patient.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <p className="font-semibold">{patient.name}</p>
                    <p className="text-gray-500">{patient.email}</p>
                    <p className="text-gray-500">{patient.phone}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Nav;
