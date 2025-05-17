"use client";
import React, { useEffect, useState } from "react";
import { Modal, Button, TextInput, Select, Group, Stack } from "@mantine/core";
import axios from "axios";
import toast from "react-hot-toast";
import apiRoutes from "@/app/utils/apiRoutes";

const UserModal = ({
  opened,
  onClose,
  mode = "add",
  userData = {},
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "author",
  });

  useEffect(() => {
    if (mode === "edit" && userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        role: userData.role || "author",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        role: "author",
      });
    }
  }, [mode, userData, opened]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (mode === "edit") {
        await axios.put(apiRoutes.Users.update(userData.id), formData);
        toast.success("User updated successfully");
      } else {
        await axios.post(apiRoutes.users.add, formData);
        toast.success("User added successfully");
      }
      onClose();
      onSuccess();
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={mode === "edit" ? "Edit User" : "Add User"}
      centered
    >
      <Stack>
        <TextInput
          label="User Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
        <TextInput
          label="Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />

        <Select
          label="role"
          data={[
            { value: "author", label: "Author" },
            { value: "admin", label: "Admin" },
          ]}
          value={formData.role}
          onChange={(value) => handleChange("role", value)}
          required
        />
        <Group position="right" mt="md">
          <Button onClick={handleSubmit}>
            {mode === "edit" ? "Update User" : "Add User"}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default UserModal;
