import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, Chip, TextField, InputAdornment,
  IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Grid, Tabs, Tab,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Search, Visibility, Delete, Email, CheckCircle, AccessTime, Reply } from '@mui/icons-material';
import { getContacts, updateContactStatus, deleteContact } from '../services/api';
import toast from 'react-hot-toast';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState('all');
  const [viewDialog, setViewDialog] = useState({ open: false, contact: null });

  useEffect(() => { fetchContacts(); }, []);

  const fetchContacts = async () => {
    try {
      const response = await getContacts();
      setContacts(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await updateContactStatus(id, 'read');
      toast.success('Marked as read');
      fetchContacts();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteContact(id);
        toast.success('Message deleted');
        fetchContacts();
        setViewDialog({ open: false, contact: null });
      } catch (error) {
        toast.error('Failed to delete message');
      }
    }
  };

  const getStatusChip = (status) => {
    if (status === 'read') return <Chip icon={<CheckCircle fontSize="small" />} label="Read" size="small" color="success" />;
    return <Chip icon={<AccessTime fontSize="small" />} label="Unread" size="small" color="warning" />;
  };

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch = c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || c.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = tabValue === 'all' || (tabValue === 'unread' && c.status !== 'read') || (tabValue === 'read' && c.status === 'read');
    return matchesSearch && matchesTab;
  });

  const columns = [
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'phone', headerName: 'Phone', width: 140 },
    { field: 'subject', headerName: 'Subject', flex: 1, minWidth: 200 },
    { field: 'status', headerName: 'Status', width: 100, renderCell: (params) => getStatusChip(params.value) },
    { field: 'created_at', headerName: 'Date', width: 120, renderCell: (params) => new Date(params.value).toLocaleDateString() },
    { field: 'actions', headerName: 'Actions', width: 120, sortable: false, renderCell: (params) => (
      <Box>
        <Tooltip title="View"><IconButton size="small" color="primary" onClick={() => { setViewDialog({ open: true, contact: params.row }); if (params.row.status !== 'read') handleMarkAsRead(params.row.id); }}><Visibility /></IconButton></Tooltip>
        <Tooltip title="Delete"><IconButton size="small" color="error" onClick={() => handleDelete(params.row.id)}><Delete /></IconButton></Tooltip>
      </Box>
    )},
  ];

  const tabCounts = { all: contacts.length, unread: contacts.filter((c) => c.status !== 'read').length, read: contacts.filter((c) => c.status === 'read').length };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Contact Messages</Typography>
        <Typography color="text.secondary">View and manage contact form submissions</Typography>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
              <Tab label={`All (${tabCounts.all})`} value="all" />
              <Tab label={`Unread (${tabCounts.unread})`} value="unread" />
              <Tab label={`Read (${tabCounts.read})`} value="read" />
            </Tabs>
            <TextField placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} size="small" sx={{ width: 250 }} InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }} />
          </Box>
          <DataGrid rows={filteredContacts} columns={columns} pageSize={10} autoHeight disableSelectionOnClick loading={loading} sx={{ border: 'none' }} />
        </CardContent>
      </Card>

      <Dialog open={viewDialog.open} onClose={() => setViewDialog({ open: false, contact: null })} maxWidth="md" fullWidth>
        <DialogTitle>Message Details</DialogTitle>
        <DialogContent>
          {viewDialog.contact && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}><Typography variant="subtitle2" color="text.secondary">Name</Typography><Typography fontWeight={500}>{viewDialog.contact.name}</Typography></Grid>
              <Grid item xs={12} md={6}><Typography variant="subtitle2" color="text.secondary">Status</Typography><Box sx={{ mt: 0.5 }}>{getStatusChip(viewDialog.contact.status)}</Box></Grid>
              <Grid item xs={12} md={6}><Typography variant="subtitle2" color="text.secondary">Email</Typography><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Email fontSize="small" color="primary" /><Typography>{viewDialog.contact.email}</Typography></Box></Grid>
              <Grid item xs={12} md={6}><Typography variant="subtitle2" color="text.secondary">Phone</Typography><Typography>{viewDialog.contact.phone || 'N/A'}</Typography></Grid>
              <Grid item xs={12}><Typography variant="subtitle2" color="text.secondary">Subject</Typography><Typography fontWeight={500}>{viewDialog.contact.subject || 'No Subject'}</Typography></Grid>
              <Grid item xs={12}><Typography variant="subtitle2" color="text.secondary">Message</Typography><Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2, mt: 1, whiteSpace: 'pre-wrap' }}><Typography>{viewDialog.contact.message}</Typography></Box></Grid>
              <Grid item xs={12}><Typography variant="subtitle2" color="text.secondary">Received On</Typography><Typography>{new Date(viewDialog.contact.created_at).toLocaleString()}</Typography></Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="error" startIcon={<Delete />} onClick={() => handleDelete(viewDialog.contact?.id)}>Delete</Button>
          <Button variant="contained" startIcon={<Reply />} onClick={() => window.open(`mailto:${viewDialog.contact?.email}`)}>Reply via Email</Button>
          <Button onClick={() => setViewDialog({ open: false, contact: null })}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Contacts;
