'use client'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import profile from '../../../../public/profile/profile.jpg';

const Navbar = () => {
    const pathname = usePathname();

    return (
        <section className="fixed top-0 left-0 bottom-0 z-10 shadow-lg w-56 p-5 flex flex-col justify-between text-black">
            {/* Top Section */}
            <div>
                <Link href="/" className="text-3xl font-bold font-heading mb-10 block ">
                    MODISTE
                </Link>

                <ul className="flex flex-col font-semibold font-heading space-y-5">
                    <li>
                        <Link href="/" className={`block text-left ${pathname === '/' ? 'text-blue-500' : 'text-black'}`}>
                            Overview
                        </Link>
                    </li>
                    <li>
                        <Link href="/Products" className={`block text-left ${pathname === '/Products' ? 'text-blue-500' : 'text-black'}`}>
                            Inventory
                        </Link>
                    </li>
                    <li>
                        <Link href="/Customers" className={`block text-left ${pathname === '/Customers' ? 'text-blue-500' : 'text-black'}`}>
                            Customers
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Bottom Section */}
            <div className="hover:cursor-pointer flex items-center gap-x-4">
                <Image src={profile} alt='Heng' className='rounded-full' width={45} height={45} />
                <h1>Heng</h1>
            </div>
        </section>
    );
};

export default Navbar;
