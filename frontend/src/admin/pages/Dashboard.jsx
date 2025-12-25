import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip, Avatar,
  IconButton, Tooltip,
} from '@mui/material';
import {
  TrendingUp, People, Category, ContactMail, Visibility,
  CheckCircle, Pending, Cancel,
} from '@mui/icons-material';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, ArcElement, Title, Tooltip as ChartTooltip, Legend, Filler,
} from 'chart.js';
import { getServices, getCategories, getServiceInquiries, getContacts } from '../services/api';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  ArcElement, Title, ChartTooltip, Legend, Filler
);

const StatCard = ({ title, value, icon, color, trend }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="text.secondary" variant="body2" fontWeight={500}>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={700} sx={{ my: 1 }}>
            {value}
          </Typography>
          {trend !== undefined && (
            <Typography variant="caption" color={trend > 0 ? 'success.main' : 'error.main'}>
              {trend > 0 ? '+' : ''}{trend}% from last month
            </Typography>
          )}
        </Box>
        <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.main`, width: 56, height: 56 }}>
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ services: 0, categories: 0, inquiries: 0, contacts: 0 });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [inquiryStats, setInquiryStats] = useState({ pending: 0, approved: 0, rejected: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, categoriesRes, inquiriesRes, contactsRes] = await Promise.all([
          getServices(), getCategories(), getServiceInquiries(), getContacts(),
        ]);

        setStats({
          services: servicesRes.data?.length || 0,
          categories: categoriesRes.data?.length || 0,
          inquiries: inquiriesRes.data?.length || 0,
          contacts: contactsRes.data?.length || 0,
        });

        const inquiries = inquiriesRes.data || [];
        setRecentInquiries(inquiries.slice(0, 5));

        setInquiryStats({
          pending: inquiries.filter((i) => i.status === 'pending').length,
          approved: inquiries.filter((i) => i.status === 'approved').length,
          rejected: inquiries.filter((i) => i.status === 'rejected').length,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Inquiries',
      data: [12, 19, 15, 25, 22, 30],
      borderColor: '#16a34a',
      backgroundColor: 'rgba(22, 163, 74, 0.1)',
      fill: true,
      tension: 0.4,
    }],
  };

  const doughnutData = {
    labels: ['Pending', 'Approved', 'Rejected'],
    datasets: [{
      data: [inquiryStats.pending, inquiryStats.approved, inquiryStats.rejected],
      backgroundColor: ['#fbbf24', '#22c55e', '#ef4444'],
      borderWidth: 0,
    }],
  };

  const getStatusChip = (status) => {
    const config = {
      pending: { icon: <Pending fontSize="small" />, color: 'warning' },
      approved: { icon: <CheckCircle fontSize="small" />, color: 'success' },
      rejected: { icon: <Cancel fontSize="small" />, color: 'error' },
    }[status] || { icon: <Pending fontSize="small" />, color: 'warning' };
    
    return <Chip icon={config.icon} label={status?.charAt(0).toUpperCase() + status?.slice(1)} size="small" color={config.color} />;
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>Dashboard</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Welcome back! Here's what's happening with your platform.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Services" value={stats.services} icon={<Category />} color="primary" trend={12} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Categories" value={stats.categories} icon={<TrendingUp />} color="secondary" trend={5} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Service Inquiries" value={stats.inquiries} icon={<People />} color="warning" trend={18} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Contact Messages" value={stats.contacts} icon={<ContactMail />} color="info" trend={-3} />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Inquiry Trends</Typography>
              <Box sx={{ height: 300 }}>
                <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Inquiry Status</Typography>
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Doughnut data={doughnutData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } }, cutout: '70%' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>Recent Service Inquiries</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Investment</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentInquiries.length === 0 ? (
                  <TableRow><TableCell colSpan={6} align="center">No inquiries yet</TableCell></TableRow>
                ) : (
                  recentInquiries.map((inquiry) => (
                    <TableRow key={inquiry.id} hover>
                      <TableCell>{inquiry.full_name}</TableCell>
                      <TableCell>{inquiry.email}</TableCell>
                      <TableCell>{inquiry.service_name || 'N/A'}</TableCell>
                      <TableCell>₹{inquiry.investment_amount?.toLocaleString()}</TableCell>
                      <TableCell>{getStatusChip(inquiry.status)}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="View Details">
                          <IconButton size="small" color="primary"><Visibility /></IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
