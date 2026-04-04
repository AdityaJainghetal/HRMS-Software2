// // // import React from 'react'

// // // const TaskMangement = () => {
// // //   return (
// // //     <div>

// // //     </div>
// // //   )
// // // }

// // // export default TaskMangement

// // import React, { useState, useEffect } from 'react';
// // import DatePicker from 'react-datepicker';
// // import 'react-datepicker/dist/react-datepicker.css';

// // const categories = [
// //   'Video Editing',
// //   'Interview',
// //   'Calling',
// //   'Developer',
// //   'SEO',
// //   'Design',
// //   'Multipurpose',
// //   'Backend'
// // ];

// // const TaskManagement = () => {
// //   const [tasks, setTasks] = useState([]);
// //   const [role, setRole] = useState('admin'); // Change to 'employee' for testing employee view
// //   const [newTask, setNewTask] = useState({
// //     title: '',
// //     category: '',
// //     description: '',
// //     dateTime: new Date(),
// //     assignedTo: ''
// //   });
// //   const [editingId, setEditingId] = useState(null);

// //   // Load from localStorage
// //   useEffect(() => {
// //     const savedTasks = localStorage.getItem('tasks');
// //     if (savedTasks) setTasks(JSON.parse(savedTasks));
// //   }, []);

// //   // Save to localStorage
// //   useEffect(() => {
// //     localStorage.setItem('tasks', JSON.stringify(tasks));
// //   }, [tasks]);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewTask(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleDateChange = (date) => {
// //     setNewTask(prev => ({ ...prev, dateTime: date }));
// //   };

// //   const addOrUpdateTask = (e) => {
// //     e.preventDefault();
// //     if (!newTask.title || !newTask.category) return alert('Title aur Category zaroori hai!');

// //     const taskData = {
// //       id: editingId || Date.now(),
// //       ...newTask,
// //       dateTime: newTask.dateTime.toISOString(),
// //       createdAt: new Date().toISOString()
// //     };

// //     if (editingId) {
// //       setTasks(tasks.map(task => task.id === editingId ? taskData : task));
// //       setEditingId(null);
// //     } else {
// //       setTasks([...tasks, taskData]);
// //     }

// //     // Reset form
// //     setNewTask({
// //       title: '',
// //       category: '',
// //       description: '',
// //       dateTime: new Date(),
// //       assignedTo: ''
// //     });
// //   };

// //   const editTask = (task) => {
// //     if (role !== 'admin') return;
// //     setEditingId(task.id);
// //     setNewTask({
// //       title: task.title,
// //       category: task.category,
// //       description: task.description || '',
// //       dateTime: new Date(task.dateTime),
// //       assignedTo: task.assignedTo || ''
// //     });
// //   };

// //   const deleteTask = (id) => {
// //     if (role !== 'admin') return;
// //     if (window.confirm('Task delete karein?')) {
// //       setTasks(tasks.filter(task => task.id !== id));
// //     }
// //   };

// //   return (
// //     <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
// //       <div className="flex justify-between items-center mb-8">
// //         <h1 className="text-3xl font-bold text-gray-800">Task Management System</h1>
// //         <div className="flex gap-4">
// //           <select
// //             value={role}
// //             onChange={(e) => setRole(e.target.value)}
// //             className="px-4 py-2 border rounded-lg bg-white"
// //           >
// //             <option value="admin">Admin / HR Mode (Full CRUD)</option>
// //             <option value="employee">Employee Mode (Create + Read only)</option>
// //           </select>
// //         </div>
// //       </div>

// //       {/* Task Form */}
// //       <div className="bg-white p-6 rounded-xl shadow mb-10">
// //         <h2 className="text-xl font-semibold mb-4">
// //           {editingId ? 'Edit Task' : 'New Task Create Karein'}
// //         </h2>
// //         <form onSubmit={addOrUpdateTask} className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           <input
// //             type="text"
// //             name="title"
// //             placeholder="Task Title"
// //             value={newTask.title}
// //             onChange={handleInputChange}
// //             className="px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
// //             required
// //           />

// //           <select
// //             name="category"
// //             value={newTask.category}
// //             onChange={handleInputChange}
// //             className="px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
// //             required
// //           >
// //             <option value="">Category Select Karein</option>
// //             {categories.map(cat => (
// //               <option key={cat} value={cat}>{cat}</option>
// //             ))}
// //           </select>

// //           <input
// //             type="text"
// //             name="assignedTo"
// //             placeholder="Assigned To (Employee Name)"
// //             value={newTask.assignedTo}
// //             onChange={handleInputChange}
// //             className="px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
// //           />

// //           <div>
// //             <label className="block text-sm text-gray-600 mb-1">Date & Time</label>
// //             <DatePicker
// //               selected={newTask.dateTime}
// //               onChange={handleDateChange}
// //               showTimeSelect
// //               dateFormat="dd/MM/yyyy hh:mm aa"
// //               className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
// //             />
// //           </div>

// //           <textarea
// //             name="description"
// //             placeholder="Description (Optional)"
// //             value={newTask.description}
// //             onChange={handleInputChange}
// //             className="md:col-span-2 px-4 py-3 border rounded-lg h-24 focus:outline-none focus:border-blue-500"
// //           />

// //           <button
// //             type="submit"
// //             className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
// //           >
// //             {editingId ? 'Update Task' : 'Create Task'}
// //           </button>
// //         </form>
// //       </div>

// //       {/* Tasks List */}
// //       <div>
// //         <h2 className="text-2xl font-semibold mb-4">All Tasks ({tasks.length})</h2>

// //         {tasks.length === 0 ? (
// //           <p className="text-gray-500 text-center py-10">Abhi koi task nahi hai. Pehla task create karein!</p>
// //         ) : (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {tasks.map(task => (
// //               <div key={task.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
// //                 <div className="flex justify-between items-start">
// //                   <h3 className="font-semibold text-lg">{task.title}</h3>
// //                   <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
// //                     {task.category}
// //                   </span>
// //                 </div>

// //                 {task.assignedTo && (
// //                   <p className="text-sm text-gray-600 mt-2">Assigned to: <strong>{task.assignedTo}</strong></p>
// //                 )}

// //                 <p className="text-sm text-gray-500 mt-3">
// //                   {new Date(task.dateTime).toLocaleString('en-IN')}
// //                 </p>

// //                 {task.description && (
// //                   <p className="text-gray-700 mt-3 text-sm line-clamp-3">{task.description}</p>
// //                 )}

// //                 <div className="flex gap-3 mt-6">
// //                   <button
// //                     onClick={() => editTask(task)}
// //                     disabled={role !== 'admin'}
// //                     className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${role === 'admin'
// //                       ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
// //                       : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
// //                   >
// //                     Edit
// //                   </button>

// //                   <button
// //                     onClick={() => deleteTask(task.id)}
// //                     disabled={role !== 'admin'}
// //                     className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${role === 'admin'
// //                       ? 'bg-red-500 hover:bg-red-600 text-white'
// //                       : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
// //                   >
// //                     Delete
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default TaskManagement;

// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const categories = [
//   'Video Editing',
//   'Interview',
//   'Calling',
//   'Developer',
//   'SEO',
//   'Design',
//   'Multipurpose',
//   'Backend'
// ];

// const TaskManagement = () => {
//   const [tasks, setTasks] = useState([]);
//   const [role, setRole] = useState('admin'); // Change to 'employee' for testing
//   const [employees, setEmployees] = useState([]);
//   const [loadingEmployees, setLoadingEmployees] = useState(true);
//   const [error, setError] = useState(null);

//   const [newTask, setNewTask] = useState({
//     title: '',
//     category: '',
//     description: '',
//     dateTime: new Date(),
//     assignedTo: ''   // Will store employee name
//   });

//   const [editingId, setEditingId] = useState(null);

//   // Load tasks from localStorage
//   useEffect(() => {
//     const savedTasks = localStorage.getItem('tasks');
//     if (savedTasks) setTasks(JSON.parse(savedTasks));
//   }, []);

//   // Save tasks to localStorage
//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   // Fetch employees from API
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/employees');
//         if (!response.ok) throw new Error('Failed to fetch employees');

//         const result = await response.json();

//         if (result.status && result.data) {
//           setEmployees(result.data);
//         } else {
//           throw new Error('Invalid response format');
//         }
//       } catch (err) {
//         console.error('Error fetching employees:', err);
//         setError('Employees load nahi ho paaye. API check karein.');
//       } finally {
//         setLoadingEmployees(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTask(prev => ({ ...prev, [name]: value }));
//   };

//   const handleDateChange = (date) => {
//     setNewTask(prev => ({ ...prev, dateTime: date }));
//   };

//   const addOrUpdateTask = (e) => {
//     e.preventDefault();
//     if (!newTask.title || !newTask.category) {
//       return alert('Title aur Category zaroori hai!');
//     }

//     const taskData = {
//       id: editingId || Date.now(),
//       ...newTask,
//       dateTime: newTask.dateTime.toISOString(),
//       createdAt: new Date().toISOString()
//     };

//     if (editingId) {
//       setTasks(tasks.map(task => task.id === editingId ? taskData : task));
//       setEditingId(null);
//     } else {
//       setTasks([...tasks, taskData]);
//     }

//     // Reset form
//     setNewTask({
//       title: '',
//       category: '',
//       description: '',
//       dateTime: new Date(),
//       assignedTo: ''
//     });
//   };

//   const editTask = (task) => {
//     if (role !== 'admin') return;
//     setEditingId(task.id);
//     setNewTask({
//       title: task.title,
//       category: task.category,
//       description: task.description || '',
//       dateTime: new Date(task.dateTime),
//       assignedTo: task.assignedTo || ''
//     });
//   };

//   const deleteTask = (id) => {
//     if (role !== 'admin') return;
//     if (window.confirm('Task delete karein?')) {
//       setTasks(tasks.filter(task => task.id !== id));
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Task Management System</h1>
//         <div className="flex gap-4">
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className="px-4 py-2 border rounded-lg bg-white"
//           >
//             <option value="admin">Admin / HR Mode (Full CRUD)</option>
//             <option value="employee">Employee Mode (Create + Read only)</option>
//           </select>
//         </div>
//       </div>

//       {/* Task Form */}
//       <div className="bg-white p-6 rounded-xl shadow mb-10">
//         <h2 className="text-xl font-semibold mb-4">
//           {editingId ? 'Edit Task' : 'New Task Create Karein'}
//         </h2>

//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         <form onSubmit={addOrUpdateTask} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="title"
//             placeholder="Task Title"
//             value={newTask.title}
//             onChange={handleInputChange}
//             className="px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
//             required
//           />

//           <select
//             name="category"
//             value={newTask.category}
//             onChange={handleInputChange}
//             className="px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
//             required
//           >
//             <option value="">Category Select Karein</option>
//             {categories.map(cat => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>

//           {/* Assigned To Dropdown from API */}
//           <div className="md:col-span-1">
//             <label className="block text-sm text-gray-600 mb-1">Assign To Employee</label>
//             <select
//               name="assignedTo"
//               value={newTask.assignedTo}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
//               disabled={loadingEmployees}
//             >
//               <option value="">Select Employee</option>
//               {employees.map(emp => (
//                 <option key={emp.id} value={emp.name}>
//                   {emp.name} ({emp.department || 'No Department'})
//                 </option>
//               ))}
//             </select>
//             {loadingEmployees && <p className="text-sm text-gray-500 mt-1">Loading employees...</p>}
//           </div>

//           <div>
//             <label className="block text-sm text-gray-600 mb-1">Date & Time</label>
//             <DatePicker
//               selected={newTask.dateTime}
//               onChange={handleDateChange}
//               showTimeSelect
//               dateFormat="dd/MM/yyyy hh:mm aa"
//               className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
//             />
//           </div>

//           <textarea
//             name="description"
//             placeholder="Description (Optional)"
//             value={newTask.description}
//             onChange={handleInputChange}
//             className="md:col-span-2 px-4 py-3 border rounded-lg h-24 focus:outline-none focus:border-blue-500"
//           />

//           <button
//             type="submit"
//             className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
//           >
//             {editingId ? 'Update Task' : 'Create Task'}
//           </button>
//         </form>
//       </div>

//       {/* Tasks List */}
//       <div>
//         <h2 className="text-2xl font-semibold mb-4">All Tasks ({tasks.length})</h2>

//         {tasks.length === 0 ? (
//           <p className="text-gray-500 text-center py-10">
//             Abhi koi task nahi hai. Pehla task create karein!
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {tasks.map(task => (
//               <div key={task.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//                 <div className="flex justify-between items-start">
//                   <h3 className="font-semibold text-lg">{task.title}</h3>
//                   <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
//                     {task.category}
//                   </span>
//                 </div>

//                 {task.assignedTo && (
//                   <p className="text-sm text-gray-600 mt-2">
//                     Assigned to: <strong>{task.assignedTo}</strong>
//                   </p>
//                 )}

//                 <p className="text-sm text-gray-500 mt-3">
//                   {new Date(task.dateTime).toLocaleString('en-IN')}
//                 </p>

//                 {task.description && (
//                   <p className="text-gray-700 mt-3 text-sm line-clamp-3">{task.description}</p>
//                 )}

//                 <div className="flex gap-3 mt-6">
//                   <button
//                     onClick={() => editTask(task)}
//                     disabled={role !== 'admin'}
//                     className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
//                       role === 'admin'
//                         ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
//                         : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                     }`}
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => deleteTask(task.id)}
//                     disabled={role !== 'admin'}
//                     className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
//                       role === 'admin'
//                         ? 'bg-red-500 hover:bg-red-600 text-white'
//                         : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                     }`}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskManagement;

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Users,
  Briefcase,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API_URL = import.meta.env.VITE_API_URL;

const categories = [
  "Video Editing",
  "Interview",
  "Calling",
  "Developer",
  "SEO",
  "Design",
  "Multipurpose",
  "Backend",
  "Tender",
  
];

const TaskManagement = () => {
  const { isHR, user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    category: "",
    description: "",
    assignedTo: "",
    dateTime: new Date(),
  });

  // Fetch Tasks and Employees
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const res = await axios.get(`${API_URL}/api/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.data) {
          const mappedTasks = res.data.data.map((t) => ({
            id: t._id,
            title: t.title,
            category: t.category,
            description: t.description || "",
            assignedTo: t.assignedTo?._id || t.assignedTo,
            assignedName: t.assignedTo?.name || "Unassigned",
            dateTime: t.dateTime ? new Date(t.dateTime) : new Date(),
            status: t.status || "pending",
          }));
          setTasks(mappedTasks);
        }

        // Fetch employees only if HR
        if (isHR) {
          const empRes = await axios.get(`${API_URL}/api/employees`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (empRes.data?.data) setEmployees(empRes.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        toast.error("Failed to load tasks");
      }
    };

    fetchData();
  }, [isHR, user]);

  // Filter Tasks
  const filteredTasks = tasks.filter((task) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !q ||
      task.title.toLowerCase().includes(q) ||
      task.assignedName.toLowerCase().includes(q);

    const matchesCategory =
      filterCategory === "all" || task.category === filterCategory;

    if (!isHR) {
      return matchesSearch && matchesCategory && task.assignedTo === user?._id;
    }

    return matchesSearch && matchesCategory;
  });

  const resetNewTask = () => {
    setNewTask({
      title: "",
      category: "",
      description: "",
      assignedTo: "",
      dateTime: new Date(),
    });
  };

  // ==================== CREATE TASK ====================
  const handleCreateTask = async () => {
    if (!newTask.title?.trim()) {
      toast.error("Task Title is required");
      return;
    }
    if (!newTask.category) {
      toast.error("Please select a Category");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("authToken");

      // If employee is creating task, automatically assign to themselves
      let assignedToId = newTask.assignedTo;
      if (!isHR && !assignedToId) {
        assignedToId = user?._id;
      }

      const payload = {
        title: newTask.title.trim(),
        category: newTask.category,
        description: newTask.description?.trim() || "",
        assignedTo: assignedToId || null,
        dateTime: newTask.dateTime.toISOString(),
      };

      const res = await axios.post(`${API_URL}/api/tasks`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.data) {
        const t = res.data.data;
        const mapped = {
          id: t._id,
          title: t.title,
          category: t.category,
          description: t.description || "",
          assignedTo: t.assignedTo?._id || t.assignedTo,
          assignedName: t.assignedTo?.name || "Unassigned",
          dateTime: new Date(t.dateTime),
          status: t.status || "pending",
        };

        setTasks([mapped, ...tasks]);
        setShowAddDialog(false);
        resetNewTask();
        toast.success("Task created successfully!");
      }
    } catch (err) {
      console.error("Create Task Error:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==================== UPDATE TASK ====================
  const handleUpdateTask = async () => {
    if (!editingTask) return;

    try {
      const token = localStorage.getItem("authToken");
      const payload = {
        title: editingTask.title,
        category: editingTask.category,
        description: editingTask.description,
        assignedTo: editingTask.assignedTo || null,
        dateTime: editingTask.dateTime.toISOString(),
      };

      const res = await axios.patch(
        `${API_URL}/api/tasks/${editingTask.id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.data?.data) {
        const updated = {
          ...editingTask,
          ...res.data.data,
          dateTime: new Date(res.data.data.dateTime),
        };
        setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
        setEditingTask(null);
        toast.success("Task updated successfully!");
      }
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  // ==================== DELETE TASK ====================
  const handleDeleteTask = async (id) => {
    if (!isHR) return;
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${API_URL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(tasks.filter((t) => t.id !== id));
      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const openEditDialog = (task) => {
    if (!isHR) return;
    setEditingTask({ ...task });
  };

  const getStatusBadge = (status) => {
    const variants = {
      completed: "default",
      inprogress: "secondary",
      pending: "destructive",
    };
    return (
      <Badge variant={variants[status] || "secondary"}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Task Management
          </h1>
          <p className="text-muted-foreground">
            {isHR
              ? "Manage all team tasks and assignments"
              : "View your assigned tasks"}
          </p>
        </div>

        <Dialog
          open={showAddDialog}
          onOpenChange={(open) => {
            setShowAddDialog(open);
            if (!open) resetNewTask();
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create New Task
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                {isHR
                  ? "Add a new task and assign it to an employee"
                  : "Create a task for yourself"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">
                  Task Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <Label>
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newTask.category}
                  onValueChange={(val) =>
                    setNewTask({ ...newTask, category: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {isHR && (
                <div>
                  <Label>Assign To</Label>
                  <Select
                    value={newTask.assignedTo || "unassigned-none"}
                    onValueChange={(val) =>
                      setNewTask({
                        ...newTask,
                        assignedTo: val === "unassigned-none" ? "" : val,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="unassigned" value="unassigned-none">
                        Unassigned
                      </SelectItem>
                      {employees.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.name} — {emp.employeeId || ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* <div>
                <Label>Date & Time</Label>
                <DatePicker
                  selected={newTask.dateTime}
                  onChange={(date) =>
                    setNewTask({ ...newTask, dateTime: date })
                  }
                  showTimeSelect
                  dateFormat="dd/MM/yyyy hh:mm aa"
                  className="w-full px-3 py-2 border border-input rounded-md"
                />
              </div> */}

              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md resize-y"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  placeholder="Task details and notes..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTask} disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Task"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[280px]">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by task title or employee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-[220px]">
                <Briefcase className="w-4 h-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Table */}
      <Card className="data-table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              {isHR && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <div className="font-medium">{task.title}</div>
                  {task.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {task.description}
                    </p>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{task.category}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>
                        {task.assignedName?.slice(0, 2).toUpperCase() || "??"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{task.assignedName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    {task.dateTime.toLocaleDateString("en-IN")}
                    <Clock className="w-4 h-4 ml-1" />
                    {task.dateTime.toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(task.status)}</TableCell>

                {isHR && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(task)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No tasks found</h3>
            <p className="text-muted-foreground">
              Try changing search or filter
            </p>
          </div>
        )}
      </Card>

      {/* Edit Task Dialog */}
      <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>Update task details</DialogDescription>
          </DialogHeader>

          {editingTask && (
            <div className="space-y-4">
              <div>
                <Label>Task Title</Label>
                <Input
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Category</Label>
                <Select
                  value={editingTask.category}
                  onValueChange={(val) =>
                    setEditingTask({ ...editingTask, category: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Assign To</Label>
                <Select
                  value={editingTask.assignedTo || "unassigned-none"}
                  onValueChange={(val) =>
                    setEditingTask({
                      ...editingTask,
                      assignedTo: val === "unassigned-none" ? "" : val,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="unassigned" value="unassigned-none">
                      Unassigned
                    </SelectItem>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Date & Time</Label>
                <DatePicker
                  selected={editingTask.dateTime}
                  onChange={(date) =>
                    setEditingTask({ ...editingTask, dateTime: date })
                  }
                  showTimeSelect
                  dateFormat="dd/MM/yyyy hh:mm aa"
                  className="w-full px-3 py-2 border border-input rounded-md"
                />
              </div>

              <div>
                <Label>Description</Label>
                <textarea
                  className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md"
                  value={editingTask.description}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setEditingTask(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateTask}>Update Task</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskManagement;
