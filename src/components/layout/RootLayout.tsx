import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Newsletter } from './Newsletter';
import { LEGAL_LINKS } from '../../config/navigation';

interface RootLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function RootLayout({ children, currentPage, onPageChange }: RootLayoutProps) {
  const isUtilityPage = LEGAL_LINKS.includes(currentPage);
  const showNewsletter = currentPage !== "Simuladores" && !isUtilityPage;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar currentPage={currentPage} onPageChange={onPageChange} />
      
      <main>
        {children}
      </main>

      {showNewsletter && <Newsletter />}

      <Footer onPageChange={onPageChange} />
    </div>
  );
}
