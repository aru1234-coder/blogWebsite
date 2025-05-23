"use client";
import React, { useEffect, useState } from "react";
import { Modal, Button, TextInput, Group, Stack } from "@mantine/core";
import axios from "axios";
import toast from "react-hot-toast";
import apiRoutes from "@/app/utils/apiRoutes";

const CategoryModal = ({
  opened,
  onClose,
  mode = "add",
  categoryData = {},
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    categoryName: "",
  });

  useEffect(() => {
    if (mode === "edit" && categoryData) {
      setFormData({
        categoryName: categoryData.name || "",
      });
    } else {
      setFormData({
        categoryName: "",
      });
    }
  }, [mode, categoryData, opened]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (mode === "edit") {
        await axios.put(apiRoutes.categories.update(categoryData.id), formData);
        toast.success("Category updated successfully");
      } else {
        await axios.post(apiRoutes.categories.add, formData);
        toast.success("Category added successfully");
      }
      onClose();
      onSuccess();
    } catch (error) {
      if (error.response && error.response.data) {
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={mode === "edit" ? "Edit Category" : "Add Category"}
      centered
    >
      <Stack>
        <TextInput
          label="Category Name"
          value={formData.categoryName}
          onChange={(e) => handleChange("categoryName", e.target.value)}
          required
        />

        <Group position="right" mt="md">
          <Button onClick={handleSubmit}>
            {mode === "edit" ? "Update Category" : "Add Category"}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default CategoryModal;
