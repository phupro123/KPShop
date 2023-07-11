import { TbBrandDaysCounter, TbShieldCheckFilled, TbTruckDelivery } from 'react-icons/tb';
import { LoadingSkeleton } from '../../../components/Loading';

const Policy = ({ isLoading }) => {
    return (
        <div className="grid grid-cols-2 m-4 text-base">
            {isLoading ? (
                <>
                    <div className="flex flex-col space-y-1 p-2 border-b">
                        <LoadingSkeleton className="h-5 w-full" />
                        <LoadingSkeleton className="h-5 w-full" />
                        <LoadingSkeleton className="h-5 w-1/2" />
                    </div>
                    <div className="flex flex-col space-y-1 p-2 border-b">
                        <LoadingSkeleton className="h-5 w-full" />
                        <LoadingSkeleton className="h-5 w-full" />
                        <LoadingSkeleton className="h-5 w-1/2" />
                    </div>
                    <div className="flex flex-col space-y-1 p-2">
                        <LoadingSkeleton className="h-5 w-full" />
                        <LoadingSkeleton className="h-5 w-1/2" />
                    </div>
                </>
            ) : (
                <>
                    <div className="p-2 border-b">
                        <div className="text-blue-700 inline-block mr-2 translate-y-1">
                            <TbBrandDaysCounter size={20} />
                        </div>
                        Bảo hành có cam kết trong 12 tháng
                        <a className="text-blue-700"> Xem chi tiết</a>
                    </div>
                    <div className="p-2 border-b">
                        <div className="text-blue-700 inline-block mr-2 translate-y-1">
                            <TbShieldCheckFilled size={20} />
                        </div>
                        Bảo hành chính hãng 1 năm tại các trung tâm bảo hành hãng
                        <a className="text-blue-700"> Xem địa chỉ bảo hành</a>
                    </div>
                    <div className="p-2">
                        <div className="text-blue-700 inline-block mr-2 translate-y-1">
                            <TbTruckDelivery size={20} />
                        </div>
                        Giao hàng tận nhà nhanh chóng <a className="text-blue-700"> Tìm hiểu</a>
                    </div>
                </>
            )}
        </div>
    );
};

export default Policy;
