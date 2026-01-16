export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  VERIFY_OTP: '/auth/verify-otp',
  REGISTER: '/auth/register',
  CUSTOMERS: '/customers',
  TRANSACTIONS: '/transactions',
  REMINDERS: '/reminders',
};

export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
];

export const BUSINESS_CATEGORIES = [
  'Retail Shop',
  'Grocery Store',
  'Restaurant',
  'Salon/Spa',
  'Medical Store',
  'Electronics Shop',
  'Clothing Store',
  'Hardware Store',
  'Service Provider',
  'Other',
];

export const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash' },
  { value: 'check', label: 'Check' },
  { value: 'digital', label: 'Digital' },
  { value: 'other', label: 'Other' },
];

export const REMINDER_TEMPLATES = [
  {
    id: 1,
    title: 'Friendly Reminder',
    message: 'Hello {Name}, this is a friendly reminder that you have a pending amount of ₹{Amount} with {BusinessName}. Please clear it at your convenience. Thank you!',
  },
  {
    id: 2,
    title: 'Payment Due',
    message: 'Dear {Name}, your payment of ₹{Amount} is due. Kindly make the payment soon. - {BusinessName}',
  },
  {
    id: 3,
    title: 'Urgent Payment',
    message: 'Hi {Name}, this is urgent! Please clear your pending amount of ₹{Amount} with {BusinessName} as soon as possible.',
  },
  {
    id: 4,
    title: 'Thank You',
    message: 'Thank you {Name} for your business! You have a pending balance of ₹{Amount}. Looking forward to your payment. - {BusinessName}',
  },
];

export const DATE_FILTERS = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'custom', label: 'Custom Range' },
];

export const TRANSACTION_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'paid', label: 'Paid' },
  { value: 'due', label: 'Due' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
];

export const OTP_RESEND_TIME = 60;
export const SPLASH_DURATION = 2000;
export const TOAST_DURATION = 2000;
export const REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes
