import { useState, useMemo, useEffect } from "react";
import { ExternalLink, Eye, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSimpleCache, CACHE_KEYS } from "@/hooks/useCache";
import { getPublishedPortfolios } from "@/lib/portfolioService";
import { getPortfolioImage, listenForImageUpdates, getPortfolioImageWithFallback } from "@/lib/portfolioImageService";
import { Portfolio as PortfolioType } from "@/lib/supabase";
import { showInfo } from "@/lib/sweetAlert";

const Portfolio = () => {
  // Cache untuk kategori yang dipilih
  const { data: cachedCategory, setData: setCachedCategory } = useSimpleCache<string>(
    `${CACHE_KEYS.USER_PREFERENCES}_portfolio_category`,
    "All",
    24 * 60 * 60 * 1000 // 24 jam
  );

  const [selectedCategory, setSelectedCategory] = useState<string>(cachedCategory || "All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [portfolios, setPortfolios] = useState<PortfolioType[]>([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil gambar dari storage (localStorage + sessionStorage)
  const getImageFromStorage = (imageKey: string): string | null => {
    try {
      const image = getPortfolioImage(imageKey);
      return image;
    } catch (error) {
      console.error('❌ [HOME] Error getting image from storage:', error);
      return null;
    }
  };

  // Load portfolios on component mount
  useEffect(() => {
    loadPortfolios();
    
    // Listen for image updates from other tabs
    const cleanup = listenForImageUpdates((key, data) => {
      console.log('🔄 [HOME] Image updated from other tab:', key);
      loadPortfolios();
    });
    
    // Debug storage status and fix missing images on mount
    setTimeout(() => {
      import('@/lib/portfolioImageService').then(({ debugStorageStatus, fixMissingImages, fixSessionStorageOnlyImages }) => {
        debugStorageStatus();
        
        // Fix sessionStorage-only images first
        const sessionFixed = fixSessionStorageOnlyImages();
        if (sessionFixed > 0) {
          console.log(`🔧 [HOME] Auto-fixed ${sessionFixed} sessionStorage-only images`);
        }
        
        // Then fix missing images
        fixMissingImages().then((fixedCount) => {
          if (fixedCount > 0) {
            console.log(`🔧 [HOME] Auto-fixed ${fixedCount} missing images on load`);
          }
          
          // Reload portfolios if any fixes were applied
          if (sessionFixed > 0 || fixedCount > 0) {
            loadPortfolios();
          }
        });
      });
    }, 1000);
    
    return cleanup;
  }, []);

  const loadPortfolios = async () => {
    try {
      setLoading(true);
      const data = await getPublishedPortfolios();
      setPortfolios(data);
    } catch (error) {
      console.error("❌ [HOME] Error loading portfolios:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update cache ketika kategori berubah
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCachedCategory(category);
  };

  // Get unique categories from portfolios data
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(portfolios.map(p => p.category))];
    return ["All", ...uniqueCategories];
  }, [portfolios]);

  // Filter portfolios based on selected category
  const filteredPortfolios = useMemo(() => {
    return selectedCategory === "All" 
      ? portfolios 
      : portfolios.filter(portfolio => portfolio.category === selectedCategory);
  }, [selectedCategory, portfolios]);

  // Handler untuk tombol Demo
  const handleDemoClick = (portfolio: PortfolioType) => {
    if (portfolio.project_url) {
      window.open(portfolio.project_url, '_blank', 'noopener,noreferrer');
    } else {
      showInfo('Demo belum tersedia untuk portfolio ini.');
    }
  };

  // Handler untuk tombol Detail
  const handleDetailClick = (portfolio: PortfolioType) => {
    // Navigate ke halaman detail portfolio
    window.location.href = `/portfolio/${portfolio.slug}`;
  };

  // Handler untuk tombol Lihat Portfolio Lengkap
  const handleViewAllPortfolios = () => {
    window.location.href = '/portfolio';
  };



  return (
    <section id="portfolio" className="py-12 sm:py-16 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="max-w-5xl mx-auto px-3 sm:px-4">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3 sm:mb-4">
            <Filter className="w-4 h-4" />
            Portfolio Kami
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-3 sm:mb-4 leading-tight">
            Contoh Website Buatan Kami
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-0">
            Lihat beberapa hasil karya terbaik kami yang telah membantu 
            berbagai bisnis berkembang di dunia digital
          </p>
        </div>

        {/* Filter Categories */}
        <div className="mb-6 sm:mb-8">
          {/* Desktop: Flex wrap */}
          <div className="hidden md:flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-card text-muted-foreground hover:bg-muted border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Mobile: Swipeable */}
          <div className="md:hidden overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 sm:gap-3 px-3 sm:px-4 py-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "bg-card text-muted-foreground hover:bg-muted border border-border"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground text-sm sm:text-base">Memuat portfolio...</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
          <>
            {filteredPortfolios.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <p className="text-muted-foreground text-base sm:text-lg">
                  Belum ada portfolio yang dipublikasikan.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                {filteredPortfolios.map((portfolio) => (
                  <div 
                    key={portfolio.id}
                    className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-card border border-border shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 aspect-square max-w-sm mx-auto"
                    onMouseEnter={() => setHoveredProject(portfolio.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-full">
                      {portfolio.featured_image ? (
                        <img
                                                  src={(() => {
                          let imageSrc = '';
                          if (portfolio.featured_image) {
                            if (portfolio.featured_image.startsWith('portfolio-image-')) {
                              imageSrc = getPortfolioImageWithFallback(portfolio.featured_image, portfolio.category, portfolio.title);
                            } else {
                              imageSrc = portfolio.featured_image;
                            }
                          } else {
                            imageSrc = getPortfolioImageWithFallback('', portfolio.category, portfolio.title);
                          }
                          return imageSrc;
                        })()}
                          alt={portfolio.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"

                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <div className="w-16 h-16 mx-auto mb-2 bg-gray-400 rounded-lg flex items-center justify-center">
                              <Eye className="w-8 h-8 text-white" />
                            </div>
                            <p className="text-sm font-medium line-clamp-1 px-2">{portfolio.title}</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Overlay with Buttons */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="absolute bottom-20 left-0 right-0 p-3 sm:p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <div className="flex gap-2 sm:gap-3">
                            {/* Demo Button */}
                            <button 
                              onClick={() => handleDemoClick(portfolio)}
                              className="group/btn relative flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 sm:py-3 px-2 sm:px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                            >
                              {/* Background Animation */}
                              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                              
                              {/* Content */}
                              <div className="relative flex items-center justify-center gap-1 sm:gap-2">
                                <Eye className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/btn:scale-110" />
                                <span className="text-xs sm:text-sm">Demo</span>
                              </div>
                            </button>

                            {/* Detail Button */}
                            <button 
                              onClick={() => handleDetailClick(portfolio)}
                              className="group/btn relative flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 sm:py-3 px-2 sm:px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                            >
                              {/* Background Animation */}
                              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                              
                              {/* Content */}
                              <div className="relative flex items-center justify-center gap-1 sm:gap-2">
                                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                <span className="text-xs sm:text-sm">Detail</span>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 max-w-[100px] sm:max-w-[120px]">
                        <span className="inline-block px-2 sm:px-3 py-1 text-xs font-semibold text-white bg-primary/90 backdrop-blur-sm rounded-full truncate w-full">
                          {portfolio.category}
                        </span>
                      </div>

                      {/* Technologies Badge */}
                      {portfolio.technologies && portfolio.technologies.length > 0 && (
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 max-w-[120px] sm:max-w-[140px]">
                          <span className="inline-block px-2 sm:px-3 py-1 text-xs font-semibold text-white bg-secondary/90 backdrop-blur-sm rounded-full truncate w-full">
                            {portfolio.technologies.slice(0, 1).join(', ')}
                            {portfolio.technologies.length > 1 && '...'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Portfolio Title */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <h3 className="text-white font-semibold text-sm sm:text-base line-clamp-1 mb-1">
                        {portfolio.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        {portfolio.client && (
                          <p className="text-white/80 text-xs line-clamp-1 flex-1 mr-2 max-w-[120px]">
                            Client: {portfolio.client}
                          </p>
                        )}
                        {portfolio.technologies && portfolio.technologies.length > 0 && (
                          <p className="text-white/80 text-xs line-clamp-1 flex-shrink-0 max-w-[100px]">
                            {portfolio.technologies.slice(0, 1).join(', ')}
                            {portfolio.technologies.length > 1 && '...'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* CTA Section */}
        <div className="text-center mt-6 sm:mt-8">
          <div 
            onClick={handleViewAllPortfolios}
            className="inline-flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary to-accent text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <span className="text-sm sm:text-base">Lihat Portfolio Lengkap</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;