// // import { useEffect, useMemo, useState } from 'react';
// // import { useAuth } from '../contexts/AuthContext';
// // import { Button } from '../components/ui/button';
// // import { Input } from '../components/ui/input';
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
// // import { Badge } from '../components/ui/badge';
// // import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
// // import { Calendar } from '../components/ui/calendar';
// // import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
// // import {
// //   Table, TableBody, TableCell, TableHead, TableHeader, TableRow
// // } from '../components/ui/table';
// // import { cn } from '../lib/utils';
// // import { format } from 'date-fns';
// // import {
// //   Clock, Calendar as CalendarIcon, UserCheck, UserX, Search,
// //   Filter, Download, TrendingUp, CheckCircle, XCircle, AlertCircle
// // } from 'lucide-react';
// // import { toast } from 'react-toastify';
// // import axios from 'axios';
// // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// // const Attendance = () => {

// //     const wrapperStyle = {
// //     paddingBottom: "20px",
// //     marginTop: "20px"
// //   };

// //   const statCardsContainerStyle = {
// //     alignItems: "stretch",
// //   };

// //   const marginStyle = {
// //     marginBottom: "10px"
// //   };

// //   const buttonStyle = {
// //     width: "200px"
// //   };

// //   const { user, isHR } = useAuth();
// //   const [selectedDate, setSelectedDate] = useState(new Date());
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [filterStatus, setFilterStatus] = useState('all');
// //   const [viewMode, setViewMode] = useState('today'); // 'today', 'week', 'month'
// //   const API_BASE = API_URL;
// //   const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

// //   const [attendanceRecords, setAttendanceRecords] = useState([]); // HR date-based list
// //   const [attendanceStats, setAttendanceStats] = useState(null);
// //   const [userAttendance, setUserAttendance] = useState([]); // Employee history
// //   const [loading, setLoading] = useState(false);

// //   const isoDate = (d) => {
// //     // local YYYY-MM-DD (avoid timezone-induced off-by-one)
// //     try {
// //       const dd = new Date(d);
// //       const y = dd.getFullYear();
// //       const m = String(dd.getMonth() + 1).padStart(2, '0');
// //       const day = String(dd.getDate()).padStart(2, '0');
// //       return `${y}-${m}-${day}`;
// //     } catch (e) {
// //       return String(d).slice(0,10);
// //     }
// //   };

// //   // Normalize a record.date into YYYY-MM-DD without timezone ambiguity.
// //   const normalizeRecordDate = (recDate) => {
// //     if (!recDate && recDate !== 0) return null;
// //     // If it's already a YYYY-MM-DD string, return as-is
// //     if (typeof recDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(recDate)) return recDate;
// //     // Otherwise, fall back to isoDate which formats local date
// //     return isoDate(recDate);
// //   };

// //   // Loading flags for requests to avoid double clicks
// //   const [checkInLoading, setCheckInLoading] = useState(false);
// //   const [checkOutLoading, setCheckOutLoading] = useState(false);

// //   const fetchByDate = async (dateObj) => {
// //     if (!token || !isHR) return;
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(`${API_BASE}/api/attendance`, {
// //         params: { date: isoDate(dateObj) },
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //   setAttendanceRecords(Array.isArray(res.data?.data) ? res.data.data : []);
// //   setAttendanceStats(res.data?.stats || null);
// //     } catch (err) {
// //       console.error(err);
// //       toast.error(err.response?.data?.message || 'Failed to load attendance');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchMyHistory = async () => {
// //     if (!token) return;
// //     try {
// //       const res = await axios.get(`${API_BASE}/api/attendance/me`, {
// //         params: { limit: 30 },
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setUserAttendance(Array.isArray(res.data?.data) ? res.data.data : []);
// //     } catch (err) {
// //       console.error(err);
// //       // non-blocking
// //     }
// //   };

// //   const refreshStats = async (dateObj) => {
// //     // Only HR needs org-wide stats
// //     if (!token || !isHR) return;
// //     try {
// //       const res = await axios.get(`${API_BASE}/api/attendance/stats`, {
// //         params: { date: isoDate(dateObj || selectedDate) },
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       if (res.data?.stats) setAttendanceStats(res.data.stats);
// //     } catch (err) {
// //       // non-blocking
// //     }
// //   };

// //   useEffect(() => {
// //     if (isHR) fetchByDate(selectedDate);
// //     fetchMyHistory();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [isHR, token]);

// //   useEffect(() => {
// //     if (isHR) fetchByDate(selectedDate);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [selectedDate]);

// //   const filteredRecords = attendanceRecords.filter(record => {
// //     const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                          record.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                          record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
// //     const matchesFilter = filterStatus === 'all' || record.status === filterStatus;
// //     return matchesSearch && matchesFilter;
// //   });

// //   const getStatusBadge = (status) => {
// //     switch (status) {
// //       case 'present':
// //         return (
// //           <Badge variant="default" className="bg-success text-success-foreground">
// //             <CheckCircle className="w-3 h-3 mr-1" />
// //             Present
// //           </Badge>
// //         );
// //       case 'absent':
// //         return (
// //           <Badge variant="destructive">
// //             <XCircle className="w-3 h-3 mr-1" />
// //             Absent
// //           </Badge>
// //         );
// //       case 'late':
// //         return (
// //           <Badge variant="secondary" className="bg-warning text-warning-foreground">
// //             <AlertCircle className="w-3 h-3 mr-1" />
// //             Late
// //           </Badge>
// //         );
// //       case 'leave':
// //         return (
// //           <Badge variant="outline">
// //             <Calendar className="w-3 h-3 mr-1" />
// //             On Leave
// //           </Badge>
// //         );
// //       default:
// //         return <Badge variant="outline">{status}</Badge>;
// //     }
// //   };

// //   const handleMarkAttendance = async () => {
// //     if (checkInLoading) return;
// //     setCheckInLoading(true);
// //     try {
// //       const res = await axios.post(`${API_BASE}/api/attendance/check-in`, { location: 'Office' }, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       toast.success('Attendance marked successfully!');
// //       const newRec = res.data?.data;
// //       const today = isoDate(new Date());
// //       if (newRec) {
// //         setUserAttendance(prev => {
// //           try {
// //             const idx = prev.findIndex(r => normalizeRecordDate(r?.date) === today);
// //             if (idx !== -1) {
// //               const copy = [...prev];
// //               copy[idx] = { ...copy[idx], ...newRec };
// //               return copy;
// //             }
// //             return [newRec, ...prev];
// //           } catch (e) { return prev; }
// //         });
// //         setCheckedOutToday(!!(newRec.checkOut));
// //       } else {
// //         await fetchMyHistory();
// //       }
// //       // server-side activity will create the activity; no client post to avoid duplicates
// //       if (isHR) {
// //         fetchByDate(selectedDate);
// //         await refreshStats(selectedDate);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       toast.error(err.response?.data?.message || 'Failed to mark attendance');
// //     } finally {
// //       setCheckInLoading(false);
// //     }
// //   };

// //   const handleCheckOut = async () => {
// //     if (checkOutLoading) return;
// //     setCheckOutLoading(true);
// //     try {
// //       const res = await axios.post(`${API_BASE}/api/attendance/check-out`, {}, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       toast.success('Checked out successfully!');
// //       const updated = res.data?.data;
// //       const today = isoDate(new Date());
// //       if (updated) {
// //         setUserAttendance(prev => {
// //           try {
// //             const idx = prev.findIndex(r => normalizeRecordDate(r?.date) === today);
// //             if (idx !== -1) {
// //               const copy = [...prev];
// //               copy[idx] = { ...copy[idx], ...updated };
// //               return copy;
// //             }
// //             return [updated, ...prev];
// //           } catch (e) { return prev; }
// //         });
// //         setCheckedOutToday(true);
// //       } else {
// //         await fetchMyHistory();
// //       }
// //       // server-side activity will create the activity; no client post to avoid duplicates
// //       if (isHR) {
// //         fetchByDate(selectedDate);
// //         await refreshStats(selectedDate);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       toast.error(err.response?.data?.message || 'Failed to check out');
// //     } finally {
// //       setCheckOutLoading(false);
// //     }
// //   };

// //   // Personal today's status for non-HR user
// //   const myTodayStatus = useMemo(() => {
// //     const todayStrLocal = isoDate(selectedDate);
// //     const rec = userAttendance.find(r => normalizeRecordDate(r?.date) === todayStrLocal);
// //     return rec?.status || 'absent';
// //   }, [userAttendance, selectedDate]);

// //   const todayStats = useMemo(() => {
// //     if (isHR) {
// //       return (
// //         attendanceStats || {
// //           present: attendanceRecords.filter(r => r.status === 'present').length,
// //           absent: attendanceRecords.filter(r => r.status === 'absent').length,
// //           late: attendanceRecords.filter(r => r.status === 'late').length,
// //           leave: attendanceRecords.filter(r => r.status === 'leave').length,
// //           total: attendanceRecords.length
// //         }
// //       );
// //     }
// //     return {
// //       present: myTodayStatus === 'present' ? 1 : 0,
// //       late: myTodayStatus === 'late' ? 1 : 0,
// //       leave: myTodayStatus === 'leave' ? 1 : 0,
// //       absent: myTodayStatus === 'absent' ? 1 : 0,
// //       total: 1
// //     };
// //   }, [isHR, attendanceStats, attendanceRecords, myTodayStatus]);

// //   const attendanceRate = ((todayStats.present + todayStats.late) / todayStats.total * 100).toFixed(1);

// //   // --- Weekly summary for Employee view ---
// //   const getWeekBounds = (d) => {
// //     const date = new Date(d);
// //     const day = date.getDay(); // 0=Sun,1=Mon,...
// //     const diffToMonday = (day + 6) % 7; // days since Monday
// //     const start = new Date(date);
// //     start.setDate(date.getDate() - diffToMonday);
// //     start.setHours(0, 0, 0, 0);
// //     const end = new Date(start);
// //     end.setDate(start.getDate() + 6);
// //     end.setHours(23, 59, 59, 999);
// //     return { start, end };
// //   };

// //   const parseWorkingMinutes = (s) => {
// //     if (!s || typeof s !== 'string') return 0;
// //     const m = s.match(/(\d+)h\s+(\d{1,2})m/);
// //     if (!m) return 0;
// //     const h = parseInt(m[1], 10);
// //     const mm = parseInt(m[2], 10);
// //     return (isNaN(h) || isNaN(mm)) ? 0 : (h * 60 + mm);
// //   };

// //   const minutesToHoursStr = (mins) => {
// //     const h = Math.floor(mins / 60);
// //     const m = mins % 60;
// //     return `${h}h ${String(m).padStart(2, '0')}m`;
// //   };

// //   const minutesTo12h = (mins) => {
// //     if (mins === null || mins === undefined) return '--';
// //     let h = Math.floor(mins / 60);
// //     const m = mins % 60;
// //     const ampm = h >= 12 ? 'PM' : 'AM';
// //     let hour12 = h % 12;
// //     if (hour12 === 0) hour12 = 12;
// //     return `${hour12}:${String(m).padStart(2, '0')} ${ampm}`;
// //   };

// //   const weekly = useMemo(() => {
// //     // Current week (Mon-Sun), capped at today
// //     const today = new Date();
// //     const { start, end } = getWeekBounds(today);
// //     const capEnd = new Date(Math.min(end.getTime(), today.getTime()));
// //     capEnd.setHours(23, 59, 59, 999);

// //     // Eligible working days: Mon-Fri up to capEnd
// //     let totalDays = 0;
// //     {
// //       const iter = new Date(start);
// //       while (iter <= capEnd) {
// //         const wd = iter.getDay();
// //         if (wd >= 1 && wd <= 5) totalDays += 1; // Mon-Fri
// //         iter.setDate(iter.getDate() + 1);
// //       }
// //     }

// //     // Filter my records within week bounds
// //     const weekRecords = userAttendance.filter(r => {
// //       const d = new Date(r.date);
// //       return d >= start && d <= capEnd;
// //     });

// //     const daysPresent = weekRecords.filter(r => r.status === 'present' || r.status === 'late').length;
// //     const totalMinutes = weekRecords.reduce((acc, r) => acc + parseWorkingMinutes(r.workingHours || r.hours), 0);

// //     // Average check-in (over records that have checkIn)
// //     const checkIns = weekRecords
// //       .map(r => r.checkIn)
// //       .filter(Boolean)
// //       .map(t => {
// //         const [hh, mm] = String(t).split(':').map(Number);
// //         if (isNaN(hh) || isNaN(mm)) return null;
// //         return hh * 60 + mm;
// //       })
// //       .filter(v => v !== null);
// //     const avgCheckInMins = checkIns.length ? Math.round(checkIns.reduce((a, b) => a + b, 0) / checkIns.length) : null;

// //     const attendanceRate = totalDays > 0 ? Math.round((daysPresent / totalDays) * 100) : 0;

// //     return {
// //       daysPresent,
// //       totalDays,
// //       totalHours: minutesToHoursStr(totalMinutes),
// //       avgCheckIn: minutesTo12h(avgCheckInMins),
// //       attendanceRate,
// //     };
// //   }, [userAttendance]);

// //   // Helpers for button states (today)
// //   const todayStr = isoDate(new Date());
// //   const todayRec = useMemo(() => userAttendance.find(r => normalizeRecordDate(r?.date) === todayStr), [userAttendance, todayStr]);

// //   // Track if checked out today for button color
// //   const [checkedOutToday, setCheckedOutToday] = useState(false);
// //   useEffect(() => {
// //     setCheckedOutToday(!!(todayRec && todayRec.checkOut));
// //   }, [todayRec]);

// //   const canCheckIn = !todayRec || !todayRec.checkIn;
// //   const canCheckOut = !!(todayRec && todayRec.checkIn && !todayRec.checkOut);

// //   return (
// //     <div className="container mx-auto p-6 space-y-6">
// //       {/* Header */}
// //       <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
// //         <div>
// //           <h1 className="text-3xl font-bold text-foreground">
// //             {isHR ? 'Attendance Management' : 'My Attendance'}
// //           </h1>
// //           <p className="text-muted-foreground">
// //             {isHR ? 'Monitor and manage employee attendance' : 'Track your attendance and working hours'}
// //           </p>
// //         </div>
// //         {isHR ? (
// //           <div className="flex gap-2">
// //             <Button onClick={handleMarkAttendance} className="btn-gradient" disabled={!canCheckIn} title={canCheckIn ? 'Mark my check-in' : 'Already checked in today'}>
// //               <Clock className="w-4 h-4 mr-2" />
// //               My Check-in
// //             </Button>
// //             <Button
// //               onClick={handleCheckOut}
// //               className={checkedOutToday ? 'btn-gradient' : 'btn-outline'}
// //               disabled={!canCheckOut}
// //               title={canCheckOut ? 'Mark my check-out' : 'Check-in first or already checked out'}
// //             >
// //               <Clock className="w-4 h-4 mr-2" />
// //               My Check-out
// //             </Button>
// //           </div>
// //         ) : (
// //           <Button style={buttonStyle} onClick={handleMarkAttendance} className="btn-gradient" disabled={!canCheckIn} title={canCheckIn ? 'Mark your check-in' : 'You already checked in today'}>
// //             <Clock className="w-4 h-4 mr-2" />
// //             Mark Attendance
// //           </Button>
// //         )}
// //       </div>

// //       {/* Stats Cards */}
// //       <div style={wrapperStyle} className="flex flex-wrap gap-4 mb-5">
// //         <div style={statCardsContainerStyle} className="flex-1 min-w-[200px] sm:min-w-[220px] md:min-w-[240px]">
// //           <Card className="dashboard-card">
// //             <CardContent className="p-4">
// //               <div className="flex items-center space-x-2">
// //                 <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
// //                   <CheckCircle className="w-4 h-4 text-success" />
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-muted-foreground">Present</p>
// //                   <p className="text-xl font-bold">{todayStats.present}</p>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>
// //         <div style={statCardsContainerStyle} className="flex-1 min-w-[200px] sm:min-w-[220px] md:min-w-[240px]">
// //           <Card className="dashboard-card">
// //             <CardContent className="p-4">
// //               <div className="flex items-center space-x-2">
// //                 <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
// //                   <XCircle className="w-4 h-4 text-destructive" />
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-muted-foreground">Absent</p>
// //                   <p className="text-xl font-bold">{todayStats.absent}</p>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>
// //         <div style={statCardsContainerStyle} className="flex-1 min-w-[200px] sm:min-w-[220px] md:min-w-[240px]">
// //           <Card className="dashboard-card">
// //             <CardContent className="p-4">
// //               <div className="flex items-center space-x-2">
// //                 <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
// //                   <AlertCircle className="w-4 h-4 text-warning" />
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-muted-foreground">Late</p>
// //                   <p className="text-xl font-bold">{todayStats.late}</p>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>
// //         <div style={statCardsContainerStyle} className="flex-1 min-w-[200px] sm:min-w-[220px] md:min-w-[240px]">
// //           <Card className="dashboard-card">
// //             <CardContent className="p-4">
// //               <div className="flex items-center space-x-2">
// //                 <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
// //                   <CalendarIcon className="w-4 h-4 text-primary" />
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-muted-foreground">On Leave</p>
// //                   <p className="text-xl font-bold">{todayStats.leave}</p>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>
// //         <div style={statCardsContainerStyle} className="flex-1 min-w-[200px] sm:min-w-[220px] md:min-w-[240px]">
// //           <Card className="dashboard-card">
// //             <CardContent className="p-4">
// //               <div className="flex items-center space-x-2">
// //                 <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
// //                   <TrendingUp className="w-4 h-4 text-primary" />
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-muted-foreground">Rate</p>
// //                   <p className="text-xl font-bold">{attendanceRate}%</p>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>

// //       {isHR ? (
// //         <>
// //           {/* Filters */}
// //           <Card style={marginStyle} className="dashboard-card">
// //             <CardContent className="p-4">
// //               <div className="flex flex-wrap items-center gap-4 mb-5">
// //                 {/* Search Input */}
// //                 <div className="flex-1 min-w-[250px] sm:min-w-[250px] md:min-w-[200px] lg:min-w-[200px]">
// //                   <div className="relative w-full">
// //                     <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// //                     <Input
// //                       placeholder="Search employees..."
// //                       value={searchTerm}
// //                       onChange={(e) => setSearchTerm(e.target.value)}
// //                       className="pl-10 w-full"
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* Filter Status */}
// //                 <div className="flex-1 min-w-[250px] sm:min-w-[250px] md:min-w-[200px] lg:min-w-[200px]">
// //                   <Select value={filterStatus} onValueChange={setFilterStatus}>
// //                     <SelectTrigger className="w-full">
// //                       <Filter className="w-4 h-4 mr-2" />
// //                       <SelectValue placeholder="Filter status" />
// //                     </SelectTrigger>
// //                     <SelectContent>
// //                       <SelectItem value="all">All Status</SelectItem>
// //                       <SelectItem value="present">Present</SelectItem>
// //                       <SelectItem value="absent">Absent</SelectItem>
// //                       <SelectItem value="late">Late</SelectItem>
// //                       <SelectItem value="leave">On Leave</SelectItem>
// //                     </SelectContent>
// //                   </Select>
// //                 </div>

// //                 {/* Date Picker */}
// //                 <div className="flex-1 min-w-[250px] sm:min-w-[250px] md:min-w-[200px] lg:min-w-[200px]">
// //                   <Popover>
// //                     <PopoverTrigger asChild>
// //                       <Button variant="outline" className="w-full">
// //                         <CalendarIcon className="w-4 h-4 mr-2" />
// //                         {format(selectedDate, "PPP")}
// //                       </Button>
// //                     </PopoverTrigger>
// //                     <PopoverContent className="w-auto p-0" align="end">
// //                       <Calendar
// //                         mode="single"
// //                         selected={selectedDate}
// //                         onSelect={setSelectedDate}
// //                         initialFocus
// //                         className="pointer-events-auto"
// //                       />
// //                     </PopoverContent>
// //                   </Popover>
// //                 </div>

// //                 {/* Export Button */}
// //                 <div className="flex-1 min-w-[250px] sm:min-w-[250px] md:min-w-[200px] lg:min-w-[200px]">
// //                   <Button variant="outline" className="w-full">
// //                     <Download className="w-4 h-4 mr-2" />
// //                     Export
// //                   </Button>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* Attendance Table */}
// //           <Card className="data-table">
// //             <CardHeader>
// //               <CardTitle>Today's Attendance</CardTitle>
// //               <CardDescription>Employee attendance for {format(selectedDate, "PPP")}</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <Table>
// //                 <TableHeader>
// //                   <TableRow>
// //                     <TableHead>Employee</TableHead>
// //                     <TableHead>Department</TableHead>
// //                     <TableHead>Check In</TableHead>
// //                     <TableHead>Check Out</TableHead>
// //                     <TableHead>Working Hours</TableHead>
// //                     <TableHead>Location</TableHead>
// //                     <TableHead>Status</TableHead>
// //                   </TableRow>
// //                 </TableHeader>
// //                 <TableBody>
// //                   {loading && (
// //                     <TableRow>
// //                       <TableCell colSpan={7}>
// //                         <p className="text-sm text-muted-foreground">Loading attendance…</p>
// //                       </TableCell>
// //                     </TableRow>
// //                   )}
// //                   {!loading && filteredRecords.map((record) => (
// //                     <TableRow key={record.id}>
// //                       <TableCell>
// //                         <div className="flex items-center space-x-3">
// //                           <Avatar className="w-8 h-8">
// //                             <AvatarImage
// //                               src={
// //                                 record.profileImage ||
// //                                 record.avatar ||
// //                                 `https://ui-avatars.com/api/?name=${encodeURIComponent(record.employeeName)}&background=0D8ABC&color=fff`
// //                               }
// //                               alt={record.employeeName}
// //                             />
// //                             <AvatarFallback>{record.employeeName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
// //                           </Avatar>
// //                           <div>
// //                             <p className="font-medium">{record.employeeName}</p>
// //                             {/* <p className="text-sm text-muted-foreground">{record.employeeId}</p> */}
// //                           </div>
// //                         </div>
// //                       </TableCell>
// //                       <TableCell>{record.department}</TableCell>
// //                       <TableCell>
// //                         {record.checkIn ? (
// //                           <span className="text-success">{record.checkIn}</span>
// //                         ) : (
// //                           <span className="text-muted-foreground">--</span>
// //                         )}
// //                       </TableCell>
// //                       <TableCell>
// //                         {record.checkOut ? (
// //                           <span className="text-success">{record.checkOut}</span>
// //                         ) : record.checkIn ? (
// //                           <span className="text-warning">Working...</span>
// //                         ) : (
// //                           <span className="text-muted-foreground">--</span>
// //                         )}
// //                       </TableCell>
// //                       <TableCell>
// //                         <span className={cn(
// //                           "font-medium",
// //                           record.status === 'present' ? "text-success" :
// //                           record.status === 'late' ? "text-warning" :
// //                           "text-muted-foreground"
// //                         )}>
// //                           {record.workingHours}
// //                         </span>
// //                       </TableCell>
// //                       <TableCell>
// //                         {record.location ? (
// //                           <Badge variant="outline">{record.location}</Badge>
// //                         ) : (
// //                           <span className="text-muted-foreground">--</span>
// //                         )}
// //                       </TableCell>
// //                       <TableCell>{getStatusBadge(record.status)}</TableCell>
// //                     </TableRow>
// //                   ))}
// //                 </TableBody>
// //               </Table>
// //             </CardContent>
// //           </Card>
// //         </>
// //       ) : (
// //         // Employee View
// //         <>
// //           {/* Personal Attendance Card */}
// //           <div style={marginStyle}  className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //             <Card style={marginStyle} className="dashboard-card">
// //               <CardHeader>
// //                 <CardTitle className="flex items-center space-x-2">
// //                   <Clock className="w-5 h-5 text-primary" />
// //                   <span>Today's Status</span>
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div className="space-y-2">
// //                     <p className="text-sm text-muted-foreground">Check In</p>
// //                     <p className="text-2xl font-bold text-success">{
// //                       (todayRec?.checkIn) || '--'
// //                     }</p>
// //                   </div>
// //                   <div className="space-y-2">
// //                     <p className="text-sm text-muted-foreground">Working Hours</p>
// //                     <p className="text-2xl font-bold text-primary">{
// //                       (todayRec?.workingHours) || '0h 00m'
// //                     }</p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
// //                   <div className="flex items-center space-x-2">
// //                     <CheckCircle className="w-5 h-5 text-success" />
// //                     <span className="font-medium">{
// //                       (todayRec?.status || 'Present')
// //                     }</span>
// //                   </div>
// //                   <Badge variant="outline">Office</Badge>
// //                 </div>
// //                 <Button
// //                   style={buttonStyle}
// //                   className={checkedOutToday ? 'btn-gradient w-full' : 'btn-outline w-full'}
// //                   onClick={handleCheckOut}
// //                   disabled={!canCheckOut}
// //                 >
// //                   <Clock className="w-4 h-4 mr-2" />
// //                   Check Out
// //                 </Button>
// //               </CardContent>
// //             </Card>

// //             <Card className="dashboard-card">
// //               <CardHeader>
// //                 <CardTitle className="flex items-center space-x-2">
// //                   <TrendingUp className="w-5 h-5 text-primary" />
// //                   <span>This Week Summary</span>
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div className="space-y-2">
// //                     <p className="text-sm text-muted-foreground">Days Present</p>
// //                     <p className="text-2xl font-bold">{weekly.daysPresent}/{weekly.totalDays}</p>
// //                   </div>
// //                   <div className="space-y-2">
// //                     <p className="text-sm text-muted-foreground">Total Hours</p>
// //                     <p className="text-2xl font-bold">{weekly.totalHours}</p>
// //                   </div>
// //                   <div className="space-y-2">
// //                     <p className="text-sm text-muted-foreground">Avg. Check-in</p>
// //                     <p className="text-lg font-semibold">{weekly.avgCheckIn}</p>
// //                   </div>
// //                   <div className="space-y-2">
// //                     <p className="text-sm text-muted-foreground">Attendance Rate</p>
// //                     <p className="text-lg font-semibold text-success">{weekly.attendanceRate}%</p>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {/* Personal Attendance History */}
// //           <Card className="data-table">
// //             <CardHeader>
// //               <CardTitle>My Attendance History</CardTitle>
// //               <CardDescription>Your recent attendance records</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <Table>
// //                 <TableHeader>
// //                   <TableRow>
// //                     <TableHead>Date</TableHead>
// //                     <TableHead>Check In</TableHead>
// //                     <TableHead>Check Out</TableHead>
// //                     <TableHead>Working Hours</TableHead>
// //                     <TableHead>Status</TableHead>
// //                   </TableRow>
// //                 </TableHeader>
// //                 <TableBody>
// //                   {userAttendance.map((record, index) => (
// //                     <TableRow key={index}>
// //                       <TableCell className="font-medium">
// //                         {format(new Date(record.date), "MMM dd, yyyy")}
// //                       </TableCell>
// //                       <TableCell>
// //                         {record.checkIn ? (
// //                           <span className="text-success">{record.checkIn}</span>
// //                         ) : (
// //                           <span className="text-muted-foreground">--</span>
// //                         )}
// //                       </TableCell>
// //                       <TableCell>
// //                         {record.checkOut ? (
// //                           <span className="text-success">{record.checkOut}</span>
// //                         ) : record.checkIn ? (
// //                           <span className="text-warning">Working...</span>
// //                         ) : (
// //                           <span className="text-muted-foreground">--</span>
// //                         )}
// //                       </TableCell>
// //                       <TableCell>
// //                         <span className={cn(
// //                           "font-medium",
// //                           record.status === 'present' ? "text-success" :
// //                           record.status === 'late' ? "text-warning" :
// //                           "text-muted-foreground"
// //                         )}>
// //                           {record.workingHours || record.hours}
// //                         </span>
// //                       </TableCell>
// //                       <TableCell>{getStatusBadge(record.status)}</TableCell>
// //                     </TableRow>
// //                   ))}
// //                 </TableBody>
// //               </Table>
// //             </CardContent>
// //           </Card>
// //         </>
// //       )}

// //       {filteredRecords.length === 0 && isHR && (
// //         <div className="text-center py-12">
// //           <UserCheck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
// //           <h3 className="text-lg font-semibold mb-2">No attendance records found</h3>
// //           <p className="text-muted-foreground">Try adjusting your search or date filters</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Attendance;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useAuth } from "../contexts/AuthContext";

// const Attendance = () => {
//   // Auth
//   const { user } = useAuth();
//   const isHR = user?.role === "hr";

//   // Upload States
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadMessage, setUploadMessage] = useState("");

//   // Employee & Date Filter States (HR only)
//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");

//   // Search State
//   const [searchTerm, setSearchTerm] = useState("");

//   // List States
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [fetchingEmployees, setFetchingEmployees] = useState(true);

//   const getAuthToken = () => localStorage.getItem("authToken");

//   const getAuthHeaders = () => {
//     const token = getAuthToken();
//     if (!token) {
//       toast.error("Session expired. Please login again.");
//       return null;
//     }
//     return { headers: { Authorization: `Bearer ${token}` } };
//   };

//   // Handle File Selection
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setUploadMessage("");
//   };

//   // Upload Attendance - Now sends selectedEmployeeId
//   const handleUpload = async () => {
//     if (!file) return toast.error("Please select a file");
//     if (!selectedEmployeeId)
//       return toast.error("Please select an employee from dropdown");

//     const token = getAuthToken();
//     if (!token) return;

//     setUploading(true);
//     setUploadMessage("");

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("employeeId", selectedEmployeeId); // ← Most Important

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/attendance/upload-attendance",
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } },
//       );

//       const message = res.data.message || "Upload successful!";
//       setUploadMessage(message);
//       setFile(null);
//       toast.success(message);

//       fetchAttendance(); // Refresh list
//     } catch (err) {
//       const errorMsg = err.response?.data?.message || err.message;
//       setUploadMessage("Upload failed: " + errorMsg);
//       toast.error("Upload failed: " + errorMsg);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Fetch Employees (HR only)
//   const fetchEmployees = async () => {
//     if (!isHR) {
//       setFetchingEmployees(false);
//       return;
//     }

//     const config = getAuthHeaders();
//     if (!config) return;

//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/employees",
//         config,
//       );
//       if (res.data?.status === true) {
//         setEmployees(res.data.data || []);
//       }
//     } catch (error) {
//       console.error(error);
//       if (error.response?.status === 401) toast.error("Session expired!");
//     } finally {
//       setFetchingEmployees(false);
//     }
//   };

//   // Fetch Attendance
//   const fetchAttendance = async () => {
//     const config = getAuthHeaders();
//     if (!config) return;

//     setLoading(true);
//     try {
//       let res;

//       if (isHR) {
//         // HR: fetch with filters
//         const params = {};
//         if (selectedEmployeeId) params.employeeId = selectedEmployeeId;
//         if (selectedDate) params.date = selectedDate;

//         res = await axios.get(
//           "http://localhost:5000/api/attendance/datefilter",
//           {
//             params,
//             ...config,
//           },
//         );
//       } else {
//         // Employee: fetch only their own attendance
//         res = await axios.get("http://localhost:5000/api/attendance/me", {
//           params: { limit: 30 },
//           ...config,
//         });
//       }

//       setData(res.data?.data || []);
//     } catch (error) {
//       console.error("Error fetching attendance:", error);
//       setData([]);
//       if (error.response?.status === 401) toast.error("Not authorized!");
//       else toast.error("Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//     fetchAttendance();
//   }, [isHR]);

//   useEffect(() => {
//     // Only re-fetch if HR and filters change
//     if (isHR) {
//       fetchAttendance();
//     }
//   }, [selectedEmployeeId, selectedDate]);

//   const filteredData = data.filter((item) => {
//     if (!searchTerm.trim()) return true;
//     const empName = (item.employee?.name || "").toLowerCase();
//     return empName.includes(searchTerm.toLowerCase().trim());
//   });

//   const statusLegend = [
//     { code: "P", meaning: "Present" },
//     { code: "A", meaning: "Absent" },
//     { code: "H", meaning: "Holiday" },
//     { code: "W", meaning: "Weekly Off" },
//     { code: "LH", meaning: "Less Hours" },
//     { code: "HD", meaning: "Half Day" },
//     { code: "PW", meaning: "Present On WeekOff" },
//     { code: "PH", meaning: "Present On Holiday" },
//     { code: "PHW", meaning: "Present On Holiday & WeekOff" },
//     { code: "XX", meaning: "Not Applicable" },
//     { code: "CL", meaning: "Casual Leave" },
//     { code: "HCL", meaning: "Half Casual Leave" },
//   ];

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       {isHR ? (
//         <>
//           {/* HR INTERFACE */}
//           <h1>Attendance Management</h1>

//           {/* Status Legend */}
//           <div style={{ marginBottom: "30px", padding: "15px", backgroundColor: "#f8f9fa", border: "1px solid #ddd", borderRadius: "8px" }}>
//             <h3>Attendance Status Legend</h3>
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "8px 20px" }}>
//               {statusLegend.map((item, index) => (
//                 <div key={index} style={{ display: "flex", gap: "10px" }}>
//                   <strong style={{ color: "#007bff", minWidth: "50px" }}>{item.code}</strong>
//                   <span>: {item.meaning}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Filters */}
//           <div style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff" }}>
//             <h2>Filters</h2>
//             <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "end" }}>
//               <div>
//                 <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Select Employee:</label>
//                 <select
//                   value={selectedEmployeeId}
//                   onChange={(e) => setSelectedEmployeeId(e.target.value)}
//                   disabled={fetchingEmployees}
//                   style={{ padding: "10px", width: "300px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px" }}
//                 >
//                   <option value="">-- Select Employee --</option>
//                   {employees.map((emp) => (
//                     <option key={emp.id || emp._id} value={emp.id || emp._id}>
//                       {emp.name} {emp.employeeId ? `(${emp.employeeId})` : ""}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Select Date:</label>
//                 <input
//                   type="date"
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                   style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px" }}
//                 />
//               </div>

//               <div>
//                 <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Search by Name:</label>
//                 <input
//                   type="text"
//                   placeholder="Search employee name..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   style={{ padding: "10px", width: "280px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px" }}
//                 />
//               </div>

//               <button
//                 onClick={() => { setSelectedEmployeeId(""); setSelectedDate(""); setSearchTerm(""); }}
//                 style={{ padding: "10px 20px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", height: "45px" }}
//               >
//                 Clear All
//               </button>

//               <button
//                 onClick={fetchAttendance}
//                 disabled={loading}
//                 style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: loading ? "not-allowed" : "pointer", height: "45px" }}
//               >
//                 {loading ? "Fetching..." : "Fetch Data"}
//               </button>
//             </div>
//           </div>

//           {/* Upload Section */}
//           <div style={{ marginBottom: "40px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff" }}>
//             <h2>Upload Attendance for Selected Employee</h2>

//             <div style={{ marginBottom: "15px", padding: "12px", backgroundColor: "#e7f3ff", borderRadius: "6px" }}>
//               <strong>Selected Employee: </strong>
//               {selectedEmployeeId
//                 ? employees.find(e => String(e.id || e._id) === String(selectedEmployeeId))?.name || "Unknown"
//                 : <span style={{ color: "red" }}>Please select an employee first</span>
//               }
//             </div>

//             <p style={{ color: "#666", marginBottom: "15px" }}>
//               File should contain: <strong>Date, CheckIn, CheckOut, TotalHours</strong><br />
//               <strong>Name and EmpID will be ignored</strong> — Employee is taken from dropdown above.
//             </p>

//             <div style={{ marginBottom: "15px" }}>
//               <input
//                 type="file"
//                 accept=".csv,.xls,.xlsx"
//                 onChange={handleFileChange}
//                 style={{ marginRight: "15px" }}
//               />
//               <button
//                 onClick={handleUpload}
//                 disabled={uploading || !file || !selectedEmployeeId}
//                 style={{
//                   padding: "12px 25px",
//                   backgroundColor: (uploading || !file || !selectedEmployeeId) ? "#ccc" : "#007bff",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "5px",
//                   cursor: uploading || !file || !selectedEmployeeId ? "not-allowed" : "pointer",
//                   fontSize: "16px"
//                 }}
//               >
//                 {uploading ? "Uploading..." : "Upload Attendance"}
//               </button>
//             </div>

//             {uploadMessage && (
//               <p style={{ color: uploadMessage.toLowerCase().includes("failed") ? "red" : "green", fontWeight: "bold" }}>
//                 {uploadMessage}
//               </p>
//             )}
//           </div>

//           {/* Attendance List */}
//           <div>
//             <h2>Attendance Records ({filteredData.length})</h2>

//             {loading ? (
//               <p>Loading...</p>
//             ) : filteredData.length === 0 ? (
//               <p>No records found.</p>
//             ) : (
//               <table border="1" cellPadding="12" style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
//                 <thead>
//                   <tr style={{ backgroundColor: "#f4f4f4" }}>
//                     <th>Name</th>
//                     <th>Date</th>
//                     <th>Status</th>
//                     <th>Check In</th>
//                     <th>Check Out</th>
//                     <th>Total Hours</th>
//                     <th>Location</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredData.map((item, index) => (
//                     <tr key={index}>
//                       <td><strong>{item.employee?.name || "N/A"}</strong></td>
//                       <td>{new Date(item.date).toLocaleDateString('en-IN')}</td>
//                       <td><strong style={{ color: "#007bff" }}>{item.status}</strong></td>
//                       <td>{item.checkIn || "—"}</td>
//                       <td>{item.checkOut || "—"}</td>
//                       <td>{item.totalHours || "—"}</td>
//                       <td>{item.location || "—"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </>
//       ) : (
//         <>
//           {/* EMPLOYEE INTERFACE */}
//           <h1>My Attendance</h1>

//           <div style={{ marginBottom: "30px" }}>
//             <p style={{ fontSize: "16px", color: "#666" }}>Viewing attendance records for: <strong>{user?.name}</strong></p>
//           </div>

//           {/* Attendance List */}
//           <div>
//             <h2>My Attendance Records ({filteredData.length})</h2>

//             {loading ? (
//               <p>Loading...</p>
//             ) : filteredData.length === 0 ? (
//               <p>No attendance records found.</p>
//             ) : (
//               <table border="1" cellPadding="12" style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
//                 <thead>
//                   <tr style={{ backgroundColor: "#f4f4f4" }}>
//                     <th>Date</th>
//                     <th>Status</th>
//                     <th>Check In</th>
//                     <th>Check Out</th>
//                     <th>Total Hours</th>
//                     <th>Location</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredData.map((item, index) => (
//                     <tr key={index}>
//                       <td>{new Date(item.date).toLocaleDateString('en-IN')}</td>
//                       <td><strong style={{ color: "#007bff" }}>{item.status}</strong></td>
//                       <td>{item.checkIn || "—"}</td>
//                       <td>{item.checkOut || "—"}</td>
//                       <td>{item.totalHours || "—"}</td>
//                       <td>{item.location || "—"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </>
//       )}

//       <ToastContainer position="top-right" autoClose={5000} />
//     </div>
//   );
// };

// export default Attendance;
//           style={{
//             display: "flex",
//             gap: "20px",
//             flexWrap: "wrap",
//             alignItems: "end",
//           }}
//         >
//           <div>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: "5px",
//                 fontWeight: "bold",
//               }}
//             >
//               Select Employee:
//             </label>
//             <select
//               value={selectedEmployeeId}
//               onChange={(e) => setSelectedEmployeeId(e.target.value)}
//               disabled={fetchingEmployees}
//               style={{
//                 padding: "10px",
//                 width: "300px",
//                 borderRadius: "5px",
//                 border: "1px solid #ccc",
//                 fontSize: "16px",
//               }}
//             >
//               <option value="">-- Select Employee --</option>
//               {employees.map((emp) => (
//                 <option key={emp.id || emp._id} value={emp.id || emp._id}>
//                   {emp.name} {emp.employeeId ? `(${emp.employeeId})` : ""}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: "5px",
//                 fontWeight: "bold",
//               }}
//             >
//               Select Date:
//             </label>
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               style={{
//                 padding: "10px",
//                 borderRadius: "5px",
//                 border: "1px solid #ccc",
//                 fontSize: "16px",
//               }}
//             />
//           </div>

//           <div>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: "5px",
//                 fontWeight: "bold",
//               }}
//             >
//               Search by Name:
//             </label>
//             <input
//               type="text"
//               placeholder="Search employee name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               style={{
//                 padding: "10px",
//                 width: "280px",
//                 borderRadius: "5px",
//                 border: "1px solid #ccc",
//                 fontSize: "16px",
//               }}
//             />
//           </div>

//           <button
//             onClick={() => {
//               setSelectedEmployeeId("");
//               setSelectedDate("");
//               setSearchTerm("");
//             }}
//             style={{
//               padding: "10px 20px",
//               backgroundColor: "#6c757d",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//               height: "45px",
//             }}
//           >
//             Clear All
//           </button>

//           <button
//             onClick={fetchAttendance}
//             disabled={loading}
//             style={{
//               padding: "10px 20px",
//               backgroundColor: "#28a745",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//               cursor: loading ? "not-allowed" : "pointer",
//               height: "45px",
//             }}
//           >
//             {loading ? "Fetching..." : "Fetch Data"}
//           </button>
//         </div>
//       </div>

//       {/* Upload Section */}
//       <div
//         style={{
//           marginBottom: "40px",
//           padding: "20px",
//           border: "1px solid #ddd",
//           borderRadius: "8px",
//           backgroundColor: "#fff",
//         }}
//       >
//         <h2>Upload Attendance for Selected Employee</h2>

//         <div
//           style={{
//             marginBottom: "15px",
//             padding: "12px",
//             backgroundColor: "#e7f3ff",
//             borderRadius: "6px",
//           }}
//         >
//           <strong>Selected Employee: </strong>
//           {selectedEmployeeId ? (
//             employees.find(
//               (e) => String(e.id || e._id) === String(selectedEmployeeId),
//             )?.name || "Unknown"
//           ) : (
//             <span style={{ color: "red" }}>
//               Please select an employee first
//             </span>
//           )}
//         </div>

//         <p style={{ color: "#666", marginBottom: "15px" }}>
//           File should contain:{" "}
//           <strong>Date, CheckIn, CheckOut, TotalHours</strong>
//           <br />
//           <strong>Name and EmpID will be ignored</strong> — Employee is taken
//           from dropdown above.
//         </p>

//         <div style={{ marginBottom: "15px" }}>
//           <input
//             type="file"
//             accept=".csv,.xls,.xlsx"
//             onChange={handleFileChange}
//             style={{ marginRight: "15px" }}
//           />
//           <button
//             onClick={handleUpload}
//             disabled={uploading || !file || !selectedEmployeeId}
//             style={{
//               padding: "12px 25px",
//               backgroundColor:
//                 uploading || !file || !selectedEmployeeId ? "#ccc" : "#007bff",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//               cursor:
//                 uploading || !file || !selectedEmployeeId
//                   ? "not-allowed"
//                   : "pointer",
//               fontSize: "16px",
//             }}
//           >
//             {uploading ? "Uploading..." : "Upload Attendance"}
//           </button>
//         </div>

//         {uploadMessage && (
//           <p
//             style={{
//               color: uploadMessage.toLowerCase().includes("failed")
//                 ? "red"
//                 : "green",
//               fontWeight: "bold",
//             }}
//           >
//             {uploadMessage}
//           </p>
//         )}
//       </div>

//       {/* Attendance List */}
//       <div>
//         <h2>Attendance Records ({filteredData.length})</h2>

//         {loading ? (
//           <p>Loading...</p>
//         ) : filteredData.length === 0 ? (
//           <p>No records found.</p>
//         ) : (
//           <table
//             border="1"
//             cellPadding="12"
//             style={{
//               width: "100%",
//               borderCollapse: "collapse",
//               textAlign: "left",
//             }}
//           >
//             <thead>
//               <tr style={{ backgroundColor: "#f4f4f4" }}>
//                 <th>Name</th>
//                 <th>Date</th>
//                 <th>Status</th>
//                 <th>Check In</th>
//                 <th>Check Out</th>
//                 <th>Total Hours</th>
//                 <th>Location</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((item, index) => (
//                 <tr key={index}>
//                   <td>
//                     <strong>{item.employee?.name || "N/A"}</strong>
//                   </td>
//                   <td>{new Date(item.date).toLocaleDateString("en-IN")}</td>
//                   <td>
//                     <strong style={{ color: "#007bff" }}>{item.status}</strong>
//                   </td>
//                   <td>{item.checkIn || "—"}</td>
//                   <td>{item.checkOut || "—"}</td>
//                   <td>{item.totalHours || "—"}</td>
//                   <td>{item.location || "—"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       <ToastContainer position="top-right" autoClose={5000} />
//     </div>
//   );
// };

// export default Attendance;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../contexts/AuthContext";

const Attendance = () => {
  const { user } = useAuth();
  const isHR = user?.role === "hr";

  // States
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  // HR Only States
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Data States
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchingEmployees, setFetchingEmployees] = useState(true);

  const getAuthToken = () => localStorage.getItem("authToken");

  const getAuthHeaders = () => {
    const token = getAuthToken();
    if (!token) {
      toast.error("Session expired. Please login again.");
      return null;
    }
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // Handle File Change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadMessage("");
  };

  // Upload Attendance
  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file");
    if (!selectedEmployeeId) return toast.error("Please select an employee");

    const token = getAuthToken();
    if (!token) return;

    setUploading(true);
    setUploadMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("employeeId", selectedEmployeeId);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/attendance/upload-attendance",
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const message = res.data.message || "Upload successful!";
      setUploadMessage(message);
      setFile(null);
      toast.success(message);

      fetchAttendance(); // Refresh list after upload
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      setUploadMessage("Upload failed: " + errorMsg);
      toast.error("Upload failed: " + errorMsg);
    } finally {
      setUploading(false);
    }
  };

  // Fetch Employees (HR only)
  const fetchEmployees = async () => {
    if (!isHR) {
      setFetchingEmployees(false);
      return;
    }

    const config = getAuthHeaders();
    if (!config) return;

    try {
      const res = await axios.get(
        "http://localhost:5000/api/employees",
        config,
      );
      setEmployees(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired!");
      }
    } finally {
      setFetchingEmployees(false);
    }
  };

  // Fetch Attendance Records
  const fetchAttendance = async () => {
    const config = getAuthHeaders();
    if (!config) return;

    setLoading(true);
    try {
      let res;

      if (isHR) {
        const params = {};
        if (selectedEmployeeId) params.employeeId = selectedEmployeeId;
        if (selectedDate) params.date = selectedDate;

        res = await axios.get(
          "http://localhost:5000/api/attendance/datefilter",
          {
            params,
            ...config,
          },
        );
      } else {
        res = await axios.get("http://localhost:5000/api/attendance/me", {
          params: { limit: 30 },
          ...config,
        });
      }

      setData(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setData([]);
      if (error.response?.status === 401) {
        toast.error("Not authorized!");
      } else {
        toast.error("Failed to load attendance data");
      }
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, [isHR]);

  // Re-fetch when HR filters change
  useEffect(() => {
    if (isHR) {
      fetchAttendance();
    }
  }, [selectedEmployeeId, selectedDate, isHR]);

  // Filter data for search
  const filteredData = data.filter((item) => {
    if (!searchTerm.trim()) return true;
    const empName = (item.employee?.name || "").toLowerCase();
    return empName.includes(searchTerm.toLowerCase().trim());
  });

  const statusLegend = [
    { code: "P", meaning: "Present" },
    { code: "A", meaning: "Absent" },
    { code: "H", meaning: "Holiday" },
    { code: "W", meaning: "Weekly Off" },
    { code: "LH", meaning: "Less Hours" },
    { code: "HD", meaning: "Half Day" },
    { code: "PW", meaning: "Present On WeekOff" },
    { code: "PH", meaning: "Present On Holiday" },
    { code: "PHW", meaning: "Present On Holiday & WeekOff" },
    { code: "XX", meaning: "Not Applicable" },
    { code: "CL", meaning: "Casual Leave" },
    { code: "HCL", meaning: "Half Casual Leave" },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {isHR ? (
        // ==================== HR INTERFACE ====================
        <>
          <h1>Attendance Management</h1>

          {/* Status Legend */}
          <div
            style={{
              marginBottom: "30px",
              padding: "15px",
              backgroundColor: "#f8f9fa",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <h3>Attendance Status Legend</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "8px 20px",
              }}
            >
              {statusLegend.map((item, index) => (
                <div key={index} style={{ display: "flex", gap: "10px" }}>
                  <strong style={{ color: "#007bff", minWidth: "50px" }}>
                    {item.code}
                  </strong>
                  <span>: {item.meaning}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div
            style={{
              marginBottom: "30px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#fff",
            }}
          >
            <h2>Filters</h2>
            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                alignItems: "end",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Select Employee:
                </label>
                <select
                  value={selectedEmployeeId}
                  onChange={(e) => setSelectedEmployeeId(e.target.value)}
                  disabled={fetchingEmployees}
                  style={{
                    padding: "10px",
                    width: "300px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                  }}
                >
                  <option value="">-- Select Employee --</option>
                  {employees.map((emp) => (
                    <option key={emp._id || emp.id} value={emp._id || emp.id}>
                      {emp.name} {emp.employeeId ? `(${emp.employeeId})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Select Date:
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Search by Name:
                </label>
                <input
                  type="text"
                  placeholder="Search employee name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: "10px",
                    width: "280px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                  }}
                />
              </div>

              <button
                onClick={() => {
                  setSelectedEmployeeId("");
                  setSelectedDate("");
                  setSearchTerm("");
                }}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  height: "45px",
                }}
              >
                Clear All
              </button>

              <button
                onClick={fetchAttendance}
                disabled={loading}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: loading ? "not-allowed" : "pointer",
                  height: "45px",
                }}
              >
                {loading ? "Fetching..." : "Fetch Data"}
              </button>
            </div>
          </div>

          {/* Upload Section */}
          <div
            style={{
              marginBottom: "40px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#fff",
            }}
          >
            <h2>Upload Attendance for Selected Employee</h2>

            <div
              style={{
                marginBottom: "15px",
                padding: "12px",
                backgroundColor: "#e7f3ff",
                borderRadius: "6px",
              }}
            >
              <strong>Selected Employee: </strong>
              {selectedEmployeeId ? (
                employees.find(
                  (e) => String(e._id || e.id) === String(selectedEmployeeId),
                )?.name || "Unknown"
              ) : (
                <span style={{ color: "red" }}>
                  Please select an employee first
                </span>
              )}
            </div>

            <p style={{ color: "#666", marginBottom: "15px" }}>
              File should contain:{" "}
              <strong>Date, CheckIn, CheckOut, TotalHours</strong>
              <br />
              <strong>Name and EmpID will be ignored</strong> — Employee is
              taken from dropdown above.
            </p>

            <div style={{ marginBottom: "15px" }}>
              <input
                type="file"
                accept=".csv,.xls,.xlsx"
                onChange={handleFileChange}
                style={{ marginRight: "15px" }}
              />
              <button
                onClick={handleUpload}
                disabled={uploading || !file || !selectedEmployeeId}
                style={{
                  padding: "12px 25px",
                  backgroundColor:
                    uploading || !file || !selectedEmployeeId
                      ? "#ccc"
                      : "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor:
                    uploading || !file || !selectedEmployeeId
                      ? "not-allowed"
                      : "pointer",
                  fontSize: "16px",
                }}
              >
                {uploading ? "Uploading..." : "Upload Attendance"}
              </button>
            </div>

            {uploadMessage && (
              <p
                style={{
                  color: uploadMessage.toLowerCase().includes("failed")
                    ? "red"
                    : "green",
                  fontWeight: "bold",
                }}
              >
                {uploadMessage}
              </p>
            )}
          </div>

          {/* Attendance List */}
          <div>
            <h2>Attendance Records ({filteredData.length})</h2>

            {loading ? (
              <p>Loading...</p>
            ) : filteredData.length === 0 ? (
              <p>No records found.</p>
            ) : (
              <table
                border="1"
                cellPadding="12"
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#f4f4f4" }}>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Total Hours</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={item._id || index}>
                      <td>
                        <strong>{item.employee?.name || "N/A"}</strong>
                      </td>
                      <td>{new Date(item.date).toLocaleDateString("en-IN")}</td>
                      <td>
                        <strong style={{ color: "#007bff" }}>
                          {item.status}
                        </strong>
                      </td>
                      <td>{item.checkIn || "—"}</td>
                      <td>{item.checkOut || "—"}</td>
                      <td>{item.totalHours || "—"}</td>
                      <td>{item.location || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      ) : (
        // ==================== EMPLOYEE INTERFACE ====================
        <>
          <h1>My Attendance</h1>
          <div style={{ marginBottom: "30px" }}>
            <p style={{ fontSize: "16px", color: "#666" }}>
              Viewing attendance records for: <strong>{user?.name}</strong>
            </p>
          </div>

          <div>
            <h2>My Attendance Records ({filteredData.length})</h2>

            {loading ? (
              <p>Loading...</p>
            ) : filteredData.length === 0 ? (
              <p>No attendance records found.</p>
            ) : (
              <table
                border="1"
                cellPadding="12"
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#f4f4f4" }}>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Total Hours</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={item._id || index}>
                      <td>{new Date(item.date).toLocaleDateString("en-IN")}</td>
                      <td>
                        <strong style={{ color: "#007bff" }}>
                          {item.status}
                        </strong>
                      </td>
                      <td>{item.checkIn || "—"}</td>
                      <td>{item.checkOut || "—"}</td>
                      <td>{item.totalHours || "—"}</td>
                      <td>{item.location || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Attendance;
