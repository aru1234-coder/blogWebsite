"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Group } from "@mantine/core";
import { DataTable } from "mantine-datatable";

const staticBlogs = [
  {
    id: 1,
    user_name: "John Doe",
    category_name: "Technology",
    title: "Understanding React Hooks",
    status: "published",
  },
  {
    id: 2,
    user_name: "Jane Smith",
    category_name: "Health",
    title: "10 Tips for a Healthier Life",
    status: "draft",
  },
];

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setBlogs(staticBlogs);
  }, []);

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Blog Management</h1>
        <Link href="/blogs/add">
          <Button color="blue">Add Blog</Button>
        </Link>
      </div>

      <DataTable
        withborder="true"
        highlightOnHover
        columns={[
          { accessor: "id", title: "ID", textAlign: "center" },
          { accessor: "user_name", title: "User" },
          { accessor: "category_name", title: "Category" },
          { accessor: "title", title: "Title" },
          {
            accessor: "status",
            title: "Status",
            render: (row) => <span className="capitalize">{row.status}</span>,
          },
          {
            accessor: "actions",
            title: "Actions",
            textAlign: "center",
            render: (row) => (
              <Group spacing="xs" position="center" noWrap>
                <Link href={`/blogs/edit/${row.id}`}>
                  <Button color="yellow" size="xs">
                    Edit
                  </Button>
                </Link>
                <Button
                  color="red"
                  size="xs"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </Button>
              </Group>
            ),
          },
        ]}
        records={blogs}
        noRecordsText="No blogs found."
        striped
        verticalSpacing="sm"
        pagination="true"
        totalRecords={blogs.length}
        recordsPerPage={5}
        page={1}
        onPageChange={() => {}}
      />
    </div>
  );
};

export default BlogPage;
