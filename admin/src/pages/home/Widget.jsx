import { FiUsers } from "react-icons/fi";
import { OrderService, ProductService, UserService } from "../../services";
import WidgetItem from "./WidgetItem";
import { BsPhone } from "react-icons/bs";
import { GiStabbedNote } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/user/userSlice";
import { createAxios } from "../../api/createInstance";

const Widget = () => {
  const currentUser = useSelector((state) => state.users?.current?.data);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(currentUser, dispatch, login);
  return (
    <div className="grid grid-cols-3 gap-6">
      <WidgetItem
        title="user"
        to="/user-management"
        getData={UserService.getUsers}
        icon={<FiUsers size={20} />}
      />
      <WidgetItem
        title="product"
        to="/product-management"
        getData={ProductService.getProducts}
        icon={<BsPhone size={20} />}
      />
      <WidgetItem
        title="order"
        to="/order-management"
        getData={OrderService.getOrders}
        icon={<GiStabbedNote size={20} />}
      />
    </div>
  );
};

export default Widget;
