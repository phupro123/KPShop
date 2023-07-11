import React from 'react';
import { IoMdTabletPortrait, IoMdPhonePortrait, IoMdLaptop } from 'react-icons/io';
import { BiHeadphone, BiBookOpen, BiBook, BiBot } from 'react-icons/bi';
import { MdContactSupport } from 'react-icons/md';

export default function HeaderMenu() {
    const linkMenu = [
        {
            title: 'Điện thoại',
            link: '/phone',
            icon: IoMdPhonePortrait,
        },
        {
            title: 'Tablet',
            link: '/tablet',
            icon: IoMdTabletPortrait,
        },
        {
            title: 'Laptop',
            link: '/laptop',
            icon: IoMdLaptop,
        },
        {
            title: 'Phụ kiện ',
            link: '/accessories',
            icon: BiHeadphone,
        },
        {
            title: 'Hỗ trợ',
            link: '/',
            icon: MdContactSupport,
        },
        {
            title: 'Hướng dẫn',
            link: '/',
            icon: BiBookOpen,
        },
        {
            title: 'Chính sách',
            link: '/',
            icon: BiBook,
        },
    ];
    return (
        <div className="flex justify-between">
            {linkMenu.map((item, index) => {
                return (
                    <a
                        className="text-white flex items-center hover:text-gray-100 mt-2 space-x-2 text-sm"
                        href={item.link}
                        key={index}
                    >
                        <item.icon size={20} />
                        <span>{item.title}</span>
                    </a>
                );
            })}
        </div>
    );
}
