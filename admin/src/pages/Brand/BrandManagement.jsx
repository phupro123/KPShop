import { useCallback, useEffect, useMemo, useState } from "react";
import { BrandService } from "../../services";
import ContentWrapper from "../../components/Layout/Components/ContentWrapper";
import { ConfirmationModal } from "../../components/Modal";
import { toast } from "react-toastify";
import BrandModificationModal from "./Components/BrandModificationModal";
import BrandHeaderAction from "./Components/BrandHeaderAction";
import BrandTable from "./Components/BrandTable";
import { setDocumentTitle } from "../../components/Utils/Helpers";

const BrandManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [brandData, setBrandData] = useState([]);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [queryParams, setQueryParams] = useState();
  const [totalRows, setTotalRows] = useState(0);

  const selectedBrand = useMemo(() => {
    return brandData.find((item) => item._id === selectedBrandId) ?? null;
  }, [selectedBrandId, brandData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id) => {
    setSelectedBrandId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleClickDeleteButton = useCallback((id) => {
    setSelectedBrandId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    if (!queryParams) {
      return;
    }
    setIsLoading(true);

    try {
      const { data, meta } = await BrandService.getBrands(queryParams);

      setBrandData(data);
      setIsLoading(false);
      setTotalRows(meta.total);
    } catch (error) {
      toast.error("An unknown error occurred while processing your request.");
    }
  }, [queryParams]);

  const handleDelete = useCallback(async () => {
    if (!selectedBrand) {
      return;
    }

    try {
      await BrandService.deleteBrandById(selectedBrand?._id);

      toast.success("The brand has been deleted successfully.");

      fetchData();
    } catch (error) {
      toast.error(
        "An error occurred while deleting the brand. Please try again later."
      );
    } finally {
      setIsShowDeleteModal(false);
    }
  }, [fetchData, selectedBrand, toast]);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedBrandId(null);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setDocumentTitle("Brand Management");
  }, []);

  return (
    <ContentWrapper
      title="Brand Management"
      actions={<BrandHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <BrandTable
        data={brandData}
        isLoading={isLoading}
        onChangeState={setQueryParams}
        rows={totalRows}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
      />

      <ConfirmationModal
        message="Are you sure you want to delete this brand? This action cannot be undone."
        isOpen={isShowDeleteModal}
        status="danger"
        title={
          <div>
            Delete
            <span className="mx-1 font-semibold text-red-500 whitespace-normal break-words">
              {selectedBrand?.name}
            </span>
            brand
          </div>
        }
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />

      <BrandModificationModal
        isOpen={isShowModificationModal}
        brand={selectedBrand}
        onCreate={BrandService.createBrand}
        onCreated={fetchData}
        onEdit={BrandService.updateBrandById}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
    </ContentWrapper>
  );
};

export default BrandManagement;
