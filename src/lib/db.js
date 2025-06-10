// place files you want to import through the `$lib` alias in this folder.

import Database from 'better-sqlite3';
import { join } from 'path';

const dbPath = join(process.cwd(), 'data', 'donations.db');
const db = new Database(dbPath);

// Projects
export const projects = {
  getAll() {
    return db.prepare(`
      SELECT p.*, 
             COALESCE(SUM(CASE WHEN d.status = 'COMPLETED' THEN d.amount END), 0) as current_amount,
             COUNT(CASE WHEN d.status = 'COMPLETED' THEN 1 END) as donation_count
      FROM projects p
      LEFT JOIN donations d ON p.id = d.project_id
      WHERE p.is_active = 1
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `).all();
  },

  getById(id) {
    return db.prepare(`
      SELECT p.*, 
             COALESCE(SUM(CASE WHEN d.status = 'COMPLETED' THEN d.amount END), 0) as current_amount,
             COUNT(CASE WHEN d.status = 'COMPLETED' THEN 1 END) as donation_count
      FROM projects p
      LEFT JOIN donations d ON p.id = d.project_id
      WHERE p.id = ? AND p.is_active = 1
      GROUP BY p.id
    `).get(id);
  },

  create(data) {
    const stmt = db.prepare(`
      INSERT INTO projects (id, title, description, category, goal_amount, image_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(data.id, data.title, data.description, data.category, data.goal_amount, data.image_url);
  },

  update(id, data) {
    const stmt = db.prepare(`
      UPDATE projects 
      SET title = ?, description = ?, category = ?, goal_amount = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    return stmt.run(data.title, data.description, data.category, data.goal_amount, data.image_url, id);
  },

  delete(id) {
    const stmt = db.prepare('UPDATE projects SET is_active = 0 WHERE id = ?');
    return stmt.run(id);
  }
};

// Donations
export const donations = {
  create(data) {
    const stmt = db.prepare(`
      INSERT INTO donations (id, amount, transaction_id, phone_number, status, project_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(data.id, data.amount, data.transaction_id, data.phone_number, data.status, data.project_id);
  },

  updateStatus(transaction_id, status, mpesa_receipt_id = null) {
    const stmt = db.prepare(`
      UPDATE donations 
      SET status = ?, mpesa_receipt_id = ?, updated_at = CURRENT_TIMESTAMP
      WHERE transaction_id = ?
    `);
    return stmt.run(status, mpesa_receipt_id, transaction_id);
  },

  getByTransactionId(transaction_id) {
    return db.prepare(`
      SELECT d.*, p.title as project_title
      FROM donations d
      JOIN projects p ON d.project_id = p.id
      WHERE d.transaction_id = ?
    `).get(transaction_id);
  },

  getStats() {
    const totalDonations = db.prepare(`
      SELECT COUNT(*) as count FROM donations WHERE status = 'COMPLETED'
    `).get();

    const totalAmount = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total FROM donations WHERE status = 'COMPLETED'
    `).get();

    const recentDonations = db.prepare(`
      SELECT d.amount, d.created_at, p.title as project_title
      FROM donations d
      JOIN projects p ON d.project_id = p.id
      WHERE d.status = 'COMPLETED'
      ORDER BY d.created_at DESC
      LIMIT 10
    `).all();

    return {
      totalDonations: totalDonations.count,
      totalAmount: totalAmount.total,
      recentDonations
    };
  },

  getByProject(project_id) {
    return db.prepare(`
      SELECT * FROM donations 
      WHERE project_id = ? AND status = 'COMPLETED'
      ORDER BY created_at DESC
    `).all(project_id);
  }
};

// Admin stats
export const admin = {
  getDashboardStats() {
    const projectStats = db.prepare(`
      SELECT 
        p.id,
        p.title,
        p.category,
        p.goal_amount,
        COALESCE(SUM(CASE WHEN d.status = 'COMPLETED' THEN d.amount END), 0) as raised_amount,
        COUNT(CASE WHEN d.status = 'COMPLETED' THEN 1 END) as donation_count
      FROM projects p
      LEFT JOIN donations d ON p.id = d.project_id
      WHERE p.is_active = 1
      GROUP BY p.id
      ORDER BY raised_amount DESC
    `).all();

    const overallStats = db.prepare(`
      SELECT 
        COUNT(DISTINCT p.id) as total_projects,
        COUNT(CASE WHEN d.status = 'COMPLETED' THEN 1 END) as total_donations,
        COALESCE(SUM(CASE WHEN d.status = 'COMPLETED' THEN d.amount END), 0) as total_raised
      FROM projects p
      LEFT JOIN donations d ON p.id = d.project_id
      WHERE p.is_active = 1
    `).get();

    return {
      projectStats,
      overallStats
    };
  }
};

export default db;

