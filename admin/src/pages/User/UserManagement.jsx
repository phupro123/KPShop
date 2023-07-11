import { useCallback, useEffect, useMemo, useState } from "react";
import ContentWrapper from "../../components/Layout/Components/ContentWrapper";
import { ConfirmationModal } from "../../components/Modal";
import { toast } from "react-toastify";
import UserModificationModal from "./Components/UserModificationModal";
import UserHeaderActions from "./Components/UserHeaderAction";
import UserTable from "./Components/UserTable";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../api/createInstance";
import { login } from "../../redux/user/userSlice";
import { UserService } from "../../services";
import { setDocumentTitle } from "../../components/Utils/Helpers";

const UserManagement = () => {
  const currentUser = useSelector((state) => state.users?.current?.data);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(currentUser, dispatch, login);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userData, setUserData] = useState([]);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [queryParams, setQueryParams] = useState();
  const [totalRows, setTotalRows] = useState(0);




  const selectedUser = useMemo(() => {
    return userData.find((item) => item.userId === selectedUserId) ?? null;
  }, [selectedUserId, userData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id) => {
    setSelectedUserId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleClickDeleteButton = useCallback((id) => {
    setSelectedUserId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    if (!queryParams) {
      return;
    }
    setIsLoading(true);

    try {
      const { data, meta } = await UserService.getUsers(axiosJWT, queryParams);

      setUserData(data);
      setIsLoading(false);
      setTotalRows(meta.total);
    } catch (error) {
      toast.error("An unknown error occurred while processing your request.");
    }
  }, [queryParams]);

  const handleDelete = useCallback(async () => {
    if (!selectedUser) {
      return;
    }

    try {
      await UserService.deleteUserById(selectedUser?._id,axiosJWT);

      toast.success("The user has been deleted successfully.");

      fetchData();
    } catch (error) {
      toast.error(
        "An error occurred while deleting the user. Please try again later."
      );
    } finally {
      setIsShowDeleteModal(false);
    }
  }, [selectedUser, toast]);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedUserId(null);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setDocumentTitle("User Management");
  }, []);

  return (
    <ContentWrapper
      title="User Management"
      actions={<UserHeaderActions onClickAdd={handleClickAddButton} />}
    >
      <UserTable
        data={userData}
        isLoading={isLoading}
        onChangeState={setQueryParams}
        rows={totalRows}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
      />

      <ConfirmationModal
        message="Are you sure you want to delete this user? This action cannot be undone."
        isOpen={isShowDeleteModal}
        status="danger"
        title={
          <div>
            Delete
            <span className="mx-1 font-semibold text-red-500 whitespace-normal break-words">
              {selectedUser?.fullname}
            </span>
            user
          </div>
        }
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />

      <UserModificationModal
        isOpen={isShowModificationModal}
        user={selectedUser}
        onCreate={UserService.createUser}
        onCreated={fetchData}
        onEdit={UserService.updateUserById}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
    </ContentWrapper>
  );
};

export default UserManagement;
