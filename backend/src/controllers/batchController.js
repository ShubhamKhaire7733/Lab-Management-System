import { Batch, Teacher } from '../models/index.js';

export const createBatch = async (req, res) => {
  try {
    const {
      name,
      year,
      division,
      day,
      time,
      startDate,
      endDate,
      teacherId
    } = req.body;

    // Validate required fields
    if (!name || !year || !division || !day || !time || !startDate || !endDate || !teacherId) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate year enum
    if (!['SE', 'TE', 'BE'].includes(year)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid year value. Must be SE, TE, or BE'
      });
    }

    // Validate division enum
    if (!['9', '10', '11'].includes(division)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid division value. Must be 9, 10, or 11'
      });
    }

    // Validate day enum
    if (!['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].includes(day)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid day value'
      });
    }

    // Check if teacher exists
    const teacher = await Teacher.findByPk(teacherId);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    // Create batch
    const batch = await Batch.create({
      name,
      year,
      division,
      day,
      time,
      startDate,
      endDate,
      teacherId
    });

    res.status(201).json({
      success: true,
      message: 'Batch created successfully',
      data: batch
    });
  } catch (error) {
    console.error('Error creating batch:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create batch',
      error: error.message
    });
  }
};

export const getBatches = async (req, res) => {
  try {
    const batches = await Batch.findAll({
      include: [{
        model: Teacher,
        attributes: ['id', 'name', 'department']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: batches
    });
  } catch (error) {
    console.error('Error fetching batches:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch batches',
      error: error.message
    });
  }
};

export const updateBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      year,
      division,
      day,
      time,
      startDate,
      endDate,
      teacherId
    } = req.body;

    // Find the batch
    const batch = await Batch.findByPk(id);
    if (!batch) {
      return res.status(404).json({
        success: false,
        message: 'Batch not found'
      });
    }

    // Validate required fields
    if (!name || !year || !division || !day || !time || !startDate || !endDate || !teacherId) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate year enum
    if (!['SE', 'TE', 'BE'].includes(year)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid year value. Must be SE, TE, or BE'
      });
    }

    // Validate division enum
    if (!['9', '10', '11'].includes(division)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid division value. Must be 9, 10, or 11'
      });
    }

    // Validate day enum
    if (!['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].includes(day)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid day value'
      });
    }

    // Check if teacher exists
    const teacher = await Teacher.findByPk(teacherId);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    // Update batch
    await batch.update({
      name,
      year,
      division,
      day,
      time,
      startDate,
      endDate,
      teacherId
    });

    res.json({
      success: true,
      message: 'Batch updated successfully',
      data: batch
    });
  } catch (error) {
    console.error('Error updating batch:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update batch',
      error: error.message
    });
  }
};

export const deleteBatch = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the batch
    const batch = await Batch.findByPk(id);
    if (!batch) {
      return res.status(404).json({
        success: false,
        message: 'Batch not found'
      });
    }

    // Delete batch (soft delete)
    await batch.destroy();

    res.json({
      success: true,
      message: 'Batch deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting batch:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete batch',
      error: error.message
    });
  }
}; 