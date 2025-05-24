"use client";
import React, { useEffect, useState } from "react";
import { Modal, Button, TextInput, Group, Stack } from "@mantine/core";
import axios from "axios";
import toast from "react-hot-toast";
import apiRoutes from "@/app/utils/apiRoutes";
import { slugify } from "@/app/utils/slugify";

const CategoryModal = ({
  opened,
  onClose,
  mode = "add",
  categoryData = {},
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    categoryName: "",
    slug: "",
  });

  console.log("formData", formData);

  useEffect(() => {
    if (mode === "edit" && categoryData) {
      setFormData({
        categoryName: categoryData.name || "",
        slug: categoryData.slug || "",
      });
    } else {
      setFormData({
        categoryName: "",
        slug: "",
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
      const dataToSend = {
        ...formData,
        slug: slugify(formData.categoryName), // generate right before send
      };

      console.log("dataToSend", dataToSend);
      if (mode === "edit") {
        await axios.put(
          apiRoutes.categories.update(categoryData.id),
          dataToSend
        );
        toast.success("Category updated successfully");
      } else {
        await axios.post(apiRoutes.categories.add, dataToSend);
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
          onChange={(e) => {
            const categoryName = e.target.value;
            setFormData((prev) => ({
              ...prev,
              categoryName: categoryName,
              slug: slugify(categoryName),
            }));
          }}
          required
        />

        <TextInput label="Slug" value={formData.slug} readOnly disabled />

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
