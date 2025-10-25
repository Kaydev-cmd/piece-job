import Link from "next/link";
import {
  HEADER_LINKS,
  JOB_SEEKER_DROPDOWN_LINKS,
  JOB_POSTER_DROPDOWN_LINKS,
} from "@/constants";
import { MOBILE_LINKS } from "@/constants";
import { motion, AnimatePresence } from "motion/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiX } from "react-icons/hi";
import { useState, useRef, useEffect, use } from "react";
import { useRouter } from "next/router";
import Button from "../common/Button";
import { useAuth } from "@/context/AuthContext";
import { Header_Link, LoggedInUser } from "@/interfaces";
import { FaRegUserCircle } from "react-icons/fa";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Header: React.FC = () => {
  const router = useRouter();
  const { loggedUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [dropdownMenu, setIsDropdownMenu] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const Refbutton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        Refbutton.current &&
        !Refbutton.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleDropdown = () => {
    setIsDropdownMenu((prev) => !prev);
  };

  const whatToRender = (user: LoggedInUser) => {
    console.log("rerender: ", user);
    if (user.role == null) {
      return (
        <Button
          title="Login"
          onClick={() => router.push("/login")}
          variant="login"
        />
      );
    } else {
      return (
        <div className="flex items-center gap-2 relative">
          <Link
            href={`${
              loggedUser.role === "jobSeeker"
                ? "/job-seeker"
                : `/users/job-poster/${loggedUser.username}`
            }`}
            className="flex items-center gap-2"
          >
            {loggedUser.userImage ? (
              <Image
                src={`${loggedUser.userImage}`}
                alt={`${loggedUser.username}`}
                width={500}
                height={500}
              />
            ) : (
              <FaRegUserCircle size={26} />
            )}
            <p>{loggedUser.username}</p>
          </Link>

          {/* Dropdown */}
          <div onClick={handleDropdown} className="cursor-pointer">
            {dropdownMenu ? (
              <>
                <IoIosArrowUp size={20} />
                {/* Navigation Links */}
                <div className="absolute top-10 left-0 shadow-md rounded-md">
                  {loggedUser.role === "jobSeeker" ? (
                    <div
                      className="bg-white flex flex-col gap-2"
                      style={{ padding: "32px" }}
                    >
                      {JOB_SEEKER_DROPDOWN_LINKS.map((link) => (
                        <Link
                          key={link.id}
                          href={link.href}
                          className="text-sm hover:text-blue-500"
                        >
                          {link.linkName}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div
                      className="bg-white flex flex-col gap-2"
                      style={{ padding: "32px" }}
                    >
                      {JOB_POSTER_DROPDOWN_LINKS.map((link) => (
                        <Link
                          key={link.id}
                          href={link.href}
                          className="text-sm hover:text-blue-500"
                        >
                          {link.linkName}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <IoIosArrowDown size={20} />
            )}
          </div>
        </div>
      );
    }
  };

  const getHeaderLinks: () => Header_Link[] = () => {
    if (loggedUser != null) {
      var header_link: Header_Link = {
        id: 4,
        link: "Jobs",
        href: "/job-feed",
      };
      if (loggedUser.role === "employer") header_link.href = "/job-poster-feed";
      return [...HEADER_LINKS, header_link];
    }
    return HEADER_LINKS;
    //show dummy jobs? rn, the choice is to completely remove it..
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="container flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <h1 className="text-3xl md:text-2xl lg:text-2xl xl:text-3xl font-bold bg-[linear-gradient(135deg,#1D4ED8,#10B981)] bg-clip-text text-transparent ">
            PieceJob
          </h1>
        </Link>

        <nav className="hidden md:flex justify-between gap-4 items-center">
          <ul className="flex no-underline md:gap-3 lg:gap-3 xl:gap-8 justify-center items-center transition-all duration-300 ease-in-out">
            {getHeaderLinks().map(({ link, href }) => (
              <li
                key={href}
                className="text-xl font-bold bg-[linear-gradient(135deg,#1D4ED8,#10B981)] bg-clip-text text-transparent hover:text-blue-600 transition-colors duration-300 ease-in-out"
              >
                <Link href={href}>{link}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden md:flex gap-4 items-center">
          {loggedUser.username === null ? (
            <Button
              title="Login"
              onClick={() => router.push("/login")}
              variant="login"
            />
          ) : (
            whatToRender(loggedUser)
          )}
        </div>

        {/* Hamburger menu button */}
        <button
          ref={Refbutton}
          onClick={toggleMenu}
          style={{ padding: 0 }}
          className=" md:hidden"
        >
          {isMenuOpen ? (
            <HiX size={48} onClick={toggleMenu} color="#1D4ED8" />
          ) : (
            <RxHamburgerMenu size={48} onClick={toggleMenu} color="#1D4ED8" />
          )}
        </button>
      </div>

      {/* Dropdown menu  */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            className="absolute h-100 top-20 w-full flex flex-col items-center justify-around shadow-lg text-center bg-[linear-gradient(135deg,#1D4ED8,#10B981)] md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ padding: "24px" }}
          >
            {MOBILE_LINKS.map(({ link, href }) => (
              <li
                key={href}
                className="flex flex-col items-center justify-center rounded-md text-xl text-white"
              >
                <Link href={href}>{link}</Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
