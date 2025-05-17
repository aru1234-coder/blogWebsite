"use client";
import React, { useEffect, useState } from "react";
import { Button, Group } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import axios from "axios";
import apiRoutes from "@/app/utils/apiRoutes";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import UserModal from "@/components/UserModal";

const UserPage = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const [modalOpened, setModalOpened] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // or "edit"
  const [selectedUser, setSelectedUser] = useState(null);

  // To open modal in add/edit mode
  const openAddModal = () => {
    setModalMode("add");
    setSelectedUser(null);
    setModalOpened(true);
  };

  const openEditModal = (user) => {
    setModalMode("edit");
    setSelectedUser(user);
    setModalOpened(true);
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(apiRoutes.users.getAll);
      setUserData(response.data);
    } catch (error) {
      console.error("Error showing in data fetching");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(apiRoutes.users.delete(id));
      setUserData((prev) => prev.filter((b) => b.id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Something went wrong !!");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">User Management</h1>
        <Button onClick={openAddModal}>Add User</Button>
      </div>

      <DataTable
        withborder="true"
        highlightOnHover
        columns={[
          { accessor: "id", title: "ID", textAlign: "center" },
          { accessor: "email", title: "Email" },
          { accessor: "name", title: "User" },
          { accessor: "role", title: "Role" },

          {
            accessor: "actions",
            title: "Actions",
            render: (row) => (
              <Group spacing="xs" position="center" nowrap="true">
                <Button onClick={() => openEditModal(row)}>
                  <FaRegEdit />
                </Button>
                <Button
                  color="red"
                  size="xs"
                  onClick={() => handleDelete(row.id)}
                >
                  <MdDelete />
                </Button>
              </Group>
            ),
          },
        ]}
        records={userData}
        noRecordsText="No blogs found."
        striped
        verticalSpacing="sm"
        pagination="true"
        totalRecords={userData.length}
        recordsPerPage={5}
        page={1}
        onPageChange={() => {}}
      />

      <UserModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        mode={modalMode}
        userData={selectedUser}
        onSuccess={getUsers}
      />
    </div>
  );
};

export default UserPage;
