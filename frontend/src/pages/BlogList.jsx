import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArticleIcon from '@mui/icons-material/Article';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost/Agro/agro1/backend';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80';

const BlogList = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
    const [heroRef, heroInView] = useInView({ threshold: 0.2, triggerOnce: true });
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Gradient colors for cards
    const cardGradients = [
        'from-blue-500 to-indigo-600',
        'from-green-500 to-emerald-600',
        'from-purple-500 to-pink-600',
        'from-orange-500 to-red-600'
    ];

    useEffect(() => {
        document.title = 'Blog | AgroTech - Agricultural Investment Platform';
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${API_URL}/blogs.php`);
            const data = await response.json();
            if (data.success) {
                setBlogs(data.data || []);
            }
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const categories = [...new Set(blogs.map(b => b.category).filter(Boolean))];

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (blog.excerpt && blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = !selectedCategory || blog.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const featuredBlogs = filteredBlogs.filter(b => b.featured === 1);
    const regularBlogs = filteredBlogs.filter(b => b.featured !== 1);

    // Stats for hero section
    const stats = [
        { icon: <AutoStoriesIcon />, value: `${blogs.length}+`, label: 'Articles' },
        { icon: <LocalOfferIcon />, value: `${categories.length}+`, label: 'Categories' },
        { icon: <TrendingUpIcon />, value: 'Weekly', label: 'Updates' },
        { icon: <VisibilityIcon />, value: '10K+', label: 'Readers' }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section - Full Width Image */}
            <section className="relative min-h-[380px] sm:min-h-[420px] md:min-h-[500px] pb-16 sm:pb-20 px-4" ref={heroRef}>
                <img
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1600&q=80"
                    alt="Blog"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>

                {/* Floating decorative elements - hidden on mobile */}
                <div className="hidden sm:block absolute top-20 left-10 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="hidden sm:block absolute bottom-40 right-20 w-40 h-40 bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="relative flex items-center justify-center min-h-[280px] sm:min-h-[320px] md:min-h-[350px]">
                    <div className="container-custom text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                                <ArticleIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
                                Our Blog
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 sm:mb-6">
                                Insights & <span className="text-primary-400">Updates</span>
                            </h1>

                            <p className="text-sm sm:text-base md:text-xl text-white/90 max-w-3xl mx-auto px-2">
                                Stay informed with the latest agricultural trends, investment tips, and success stories from our farming community.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Floating Stats Cards */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-10 px-3 sm:px-4">
                    <div className="container-custom">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex items-center gap-2 sm:gap-4">
                                            <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${cardGradients[index]} rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                                                {React.cloneElement(stat.icon, { sx: { fontSize: { xs: 18, sm: 24 } } })}
                                            </div>
                                            <div>
                                                <div className="text-lg sm:text-xl md:text-2xl font-display font-bold text-gray-900">{stat.value}</div>
                                                <div className="text-gray-500 text-xs sm:text-sm font-medium">{stat.label}</div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Spacer for floating cards */}
            <div className="h-28 sm:h-32 md:h-24 bg-white"></div>

            {/* Search & Filter Section */}
            <section className="bg-white py-4 sm:py-6 border-b sticky top-16 sm:top-20 z-30 px-4">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <SearchIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400" sx={{ fontSize: { xs: 18, sm: 24 } }} />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-full border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all shadow-sm text-sm sm:text-base"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full md:w-auto justify-center md:justify-end overflow-x-auto pb-1">
                            <button
                                onClick={() => setSelectedCategory('')}
                                className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${!selectedCategory
                                    ? 'bg-gradient-to-r from-primary-500 to-green-500 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                All
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${selectedCategory === cat
                                        ? 'bg-gradient-to-r from-primary-500 to-green-500 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Content */}
            <section className="py-10 sm:py-14 md:py-20 bg-gradient-to-b from-white to-gray-50 px-4" ref={ref}>
                <div className="container-custom">
                    {loading ? (
                        // Loading skeleton
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-gray-100 animate-pulse">
                                    <div className="aspect-[16/10] bg-gray-200"></div>
                                    <div className="p-4 sm:p-6">
                                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredBlogs.length === 0 ? (
                        <div className="text-center py-12 sm:py-20">
                            <div className="text-4xl sm:text-6xl mb-4">📝</div>
                            <h2 className="text-xl sm:text-2xl font-display font-semibold text-gray-900 mb-2">No blog posts found</h2>
                            <p className="text-gray-600 mb-6 text-sm sm:text-base">Check back soon for new articles!</p>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="inline-flex items-center gap-2 bg-primary-500 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium hover:bg-primary-600 transition-colors text-sm sm:text-base"
                                >
                                    Clear Search
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Section Header */}
                            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-green-500 rounded-lg sm:rounded-xl flex items-center justify-center text-white">
                                    <ArticleIcon sx={{ fontSize: { xs: 16, sm: 24 } }} />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-display font-bold text-gray-900">All Articles</h2>
                                <span className="text-gray-500 text-xs sm:text-sm ml-1 sm:ml-2">({filteredBlogs.length} articles)</span>
                            </div>

                            {/* Unified Blog Grid */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                                {filteredBlogs.map((blog, index) => (
                                    <motion.article
                                        key={blog.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="group"
                                    >
                                        <Link to={`/blog/${blog.slug}`} className="block">
                                            <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                                                <div className="relative aspect-[16/10] overflow-hidden">
                                                    <img
                                                        src={blog.featured_image || DEFAULT_IMAGE}
                                                        alt={blog.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
                                                    />
                                                    {/* Video badge - top left */}
                                                    {(blog.video_url || blog.video_file) && (
                                                        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-red-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                                                            <PlayCircleIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />
                                                            Video
                                                        </div>
                                                    )}
                                                    {/* Featured/Latest badge - top right corner */}
                                                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                                                        {blog.featured === 1 ? (
                                                            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold shadow-lg">
                                                                ⭐ Featured
                                                            </div>
                                                        ) : (
                                                            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold shadow-lg">
                                                                Latest
                                                            </div>
                                                        )}
                                                    </div>
                                                    {/* Category badge - bottom left */}
                                                    {blog.category && (
                                                        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
                                                            <span className="bg-white/95 backdrop-blur-sm text-gray-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold shadow-md">
                                                                {blog.category}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-4 sm:p-6 flex-grow flex flex-col">
                                                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                                                        <span className="flex items-center gap-1">
                                                            <CalendarTodayIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />
                                                            {formatDate(blog.created_at)}
                                                        </span>
                                                        {blog.views && (
                                                            <span className="flex items-center gap-1">
                                                                <VisibilityIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />
                                                                {blog.views}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="text-base sm:text-lg font-display font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2 flex-grow">
                                                        {blog.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4">{blog.excerpt}</p>
                                                    <div className="flex items-center gap-2 text-primary-600 font-semibold text-xs sm:text-sm mt-auto">
                                                        Read More <ArrowForwardIcon sx={{ fontSize: { xs: 14, sm: 20 } }} className="group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.article>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-10 sm:py-14 md:py-16 px-4">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-green-500 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 text-white text-center relative overflow-hidden">
                            {/* Decorative elements - hidden on mobile */}
                            <div className="hidden sm:block absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="hidden sm:block absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>

                            <div className="relative">
                                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                    Stay Updated
                                </div>

                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 sm:mb-6">
                                    Want to Know More About Our Services?
                                </h2>
                                <p className="text-primary-100 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-10">
                                    Explore our investment opportunities or get in touch with our team for personalized guidance.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                                    <Link
                                        to="/services"
                                        className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
                                    >
                                        Explore Services
                                        <ArrowForwardIcon sx={{ fontSize: { xs: 18, sm: 24 } }} />
                                    </Link>
                                    <Link
                                        to="/contact"
                                        className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white/30 transition-all border border-white/30 text-sm sm:text-base"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default BlogList;
