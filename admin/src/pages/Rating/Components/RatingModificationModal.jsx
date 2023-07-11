import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/Form";
import { InformationModal } from "../../../components/Modal";

const RatingModificationModal = ({ isOpen, rating, onClose }) => {
  const { control, reset } = useForm({});

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    reset(rating);
  }, [isOpen, reset, rating]);

  return (
    <InformationModal isOpen={isOpen} title="Xem đánh giá" onClose={onClose}>
      <Input
        className="block"
        control={control}
        disabled
        label="Product"
        name="product.title"
      />
      <Input
        className="block"
        control={control}
        disabled
        label="User"
        name="user.username"
      />
      <Input
        className="block"
        control={control}
        disabled
        label="Star"
        name="star"
      />
      <Input
        className="block"
        control={control}
        disabled
        label="Content"
        name="content"
      />
    </InformationModal>
  );
};

export default RatingModificationModal;
