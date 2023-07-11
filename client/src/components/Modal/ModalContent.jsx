import { IoClose } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import { Button } from '../Button';

const ModalContent = ({
    isShowHeader = true,
    isShowFooter = true,
    isAllowSubmit = true,
    isLoading = false,
    title,
    children,
    contentContainerClassName = 'grid grid-cols-1 gap-6',
    onClose,
    onConfirm,
}) => {
    return (
        <>
            <div className="px-10">
                {isShowHeader && (
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="h-fit w-fit pb-2 text-lg font-semibold">{title}</div>
                            <div
                                className="flex items-center justify-center rounded-full border-2 border-gray-100 bg-gray-50 p-1 duration-75 hover:cursor-pointer hover:border-gray-200 hover:bg-gray-100"
                                role="button"
                                tabIndex={0}
                                onClick={onClose}
                            >
                                <IoClose size={16} />
                            </div>
                        </div>
                        <div className="mt-2 h-1 w-16 rounded-md bg-gray-100" />
                    </div>
                )}
                <div className={twMerge('w-[400px] pb-8 pt-8', contentContainerClassName)}>{children}</div>
            </div>
            {isShowFooter && (
                <div className="flex items-center justify-end space-x-6 rounded-b-lg bg-gray-50 px-10 py-6">
                    <Button
                        className="rounded-md border-2 border-gray-200 px-6 shadow-none ring-0"
                        size="sm"
                        color="light"
                        disabled={isLoading}
                        onClick={onClose}
                    >
                        Close
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 rounded-md border-2 border-[#1a94ff] px-12 shadow-none ring-0 disabled:border-gray-300"
                        size="sm"
                        disabled={isLoading || !isAllowSubmit}
                        isLoading={isLoading}
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                </div>
            )}
        </>
    );
};

export default ModalContent;
