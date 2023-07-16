import { useLayoutEffect } from 'react';
import { LoadingSkeleton } from '../Loading';
import { setDocumentTitle } from '../Utils/Helpers';

const HomeBlankPage = ({ title }) => {
    useLayoutEffect(() => {
        setDocumentTitle(title);
    }, [title]);

    return (
        <div className="flex flex-col items-center py-20">
            <div className="flex flex-col items-center justify-center pb-20">
                <div className="text-4xl font-semibold uppercase">{title}</div>
                <LoadingSkeleton className="mt-6 h-4 w-56" />
            </div>

            <div className="min-h-72 w-full max-w-4xl space-y-4 rounded-xl border-2 border-gray-100 bg-white p-6 shadow-md shadow-gray-100 ">
                <LoadingSkeleton className="h-4 w-full" />
                <LoadingSkeleton className="h-4 w-3/4" />
                <div className="h-4" />
                <LoadingSkeleton className="h-4 w-full" />
                <LoadingSkeleton className="h-4 w-full" />
                <LoadingSkeleton className="h-4 w-full" />
                <LoadingSkeleton className="h-4 w-full" />
                <LoadingSkeleton className="h-4 w-full" />
                <LoadingSkeleton className="h-4 w-full" />
                <LoadingSkeleton className="h-4 w-1/4" />
            </div>
        </div>
    );
};

export default HomeBlankPage;
