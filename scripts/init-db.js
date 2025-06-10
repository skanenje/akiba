
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbDir = join(__dirname, '..', 'data');
const dbPath = join(dbDir, 'donations.db');

// Ensure data directory exists
if (!existsSync(dbDir)) {
  mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    goal_amount REAL,
    current_amount REAL DEFAULT 0,
    image_url TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS donations (
    id TEXT PRIMARY KEY,
    amount REAL NOT NULL,
    transaction_id TEXT UNIQUE NOT NULL,
    mpesa_receipt_id TEXT,
    phone_number TEXT,
    status TEXT DEFAULT 'PENDING',
    project_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_donations_project_id ON donations(project_id);
  CREATE INDEX IF NOT EXISTS idx_donations_transaction_id ON donations(transaction_id);
  CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
`);

// Insert sample projects
const insertProject = db.prepare(`
  INSERT OR IGNORE INTO projects (id, title, description, category, goal_amount, image_url)
  VALUES (?, ?, ?, ?, ?, ?)
`);

const sampleProjects = [
  {
    id: 'proj_1',
    title: 'Clean Water Initiative',
    description: 'Providing clean water access to rural communities through well construction and water purification systems.',
    category: 'Health',
    goal_amount: 50000,
    image_url: 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=400&h=300&fit=crop'
  },
  {
    id: 'proj_2',
    title: 'Education for All',
    description: 'Supporting underprivileged children with school supplies, uniforms, and learning materials.',
    category: 'Education',
    goal_amount: 25000,
    image_url: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop'
  },
  {
    id: 'proj_3',
    title: 'Food Security Program',
    description: 'Addressing hunger in vulnerable communities through food distribution and nutrition programs.',
    category: 'Nutrition',
    goal_amount: 35000,
    image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop'
  },
  {
    id: 'proj_4',
    title: 'Green Environment Project',
    description: 'Tree planting and environmental conservation efforts to combat climate change.',
    category: 'Environment',
    goal_amount: 20000,
    image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop'
  }
];

sampleProjects.forEach(project => {
  insertProject.run(project.id, project.title, project.description, project.category, project.goal_amount, project.image_url);
});

console.log('✅ Database initialized with sample projects');
console.log(`📁 Database location: ${dbPath}`);

db.close();
