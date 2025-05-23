"use client";
import React, { useEffect, useState } from "react";
import { Button, Group } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import apiRoutes from "@/app/utils/apiRoutes";
import toast from "react-hot-toast";
import BlogModal from "../../../components/BlogModal";

const BlogPage = () => {
  const [blogsData, setBlogsData] = useState([]);
  useEffect(() => {
    getBlogs();
  }, []);

  // Inside component state
  const [modalOpened, setModalOpened] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // or "edit"
  const [selectedBlog, setSelectedBlog] = useState(null);

  // To open modal in add/edit mode
  const openAddModal = () => {
    setModalMode("add");
    setSelectedBlog(null);
    setModalOpened(true);
  };

  const openEditModal = (blog) => {
    setModalMode("edit");
    setSelectedBlog(blog);
    setModalOpened(true);
  };

  const getBlogs = async () => {
    try {
      const response = await axios.get(apiRoutes.blogs.getAll);
      setBlogsData(response.data);
    } catch (error) {
      console.error("Error showing in data fetching");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(apiRoutes.blogs.delete(id));
      setBlogsData((prev) => prev.filter((b) => b.id !== id));
      toast.success("Blog deleted successfully");
    } catch (error) {
      toast.error("Something went wrong !!");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Blog Management</h1>
        <Button onClick={openAddModal}>Add Blog</Button>
      </div>

      <DataTable
        withborder="true"
        highlightOnHover
        columns={[
          { accessor: "id", title: "ID", textAlign: "center" },
          { accessor: "title", title: "Title" },
          { accessor: "categoryName", title: "Category" },
          { accessor: "userName", title: "Admin Name" },

          {
            accessor: "status",
            title: "Status",
            render: (row) => <span className="capitalize">{row.status}</span>,
          },
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
        records={blogsData}
        noRecordsText="No blogs found."
        striped
        verticalSpacing="sm"
        pagination="true"
        totalRecords={blogsData.length}
        recordsPerPage={5}
        page={1}
        onPageChange={() => {}}
      />

      <BlogModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        mode={modalMode}
        blogData={selectedBlog}
        onSuccess={getBlogs}
      />
    </div>
  );
};

export default BlogPage;
