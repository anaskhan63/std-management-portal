import { message, notification } from "antd";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../Network/axiosInstance";

const Page = () => {
  const [students, setStudents] = useState([]);
  const [isRender, setIsRender] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    email: "",
    gender: "",
  });
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get("/api/get-student");
      console.log("res", response.data);

      setStudents(response.data.students);
      console.log("std", students);
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Failed to fetch students!",
      });
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);
  useEffect(() => {
    if (isRender) {
      fetchStudents();
      setIsRender(false);
    }
  }, [isRender]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.studentId ||
      !formData.email ||
      !formData.gender
    ) {
      notification.error({
        message: "Please fill all fields!",
      });
      return;
    }
    try {
      message.loading("please wait");
      const response = await axiosInstance.post("/api/register-student", {
        name: formData.name,
        studentId: formData.studentId,
        email: formData.email,
        gender: formData.gender,
      });
      console.log(response);
      setStudents([...students, response.data]);
      setIsRender(true);
      setFormData({ name: "", studentId: "", email: "", gender: "" });

      notification.success({
        message: "Data Added Successfully!",
      });
      message.destroy();
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Failed to add student!",
      });
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axiosInstance.delete(`/api/delete-student/${id}`);
      const updatedStudents = students.filter((student) => student.id !== id);
      setStudents(updatedStudents);
      setIsRender(true);
      notification.success({
        message: `Record with ID: ${id} deleted Successfully!`,
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: `Failed to delete student with ID: ${id}!`,
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const foundStudent = students.filter((e) => e.studentId === searchId);
    if (foundStudent.length>0) {
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
              name="studentId"
              value={formData.studentId}
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
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="mr-2 focus:ring-blue-500"
                />
                male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="mr-2 focus:ring-blue-500"
                />
                female
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  disabled
                  className="mr-2 focus:ring-blue-500"
                />
                There is no other.
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
            <div className="p-4 text-sm md:text-base bg-gray-100 rounded-md">
              <p>
                <strong>ID:</strong> {searchResult[0]?.studentId}
              </p>
              <p>
                <strong>Name:</strong> {searchResult[0]?.name}
              </p>
              <p>
                <strong>Email:</strong> {searchResult[0]?.email}
              </p>
              <p>
                <strong>Gender:</strong> {searchResult[0]?.gender}
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
                  {students.map((student,i) => (
                    <tr key={i} className="border-t">
                      <td className="p-3">{student.studentId}</td>
                      <td className="p-3">{student.name}</td>
                      <td className="p-3">{student.email}</td>
                      <td className="p-3">{student.gender}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleDeleteStudent(student._id)}
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
