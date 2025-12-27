import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost/Agro/agro1/backend';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80';

const BlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [relatedBlogs, setRelatedBlogs] = useState([]);

    useEffect(() => {
        fetchBlog();
    }, [slug]);

    // Track view only once per session
    const trackView = async (blogId) => {
        const viewedBlogs = JSON.parse(sessionStorage.getItem('viewedBlogs') || '[]');

        // Check if already viewed in this session
        if (viewedBlogs.includes(blogId)) {
            return; // Already viewed, don't count again
        }

        try {
            // Call backend to increment view
            await fetch(`${API_URL}/blogs.php?trackView=${blogId}`);

            // Mark as viewed in this session
            viewedBlogs.push(blogId);
            sessionStorage.setItem('viewedBlogs', JSON.stringify(viewedBlogs));
        } catch (err) {
            console.error('Failed to track view:', err);
        }
    };

    const fetchBlog = async () => {
        try {
            setLoading(true);
            setError(false);

            const response = await fetch(`${API_URL}/blogs.php?slug=${slug}`);
            const data = await response.json();

            if (data.success && data.data) {
                setBlog(data.data);
                document.title = `${data.data.title} | AgroTech Blog`;
                fetchRelatedBlogs(data.data.category);

                // Track view (session-based - only once per session)
                trackView(data.data.id);
            } else {
                setError(true);
            }
        } catch (err) {
            console.error('Failed to fetch blog:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedBlogs = async (category) => {
        try {
            const response = await fetch(`${API_URL}/blogs.php`);
            const data = await response.json();
            if (data.success) {
                const related = data.data
                    .filter(b => b.slug !== slug && (b.category === category || !category))
                    .slice(0, 3);
                setRelatedBlogs(related);
            }
        } catch (err) {
            console.error('Failed to fetch related blogs:', err);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog.title,
                    text: blog.excerpt,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    // Render YouTube embed
    const renderVideoEmbed = (url) => {
        if (!url) return null;

        // YouTube URL patterns
        const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
        if (youtubeMatch) {
            return (
                <div className="aspect-video rounded-2xl overflow-hidden shadow-lg mb-8">
                    <iframe
                        src={`https://www.youtube.com/embed/${youtubeMatch[1]}`}
                        title="YouTube video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                </div>
            );
        }

        // Vimeo URL patterns
        const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
        if (vimeoMatch) {
            return (
                <div className="aspect-video rounded-2xl overflow-hidden shadow-lg mb-8">
                    <iframe
                        src={`https://player.vimeo.com/video/${vimeoMatch[1]}`}
                        title="Vimeo video"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                </div>
            );
        }

        // Generic video link
        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition-colors mb-8"
            >
                <PlayCircleIcon /> Watch Video
            </a>
        );
    };

    if (loading) {
        return (
            <div className="bg-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">⏳</div>
                    <h2 className="text-2xl font-display font-semibold text-gray-900 mb-2">Loading...</h2>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="bg-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🚫</div>
                    <h2 className="text-2xl font-display font-semibold text-gray-900 mb-2">Blog Not Found</h2>
                    <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-600 transition-colors"
                    >
                        <ArrowBackIcon fontSize="small" />
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    const tags = blog.tags ? blog.tags.split(',').map(t => t.trim()) : [];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
                <img
                    src={blog.featured_image || DEFAULT_IMAGE}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                <div className="absolute inset-0 flex items-end">
                    <div className="container-custom pb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {blog.category && (
                                <span className="inline-block bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                                    {blog.category}
                                </span>
                            )}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                                {blog.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-white/80">
                                <span className="flex items-center gap-2">
                                    <PersonIcon fontSize="small" />
                                    {blog.author || 'Admin'}
                                </span>
                                <span className="flex items-center gap-2">
                                    <CalendarTodayIcon fontSize="small" />
                                    {formatDate(blog.created_at)}
                                </span>
                                <span className="flex items-center gap-2">
                                    <VisibilityIcon fontSize="small" />
                                    {blog.view_count || 0} views
                                </span>
                                {(blog.video_url || blog.video_file) && (
                                    <span className="flex items-center gap-1 bg-red-500 px-3 py-1 rounded-full text-white text-sm">
                                        <PlayCircleIcon fontSize="small" />
                                        Video
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Video Section */}
                            {blog.video_url && (
                                <div className="mb-8">
                                    <h2 className="text-xl font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <PlayCircleIcon className="text-red-500" />
                                        Watch Video
                                    </h2>
                                    {renderVideoEmbed(blog.video_url)}
                                </div>
                            )}

                            {blog.video_file && !blog.video_url && (
                                <div className="mb-8">
                                    <h2 className="text-xl font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <PlayCircleIcon className="text-red-500" />
                                        Watch Video
                                    </h2>
                                    <div className="aspect-video rounded-2xl overflow-hidden shadow-lg bg-black">
                                        <video
                                            src={blog.video_file}
                                            controls
                                            className="w-full h-full"
                                            poster={blog.featured_image}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Article Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div
                                    className="prose prose-lg max-w-none text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: blog.content || '<p>Content coming soon...</p>' }}
                                />

                                {/* Tags */}
                                {tags.length > 0 && (
                                    <div className="mt-12 pt-8 border-t">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <LocalOfferIcon className="text-gray-400" />
                                            {tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Share Button */}
                                <div className="mt-8">
                                    <button
                                        onClick={handleShare}
                                        className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
                                    >
                                        <ShareIcon fontSize="small" />
                                        Share Article
                                    </button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-28 space-y-8">
                                {/* Back to Blog */}
                                <Link
                                    to="/blog"
                                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    <ArrowBackIcon fontSize="small" />
                                    Back to Blog
                                </Link>

                                {/* Related Posts */}
                                {relatedBlogs.length > 0 && (
                                    <div className="bg-gray-50 rounded-2xl p-6">
                                        <h3 className="text-lg font-display font-bold text-gray-900 mb-4">
                                            Related Articles
                                        </h3>
                                        <div className="space-y-4">
                                            {relatedBlogs.map((related) => (
                                                <Link
                                                    key={related.id}
                                                    to={`/blog/${related.slug}`}
                                                    className="block group"
                                                >
                                                    <div className="flex gap-3">
                                                        <img
                                                            src={related.featured_image || DEFAULT_IMAGE}
                                                            alt={related.title}
                                                            className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                                                            onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
                                                        />
                                                        <div>
                                                            <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                                                                {related.title}
                                                            </h4>
                                                            <span className="text-xs text-gray-500">
                                                                {formatDate(related.created_at)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* CTA Card */}
                                <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 text-white">
                                    <h3 className="text-lg font-display font-bold mb-2">
                                        Start Investing Today
                                    </h3>
                                    <p className="text-primary-100 text-sm mb-4">
                                        Explore our agricultural investment opportunities and grow your wealth sustainably.
                                    </p>
                                    <Link
                                        to="/services"
                                        className="inline-block bg-white text-primary-600 px-6 py-2 rounded-full font-semibold text-sm hover:bg-primary-50 transition-colors"
                                    >
                                        View Services
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogDetail;
