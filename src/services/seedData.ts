import { Customer, Transaction } from '../types';
import { generateId } from '../utils/format';
import { saveCustomer, saveTransaction } from './database';

const SAMPLE_CUSTOMERS = [
  {
    name: 'Rajesh Kumar',
    phoneNumber: '+919876543210',
    whatsappNumber: '+919876543210',
    balance: 5000,
    businessType: 'Grocery Store',
  },
  {
    name: 'प्रिया शर्मा',
    phoneNumber: '+919876543211',
    whatsappNumber: '+919876543211',
    balance: 2500,
    businessType: 'Restaurant',
  },
  {
    name: 'అమిత్ కుమార్',
    phoneNumber: '+919876543212',
    whatsappNumber: '+919876543212',
    balance: 15000,
    businessType: 'Electronics Shop',
  },
  {
    name: 'ಮರಿಯಮ್ಮ',
    phoneNumber: '+919876543213',
    whatsappNumber: '+919876543213',
    balance: 8000,
    businessType: 'Clothing Store',
  },
  {
    name: 'Mohammed Ali',
    phoneNumber: '+919876543214',
    whatsappNumber: '+919876543214',
    balance: 0,
    businessType: 'Hardware Store',
  },
  {
    name: 'சுரேஷ் குமார்',
    phoneNumber: '+919876543215',
    whatsappNumber: '+919876543215',
    balance: 3200,
    businessType: 'Medical Store',
  },
  {
    name: 'পূজা দাস',
    phoneNumber: '+919876543216',
    whatsappNumber: '+919876543216',
    balance: 12000,
    businessType: 'Salon/Spa',
  },
  {
    name: 'Deepak Patel',
    phoneNumber: '+919876543217',
    whatsappNumber: '+919876543217',
    balance: 450,
    businessType: 'Retail Shop',
  },
  {
    name: 'മായ കുമാരി',
    phoneNumber: '+919876543218',
    whatsappNumber: '+919876543218',
    balance: 6700,
    businessType: 'Service Provider',
  },
  {
    name: 'ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ',
    phoneNumber: '+919876543219',
    whatsappNumber: '+919876543219',
    balance: 22000,
    businessType: 'Wholesale',
  },
];

const PAYMENT_METHODS: Array<'cash' | 'check' | 'digital' | 'other'> = ['cash', 'digital', 'check', 'other'];
const STATUSES: Array<'paid' | 'due' | 'partial'> = ['paid', 'due', 'partial'];
const TRANSACTION_TYPES: Array<'sale' | 'payment'> = ['sale', 'payment'];

const getRandomElement = <T,>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomAmount = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString();
};

export const seedSampleData = async (userId: string): Promise<void> => {
  try {
    console.log('Seeding sample data...');

    // Create sample customers
    const customers: Customer[] = [];
    for (const sampleCustomer of SAMPLE_CUSTOMERS) {
      const customer: Customer = {
        id: generateId(),
        userId,
        name: sampleCustomer.name,
        phoneNumber: sampleCustomer.phoneNumber,
        whatsappNumber: sampleCustomer.whatsappNumber,
        businessType: sampleCustomer.businessType,
        balance: sampleCustomer.balance,
        lastTransactionDate: getRandomDate(30),
        createdAt: getRandomDate(90),
      };
      await saveCustomer(customer);
      customers.push(customer);
    }

    // Create sample transactions
    for (let i = 0; i < 20; i++) {
      const customer = getRandomElement(customers);
      const type = getRandomElement(TRANSACTION_TYPES);
      const status = getRandomElement(STATUSES);
      
      const transaction: Transaction = {
        id: generateId(),
        customerId: customer.id,
        customerName: customer.name,
        amount: getRandomAmount(500, 15000),
        type,
        paymentMethod: status === 'paid' ? getRandomElement(PAYMENT_METHODS) : undefined,
        description: type === 'sale' ? 'Product purchase' : 'Payment received',
        status,
        createdAt: getRandomDate(30),
      };
      
      await saveTransaction(transaction);
    }

    console.log('Sample data seeded successfully');
  } catch (error) {
    console.error('Error seeding sample data:', error);
    throw error;
  }
};
