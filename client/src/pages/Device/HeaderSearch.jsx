import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BiChevronDown, BiSearch } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';
import { Input } from '../../components/Form';

const HeaderSearch = ({ field, groupKey, onChangeFilter }) => {
    const [isShowSearchFieldDropdown, setIsShowSearchFieldDropdown] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchField, setSearchField] = useState(Object.keys(field)[0]);

    const buttonRef = useRef(null);
    const fieldOptions = useMemo(() => Object.entries(field), [field]);

    const handleFocusSearchFieldButton = useCallback(() => {
        setIsShowSearchFieldDropdown(true);
    }, []);

    const handleBlurSearchFieldButton = useCallback(() => {
        setIsShowSearchFieldDropdown(false);
        buttonRef.current?.blur();
    }, []);

    const handleChangeSearchField = useCallback(
        (key) => {
            setSearchField(key);
            handleBlurSearchFieldButton();
        },
        [handleBlurSearchFieldButton],
    );

    useEffect(() => {
        if (!searchField) {
            return;
        }

        if (!searchValue) {
            onChangeFilter(String(searchField), [], groupKey);
            return;
        }

        onChangeFilter(String(searchField), [searchValue], groupKey);
    }, [onChangeFilter, searchField, searchValue, groupKey]);

    return (
        <div className="group relative z-10  mb-4 mr-4 flex flex-shrink-0 items-center rounded-lg border-2 border-gray-100 bg-gray-50 focus-within:border-gray-200 focus-within:bg-gray-100 hover:border-gray-200 hover:bg-gray-100">
            <Input
                name="tableGlobalFilter"
                className="z-0 h-[38px] w-full border-0 bg-transparent duration-100 hover:bg-gray-100"
                size="sm"
                isShowLabelWhenFocusing={false}
                placeholder="Search"
                label="Search"
                labelPostfix={<BiSearch className="flex-shrink-0 pt-px text-gray-400" size={16} />}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                isRequired={false}
            />
            {field && (
                <>
                    <button
                        className="relative flex cursor-pointer items-center space-x-2 border-l-2 border-gray-100 py-1.5 pl-4 pr-2.5 outline-none group-focus-within:border-gray-200 group-hover:border-gray-200"
                        ref={buttonRef}
                        type="button"
                        onBlur={handleBlurSearchFieldButton}
                        onFocus={handleFocusSearchFieldButton}
                    >
                        <div>{field[searchField]}</div>
                        <BiChevronDown size={20} />
                    </button>
                    <div
                        className={twMerge(
                            'absolute right-0 top-12 z-10 flex w-full max-w-fit flex-col overflow-hidden rounded-lg border-2 border-gray-100 bg-white py-3 text-slate-700 shadow-lg shadow-gray-100',
                            isShowSearchFieldDropdown ? 'block' : 'hidden',
                        )}
                    >
                        {fieldOptions.map(([key, value]) => (
                            <div
                                key={key}
                                className="flex min-w-full cursor-pointer whitespace-nowrap px-5 py-1.5 duration-100 hover:bg-gray-100"
                                role="button"
                                tabIndex={0}
                                onMouseDown={() => handleChangeSearchField(key)}
                            >
                                {value}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default HeaderSearch;
