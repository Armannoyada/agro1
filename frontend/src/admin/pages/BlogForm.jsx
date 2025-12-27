import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box, Card, CardContent, Typography, TextField, Button, Grid,
    FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel,
    IconButton, Divider, CircularProgress, LinearProgress,
} from '@mui/material';
import { ArrowBack, Save, CloudUpload, Delete, PlayCircle, Link as LinkIcon } from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getBlog, createBlog, updateBlog } from '../services/api';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost/Agro/agro1/backend';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80';
const MAX_VIDEO_SIZE_MB = 50;

const BlogForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);
    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState({ image: false, video: false });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featured_image: '',
        video_url: '',
        video_file: '',
        author: 'Admin',
        category: '',
        tags: '',
        status: 1,
        featured: 0,
    });

    const categories = [
        'Agriculture',
        'Investment Tips',
        'Farming Techniques',
        'Success Stories',
        'Market Updates',
        'Sustainability',
        'Technology',
        'Company News',
    ];

    useEffect(() => {
        if (isEdit) fetchBlog();
    }, [id]);

    const fetchBlog = async () => {
        try {
            setLoading(true);
            const response = await getBlog(id);
            if (response.data) {
                setFormData({
                    title: response.data.title || '',
                    slug: response.data.slug || '',
                    excerpt: response.data.excerpt || '',
                    content: response.data.content || '',
                    featured_image: response.data.featured_image || '',
                    video_url: response.data.video_url || '',
                    video_file: response.data.video_file || '',
                    author: response.data.author || 'Admin',
                    category: response.data.category || '',
                    tags: response.data.tags || '',
                    status: response.data.status ?? 1,
                    featured: response.data.featured ?? 0,
                });
            }
        } catch (error) {
            toast.error('Failed to fetch blog');
            navigate('/admin/blogs');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;

        setFormData((prev) => ({ ...prev, [name]: newValue }));

        // Auto-generate slug from title
        if (name === 'title') {
            const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            setFormData((prev) => ({ ...prev, slug }));
        }
    };

    // Handle image upload
    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            toast.error('Invalid file type. Allowed: JPG, PNG, GIF, WEBP');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image too large. Max size: 5MB');
            return;
        }

        setUploading((prev) => ({ ...prev, image: true }));
        try {
            const formDataUpload = new FormData();
            formDataUpload.append('image', file);

            const response = await axios.post(`${API_URL}/upload.php`, formDataUpload, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                setFormData((prev) => ({ ...prev, featured_image: response.data.url }));
                toast.success('Image uploaded successfully');
            } else {
                toast.error(response.data.error || 'Upload failed');
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to upload image');
        } finally {
            setUploading((prev) => ({ ...prev, image: false }));
            if (imageInputRef.current) imageInputRef.current.value = '';
        }
    };

    // Handle video upload
    const handleVideoUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo'];
        if (!allowedTypes.includes(file.type)) {
            toast.error('Invalid video format. Allowed: MP4, WebM, OGG, MOV, AVI');
            return;
        }

        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > MAX_VIDEO_SIZE_MB) {
            toast.error(`Video too large (${fileSizeMB.toFixed(1)}MB). Max size: ${MAX_VIDEO_SIZE_MB}MB`);
            return;
        }

        setUploading((prev) => ({ ...prev, video: true }));
        setUploadProgress(0);

        try {
            const formDataUpload = new FormData();
            formDataUpload.append('video', file);

            const response = await axios.post(`${API_URL}/upload-video.php`, formDataUpload, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(progress);
                },
            });

            if (response.data.success) {
                setFormData((prev) => ({ ...prev, video_file: response.data.url }));
                toast.success(`Video uploaded successfully (${response.data.size})`);
            } else {
                toast.error(response.data.error || 'Video upload failed');
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to upload video');
        } finally {
            setUploading((prev) => ({ ...prev, video: false }));
            setUploadProgress(0);
            if (videoInputRef.current) videoInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title) {
            toast.error('Please enter a title');
            return;
        }

        const payload = {
            title: formData.title,
            excerpt: formData.excerpt,
            content: formData.content,
            featured_image: formData.featured_image || null,
            video_url: formData.video_url || null,
            video_file: formData.video_file || null,
            author: formData.author,
            category: formData.category || null,
            tags: formData.tags || null,
            featured: formData.featured ? 1 : 0,
            status: formData.status ? 1 : 0,
        };

        setLoading(true);
        try {
            if (isEdit) {
                await updateBlog(id, payload);
                toast.success('Blog updated successfully');
            } else {
                await createBlog(payload);
                toast.success('Blog created successfully');
            }
            navigate('/admin/blogs');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to save blog');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEdit) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <IconButton onClick={() => navigate('/admin/blogs')}><ArrowBack /></IconButton>
                <Box>
                    <Typography variant="h4" fontWeight={700}>{isEdit ? 'Edit Blog Post' : 'Create New Post'}</Typography>
                    <Typography color="text.secondary">{isEdit ? 'Update blog content' : 'Write a new blog article'}</Typography>
                </Box>
            </Box>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={8}>
                        {/* Basic Info */}
                        <Card>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight={600} gutterBottom>Content</Typography>
                                <Divider sx={{ mb: 3 }} />
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Blog Title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Slug"
                                            name="slug"
                                            value={formData.slug}
                                            onChange={handleChange}
                                            helperText="URL-friendly name (auto-generated)"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Category</InputLabel>
                                            <Select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                label="Category"
                                            >
                                                <MenuItem value="">None</MenuItem>
                                                {categories.map((cat) => (
                                                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Excerpt (Short Description)"
                                            name="excerpt"
                                            value={formData.excerpt}
                                            onChange={handleChange}
                                            multiline
                                            rows={2}
                                            helperText="Brief summary shown in blog listings"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2" gutterBottom>Full Content</Typography>
                                        <ReactQuill
                                            theme="snow"
                                            value={formData.content}
                                            onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
                                            style={{ height: 300, marginBottom: 50 }}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Video Section */}
                        <Card sx={{ mt: 3 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PlayCircle color="error" /> Video Content
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                                    Add a video to your blog post. You can either upload a video file (max {MAX_VIDEO_SIZE_MB}MB) or use a video URL (YouTube, Vimeo, etc.)
                                </Typography>
                                <Divider sx={{ mb: 3 }} />

                                <Grid container spacing={3}>
                                    {/* Video URL */}
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Video URL (YouTube, Vimeo, etc.)"
                                            name="video_url"
                                            value={formData.video_url}
                                            onChange={handleChange}
                                            placeholder="https://www.youtube.com/watch?v=..."
                                            InputProps={{
                                                startAdornment: <LinkIcon color="action" sx={{ mr: 1 }} />,
                                            }}
                                            helperText="Paste a video link from YouTube, Vimeo, or other platforms"
                                        />
                                    </Grid>

                                    {/* Video Upload */}
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2" gutterBottom>Or Upload Video File</Typography>
                                        <input
                                            type="file"
                                            ref={videoInputRef}
                                            accept="video/mp4,video/webm,video/ogg,video/quicktime,video/x-msvideo"
                                            onChange={handleVideoUpload}
                                            style={{ display: 'none' }}
                                        />
                                        <Button
                                            variant="outlined"
                                            startIcon={uploading.video ? <CircularProgress size={20} /> : <CloudUpload />}
                                            onClick={() => videoInputRef.current?.click()}
                                            disabled={uploading.video}
                                            sx={{ mb: 2 }}
                                        >
                                            {uploading.video ? `Uploading... ${uploadProgress}%` : 'Upload Video (Max 50MB)'}
                                        </Button>

                                        {uploading.video && (
                                            <Box sx={{ mt: 1, mb: 2 }}>
                                                <LinearProgress variant="determinate" value={uploadProgress} />
                                            </Box>
                                        )}

                                        {formData.video_file && (
                                            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <PlayCircle color="error" />
                                                        <Typography variant="body2">Video uploaded successfully</Typography>
                                                    </Box>
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() => setFormData((prev) => ({ ...prev, video_file: '' }))}
                                                    >
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                                <video
                                                    src={formData.video_file}
                                                    controls
                                                    style={{ width: '100%', maxHeight: 300, marginTop: 12, borderRadius: 8 }}
                                                />
                                            </Box>
                                        )}
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right Sidebar */}
                    <Grid item xs={12} lg={4}>
                        {/* Publish Card */}
                        <Card>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight={600} gutterBottom>Publish</Typography>
                                <Divider sx={{ mb: 3 }} />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            name="status"
                                            checked={formData.status === 1}
                                            onChange={handleChange}
                                            color="primary"
                                        />
                                    }
                                    label="Active (Published)"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            name="featured"
                                            checked={formData.featured === 1}
                                            onChange={handleChange}
                                            color="primary"
                                        />
                                    }
                                    label="Featured Post"
                                />
                                <Box sx={{ mt: 3 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        startIcon={<Save />}
                                        disabled={loading}
                                        fullWidth
                                    >
                                        {loading ? 'Saving...' : isEdit ? 'Update Post' : 'Publish Post'}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Author & Tags */}
                        <Card sx={{ mt: 3 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight={600} gutterBottom>Details</Typography>
                                <Divider sx={{ mb: 3 }} />
                                <TextField
                                    fullWidth
                                    label="Author"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Tags"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    helperText="Comma-separated tags"
                                    placeholder="farming, investment, tips"
                                />
                            </CardContent>
                        </Card>

                        {/* Featured Image */}
                        <Card sx={{ mt: 3 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight={600} gutterBottom>Featured Image</Typography>
                                <Divider sx={{ mb: 2 }} />

                                <input
                                    type="file"
                                    ref={imageInputRef}
                                    accept="image/jpeg,image/png,image/gif,image/webp"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    startIcon={uploading.image ? <CircularProgress size={20} /> : <CloudUpload />}
                                    onClick={() => imageInputRef.current?.click()}
                                    disabled={uploading.image}
                                    sx={{ mb: 2 }}
                                    size="small"
                                >
                                    {uploading.image ? 'Uploading...' : 'Upload Image'}
                                </Button>

                                <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', '&:hover .delete-btn': { opacity: 1 } }}>
                                    <img
                                        src={formData.featured_image || DEFAULT_IMAGE}
                                        alt="Featured"
                                        style={{ width: '100%', height: 150, objectFit: 'cover' }}
                                        onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
                                    />
                                    {formData.featured_image && (
                                        <IconButton
                                            className="delete-btn"
                                            sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'error.main', color: 'white', opacity: 0, transition: 'opacity 0.2s', '&:hover': { bgcolor: 'error.dark' } }}
                                            size="small"
                                            onClick={() => setFormData((prev) => ({ ...prev, featured_image: '' }))}
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default BlogForm;
