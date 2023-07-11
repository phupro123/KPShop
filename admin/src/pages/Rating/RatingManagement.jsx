import { useCallback, useEffect, useMemo, useState } from "react";
import { RatingService } from "../../services";
import ContentWrapper from "../../components/Layout/Components/ContentWrapper";
import { ConfirmationModal } from "../../components/Modal";
import { toast } from "react-toastify";
import RatingModificationModal from "./Components/RatingModificationModal";
import RatingTable from "./Components/RatingTable";
import { setDocumentTitle } from "../../components/Utils/Helpers";

const RatingManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRatingId, setSelectedRatingId] = useState(null);
  const [ratingData, setRatingData] = useState([]);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [queryParams, setQueryParams] = useState();
  const [totalRows, setTotalRows] = useState(0);

  const selectedRating = useMemo(() => {
    return ratingData.find((item) => item._id === selectedRatingId) ?? null;
  }, [selectedRatingId, ratingData]);

  const handleClickViewButton = useCallback((id) => {
    setSelectedRatingId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleClickDeleteButton = useCallback((id) => {
    setSelectedRatingId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    if (!queryParams) {
      return;
    }
    setIsLoading(true);

    try {
      const { data, meta } = await RatingService.getRatings(queryParams);

      setRatingData(data);
      setIsLoading(false);
      setTotalRows(meta.total);
    } catch (error) {
      toast.error("An unknown error occurred while processing your request.");
    }
  }, [queryParams]);

  const handleDelete = useCallback(async () => {
    if (!selectedRating) {
      return;
    }

    try {
      await RatingService.deleteRatingById(selectedRating?._id);

      toast.success("The rating has been deleted successfully.");

      fetchData();
    } catch (error) {
      toast.error(
        "An error occurred while deleting the rating. Please try again later."
      );
    } finally {
      setIsShowDeleteModal(false);
    }
  }, [selectedRating, toast]);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedRatingId(null);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setDocumentTitle("Rating Management");
  }, []);

  return (
    <ContentWrapper title="Rating Management">
      <RatingTable
        data={ratingData}
        isLoading={isLoading}
        onChangeState={setQueryParams}
        rows={totalRows}
        onClickView={handleClickViewButton}
        onClickDelete={handleClickDeleteButton}
      />

      <ConfirmationModal
        message="Are you sure you want to delete this rating? This action cannot be undone."
        isOpen={isShowDeleteModal}
        status="danger"
        title={<div>Delete rating</div>}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />

      <RatingModificationModal
        isOpen={isShowModificationModal}
        rating={selectedRating}
        onClose={handleCloseModal}
      />
    </ContentWrapper>
  );
};

export default RatingManagement;
