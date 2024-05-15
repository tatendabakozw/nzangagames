import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

type Props = {};

function Footer({}: Props) {
  return (
    <div className="bg-primary-dark w-full  ">
      <div className="flex flex-col max-w-7xl w-full mx-auto bg-primary-dark text-white p-4 py-16">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-8 items-center">
          <div className="logo col-span-1 flex flex-col items-center">
            <Image src={"/logo.png"} width={100} height={100} alt="logo" />
            <p className="font-semibold">NzangaGames</p>
          </div>
          <div className="col-span-1 flex flex-col">
            <p className="text-white font-semibold capitalize">quick links</p>
            <a href="/" className="text-sm font-semibold p-2 text-gray-200">
              Home
            </a>
            <a href="/news" className="text-sm font-semibold p-2 text-gray-200">
              About
            </a>
            <a
              href="/contact"
              className="text-sm font-semibold p-2 text-gray-200"
            >
              Sign In
            </a>
          </div>
          <div className="col-span-1 flex flex-col">
            <a href="/about-us" className="text-white font-semibold capitalize">
              Contact Us
            </a>
            <Link
              href="/about-us#mission"
              className="text-sm font-semibold p-2 text-gray-200"
            >
              Chinhoyi University of Technology
            </Link>
            <a
              href="/about-us#faqs"
              className="text-sm font-semibold p-2 text-gray-200"
            >
              Private Bag 7724 Chinhoyi
            </a>
            <a
              href="/downloads"
              className="text-sm font-semibold p-2 text-gray-200"
            >
              Zimbabwe
            </a>
          </div>
          <div className="col-span-1 space-x-4 flex flex-row items-center">
            <div className="flex flex-row items-center ">
              <PhoneIcon height={20} width={20} />
              {/* <p>{data.contact_info.phone}</p> */}
            </div>
            <div className="flex flex-row items-center ">
              <EnvelopeIcon height={20} width={20} />
              {/* <p>{data.contact_info.email}</p> */}
            </div>
            <div className="flex flex-row items-center ">
              <MapPinIcon height={20} width={20} />
              {/* <p>{data.contact_info.address}</p> */}
            </div>
          </div>
        </div>
        <div className="border-t border-primary-light m-8"></div>
        <p className="text-center text-sm text-gray-200">
          &copy; {new Date().getFullYear()} NzangaGames{" "}
        </p>
      </div>
    </div>
  );
}

export default Footer;
