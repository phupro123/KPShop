import { useState, useCallback } from 'react';
import { Input } from '../../Form';
import { Button } from '../../Button';
import { useNavigate } from 'react-router';

const HeaderSearch = () => {
    const [value, setValue] = useState('');

    const navigate = useNavigate();

    const handleText = (e) => {
        setValue(e.target.value);
    };

    const handleClickSearch = useCallback(() => {
        navigate(`/search?name=${value}`);
        setValue('');
    }, [navigate, value]);

    return (
        <div className="relative">
            <Input
                name="search"
                placeholder="Tìm kiếm sản phẩm"
                className="w-full"
                value={value}
                autoComplete="off"
                onChange={handleText}
            />
            <Button
                onClick={handleClickSearch}
                size="xs"
                className="ring-0 absolute top-1/2 -translate-y-1/2 right-4 px-4 py-1.5 z-20"
            >
                Tìm kiếm
            </Button>
        </div>
    );
};

export default HeaderSearch;
