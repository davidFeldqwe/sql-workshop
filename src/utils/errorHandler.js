/**
 * Error handler utility for converting service errors to HTTP responses
 */
function handleServiceError(error, res) {
  console.error('Service error:', error);

  // Handle known error codes
  if (error.code === 'DUPLICATE_SCHOOL_CODE' || error.code === 'DUPLICATE_EMAIL') {
    return res.status(409).json({ error: error.message });
  }

  // Handle validation errors
  if (error.message.includes('required') || 
      error.message.includes('must be') || 
      error.message.includes('Invalid')) {
    return res.status(400).json({ error: error.message });
  }

  // Handle not found errors
  if (error.message.includes('not found')) {
    return res.status(404).json({ error: error.message });
  }

  // Default to 500
  return res.status(500).json({ error: error.message || 'Internal server error' });
}

module.exports = { handleServiceError };

