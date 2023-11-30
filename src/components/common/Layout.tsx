import React, { useState } from 'react';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? localStorage.getItem('SpecialLegends_darkMode') === 'true'
      : false
  );

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('SpecialLegends_darkMode', newMode.toString());
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} `}>
      <div className="min-w-full min-h-screen bg-gray-100 dark:bg-gray-800 ">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
