import { useCallback, useEffect, useMemo, useState } from "react";
import ContentWrapper from "../../components/Layout/Components/ContentWrapper";
import { ConfirmationModal } from "../../components/Modal";
import { toast } from "react-toastify";
import VoucherModificationModal from "./Components/VoucherModificationModal";
import VoucherHeaderAction from "./Components/VoucherHeaderAction";
import VoucherTable from "./Components/VoucherTable";
import { VoucherService } from "../../services";
import { setDocumentTitle } from "../../components/Utils/Helpers";

const VoucherManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVoucherId, setSelectedVoucherId] = useState(null);
  const [voucherData, setVoucherData] = useState([]);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [queryParams, setQueryParams] = useState();
  const [totalRows, setTotalRows] = useState(0);

  const selectedVoucher = useMemo(() => {
    return (
      voucherData.find((item) => item.voucherId === selectedVoucherId) ?? null
    );
  }, [selectedVoucherId, voucherData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id) => {
    setSelectedVoucherId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleClickDeleteButton = useCallback((id) => {
    setSelectedVoucherId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    if (!queryParams) {
      return;
    }
    setIsLoading(true);

    try {
      const { data, meta } = await VoucherService.getVouchers(queryParams);

      setVoucherData(data);
      setIsLoading(false);
      setTotalRows(meta.total);
    } catch (error) {
      toast.error("An unknown error occurred while processing your request.");
    }
  }, [queryParams]);

  const handleDelete = useCallback(async () => {
    if (!selectedVoucher) {
      return;
    }

    try {
      await VoucherService.deleteVoucherById(selectedVoucher?._id);

      toast.success("The voucher has been deleted successfully.");

      fetchData();
    } catch (error) {
      toast.error(
        "An error occurred while deleting the voucher. Please try again later."
      );
    } finally {
      setIsShowDeleteModal(false);
    }
  }, [selectedVoucher, toast]);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedVoucherId(null);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setDocumentTitle("Voucher Management");
  }, []);

  return (
    <ContentWrapper
      title="Voucher Management"
      actions={<VoucherHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <VoucherTable
        data={voucherData}
        isLoading={isLoading}
        onChangeState={setQueryParams}
        rows={totalRows}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
      />

      <ConfirmationModal
        message="Are you sure you want to delete this voucher? This action cannot be undone."
        isOpen={isShowDeleteModal}
        status="danger"
        title={
          <div>
            Delete
            <span className="mx-1 font-semibold text-red-500 whitespace-normal break-words">
              {selectedVoucher?.name}
            </span>
            voucher
          </div>
        }
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />

      <VoucherModificationModal
        isOpen={isShowModificationModal}
        voucher={selectedVoucher}
        onCreate={VoucherService.createVoucher}
        onCreated={fetchData}
        onEdit={VoucherService.updateVoucherById}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
    </ContentWrapper>
  );
};

export default VoucherManagement;
