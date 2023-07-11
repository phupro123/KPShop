import { cloneElement, useCallback, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

const DropdownContainerItem = ({ menu, parentRef, position = 'right', className, onHide }) => {
    const menuRef = useRef(null);
    const dropdownContainer = useMemo(() => window.document.querySelector('.kpshop-dropdown-container'), []);

    const setDropdownPosition = useCallback(() => {
        const parentElement = parentRef.current;
        const menuElement = menuRef.current;
        const space = 8;
        if (!parentElement || !menuElement) return;

        const parentElementRect = parentElement.getBoundingClientRect();
        const rootWidth = Number(document.getElementById('root')?.offsetWidth);

        if (rootWidth - parentElementRect.left > menuElement.offsetWidth) {
            if (position === 'left') {
                menuElement.style.left = `${
                    parentElementRect.left - menuElement.offsetWidth + parentElementRect.width
                }px`;
            } else {
                menuElement.style.left = `${parentElementRect.left}px`;
            }
        } else {
            menuElement.style.left = `${parentElementRect.right - menuElement.offsetWidth}px`;
        }

        if (window.innerHeight - parentElementRect.bottom - space > menuElement.offsetHeight) {
            menuElement.style.top = `${parentElementRect.top + parentElementRect.height + space}px`;
        } else {
            menuElement.style.top = `${parentElementRect.top - menuElement.offsetHeight - space}px`;
        }
    }, [parentRef, position]);

    useEffect(() => {
        setDropdownPosition();
        window.addEventListener('resize', setDropdownPosition);
        return () => {
            window.removeEventListener('resize', setDropdownPosition);
        };
    }, [setDropdownPosition]);

    const handleMouseDown = useCallback((e) => {
        e.preventDefault();
    }, []);

    return createPortal(
        <div
            role="button"
            tabIndex={0}
            ref={menuRef}
            className={twMerge(
                'absolute z-50 rounded-lg border-2 border-gray-100 bg-white p-6 text-slate-700 shadow-lg transition duration-100 ease-linear',
                className,
            )}
            onMouseDown={handleMouseDown}
        >
            {cloneElement(menu, { onHide })}
        </div>,
        dropdownContainer,
    );
};

export default DropdownContainerItem;
