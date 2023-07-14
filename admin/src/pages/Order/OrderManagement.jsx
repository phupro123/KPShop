import { useCallback, useEffect, useMemo, useState } from "react";
import ContentWrapper from "../../components/Layout/Components/ContentWrapper";
import OrderModificationModal from "./Components/OrderModificationModal";
import OrderTable from "./Components/OrderTable";
import { toast } from "react-toastify";
import { InformationModal } from "../../components/Modal";
import OrderDetail from "./Components/OrderDetail";
import OrderStatus from "./Components/OrderStatus";
import { OrderService } from "../../services";
import { setDocumentTitle } from "../../components/Utils/Helpers";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../api/createInstance";
import { login } from "../../redux/user/userSlice";

const OrdeManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [queryParams, setQueryParams] = useState();
  const [totalRows, setTotalRows] = useState(0);
  const currentUser = useSelector((state) => state.users?.current?.data);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(currentUser, dispatch, login);
  const selectedOrder = useMemo(() => {
    return orderData.find((item) => item._id === selectedOrderId) ?? null;
  }, [selectedOrderId, orderData]);

  const handleClickViewButton = useCallback((id) => {
    setSelectedOrderId(id ?? null);
    setIsShowDetailModal(true);
  }, []);

  const handleClickEditButton = useCallback((id) => {
    setSelectedOrderId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    if (!queryParams) {
      return;
    }
    setIsLoading(true);

    try {
      const { data, meta } = await OrderService.getOrders(axiosJWT,queryParams);

      setOrderData(data);
      setIsLoading(false);
      setTotalRows(meta.total);
    } catch (error) {
      toast.error("An unknown error occurred while processing your request.");
    }
  }, [queryParams]);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDetailModal(false);
    setSelectedOrderId(null);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setDocumentTitle("Order Management");
  }, []);

  return (
    <ContentWrapper title="Order Management">
      <OrderTable
        data={orderData}
        isLoading={isLoading}
        onChangeState={setQueryParams}
        rows={totalRows}
        onClickView={handleClickViewButton}
        onClickEdit={handleClickEditButton}
      />

      <InformationModal
        isOpen={isShowDetailModal}
        className="w-fit"
        title={
          <div className="flex space-x-4 items-center">
            <span>Chi tiết đơn hàng</span>
            <span className="font-semibold text-red-500">
              {selectedOrder?._id}
            </span>
            <OrderStatus
              type={selectedOrder?.status}
              size="sm"
              message={selectedOrder?.status}
            />
          </div>
        }
        onClose={handleCloseModal}
      >
        <OrderDetail selectedOrder={selectedOrder} />
      </InformationModal>

      <OrderModificationModal
        isOpen={isShowModificationModal}
        order={selectedOrder}
        onEdit={OrderService.updateOrderById}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
    </ContentWrapper>
  );
};

export default OrdeManagement;
