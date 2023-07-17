import { twMerge } from 'tailwind-merge';
import { LoadingSkeleton } from '../../../components/Loading';
import ParameterTranslate from './ParameterTranslate';
const Parameter = ({ isLoading, phoneData }) => {
    return (
        <div className="my-8 text-base">
            {isLoading ? (
                <div className="flex flex-col space-y-4">
                    <LoadingSkeleton className="h-8 w-[300px]" />
                    <div className="flex space-x-12">
                        <LoadingSkeleton className="p-4 h-6 w-1/3" />
                        <LoadingSkeleton className="p-4 h-6 w-2/3" />
                    </div>
                    <div className="flex space-x-12">
                        <LoadingSkeleton className="p-4 h-6 w-1/3" />
                        <LoadingSkeleton className="p-4 h-6 w-2/3" />
                    </div>
                    <div className="flex space-x-12">
                        <LoadingSkeleton className="p-4 h-6 w-1/3" />
                        <LoadingSkeleton className="p-4 h-6 w-2/3" />
                    </div>
                    <div className="flex space-x-12">
                        <LoadingSkeleton className="p-4 h-6 w-1/3" />
                        <LoadingSkeleton className="p-4 h-6 w-2/3" />
                    </div>
                    <div className="flex space-x-12">
                        <LoadingSkeleton className="p-4 h-6 w-1/3" />
                        <LoadingSkeleton className="p-4 h-6 w-2/3" />
                    </div>
                    <div className="flex space-x-12">
                        <LoadingSkeleton className="p-4 h-6 w-1/3" />
                        <LoadingSkeleton className="p-4 h-6 w-2/3" />
                    </div>
                    <div className="flex space-x-12">
                        <LoadingSkeleton className="p-4 h-6 w-1/3" />
                        <LoadingSkeleton className="p-4 h-6 w-2/3" />
                    </div>
                    <div className="flex space-x-12">
                        <LoadingSkeleton className="p-4 h-6 w-1/3" />
                        <LoadingSkeleton className="p-4 h-6 w-2/3" />
                    </div>
                </div>
            ) : (
                <>
                    <p className="font-bold text-2xl text-gray-800 mb-4">Cấu hình {phoneData?.title}</p>
                    <table className="w-full">
                        <tbody>
                            {phoneData?.parameter &&
                                Object.entries(phoneData?.parameter).map((param, index) => {
                                    if (index != 0) {
                                        return (
                                            <tr className={twMerge(index % 2 === 0 && 'bg-gray-100')} key={index}>
                                                <td colSpan="4" className="p-4">
                                                    <ParameterTranslate data={param[0]} />
                                                </td>
                                                <td colSpan="6" className="p-4">
                                                    {param[1]}
                                                </td>
                                            </tr>
                                        );
                                    }
                                })}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default Parameter;
