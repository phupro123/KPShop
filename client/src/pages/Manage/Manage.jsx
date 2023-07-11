import { useEffect } from 'react';
import { _getAllOrders } from '../../redux/order/ordersApi';
import Address from './Address';
import Favorite from './Favorite';
import History from './History/History';
import Mail from './Mail/Mail';
import OrderDetail from './OrderDetail';
import Password from './Password/Password';
import Phone from './Phone/Phone';
import Profile from './Profile/Profile';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Manage(props) {
    const user = useSelector((state) => state?.user?.currentUser);
    const navigate = useNavigate()
    useEffect(()=>{
        if(user==null){
            navigate("/")
        }
    },[])
    let path = props.path;
    if (path === 'orderdetail') {
        path = 'history';
    }
    return (
        <div className="w-[1200px] mx-auto my-6 flex space-x-6">
            <div className="w-[240px] flex flex-col border shadow-xl rounded-xl text-base text-slate-700 flex-none">
                <Sidebar path={path} />
            </div>
            <div className="w-4/5 border shadow-xl rounded-xl p-6">
                {props?.path === 'account' && <Profile title={props.title} />}
                {props?.path === 'history' && <History title={props.title} />}
                {props?.path === 'address' && <Address title={props.title} />}
                {props?.path === 'favorite' && <Favorite title={props.title} />}
                {props?.path === 'orderdetail' && <OrderDetail title={props.title} />}
                {props?.path === 'password' && <Password title={props.title} />}
                {props?.path === 'phone' && <Phone title={props.title} />}
                {props?.path === 'mail' && <Mail title={props.title} />}
            </div>
        </div>
    );
}

export default Manage;
