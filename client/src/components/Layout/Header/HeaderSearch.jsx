import { useState, useEffect, useCallback } from 'react';
import { BiSearch } from 'react-icons/bi';
import useDebound from './../../../hooks/useDebound';
import { Input } from '../../Form';
import { DropdownContainer } from '../../Dropdown';
import { searchService } from '../../../services';
import HeaderSearchResultItem from './HeaderSearchResultItem';
import HeaderSearchResultSkeleton from './HeaderSearchResultSkeleton';

function HeaderSearch() {
    const [value, setValue] = useState('');
    let keySearch = useDebound(value, 500);
    const [isLoading, setIsLoading] = useState(true);
    const [resultSearch, setResultSearch] = useState([]);
    const [total, setTotal] = useState(0);

    const getResult = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data, total } = await searchService.getResultSearch(keySearch);
            setResultSearch(data);
            setTotal(total);
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, [keySearch]);

    useEffect(() => {
        if (!keySearch) {
            setResultSearch([]);
            setTotal(0);
            return;
        }
        getResult();
    }, [getResult, keySearch]);

    const handleText = (e) => {
        setValue(e.target.value);
    };

    return (
        <DropdownContainer
            menu={
                <div className="overflow-overlay bg-white max-h-[316px] rounded-lg flex flex-col w-full space-y-4">
                    {isLoading || !keySearch ? (
                        <HeaderSearchResultSkeleton />
                    ) : (
                        <>
                            {total ? (
                                <div>Kết quả tìm kiếm: {total} sản phẩm</div>
                            ) : (
                                <h2>Không có sản phẩm trong hệ thống chúng tôi</h2>
                            )}

                            {resultSearch?.map((product) => (
                                <HeaderSearchResultItem key={product._id} product={product} />
                            ))}
                        </>
                    )}
                </div>
            }
        >
            <Input
                name="search"
                placeholder="Tìm kiếm sản phẩm"
                className="w-full"
                value={value}
                autoComplete="off"
                labelPostfix={<BiSearch className="flex-shrink-0 pt-px text-gray-400" size={20} />}
                onChange={handleText}
            />
        </DropdownContainer>
    );
}

export default HeaderSearch;
