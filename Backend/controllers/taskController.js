import Task from "../models/Task.js";
import Employee from "../models/Employee.js";

// Get all tasks (HR sees all, Employee sees only their assigned tasks from today)
export const getAllTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const userRole = req.user.role;

    let query = {};

    // If user is not HR, filter tasks assigned to them and from today
    if (userRole !== "hr") {
      query.assignedTo = userId;

      // Get today's start and end time
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Filter tasks from today only
      query.dateTime = {
        $gte: today,
        $lt: tomorrow,
      };
    }

    const tasks = await Task.find(query)
      .populate("assignedTo", "name email profileImage")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch tasks: " + error.message,
    });
  }
};

// Get single task by ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const userRole = req.user.role;

    const task = await Task.findById(id)
      .populate("assignedTo", "name email profileImage")
      .populate("createdBy", "name email");

    if (!task) {
      return res.status(404).json({
        status: false,
        message: "Task not found",
      });
    }

    // Check if user has permission to view this task
    if (
      userRole !== "hr" &&
      task.assignedTo._id.toString() !== userId.toString()
    ) {
      return res.status(403).json({
        status: false,
        message: "You don't have permission to view this task",
      });
    }

    res.status(200).json({
      status: true,
      message: "Task fetched successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch task: " + error.message,
    });
  }
};

// Create task
export const createTask = async (req, res) => {
  try {
    const { title, category, description, assignedTo, dateTime } = req.body;
    const createdBy = req.user._id;
    const userRole = req.user.role;

    // Validate required fields
    if (!title || !category) {
      return res.status(400).json({
        status: false,
        message: "Title and category are required",
      });
    }

    // If user is employee, they can only create tasks for themselves
    let finalAssignedTo = assignedTo;
    if (userRole !== "hr") {
      finalAssignedTo = createdBy;
    }

    // If no assignedTo provided and user is employee, auto-assign to themselves
    if (!finalAssignedTo && userRole !== "hr") {
      finalAssignedTo = createdBy;
    }

    // Validate that assignedTo employee exists (if provided)
    if (finalAssignedTo) {
      const employee = await Employee.findById(finalAssignedTo);
      if (!employee) {
        return res.status(400).json({
          status: false,
          message: "Assigned employee not found",
        });
      }
    }

    const task = new Task({
      title,
      category,
      description: description || "",
      assignedTo: finalAssignedTo || null,
      dateTime,
      createdBy,
    });

    const savedTask = await task.save();

    const populatedTask = await Task.findById(savedTask._id)
      .populate("assignedTo", "name email profileImage")
      .populate("createdBy", "name email");

    res.status(201).json({
      status: true,
      message: "Task created successfully",
      data: populatedTask,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to create task: " + error.message,
    });
  }
};

// Update task (HR and creator can update)
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, description, assignedTo, dateTime, status } =
      req.body;
    const userId = req.user._id;
    const userRole = req.user.role;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        status: false,
        message: "Task not found",
      });
    }

    // Check if user has permission to update (HR or creator only)
    if (userRole !== "hr" && task.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({
        status: false,
        message: "You don't have permission to update this task",
      });
    }

    // Update fields
    if (title) task.title = title;
    if (category) task.category = category;
    if (description !== undefined) task.description = description;
    if (dateTime) task.dateTime = dateTime;
    if (status && ["pending", "inprogress", "completed"].includes(status)) {
      task.status = status;
    }

    // Only HR can change assignedTo
    if (userRole === "hr" && assignedTo !== undefined) {
      if (assignedTo && assignedTo !== "") {
        const employee = await Employee.findById(assignedTo);
        if (!employee) {
          return res.status(400).json({
            status: false,
            message: "Assigned employee not found",
          });
        }
        task.assignedTo = assignedTo;
      } else {
        task.assignedTo = null;
      }
    }

    const updatedTask = await task.save();

    const populatedTask = await Task.findById(updatedTask._id)
      .populate("assignedTo", "name email profileImage")
      .populate("createdBy", "name email");

    res.status(200).json({
      status: true,
      message: "Task updated successfully",
      data: populatedTask,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to update task: " + error.message,
    });
  }
};

// Delete task (HR only)
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userRole = req.user.role;

    if (userRole !== "hr") {
      return res.status(403).json({
        status: false,
        message: "Only HR can delete tasks",
      });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        status: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to delete task: " + error.message,
    });
  }
};

// Update task status
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userRole = req.user.role;

    if (!["pending", "inprogress", "completed"].includes(status)) {
      return res.status(400).json({
        status: false,
        message: "Invalid status",
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        status: false,
        message: "Task not found",
      });
    }

    // Only HR can change task status directly, or the assigned employee can update their own task status
    if (userRole !== "hr") {
      return res.status(403).json({
        status: false,
        message: "Only HR can update task status",
      });
    }

    task.status = status;
    const updatedTask = await task.save();

    const populatedTask = await Task.findById(updatedTask._id)
      .populate("assignedTo", "name email profileImage")
      .populate("createdBy", "name email");

    res.status(200).json({
      status: true,
      message: "Task status updated successfully",
      data: populatedTask,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to update task status: " + error.message,
    });
  }
};
