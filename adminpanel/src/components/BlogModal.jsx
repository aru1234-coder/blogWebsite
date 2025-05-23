"use client";
import React, { useEffect, useState } from "react";
import { Modal, Button, TextInput, Select, Group, Stack } from "@mantine/core";
import axios from "axios";
import toast from "react-hot-toast";
import apiRoutes from "@/app/utils/apiRoutes";
import { useSelector } from "react-redux";
import { slugify } from "@/app/utils/slugify";

const BlogModal = ({
  opened,
  onClose,
  mode = "add",
  blogData = {},
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    categoryName: "",
    title: "",
    slug: "",
    status: "draft",
    content: "",
    image: "",
  });

  const [allCategories, setAllCategories] = useState([]);

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (mode === "edit" && blogData) {
      setFormData({
        categoryName: blogData.categoryName || "",
        title: blogData.title || "",
        status: blogData.status || "draft",
        content: blogData.content || "",
        image: blogData.image || "",
        slug: blogData.slug || "",
      });
    } else {
      setFormData({
        categoryName: "",
        title: "",
        status: "draft",
        content: "",
        image: "",
        slug: "",
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
      const dataToSend = {
        ...formData,
        slug: slugify(formData.title), // generate right before send
        userId: user?.id,
      };

      if (mode === "edit") {
        await axios.put(apiRoutes.blogs.update(blogData.id), dataToSend);
        toast.success("Blog updated successfully");
      } else {
        await axios.post(apiRoutes.blogs.add, dataToSend);
        toast.success("Blog added successfully");
      }
      onClose();
      onSuccess();
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    try {
      const categoryResponse = await axios.get(apiRoutes.categories.getAll);
      const formattedCategories = categoryResponse.data.map((cat) => ({
        value: cat.name, // or use cat.slug or cat.id if needed
        label: cat.name,
      }));
      setAllCategories(formattedCategories);
    } catch (error) {
      console.error("Showing error in fetching all categories");
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
        <Select
          label="Choose Category"
          placeholder="Select category"
          data={allCategories}
          value={formData.categoryName}
          onChange={(value) => handleChange("categoryName", value)}
          required
        />

        <TextInput
          label="Title"
          value={formData.title}
          onChange={(e) => {
            const newTitle = e.target.value;
            setFormData((prev) => ({
              ...prev,
              title: newTitle,
              slug: slugify(newTitle),
            }));
          }}
          required
        />

        <TextInput label="Slug" value={formData.slug} readOnly disabled />

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
