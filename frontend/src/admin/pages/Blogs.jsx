import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Box, Card, CardContent, Typography, Button, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
    Chip, Avatar, TextField, InputAdornment, Dialog, DialogTitle,
    DialogContent, DialogActions, CircularProgress,
} from '@mui/material';
import { Add, Edit, Delete, Search, Visibility, VisibilityOff, PlayCircle } from '@mui/icons-material';
import { getBlogs, deleteBlog } from '../services/api';
import toast from 'react-hot-toast';

const Blogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null, title: '' });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await getBlogs(true);
            setBlogs(response.data || []);
        } catch (error) {
            toast.error('Failed to fetch blogs');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteBlog(deleteDialog.id);
            toast.success('Blog deleted successfully');
            setDeleteDialog({ open: false, id: null, title: '' });
            fetchBlogs();
        } catch (error) {
            toast.error('Failed to delete blog');
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.category && blog.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" fontWeight={700}>Blog Posts</Typography>
                    <Typography color="text.secondary">Manage your blog content and videos</Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => navigate('/admin/blogs/create')}
                >
                    New Post
                </Button>
            </Box>

            {/* Search */}
            <Card sx={{ mb: 3 }}>
                <CardContent sx={{ py: 2 }}>
                    <TextField
                        fullWidth
                        placeholder="Search blogs by title or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search color="action" />
                                </InputAdornment>
                            ),
                        }}
                        size="small"
                    />
                </CardContent>
            </Card>

            {/* Blog Table */}
            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'grey.50' }}>
                            <TableCell sx={{ fontWeight: 600 }}>Blog Post</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Media</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Views</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredBlogs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                                    <Typography color="text.secondary">No blog posts found</Typography>
                                    <Button
                                        variant="outlined"
                                        startIcon={<Add />}
                                        onClick={() => navigate('/admin/blogs/create')}
                                        sx={{ mt: 2 }}
                                    >
                                        Create First Post
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredBlogs.map((blog) => (
                                <TableRow key={blog.id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar
                                                src={blog.featured_image}
                                                variant="rounded"
                                                sx={{ width: 56, height: 56 }}
                                            >
                                                📝
                                            </Avatar>
                                            <Box>
                                                <Typography fontWeight={600} noWrap sx={{ maxWidth: 250 }}>
                                                    {blog.title}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 250, display: 'block' }}>
                                                    {blog.excerpt?.substring(0, 60)}...
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {blog.category ? (
                                            <Chip label={blog.category} size="small" />
                                        ) : (
                                            <Typography variant="caption" color="text.secondary">—</Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                                            {blog.featured_image && (
                                                <Chip label="Image" size="small" color="info" variant="outlined" />
                                            )}
                                            {(blog.video_url || blog.video_file) && (
                                                <Chip
                                                    icon={<PlayCircle fontSize="small" />}
                                                    label="Video"
                                                    size="small"
                                                    color="error"
                                                    variant="outlined"
                                                />
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{blog.view_count || 0}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            icon={blog.status === 1 ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                                            label={blog.status === 1 ? 'Active' : 'Draft'}
                                            size="small"
                                            color={blog.status === 1 ? 'success' : 'default'}
                                        />
                                        {blog.featured === 1 && (
                                            <Chip label="Featured" size="small" color="warning" sx={{ ml: 0.5 }} />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{formatDate(blog.created_at)}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)}
                                        >
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => setDeleteDialog({ open: true, id: blog.id, title: blog.title })}
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Delete Dialog */}
            <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, id: null, title: '' })}>
                <DialogTitle>Delete Blog Post</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete "<strong>{deleteDialog.title}</strong>"? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog({ open: false, id: null, title: '' })}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Blogs;
