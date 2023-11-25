import React from 'react';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="min-w-full min-h-screen bg-gray-100 dark:bg-gray-800">
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
