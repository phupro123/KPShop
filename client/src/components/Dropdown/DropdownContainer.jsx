import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import DropdownContainerItem from './DropdownContainerItem';

const DropdownContainer = ({
    children,
    menu,
    classNameMenuContainer,
    isHoverAction = false,
    position,
    onToggle,
    isShowDropdown,
}) => {
    const parentRef = useRef(null);

    const [isShowDropdownMenu, setIsShowDropdownMenu] = useState(false);

    const handleOpenDropdownMenu = useCallback(() => {
        setIsShowDropdownMenu(true);
    }, []);

    const handleCloseDropdownMenu = useCallback(() => {
        setIsShowDropdownMenu(false);
        parentRef.current?.blur();
    }, []);

    const action = useMemo(
        () =>
            isHoverAction
                ? {
                      onMouseOver: handleOpenDropdownMenu,
                      onMouseLeave: handleCloseDropdownMenu,
                  }
                : {
                      onFocus: handleOpenDropdownMenu,
                      onBlur: handleCloseDropdownMenu,
                  },
        [handleCloseDropdownMenu, handleOpenDropdownMenu, isHoverAction],
    );

    useEffect(() => {
        onToggle?.(isShowDropdownMenu);
    }, [isShowDropdownMenu, onToggle]);

    useEffect(() => {
        if (!isShowDropdown) {
            handleCloseDropdownMenu();
        }
    }, [isShowDropdown, handleCloseDropdownMenu]);

    return (
        <div role="button" tabIndex={0} ref={parentRef} className="relative" {...action}>
            {children}
            {isShowDropdownMenu && (
                <DropdownContainerItem
                    menu={menu}
                    position={position}
                    parentRef={parentRef}
                    onHide={handleCloseDropdownMenu}
                    className={classNameMenuContainer}
                />
            )}
        </div>
    );
};

export default DropdownContainer;
