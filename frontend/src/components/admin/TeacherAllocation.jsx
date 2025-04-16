import { useState, useEffect } from 'react';
import { getToken } from '../../lib/auth';

function TeacherAllocation() {
  const [allocations, setAllocations] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAllocation, setEditingAllocation] = useState(null);
  const [formData, setFormData] = useState({
    teacherId: '',
    subjectId: '',
    batchId: '',
    division: '',
    academicYear: new Date().getFullYear().toString()
  });

  useEffect(() => {
    fetchAllocations();
    fetchTeachers();
    fetchSubjects();
    fetchBatches();
  }, []);

  const fetchAllocations = async () => {
    try {
      setLoading(true);
      const token = getToken();
      
      const response = await fetch('http://localhost:3000/api/admin/allocations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch teacher allocations');
      }
      
      const data = await response.json();
      setAllocations(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching teacher allocations:', err);
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

  const fetchBatches = async () => {
    try {
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
      console.error('Error fetching batches:', err);
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
      const url = editingAllocation 
        ? `http://localhost:3000/api/admin/allocations/${editingAllocation.id}`
        : 'http://localhost:3000/api/admin/allocations';
      
      const method = editingAllocation ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${editingAllocation ? 'update' : 'create'} teacher allocation`);
      }
      
      // Reset form and refresh allocations
      setFormData({
        teacherId: '',
        subjectId: '',
        batchId: '',
        division: '',
        academicYear: new Date().getFullYear().toString()
      });
      setShowForm(false);
      setEditingAllocation(null);
      fetchAllocations();
    } catch (err) {
      setError(err.message);
      console.error(`Error ${editingAllocation ? 'updating' : 'creating'} teacher allocation:`, err);
    }
  };

  const handleEdit = (allocation) => {
    setEditingAllocation(allocation);
    setFormData({
      teacherId: allocation.teacherId,
      subjectId: allocation.subjectId,
      batchId: allocation.batchId,
      division: allocation.division || '',
      academicYear: allocation.academicYear || new Date().getFullYear().toString()
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this teacher allocation?')) {
      return;
    }
    
    try {
      const token = getToken();
      
      const response = await fetch(`http://localhost:3000/api/admin/allocations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete teacher allocation');
      }
      
      fetchAllocations();
    } catch (err) {
      setError(err.message);
      console.error('Error deleting teacher allocation:', err);
    }
  };

  const getTeacherName = (teacherId) => {
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? teacher.User?.name || 'Unknown Teacher' : 'Unknown Teacher';
  };

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'Unknown Subject';
  };

  const getBatchName = (batchId) => {
    const batch = batches.find(b => b.id === batchId);
    return batch ? batch.name : 'Unknown Batch';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#155E95]">Teacher Allocation</h2>
        <button
          onClick={() => {
            setEditingAllocation(null);
            setFormData({
              teacherId: '',
              subjectId: '',
              batchId: '',
              division: '',
              academicYear: new Date().getFullYear().toString()
            });
            setShowForm(true);
          }}
          className="bg-[#155E95] text-white px-4 py-2 rounded hover:bg-[#0d4a7a] transition"
        >
          Add New Allocation
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-medium mb-4">
            {editingAllocation ? 'Edit Teacher Allocation' : 'Create New Teacher Allocation'}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teacher
                </label>
                <select
                  name="teacherId"
                  value={formData.teacherId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#155E95]"
                  required
                >
                  <option value="">Select a teacher</option>
                  {teachers.map(teacher => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.User?.name || 'Unknown Teacher'}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  name="subjectId"
                  value={formData.subjectId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#155E95]"
                  required
                >
                  <option value="">Select a subject</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name} ({subject.code})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batch
                </label>
                <select
                  name="batchId"
                  value={formData.batchId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#155E95]"
                  required
                >
                  <option value="">Select a batch</option>
                  {batches.map(batch => (
                    <option key={batch.id} value={batch.id}>
                      {batch.name} ({batch.year || 'N/A'} - {batch.division || 'N/A'})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Division
                </label>
                <input
                  type="text"
                  name="division"
                  value={formData.division}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#155E95]"
                  placeholder="e.g., A, B, C"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Academic Year
                </label>
                <input
                  type="text"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#155E95]"
                  placeholder="e.g., 2023-2024"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingAllocation(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#155E95] text-white rounded hover:bg-[#0d4a7a]"
              >
                {editingAllocation ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#155E95]"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teacher
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Division
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Academic Year
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allocations.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No teacher allocations found
                  </td>
                </tr>
              ) : (
                allocations.map((allocation) => (
                  <tr key={allocation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {getTeacherName(allocation.teacherId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getSubjectName(allocation.subjectId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getBatchName(allocation.batchId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {allocation.division || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {allocation.academicYear || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(allocation)}
                        className="text-[#155E95] hover:text-[#0d4a7a] mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(allocation.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TeacherAllocation; 