import * as SQLite from 'expo-sqlite';
import { Customer, Transaction, Reminder, User } from '../types';

let db: SQLite.SQLiteDatabase;

export const initDatabase = async (): Promise<void> => {
  try {
    db = await SQLite.openDatabaseAsync('vyapaarbook.db');

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        businessName TEXT NOT NULL,
        ownerName TEXT NOT NULL,
        phoneNumber TEXT NOT NULL,
        whatsappNumber TEXT,
        languageCode TEXT DEFAULT 'en',
        photoUrl TEXT,
        businessCategory TEXT,
        address TEXT,
        createdAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS customers (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        name TEXT NOT NULL,
        phoneNumber TEXT NOT NULL,
        whatsappNumber TEXT,
        address TEXT,
        photoUrl TEXT,
        businessType TEXT,
        notes TEXT,
        balance REAL DEFAULT 0,
        lastTransactionDate TEXT,
        createdAt TEXT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users (id)
      );

      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        customerId TEXT NOT NULL,
        customerName TEXT,
        amount REAL NOT NULL,
        type TEXT NOT NULL,
        paymentMethod TEXT,
        description TEXT,
        photoUrl TEXT,
        status TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        FOREIGN KEY (customerId) REFERENCES customers (id)
      );

      CREATE TABLE IF NOT EXISTS reminders (
        id TEXT PRIMARY KEY,
        customerId TEXT NOT NULL,
        templateId INTEGER,
        messageText TEXT NOT NULL,
        sentAt TEXT,
        scheduledFor TEXT,
        createdAt TEXT NOT NULL,
        FOREIGN KEY (customerId) REFERENCES customers (id)
      );

      CREATE INDEX IF NOT EXISTS idx_customers_userId ON customers(userId);
      CREATE INDEX IF NOT EXISTS idx_transactions_customerId ON transactions(customerId);
      CREATE INDEX IF NOT EXISTS idx_reminders_customerId ON reminders(customerId);
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// User operations
export const saveUser = async (user: User): Promise<void> => {
  if (!db) throw new Error('Database not initialized');
  
  await db.runAsync(
    `INSERT OR REPLACE INTO users (id, businessName, ownerName, phoneNumber, whatsappNumber, languageCode, photoUrl, businessCategory, address, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user.id,
      user.businessName,
      user.ownerName,
      user.phoneNumber,
      user.whatsappNumber || null,
      user.languageCode,
      user.photoUrl || null,
      user.businessCategory || null,
      user.address || null,
      user.createdAt,
    ]
  );
};

export const getUser = async (userId: string): Promise<User | null> => {
  if (!db) throw new Error('Database not initialized');
  
  const result = await db.getFirstAsync<User>(
    'SELECT * FROM users WHERE id = ?',
    [userId]
  );
  
  return result || null;
};

// Customer operations
export const saveCustomer = async (customer: Customer): Promise<void> => {
  if (!db) throw new Error('Database not initialized');
  
  await db.runAsync(
    `INSERT OR REPLACE INTO customers (id, userId, name, phoneNumber, whatsappNumber, address, photoUrl, businessType, notes, balance, lastTransactionDate, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      customer.id,
      customer.userId,
      customer.name,
      customer.phoneNumber,
      customer.whatsappNumber || null,
      customer.address || null,
      customer.photoUrl || null,
      customer.businessType || null,
      customer.notes || null,
      customer.balance,
      customer.lastTransactionDate || null,
      customer.createdAt,
    ]
  );
};

export const getAllCustomers = async (userId: string): Promise<Customer[]> => {
  if (!db) throw new Error('Database not initialized');
  
  const results = await db.getAllAsync<Customer>(
    'SELECT * FROM customers WHERE userId = ? ORDER BY name ASC',
    [userId]
  );
  
  return results || [];
};

export const getCustomer = async (customerId: string): Promise<Customer | null> => {
  if (!db) throw new Error('Database not initialized');
  
  const result = await db.getFirstAsync<Customer>(
    'SELECT * FROM customers WHERE id = ?',
    [customerId]
  );
  
  return result || null;
};

export const deleteCustomerFromDB = async (customerId: string): Promise<void> => {
  if (!db) throw new Error('Database not initialized');
  
  await db.runAsync('DELETE FROM customers WHERE id = ?', [customerId]);
};

export const updateCustomerBalance = async (customerId: string, balance: number): Promise<void> => {
  if (!db) throw new Error('Database not initialized');
  
  await db.runAsync(
    'UPDATE customers SET balance = ? WHERE id = ?',
    [balance, customerId]
  );
};

// Transaction operations
export const saveTransaction = async (transaction: Transaction): Promise<void> => {
  if (!db) throw new Error('Database not initialized');
  
  await db.runAsync(
    `INSERT INTO transactions (id, customerId, customerName, amount, type, paymentMethod, description, photoUrl, status, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      transaction.id,
      transaction.customerId,
      transaction.customerName || null,
      transaction.amount,
      transaction.type,
      transaction.paymentMethod || null,
      transaction.description || null,
      transaction.photoUrl || null,
      transaction.status,
      transaction.createdAt,
    ]
  );
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
  if (!db) throw new Error('Database not initialized');
  
  const results = await db.getAllAsync<Transaction>(
    'SELECT * FROM transactions ORDER BY createdAt DESC'
  );
  
  return results || [];
};

export const getCustomerTransactions = async (customerId: string): Promise<Transaction[]> => {
  if (!db) throw new Error('Database not initialized');
  
  const results = await db.getAllAsync<Transaction>(
    'SELECT * FROM transactions WHERE customerId = ? ORDER BY createdAt DESC',
    [customerId]
  );
  
  return results || [];
};

export const deleteTransactionFromDB = async (transactionId: string): Promise<void> => {
  if (!db) throw new Error('Database not initialized');
  
  await db.runAsync('DELETE FROM transactions WHERE id = ?', [transactionId]);
};

// Reminder operations
export const saveReminder = async (reminder: Reminder): Promise<void> => {
  if (!db) throw new Error('Database not initialized');
  
  await db.runAsync(
    `INSERT INTO reminders (id, customerId, templateId, messageText, sentAt, scheduledFor, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      reminder.id,
      reminder.customerId,
      reminder.templateId || null,
      reminder.messageText,
      reminder.sentAt || null,
      reminder.scheduledFor || null,
      reminder.createdAt,
    ]
  );
};

export const getCustomerReminders = async (customerId: string): Promise<Reminder[]> => {
  if (!db) throw new Error('Database not initialized');
  
  const results = await db.getAllAsync<Reminder>(
    'SELECT * FROM reminders WHERE customerId = ? ORDER BY createdAt DESC',
    [customerId]
  );
  
  return results || [];
};

export const clearAllData = async (): Promise<void> => {
  if (!db) throw new Error('Database not initialized');
  
  await db.execAsync(`
    DELETE FROM reminders;
    DELETE FROM transactions;
    DELETE FROM customers;
    DELETE FROM users;
  `);
};
