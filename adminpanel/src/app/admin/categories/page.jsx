"use client";
import React, { useEffect, useState } from "react";
import { Button, Group } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import apiRoutes from "@/app/utils/apiRoutes";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import CategoryModal from "@/components/CategoryModal";

const CategoryPage = () => {
  const [categoryData, setCategoryData] = useState([]);

  const [modalOpened, setModalOpened] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // or "edit"
  const [selectedCategory, setSelectedCategory] = useState(null);

  // To open modal in add/edit mode
  const openAddModal = () => {
    setModalMode("add");
    setSelectedCategory(null);
    setModalOpened(true);
  };

  const openEditModal = (category) => {
    setModalMode("edit");
    setSelectedCategory(category);
    setModalOpened(true);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(apiRoutes.categories.getAll);
      setCategoryData(response.data);
    } catch (error) {
      console.error("Error showing in data fetching");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(apiRoutes.categories.delete(id));
      setCategoryData((prev) => prev.filter((b) => b.id !== id));
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Something went wrong !!");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Category Management</h1>
        <Button onClick={openAddModal}>Add Category</Button>
      </div>

      <DataTable
        withborder="true"
        highlightOnHover
        columns={[
          { accessor: "id", title: "ID", textAlign: "center" },
          { accessor: "name", title: "Category Name" },

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
        records={categoryData}
        noRecordsText="No categories found."
        striped
        verticalSpacing="sm"
        pagination="true"
        totalRecords={categoryData.length}
        recordsPerPage={5}
        page={1}
        onPageChange={() => {}}
      />

      <CategoryModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        mode={modalMode}
        categoryData={selectedCategory}
        onSuccess={getCategories}
      />
    </div>
  );
};

export default CategoryPage;
