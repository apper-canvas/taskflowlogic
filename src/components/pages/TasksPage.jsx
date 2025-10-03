import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { isPast, parseISO } from "date-fns";
import Header from "@/components/organisms/Header";
import TaskForm from "@/components/organisms/TaskForm";
import FilterToolbar from "@/components/organisms/FilterToolbar";
import TaskList from "@/components/organisms/TaskList";
import Modal from "@/components/molecules/Modal";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import taskService from "@/services/api/taskService";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId);
      setTasks((prev) =>
        prev.map((task) => (task.Id === taskId ? updatedTask : task))
      );
      toast.success(
        updatedTask.completed ? "Task completed! 🎉" : "Task reopened"
      );
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;

    try {
      await taskService.delete(taskToDelete);
      setTasks((prev) => prev.filter((task) => task.Id !== taskToDelete));
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Failed to delete task");
    } finally {
      setDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  };

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = [...tasks];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (filter === "active") {
      filtered = filtered.filter((task) => !task.completed);
    } else if (filter === "completed") {
      filtered = filtered.filter((task) => task.completed);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "priority": {
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        case "dueDate": {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        case "createdAt":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return filtered;
  }, [tasks, searchQuery, filter, sortBy]);

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
    };
  }, [tasks]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-12 w-48 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse mb-2" />
            <div className="h-4 w-32 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse" />
          </div>
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Error message={error} onRetry={loadTasks} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Header totalTasks={stats.total} completedTasks={stats.completed} />
        
        <TaskForm onTaskCreated={handleTaskCreated} />
        
        <FilterToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filter={filter}
          onFilterChange={setFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        
        <TaskList
          tasks={filteredAndSortedTasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteClick}
        />

        <Modal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Delete Task"
        >
          <p className="text-slate-600 mb-6">
            Are you sure you want to delete this task? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Delete Task
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TasksPage;