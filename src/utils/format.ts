import { format, parseISO, isToday, isYesterday, isThisWeek, isThisMonth } from 'date-fns';

export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Add +91 if not present
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    return `+${cleaned}`;
  } else if (cleaned.length === 10) {
    return `+91${cleaned}`;
  }
  
  return phone;
};

export const formatDate = (dateString: string, formatStr: string = 'dd-MM-yyyy'): string => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, formatStr);
  } catch (error) {
    return dateString;
  }
};

export const formatDateTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'dd-MM-yyyy HH:mm');
  } catch (error) {
    return dateString;
  }
};

export const formatRelativeDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    
    if (isToday(date)) {
      return 'Today';
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else if (isThisWeek(date)) {
      return format(date, 'EEEE');
    } else if (isThisMonth(date)) {
      return format(date, 'dd MMM');
    } else {
      return format(date, 'dd-MM-yyyy');
    }
  } catch (error) {
    return dateString;
  }
};

export const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const getBalanceColor = (balance: number, isDark: boolean = false): string => {
  if (balance === 0) return isDark ? '#B0B0B0' : '#757575';
  if (balance > 5000) return isDark ? '#EF5350' : '#F44336';
  if (balance > 2000) return isDark ? '#FFA726' : '#FF9800';
  return isDark ? '#FFCA28' : '#FFC107';
};

export const validatePhoneNumber = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || (cleaned.length === 12 && cleaned.startsWith('91'));
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const replaceVariables = (
  template: string,
  variables: { [key: string]: string }
): string => {
  let result = template;
  Object.keys(variables).forEach((key) => {
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    result = result.replace(regex, variables[key]);
  });
  return result;
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

export const groupByFirstLetter = <T extends { name: string }>(
  items: T[]
): { [key: string]: T[] } => {
  return items.reduce((acc, item) => {
    const letter = item.name[0].toUpperCase();
    if (!acc[letter]) {
      acc[letter] = [];
    }
    acc[letter].push(item);
    return acc;
  }, {} as { [key: string]: T[] });
};

export const sortAlphabetically = <T extends { name: string }>(items: T[]): T[] => {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
};

export const filterBySearch = <T extends { name: string }>(
  items: T[],
  searchTerm: string
): T[] => {
  if (!searchTerm.trim()) return items;
  const lowerSearch = searchTerm.toLowerCase();
  return items.filter((item) =>
    item.name.toLowerCase().includes(lowerSearch)
  );
};
