import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    const storedMode =
      localStorage.getItem('SpecialLegends_darkMode') === 'true';
    setDarkMode(storedMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('SpecialLegends_darkMode', newMode.toString());
  };

  return isMounted ? (
    <div className={`${darkMode ? 'dark' : ''} `}>
      <div className="min-w-full min-h-screen bg-gray-100 dark:bg-gray-800 ">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

        <main>{children}</main>
        <Footer />
      </div>
    </div>
  ) : null;
};

export default Layout;
