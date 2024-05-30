// 'use client'
import {
    DashboardOutlined,
    MenuOutlined,
    ProfileOutlined,
    TableOutlined,
} from '@ant-design/icons';
import { Popover } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const popContent = (
        <ul>
            <li>
                <Link href="/">
                    <span className={` flex items-center ${pathname === '/' ? 'text-blue-500' : ''}`}>
                        <DashboardOutlined className="mr-3" />
                        Overview
                    </span>
                </Link>
            </li>
            <li>
                <Link href="/Products">
                    <span className={` flex items-center ${pathname === '/Products' ? 'text-blue-500' : ''}`}>
                        <TableOutlined className="mr-3" />
                        Inventory
                    </span>
                </Link>
            </li>
            <li>
                <Link href="/Customers">
                    <span className={` flex items-center ${pathname === '/Customers' ? 'text-blue-500' : ''}`}>
                        <ProfileOutlined className="mr-3" />
                        Customers
                    </span>
                </Link>
            </li>
        </ul>
    );

    return (
        <aside className="shadow-lg transition-all transform ease-in fixed flex justify-between items-center py-4 bg-black top-0 left-0 w-full md:w-max md:mr-4 md:h-screen md:flex md:flex-col z-10 px-4 md:p-5 text-white md:justify-between">
            {/* Top Section */}
            <div className="md:flex md:flex-col items-center md:items-start">
                <Link href="/" className="hover:text-white/50 text-xl md:text-2xl font-bold font-heading md:mb-10">
                    MODISTE
                </Link>
                <ul className="hidden md:flex md:flex-col font-semibold font-heading space-x-5 md:space-x-0 md:space-y-5 overflow-x-auto md:overflow-visible">
                    <li>
                        <Link href="/">
                            <span className={`flex hover:text-white/50 items-center ${pathname === '/' ? 'text-blue-500' : ''} py-4`}>
                                <DashboardOutlined className="mr-3" />
                                Overview
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/Products">
                            <span className={`flex hover:text-white/50 items-center ${pathname === '/Products' ? 'text-blue-500' : ''} py-4`}>
                                <TableOutlined className="mr-3" />
                                Inventory
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/Customers">
                            <span className={`flex hover:text-white/50 items-center ${pathname === '/Customers' ? 'text-blue-500' : ''} py-4`}>
                                <ProfileOutlined className="mr-3" />
                                Customers
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
            <Popover
                placement='bottomLeft'
                content={popContent}
                trigger="click"
                className='md:hidden'
                open={open}
                onOpenChange={handleOpenChange}
            >
                <button><MenuOutlined className='text-xl text-white' /></button>
            </Popover>

            {/* Bottom Section */}
            {/* <div className="hidden hover:cursor-pointer md:flex items-center gap-x-4 mt-4 md:mt-0">
                <Image src={profile} alt='Heng' className='rounded-full' width={45} height={45} />
                <h1 className='text-sm md:hidden'>Heng</h1>
            </div> */}
        </aside >
    );
};

export default Navbar;
