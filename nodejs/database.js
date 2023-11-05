const fs = require('fs/promises')
const mysql = require('mysql2/promise');
const path = require('path');

let connection = null

async function connect() {
  connection = await mysql.createConnection({
    host: 'database',
    user: 'root',
    port: 3306,
    password: 'root',
    database: 'nodejs',
  });
}

async function disconnect() {
  if (!connection) {
    throw new Error('Connection not estabilished')
  }
  await connection.destroy()
}

async function runMigrations() {
  if (!connection) {
    throw new Error('Connection not estabilished')
  }
  const migrationsFiles = await fs.readdir(path.join(__dirname, 'migrations'))
  for (const fileMigration of migrationsFiles) {
    const migration = await fs.readFile(path.join(__dirname, 'migrations', fileMigration), 'utf-8')
    await connection.execute(migration)
  }
}

async function execute(sql, params) {
  if (!connection) {
    throw new Error('Connection not estabilished')
  }

  const [results,] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  connect,
  disconnect,
  runMigrations,
  execute
}