import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound: React.FC = () => {

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-8 lg:pt-16 pb-60 lg:pb-32 bg-gradient-to-br from-background to-muted relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center space-y-8">
            {/* Error Code */}
            <div className="mb-8">
              <h1 className="text-8xl lg:text-9xl font-bold text-secondary">
                404
              </h1>
            </div>

            {/* Main Message */}
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3">
                <AlertTriangle className="w-8 h-8 text-primary" />
                <h2 className="text-2xl lg:text-4xl font-bold text-secondary">
                  Oops! Halaman Tidak Ditemukan
                </h2>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Sepertinya halaman yang Anda cari telah hilang di dunia digital. 
                Jangan khawatir, mari kita kembali ke rumah yang aman!
              </p>
            </div>

            {/* Illustration */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-primary" />
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-8">
              <Button 
                asChild
                size="lg"
                className="gradient-primary text-white hover:shadow-glow transition-smooth text-lg px-8 rounded-[30px]"
              >
                <Link to="/">
                  Kembali ke Beranda
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
