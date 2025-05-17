"use client";
import React, { useEffect, useState } from "react";
import { Modal, Button, TextInput, Select, Group, Stack } from "@mantine/core";
import axios from "axios";
import toast from "react-hot-toast";
import apiRoutes from "@/app/utils/apiRoutes";

const BlogModal = ({
  opened,
  onClose,
  mode = "add",
  blogData = {},
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    userName: "",
    categoryName: "",
    title: "",
    status: "draft",
    content: "",
    image: "",
  });

  useEffect(() => {
    if (mode === "edit" && blogData) {
      setFormData({
        userName: blogData.userName || "",
        categoryName: blogData.categoryName || "",
        title: blogData.title || "",
        status: blogData.status || "draft",
        content: blogData.content || "",
        image: blogData.image || "",
      });
    } else {
      setFormData({
        userName: "",
        categoryName: "",
        title: "",
        status: "draft",
        content: "",
        image: "",
      });
    }
  }, [mode, blogData, opened]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (mode === "edit") {
        await axios.put(apiRoutes.blogs.update(blogData.id), formData);
        toast.success("Blog updated successfully");
      } else {
        await axios.post(apiRoutes.blogs.add, formData);
        toast.success("Blog added successfully");
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
      title={mode === "edit" ? "Edit Blog" : "Add Blog"}
      centered
    >
      <Stack>
        <TextInput
          label="User Name"
          value={formData.userName}
          onChange={(e) => handleChange("userName", e.target.value)}
          required
        />
        <TextInput
          label="Category Name"
          value={formData.categoryName}
          onChange={(e) => handleChange("categoryName", e.target.value)}
          required
        />
        <TextInput
          label="Title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />
        <Select
          label="Status"
          data={[
            { value: "draft", label: "Draft" },
            { value: "published", label: "Published" },
          ]}
          value={formData.status}
          onChange={(value) => handleChange("status", value)}
          required
        />
        <Group position="right" mt="md">
          <Button onClick={handleSubmit}>
            {mode === "edit" ? "Update Blog" : "Add Blog"}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default BlogModal;
