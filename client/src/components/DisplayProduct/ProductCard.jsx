import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import numberWithCommas from '../../utils/numberWithCommas';
import { twMerge } from 'tailwind-merge';
import { isEmpty, lowerCase } from 'lodash';

const ProductCard = ({ data, isBorder = false }) => {
    const handleProductClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <Link to={`/${lowerCase(data.category)}/${data.slug}`} onClick={handleProductClick}>
            <div
                className={twMerge(
                    'group relative flex flex-col justify-start space-y-2 rounded-md p-4 shadow-sm h-full',
                    isBorder && 'border-2 hover:border-blue-500 border-gray-200',
                )}
            >
                <div
                    className={twMerge(
                        'absolute z-10 w-fit text-xs rounded-md bg-gradient-to-r from-[#1746a2] to-[#5f9df7] text-white px-2 py-1',
                        data.promotion == '' && 'invisible',
                    )}
                >
                    <p>{data.promotion}</p>
                </div>

                <div className="w-full relative object-contain">
                    <img src={data.img}></img>
                    {data.docquyen && (
                        <img
                            className="w-10 h-w-10 absolute bottom-0 left-0"
                            src="https://cdn.tgdd.vn/ValueIcons/Label_01-05.png"
                        ></img>
                    )}
                    {data.baohanh === '18T' && (
                        <img
                            className="w-10 h-w-10 absolute bottom-0 left-0"
                            src="https://cdn.tgdd.vn/ValueIcons/Label_01-02.png"
                        ></img>
                    )}
                </div>

                {data.tag && (
                    <p className="text-white font-medium text-xs uppercase text-center w-[160px] rounded-3xl p-2 bg-[#db2562] mx-autơ">
                        {data.tag}
                    </p>
                )}

                <span className="font-semibold text-base">{data.title}</span>

                {!isEmpty(data.parameter?.RAM) && (
                    <div>
                        {data.parameter?.RAM?.map((item, index) => (
                            <span
                                key={index}
                                className={twMerge(
                                    'text-[#2f80ed] border border-solid border-[#2f80ed] rounded-md text-xs p-1 mr-2',
                                )}
                                onClick={(e) => {
                                    handleClickDisable(e);
                                    setChecked(index);
                                }}
                            >
                                RAM {item}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex space-x-1 font-medium text-sm items-center text-slate-700">
                    <div className="line-through">{numberWithCommas(data?.price)}</div>
                    <div className="">-{data?.discount * 100}%</div>
                </div>

                <div className="text-primary-500 font-bold text-base">
                    {numberWithCommas(data?.price * (1 - data?.discount))}
                </div>

                <div className="flex items-center text-yellow-400 font-bold space-x-2">
                    <div>{data?.star?.toFixed(1)}</div>
                    <AiFillStar />
                    <span className="text-gray-700 font-normal">({data?.totalVote})</span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
