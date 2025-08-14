import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import custom styles
import './Blog.css';

import { getPublishedPosts } from "@/lib/blogService";
import { BlogPost } from "@/lib/supabase";

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef<SwiperType>();

  // Load posts on component mount
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getPublishedPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <section id="blog" className="py-16 bg-gradient-to-br from-background to-muted">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Blog & Artikel
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
            Blog & Artikel
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Temukan tips, tutorial, dan insight terbaru seputar web development, 
            desain, dan teknologi digital untuk mengembangkan bisnis Anda.
          </p>
        </div>



        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Memuat artikel...</p>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && (
          <>
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Belum ada artikel yang dipublikasikan.
                </p>
              </div>
            ) : (
              <div className="relative">
                {/* Custom Navigation Buttons */}
                <div className="flex justify-between items-center mb-6">
                  <Button
                    variant="outline"
                    size="sm"
                    className="swiper-button-prev-custom bg-white/80 backdrop-blur-sm border-white/20 hover:bg-white/90 transition-all duration-300"
                    onClick={() => {
                      if (swiperRef.current) swiperRef.current.slidePrev();
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="swiper-button-next-custom bg-white/80 backdrop-blur-sm border-white/20 hover:bg-white/90 transition-all duration-300"
                    onClick={() => {
                      if (swiperRef.current) swiperRef.current.slideNext();
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Swiper Container */}
                <Swiper
                  className="blog-swiper"
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={32}
                  slidesPerView={1}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  navigation={{
                    prevEl: '.swiper-button-prev-custom',
                    nextEl: '.swiper-button-next-custom',
                  }}
                  pagination={{
                    clickable: true,
                    el: '.swiper-pagination-custom',
                  }}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 24,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 32,
                    },
                  }}
                  loop={posts.length > 3}
                >
                  {posts.slice(0, 6).map((post) => (
                    <SwiperSlide key={post.id}>
                      <Card 
                        className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50 cursor-pointer h-full"
                        onClick={() => navigate(`/blog/${post.slug}`)}
                      >
                        <CardHeader className="pb-4">
                          {post.featured_image && (
                            <div className="aspect-video overflow-hidden rounded-lg mb-4">
                              <img
                                src={post.featured_image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <CardTitle className="text-xl font-bold text-secondary group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-3">
                            {post.excerpt}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Pagination */}
                <div className="swiper-pagination-custom flex justify-center mt-6"></div>
              </div>
            )}
          </>
        )}

        {/* Load More Button (if needed) */}
        {!loading && posts.length > 6 && (
          <div className="text-center mt-12">
            <Button 
              onClick={() => navigate('/blog')}
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            >
              Lihat Semua Artikel
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
