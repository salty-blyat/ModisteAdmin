"use client"

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto py-4 mb-4">
      <div className="mb-2 h-px w-full bg-gray-100" />

      <h3 className="-mb-2 text-xl font-bold">Sport,</h3>
      <h3 className="text-xl font-bold">the smart choice.</h3>

      <h6 className="mt-10">
        Shop by{' '}
        <Link href={'/'}
          className="font-bold hover:underline"
        >
          salty-blyat
        </Link>
        , all product images from{' '}
        <Link
          href={'/'}
          className="font-bold hover:underline"
        >
          nike.com
        </Link>
      </h6>
    </footer>
  );
};

export default Footer;
