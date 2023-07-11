import _ from 'lodash';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const UncontrolledInputSkeleton = (
    {
        label,
        placeholder,
        id,
        className,
        value,
        disabled = false,
        children,
        error,
        style,
        size = 'normal',
        inlineError = false,
        isShowLabelWhenFocusing = false,
        labelPostfix,
        isRequired,
        isAvailableValue,
        readOnly,
        type,
        onFocus,
        onBlur,
        eventWhenFocus,
        ...props
    },
    ref,
) => {
    const [isFocusing, setIsFocusing] = useState(false);

    const handleFocus = useCallback(
        (e) => {
            setIsFocusing(true);
            if (_.isFunction(onFocus)) onFocus(e);
            eventWhenFocus?.();
        },
        [eventWhenFocus, onFocus],
    );

    const handleBlur = (e) => {
        setIsFocusing(false);
        if (_.isFunction(onBlur)) onBlur(e);
    };

    let borderColor = Boolean(error) && 'border-primary-500 z-20';
    let textColor = Boolean(error) && 'text-primary-500';

    if (isFocusing) {
        borderColor = 'border-blue-500 z-20';
    } else {
        borderColor = 'border-gray-100';
    }

    if (isFocusing || isAvailableValue) {
        textColor = 'text-blue-500';
    } else {
        textColor = 'text-gray-500';
    }
    const sizeClassNames = {
        block: '',
        label: '',
        focusingLabel: '',
        focusingInput: '',
        input: '',
    };

    switch (size) {
        case 'xs':
            sizeClassNames.block = 'h-8 px-3';
            sizeClassNames.label = 'text-sm px-2 left-1 top-1/2 -translate-y-1/2 bg-transparent';
            sizeClassNames.focusingLabel = 'hidden';
            sizeClassNames.input = 'text-sm translate-y-1';
            break;
        case 'sm':
            sizeClassNames.block = 'h-10 px-3';
            sizeClassNames.label = 'px-2 left-1 text-base top-1/2 -translate-y-1/2 bg-transparent';
            sizeClassNames.focusingLabel = isShowLabelWhenFocusing ? '-translate-y-5 bg-inherit' : 'hidden';
            sizeClassNames.input = 'text-normal translate-y-[7px] text-base';
            break;
        default:
            sizeClassNames.block = 'h-12 px-4';
            sizeClassNames.label = twMerge(
                'px-2 left-2 top-1/2 -translate-y-1/2',
                !disabled ? 'bg-white' : 'bg-transparent',
            );
            sizeClassNames.focusingLabel = '-translate-y-4 -mt-0.5 text-sm';
            sizeClassNames.input = 'text-normal top-1/2 translate-y-1/2';
    }

    useEffect(() => {
        if (disabled) {
            setIsFocusing(false);
        }
    }, [disabled]);

    return (
        <>
            <div className="relative">
                <label
                    htmlFor={id}
                    style={style}
                    className={twMerge(
                        'relative inline-block rounded-lg border-2 bg-white ring-inset transition-colors duration-100',
                        sizeClassNames.block,
                        disabled ? 'cursor-default bg-gray-50 ring-gray-100' : 'cursor-text',
                        className,
                        borderColor,
                        Boolean(error) && 'border-primary-500 ring-primary-500',
                    )}
                >
                    <div
                        className={twMerge(
                            'z-10 flex items-center justify-between transition-all',
                            textColor,
                            sizeClassNames.label,
                            (isFocusing || isAvailableValue) &&
                                twMerge('top-1.5 text-sm font-semibold duration-100', sizeClassNames.focusingLabel),
                            Boolean(error) && 'text-primary-500',
                            'absolute',
                            disabled && 'text-gray-400',
                        )}
                    >
                        {(isFocusing || isAvailableValue) && (
                            <div
                                className={twMerge(
                                    'absolute inset-y-0 left-0 top-1/2 -z-10 w-full -translate-y-0.5',
                                    disabled && 'mt-0.5 h-1 bg-gray-50',
                                )}
                            />
                        )}

                        {placeholder && !isFocusing && !isAvailableValue ? placeholder : label}
                        {isRequired && <div>*</div>}
                    </div>
                    {labelPostfix != null && (
                        <div className="absolute bottom-0 right-0 top-0 z-20 flex flex-col items-center justify-center px-[inherit]">
                            {labelPostfix}
                        </div>
                    )}
                    <div
                        className={twMerge(
                            'relative flex items-center justify-start',
                            isFocusing || isAvailableValue ? 'opacity-100' : 'opacity-0',
                        )}
                    >
                        <input
                            id={id}
                            type={type}
                            className={twMerge(
                                'w-full border-none bg-inherit outline-none transition-none',
                                sizeClassNames.input,
                                disabled && 'text-gray-400',
                            )}
                            placeholder={placeholder}
                            readOnly={readOnly}
                            disabled={disabled}
                            ref={ref}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            value={value}
                            {...props}
                        />
                    </div>
                </label>
                {children}
            </div>
            {!inlineError && Boolean(error) && <div className="-mb-1.5 mt-1.5 text-sm text-primary-500">{error}</div>}
        </>
    );
};

export default forwardRef(UncontrolledInputSkeleton);
