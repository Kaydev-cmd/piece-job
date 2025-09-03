import Link from "next/link";
import { HEADER_LINKS } from "@/constants";
import { motion, AnimatePresence } from "motion/react";
import { RxHamburgerMenu } from "react-icons/rx"
import { HiX } from "react-icons/hi";
import { useState, useRef, useEffect } from "react";


const Header: React.FC = () => {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); 
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  } 

  const Refbutton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && Refbutton.current && !Refbutton.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);


    return (
       

            <header className="sticky top-0 z-50">
              <div className="container flex justify-between items-center">
                  <Link href="/" className="flex items-center"> 
                      <h1 className="text-3xl font-bold bg-[linear-gradient(135deg,#1D4ED8,#10B981)] bg-clip-text text-transparent ">PieceJob</h1>
                  </Link>

                  <nav className="hidden md:flex">
                      <ul className="flex no-underline  gap-8 items-center transition-all duration-300 ease-in-out">
                        {HEADER_LINKS.map(({ link, href }) => (

                          <li key={href} className="text-2xl font-bold hover:text-blue-600 transition-colors duration-300 ease-in-out">
                              <Link href={href}>{link}</Link>
                          </li>

                        ))}       
                      </ul>
                  </nav>

                      {/* Hamburger menu button */}     
                      <button ref={Refbutton}  onClick={toggleMenu} style={{padding: 0}} className="rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 md:hidden">
                          {isMenuOpen ? (<HiX size={48} onClick={toggleMenu} color="#1D4ED8" />) : (<RxHamburgerMenu size={48}  onClick={toggleMenu}  color="#1D4ED8"/>)
                          
                        }

                      </button>    
              </div>
                    {/* Dropdown menu  */}
             <AnimatePresence>
               {
                            isMenuOpen && (
                                <motion.ul className="absolute h-50 top-20 w-full flex flex-col items-center justify-center gap-10  shadow-lg  p-8 space-y-3 text-center bg-[linear-gradient(135deg,#1D4ED8,#10B981)] md:hidden"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}>
                                    {HEADER_LINKS.map(({ link, href }) => (
                                        <li key={href} className=" flex flex-col items-center justify-center px-3   py-2 rounded-md text-xl font-2xlg text-white hover:text-blue-600 transition-colors duration-300 ease-in-out">
                                            <Link href={href}>{link}</Link>
                                        </li>
                                    ))}
                                </motion.ul>
                            )
                  }
              </AnimatePresence>  
           </header>
        
    )
};

export default Header;