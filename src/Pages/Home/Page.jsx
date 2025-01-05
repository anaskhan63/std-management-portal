import { notification } from "antd";
import React, { useState } from "react";

const Page = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    email: "",
    gender: "",
  });
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.id || !formData.email || !formData.gender) {
      notification.error({
        message: "Please fill all fields!",
      });
      return;
    }
    setStudents([...students, formData]);
    setFormData({ name: "", id: "", email: "", gender: "" });
    notification.success({
      message: "Data Added Successfully!",
    });
  };

  const handleDeleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    notification.success({
      message: `Record with ID: ${id} deleted Successfully!`,
    });
    if (searchResult && searchResult.id === id) {
      setSearchResult(null);
      setSearchId("");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const foundStudent = students.find((student) => student.id === searchId);
    if (foundStudent) {
      setSearchResult(foundStudent);
      notification.success({
        message: `Student with ID: ${searchId} found!`,
      });
    } else {
      setSearchResult(null);
      notification.error({
        message: `No student found with ID: ${searchId}.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Student Management System
        </h2>

        <form className="mb-8" onSubmit={handleAddStudent}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-600 font-medium mb-1"
            >
              Student Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter student name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="id"
              className="block text-gray-600 font-medium mb-1"
            >
              Student ID
            </label>
            <input
              type="number"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter student ID"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter email address"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-1">
              Gender
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="mr-2 focus:ring-blue-500"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="mr-2 focus:ring-blue-500"
                />
                Female
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Female"
                  disabled
                  className="mr-2 focus:ring-blue-500"
                />
                There is no other nigga!!
              </label>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
            >
              Add Student
            </button>
          </div>
        </form>

        <div className="mb-8">
          <form
            onSubmit={handleSearch}
            className="flex items-center justify-center gap-4"
          >
            <input
              type="number"
              name="searchId"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Search by Student ID"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
            >
              Search
            </button>
          </form>
        </div>

        {searchResult && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Search Result
            </h3>
            <div className="p-4 bg-gray-100 rounded-md">
              <p>
                <strong>ID:</strong> {searchResult.id}
              </p>
              <p>
                <strong>Name:</strong> {searchResult.name}
              </p>
              <p>
                <strong>Email:</strong> {searchResult.email}
              </p>
              <p>
                <strong>Gender:</strong> {searchResult.gender}
              </p>
            </div>
          </div>
        )}

        {students.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Student List
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-left">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3">ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Gender</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-t">
                      <td className="p-3">{student.id}</td>
                      <td className="p-3">{student.name}</td>
                      <td className="p-3">{student.email}</td>
                      <td className="p-3">{student.gender}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
