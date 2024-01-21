import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../../assets/movix-logo.svg'
import Container from '../container/Container';

import './style.scss'

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // this code open new url then top show navbar
  useEffect(() => { window.scrollTo(0, 0) }, [location])
  const handleScroll = () => {
    console.log()
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide")
      }
      else {
        setShow("show");
      }
    }
    else {
      setShow("top")
    }
    setLastScrollY(window.scrollY)
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])


  const showSearchbtn = () => {
    setShowSearch(true)
    setMobileMenu(false)
  }
  const showmobilemenu = () => {
    setShowSearch(false)
    setMobileMenu(true)
  }
  const handleCheck = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`)
      setTimeout(() => { setShowSearch(false) }, 1000)
    }
  }
  const handlerNavitem = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
  } else {
      navigate("/explore/tv");
  }
  setMobileMenu(false);
  }
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <Container>
         
          <div className="logo">
            <img src={logo} alt="this is" />
          </div>
          <ul className="menuItems">
            <li onClick={() => handlerNavitem('Movies')} className="menuItem">Movies</li>
            <li onClick={() => handlerNavitem('Tv')} className="menuItem">Tv shows</li>
            <li className="menuItem">
              <HiOutlineSearch onClick={showSearchbtn} />
            </li>
          </ul>
          <div className="mobileMenuItems">
            <HiOutlineSearch onClick={showSearchbtn} />
            {
              mobileMenu ? (<VscChromeClose onClick={() => setMobileMenu(false)} />)
                :
                (<SlMenu onClick={showmobilemenu} />)
            }
          </div>
       
      </Container>
      {showSearch && <div className="searchBar">
        <Container>
          <div className="searchInput">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={handleCheck}
              placeholder='Enter your Movies'
            />
            <VscChromeClose color="black" onClick={() => setShowSearch(false)} />
          </div>

        </Container>
      </div>}
    </header>
  )
}

export default Header
