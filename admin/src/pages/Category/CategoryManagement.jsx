import { useCallback, useEffect, useMemo, useState } from "react";
import { CategoryService } from "../../services";
import ContentWrapper from "../../components/Layout/Components/ContentWrapper";
import { ConfirmationModal } from "../../components/Modal";
import { toast } from "react-toastify";
import CategoryModificationModal from "./Components/CategoryModificationModal";
import CategoryHeaderAction from "./Components/CategoryHeaderAction";
import CategoryTable from "./Components/CategoryTable";
import { setDocumentTitle } from "../../components/Utils/Helpers";

const CategoryManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [queryParams, setQueryParams] = useState();
  const [totalRows, setTotalRows] = useState(0);

  const selectedCategory = useMemo(() => {
    return categoryData.find((item) => item._id === selectedCategoryId) ?? null;
  }, [selectedCategoryId, categoryData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id) => {
    setSelectedCategoryId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleClickDeleteButton = useCallback((id) => {
    setSelectedCategoryId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    if (!queryParams) {
      return;
    }
    setIsLoading(true);

    try {
      const { data, meta } = await CategoryService.getCategories(queryParams);

      setCategoryData(data);
      setIsLoading(false);
      setTotalRows(meta.total);
    } catch (error) {
      toast.error("An unknown error occurred while processing your request.");
    }
  }, [queryParams]);

  const handleDelete = useCallback(async () => {
    if (!selectedCategory) {
      return;
    }

    try {
      await CategoryService.deleteCategoryById(selectedCategory?._id);

      toast.success("The category has been deleted successfully.");

      fetchData();
    } catch (error) {
      toast.error(
        "An error occurred while deleting the category. Please try again later."
      );
    } finally {
      setIsShowDeleteModal(false);
    }
  }, [fetchData, selectedCategory, toast]);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedCategoryId(null);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setDocumentTitle("Category Management");
  }, []);

  return (
    <ContentWrapper
      title="Category Management"
      actions={<CategoryHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <CategoryTable
        data={categoryData}
        isLoading={isLoading}
        onChangeState={setQueryParams}
        rows={totalRows}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
      />

      <ConfirmationModal
        message="Are you sure you want to delete this category? This action cannot be undone."
        isOpen={isShowDeleteModal}
        status="danger"
        title={
          <div>
            Delete
            <span className="mx-1 font-semibold text-red-500 whitespace-normal break-words">
              {selectedCategory?.name}
            </span>
            category
          </div>
        }
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />

      <CategoryModificationModal
        isOpen={isShowModificationModal}
        category={selectedCategory}
        onCreate={CategoryService.createCategory}
        onCreated={fetchData}
        onEdit={CategoryService.updateCategoryById}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
    </ContentWrapper>
  );
};

export default CategoryManagement;
