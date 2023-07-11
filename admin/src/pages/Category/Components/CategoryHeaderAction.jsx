import Button from "../../../components/Button/Button";
import { BiListPlus } from "react-icons/bi";

const CategoryHeaderActions = ({ onClickAdd }) => {
  return (
    <Button className="rounded-md shadow-none" size="sm" onClick={onClickAdd}>
      <BiListPlus size={24} className="mr-2" />
      Thêm loại sản phẩm mới
    </Button>
  );
};

export default CategoryHeaderActions;
