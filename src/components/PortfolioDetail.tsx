import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Calendar, 
  User, 
  Tag, 
  ChevronRight,
  Home,
  Star,
  Eye
} from "lucide-react";
import { getPortfolioBySlug, getPublishedPortfolios, getFeaturedPortfolios } from "@/lib/portfolioService";
import { getPortfolioImage, getPortfolioImageWithFallback } from "@/lib/portfolioImageService";
import { Portfolio } from "@/lib/supabase";
import Header from "./Header";
import Footer from "./Footer";

const PortfolioDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [relatedPortfolios, setRelatedPortfolios] = useState<Portfolio[]>([]);
  const [featuredPortfolios, setFeaturedPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil gambar dari storage
  const getImageFromLocal = (imageKey: string): string | null => {
    try {
      return getPortfolioImage(imageKey);
    } catch (error) {
      console.error('Error getting image from storage:', error);
      return null;
    }
  };
  const [error, setError] = useState("");

  useEffect(() => {
    if (slug) {
      loadPortfolio();
    }
  }, [slug]);

  // Scroll to top when portfolio loads
  useEffect(() => {
    if (portfolio && !loading) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [portfolio, loading]);

  // Scroll to top on component mount
  useEffect(() => {
    // Remove any hash from URL and scroll to top
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []);

  const loadPortfolio = async () => {
    try {
      setLoading(true);
      setError("");
      
      if (!slug) {
        setError("Slug portofolio tidak ditemukan");
        return;
      }

      const portfolioData = await getPortfolioBySlug(slug);
      if (portfolioData) {
        setPortfolio(portfolioData);
        await loadRelatedPortfolios(portfolioData);
        await loadFeaturedPortfolios();
      } else {
        setError("Portofolio tidak ditemukan");
      }
    } catch (error) {
      console.error("Error loading portfolio:", error);
      setError("Terjadi kesalahan saat memuat portofolio");
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedPortfolios = async (currentPortfolio: Portfolio) => {
    try {
      const allPortfolios = await getPublishedPortfolios();
      const related = allPortfolios
        .filter(p => p.id !== currentPortfolio.id)
        .filter(p => 
          p.category === currentPortfolio.category ||
          p.technologies.some(tech => 
            currentPortfolio.technologies.includes(tech)
          )
        )
        .slice(0, 3);
      setRelatedPortfolios(related);
    } catch (error) {
      console.error("Error loading related portfolios:", error);
    }
  };

  const loadFeaturedPortfolios = async () => {
    try {
      const featured = await getFeaturedPortfolios(6);
      // Exclude current portfolio from featured portfolios
      const filteredFeatured = featured.filter(p => p.id !== portfolio?.id);
      setFeaturedPortfolios(filteredFeatured);
    } catch (error) {
      console.error("Error loading featured portfolios:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <Header onLogoClick={() => navigate('/')} />
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground overflow-x-auto">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center gap-1 h-auto p-0 hover:text-primary whitespace-nowrap"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Beranda</span>
              </Button>
              <ChevronRight className="h-4 w-4 flex-shrink-0" />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/portfolio')}
                className="h-auto p-0 hover:text-primary whitespace-nowrap"
              >
                Portofolio
              </Button>
              <ChevronRight className="h-4 w-4 flex-shrink-0" />
              <span className="text-primary font-medium">Memuat...</span>
            </nav>
          </div>
          
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Memuat portofolio...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <Header onLogoClick={() => navigate('/')} />
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground overflow-x-auto">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center gap-1 h-auto p-0 hover:text-primary whitespace-nowrap"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Beranda</span>
              </Button>
              <ChevronRight className="h-4 w-4 flex-shrink-0" />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/portfolio')}
                className="h-auto p-0 hover:text-primary whitespace-nowrap"
              >
                Portofolio
              </Button>
              <ChevronRight className="h-4 w-4 flex-shrink-0" />
              <span className="text-primary font-medium">Error</span>
            </nav>
          </div>
          
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-secondary mb-4">
              {error || "Portofolio tidak ditemukan"}
            </h1>
            <p className="text-muted-foreground mb-6">
              Portofolio yang Anda cari tidak dapat ditemukan atau telah dihapus.
            </p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Header onLogoClick={() => navigate('/')} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground overflow-x-auto">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-1 h-auto p-0 hover:text-primary whitespace-nowrap"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Beranda</span>
            </Button>
            <ChevronRight className="h-4 w-4 flex-shrink-0" />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/portfolio')}
              className="h-auto p-0 hover:text-primary whitespace-nowrap"
            >
              Portofolio
            </Button>
            <ChevronRight className="h-4 w-4 flex-shrink-0" />
            <span className="text-primary font-medium truncate max-w-[150px] sm:max-w-[200px]">
              {portfolio.title}
            </span>
          </nav>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Portfolio Content - 3 columns */}
          <div className="lg:col-span-3">
            <article className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg rounded-lg overflow-hidden">
              {/* Featured Image */}
              <div className="w-full h-64 md:h-96 overflow-hidden relative">
                <img
                  src={(() => {
                    if (portfolio.featured_image) {
                      if (portfolio.featured_image.startsWith('portfolio-image-')) {
                        return getPortfolioImageWithFallback(portfolio.featured_image, portfolio.category, portfolio.title);
                      } else {
                        return portfolio.featured_image;
                      }
                    } else {
                      return getPortfolioImageWithFallback('', portfolio.category, portfolio.title);
                    }
                  })()}
                  alt={portfolio.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Portfolio Content */}
              <div className="p-6 md:p-8">
                {/* Title and Featured Badge */}
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-secondary leading-tight line-clamp-2 flex-1 mr-4">
                    {portfolio.title}
                  </h1>
                  {portfolio.featured && (
                    <Badge variant="default" className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-0">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2 max-w-[200px]">
                    <User className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">Client: {portfolio.client}</span>
                  </div>
                  <div className="flex items-center gap-2 max-w-[150px]">
                    <Tag className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{portfolio.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Dibuat: {formatDate(portfolio.created_at)}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-gray-800 leading-relaxed">
                    {portfolio.description}
                  </p>
                </div>

                {/* Technologies */}
                {portfolio.technologies && portfolio.technologies.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-secondary mb-4">Teknologi yang Digunakan</h3>
                    <div className="flex flex-wrap gap-2">
                      {portfolio.technologies.map((tech, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="px-3 py-2 text-sm bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 hover:text-blue-800 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  {portfolio.project_url && (
                    <Button 
                      onClick={() => window.open(portfolio.project_url, '_blank')}
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Lihat Proyek
                    </Button>
                  )}
                  {portfolio.github_url && (
                    <Button 
                      variant="outline"
                      onClick={() => window.open(portfolio.github_url, '_blank')}
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      Lihat Kode
                    </Button>
                  )}
                </div>

                <Separator className="mb-8" />
              </div>
            </article>
          </div>

          {/* Sidebar - 1 column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Featured Portfolios Sidebar */}
              <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <h3 className="text-lg font-bold text-secondary">
                      Portofolio Unggulan
                    </h3>
                  </div>
                  
                  {featuredPortfolios.length > 0 ? (
                    <div className="space-y-4">
                      {featuredPortfolios.map((featuredPortfolio) => (
                        <div 
                          key={featuredPortfolio.id} 
                          className="group cursor-pointer"
                          onClick={() => navigate(`/portfolio/${featuredPortfolio.slug}`)}
                        >
                          <div className="flex items-start gap-3">
                            {/* Thumbnail */}
                            <div className="flex-shrink-0 w-12 h-12 overflow-hidden rounded-lg">
                              <img
                                src={(() => {
                                  if (featuredPortfolio.featured_image) {
                                    if (featuredPortfolio.featured_image.startsWith('portfolio-image-')) {
                                      return getPortfolioImageWithFallback(featuredPortfolio.featured_image, featuredPortfolio.category, featuredPortfolio.title);
                                    } else {
                                      return featuredPortfolio.featured_image;
                                    }
                                  } else {
                                    return getPortfolioImageWithFallback('', featuredPortfolio.category, featuredPortfolio.title);
                                  }
                                })()}
                                alt={featuredPortfolio.title}
                                className="w-full h-full object-cover"
                              />
                                                           </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm text-secondary group-hover:text-primary transition-colors line-clamp-1 mb-1">
                                {featuredPortfolio.title}
                              </h4>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {featuredPortfolio.description}
                              </p>
                            </div>
                          </div>
                          
                          {/* Separator */}
                          <Separator className="mt-4" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Star className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">
                        Belum ada portofolio unggulan
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Portfolios */}
        {relatedPortfolios.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-secondary mb-6">
              Portofolio Terkait
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPortfolios.map((relatedPortfolio) => (
                <Card key={relatedPortfolio.id} className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-white/20 cursor-pointer" onClick={() => navigate(`/portfolio/${relatedPortfolio.slug}`)}>
                  {/* Thumbnail for related portfolios */}
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={(() => {
                        if (relatedPortfolio.featured_image) {
                          if (relatedPortfolio.featured_image.startsWith('portfolio-image-')) {
                            return getPortfolioImageWithFallback(relatedPortfolio.featured_image, relatedPortfolio.category, relatedPortfolio.title);
                          } else {
                            return relatedPortfolio.featured_image;
                          }
                        } else {
                          return getPortfolioImageWithFallback('', relatedPortfolio.category, relatedPortfolio.title);
                        }
                      })()}
                      alt={relatedPortfolio.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                                         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg text-secondary group-hover:text-primary transition-colors line-clamp-1 mb-2">
                      {relatedPortfolio.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {relatedPortfolio.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1 max-w-[100px]">
                        <User className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{relatedPortfolio.client}</span>
                      </span>
                      <span className="flex items-center gap-1 max-w-[100px]">
                        <Tag className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{relatedPortfolio.category}</span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PortfolioDetail;
