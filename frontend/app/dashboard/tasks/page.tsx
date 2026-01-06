'use client';

import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { tasksAPI } from '@/lib/endpoints';
import type { Task } from '@/lib/types';

type Filter = 'all' | 'completed' | 'active';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const queryParams = useMemo(() => {
    const completed = filter === 'completed' ? 'true' : filter === 'active' ? 'false' : undefined;
    return {
      search: search.trim() || undefined,
      completed,
    } as { search?: string; completed?: 'true' | 'false' };
  }, [search, filter]);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await tasksAPI.getAll(queryParams);
      setTasks(data.tasks);
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams.search, queryParams.completed]);

  const onCreate = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (title.trim().length < 3) {
      setError('Title must be at least 3 characters');
      return;
    }

    try {
      const { data } = await tasksAPI.create({ title: title.trim(), description: description.trim() || undefined });
      setTitle('');
      setDescription('');
      setTasks((prev) => [data.task, ...prev]);
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Failed to create task');
    }
  };

  const toggleCompleted = async (task: Task) => {
    try {
      const { data } = await tasksAPI.update(task._id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? data.task : t)));
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Failed to update task');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await tasksAPI.delete(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Failed to delete task');
    }
  };

  const updateTask = async (id: string, patch: { title?: string; description?: string }) => {
    try {
      const { data } = await tasksAPI.update(id, patch);
      setTasks((prev) => prev.map((t) => (t._id === id ? data.task : t)));
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Failed to update task');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
        <div>
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <p className="text-sm text-gray-600">Create, search, filter, and manage your tasks.</p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full md:w-72"
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value as Filter)} className="w-40">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded border border-red-200 bg-red-50 text-red-700 text-sm">{error}</div>
      )}

      <form onSubmit={onCreate} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-sm font-medium">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Description</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full" />
          </div>
        </div>
        <button className="btn-primary">Add Task</button>
      </form>

      <div className="space-y-3">
        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : tasks.length === 0 ? (
          <div className="text-gray-600">No tasks found.</div>
        ) : (
          tasks.map((task) => <TaskRow key={task._id} task={task} onToggle={toggleCompleted} onDelete={deleteTask} onUpdate={updateTask} />)
        )}
      </div>
    </div>
  );
}

function TaskRow({
  task,
  onToggle,
  onDelete,
  onUpdate,
}: {
  task: Task;
  onToggle: (t: Task) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, patch: { title?: string; description?: string }) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');

  const onSave = async () => {
    const nextTitle = title.trim();
    if (nextTitle.length < 3) return;
    await onUpdate(task._id, { title: nextTitle, description: description.trim() });
    setEditing(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {editing ? (
            <div className="space-y-2">
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full" />
              <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={task.completed} onChange={() => onToggle(task)} />
                <div className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</div>
              </div>
              {task.description ? <div className="mt-1 text-sm text-gray-600">{task.description}</div> : null}
            </>
          )}
        </div>

        <div className="flex gap-2">
          {editing ? (
            <>
              <button onClick={onSave} className="btn-primary">Save</button>
              <button onClick={() => setEditing(false)} className="btn-secondary">Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => setEditing(true)} className="btn-secondary">Edit</button>
              <button onClick={() => onDelete(task._id)} className="btn-danger">Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
