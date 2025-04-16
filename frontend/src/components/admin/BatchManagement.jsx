import { useState, useEffect } from 'react';
import { getToken } from '../../lib/auth';

function BatchManagement() {
  const [batches, setBatches] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    division: '',
    day: '',
    time: '',
    startDate: '',
    endDate: '',
    teacherId: '',
    subjectId: ''
  });

  useEffect(() => {
    fetchBatches();
    fetchTeachers();
    fetchSubjects();
  }, []);

  const fetchBatches = async () => {
    try {
      setLoading(true);
      const token = getToken();
      
      const response = await fetch('http://localhost:3000/api/admin/batches', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch batches');
      }
      
      const data = await response.json();
      setBatches(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching batches:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const token = getToken();
      
      const response = await fetch('http://localhost:3000/api/admin/teachers', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch teachers');
      }
      
      const data = await response.json();
      setTeachers(data);
    } catch (err) {
      console.error('Error fetching teachers:', err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const token = getToken();
      
      const response = await fetch('http://localhost:3000/api/admin/subjects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch subjects');
      }
      
      const data = await response.json();
      setSubjects(data);
    } catch (err) {
      console.error('Error fetching subjects:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = getToken();
      const url = editingBatch 
        ? `http://localhost:3000/api/admin/batches/${editingBatch.id}`
        : 'http://localhost:3000/api/admin/batches';
      
      const method = editingBatch ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${editingBatch ? 'update' : 'create'} batch`);
      }
      
      // Reset form and refresh batches
      setFormData({
        name: '',
        year: '',
        division: '',
        day: '',
        time: '',
        startDate: '',
        endDate: '',
        teacherId: '',
        subjectId: ''
      });
      setShowForm(false);
      setEditingBatch(null);
      fetchBatches();
    } catch (err) {
      setError(err.message);
      console.error(`Error ${editingBatch ? 'updating' : 'creating'} batch:`, err);
    }
  };

  const handleEdit = (batch) => {
    setEditingBatch(batch);
    setFormData({
      name: batch.name,
      year: batch.year || '',
      division: batch.division || '',
      day: batch.day || '',
      time: batch.time || '',
      startDate: batch.startDate ? new Date(batch.startDate).toISOString().split('T')[0] : '',
      endDate: batch.endDate ? new Date(batch.endDate).toISOString().split('T')[0] : '',
      teacherId: batch.teacherId || '',
      subjectId: batch.subjectId || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this batch?')) {
      return;
    }
    
    try {
      const token = getToken();
      
      const response = await fetch(`http://localhost:3000/api/admin/batches/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete batch');
      }
      
      fetchBatches();
    } catch (err) {
      setError(err.message);
      console.error('Error deleting batch:', err);
    }
  };

  const getTeacherName = (teacherId) => {
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : 'Unknown';
  };

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'Unknown';
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Batch Management</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (!showForm) {
              setEditingBatch(null);
              setFormData({
                name: '',
                year: '',
                division: '',
                day: '',
                time: '',
                startDate: '',
                endDate: '',
                teacherId: '',
                subjectId: ''
              });
            }
          }}
          className="bg-[#155E95] text-white px-4 py-2 rounded hover:bg-[#0d4a7a] transition-colors"
        >
          {showForm ? 'Cancel' : 'Add New Batch'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Batch Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#155E95] focus:border-[#155E95]"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#155E95] focus:border-[#155E95]"
                required
              >
                <option value="">Select Year</option>
                <option value="SE">SE</option>
                <option value="TE">TE</option>
                <option value="BE">BE</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
              <select
                name="division"
                value={formData.division}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#155E95] focus:border-[#155E95]"
                required
              >
                <option value="">Select Division</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
              <select
                name="day"
                value={formData.day}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#155E95] focus:border-[#155E95]"
                required
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#155E95] focus:border-[#155E95]"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
              <select
                name="teacherId"
                value={formData.teacherId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#155E95] focus:border-[#155E95]"
                required
              >
                <option value="">Select Teacher</option>
                {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                name="subjectId"
                value={formData.subjectId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#155E95] focus:border-[#155E95]"
                required
              >
                <option value="">Select Subject</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#155E95] focus:border-[#155E95]"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#155E95] focus:border-[#155E95]"
                required
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-[#155E95] text-white px-4 py-2 rounded hover:bg-[#0d4a7a] transition-colors"
            >
              {editingBatch ? 'Update Batch' : 'Create Batch'}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#155E95]"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Division</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {batches.map(batch => (
                <tr key={batch.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{batch.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{batch.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{batch.division}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{batch.day}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{batch.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getTeacherName(batch.teacherId)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getSubjectName(batch.subjectId)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(batch)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(batch.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BatchManagement; 