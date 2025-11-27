const adminRepository = require('../repositories/admin.repository');

class AdminService {
  /**
   * Verify admin exists and return admin data
   * @throws {Error} If admin not found
   */
  async verifyAdmin(adminId) {
    if (!adminId) {
      throw new Error('Admin ID is required');
    }

    const admin = await adminRepository.findById(adminId);
    if (!admin) {
      throw new Error('Invalid admin ID');
    }

    return admin;
  }

  /**
   * Get all admins
   */
  async getAllAdmins() {
    return await adminRepository.findAll();
  }
}

module.exports = new AdminService();

