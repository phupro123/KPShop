import { LoadingSkeleton } from '../../../components/Loading';

const Article = ({ isLoading, info }) => {
    return (
        <>
            {isLoading ? (
                <div className="flex flex-col space-y-4 mb-6">
                    <LoadingSkeleton className="h-8 w-56" />
                    <div className="flex flex-col space-y-2">
                        <LoadingSkeleton className="h-5 w-full" />
                        <LoadingSkeleton className="h-5 w-full" />
                        <LoadingSkeleton className="h-5 w-full" />
                    </div>
                </div>
            ) : (
                <div className="text-2xl mb-6">
                    <h3 className="text-2xl font-bold pb-4">Thông tin sản phẩm</h3>
                    <div className="text-lg">{info}</div>
                </div>
            )}
        </>
    );
};

export default Article;
