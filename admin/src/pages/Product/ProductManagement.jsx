import { useCallback, useEffect, useMemo, useState } from "react";
import ContentWrapper from "../../components/Layout/Components/ContentWrapper";
import { ConfirmationModal } from "../../components/Modal";
import { toast } from "react-toastify";
import ProductModificationModal from "./Components/ProductModificationModal";
import ProductHeaderActions from "./Components/ProductHeaderAction";
import ProductTable from "./Components/ProductTable";
import { ProductService } from "../../services";
import { setDocumentTitle } from "../../components/Utils/Helpers";

const ProductManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [productData, setProductData] = useState([]);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [queryParams, setQueryParams] = useState();
  const [totalRows, setTotalRows] = useState(0);

  const selectedProduct = useMemo(() => {
    return productData.find((item) => item._id === selectedProductId) ?? null;
  }, [selectedProductId, productData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id) => {
    setSelectedProductId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleClickDeleteButton = useCallback((id) => {
    setSelectedProductId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    if (!queryParams) {
      return;
    }
    setIsLoading(true);

    try {
      const { data, meta } = await ProductService.getProducts(queryParams);

      setProductData(data);
      setIsLoading(false);
      setTotalRows(meta.total);
    } catch (error) {
      toast.error("An unknown error occurred while processing your request.");
    }
  }, [queryParams]);

  const handleDelete = useCallback(async () => {
    if (!selectedProduct) {
      return;
    }

    try {
      await ProductService.deleteProductById(selectedProduct?._id);

      toast.success("The product has been deleted successfully.");

      fetchData();
    } catch (error) {
      toast.error(
        "An error occurred while deleting the product. Please try again later."
      );
    } finally {
      setIsShowDeleteModal(false);
    }
  }, [selectedProduct, toast]);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedProductId(null);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setDocumentTitle("Product Management");
  }, []);

  return (
    <ContentWrapper
      title="Product Management"
      actions={<ProductHeaderActions onClickAdd={handleClickAddButton} />}
    >
      <ProductTable
        data={productData}
        isLoading={isLoading}
        onChangeState={setQueryParams}
        rows={totalRows}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
      />

      <ConfirmationModal
        message="Are you sure you want to delete this product? This action cannot be undone."
        isOpen={isShowDeleteModal}
        status="danger"
        title={
          <div>
            Delete
            <span className="mx-1 font-semibold text-red-500 whitespace-normal break-words">
              {selectedProduct?.title}
            </span>
            product
          </div>
        }
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />

      <ProductModificationModal
        isOpen={isShowModificationModal}
        product={selectedProduct}
        onCreate={ProductService.createProduct}
        onCreated={fetchData}
        onEdit={ProductService.updateProductById}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
    </ContentWrapper>
  );
};

export default ProductManagement;
