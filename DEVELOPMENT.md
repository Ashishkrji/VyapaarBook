# VyapaarBook - Development Guide

## Getting Started

### Initial Setup
```bash
# Install dependencies
npm install

# Start development server
npm start

# Or with cache clearing
npm start -- --clear
```

### Development Workflow

1. **Make Changes** - Edit files in `/src`
2. **Hot Reload** - Changes reflect instantly in Expo Go
3. **Test** - Shake device for dev menu
4. **Debug** - Use React DevTools or console.log
5. **Commit** - Use conventional commits

## Project Architecture

### Folder Responsibilities

```
/src
  /screens      - Full screen components
  /components   - Reusable UI pieces
  /navigation   - Navigation config
  /store        - Redux state management
  /services     - External integrations (DB, API)
  /hooks        - Custom React hooks
  /utils        - Helper functions
  /types        - TypeScript definitions
  /i18n         - Translations
  /constants    - App-wide constants
  /assets       - Images, fonts
```

### When to Create What

**New Screen:**
```typescript
// 1. Create in /src/screens/MyScreen.tsx
// 2. Add route type to RootStackParamList
// 3. Add to AppNavigator.tsx or MainTabs.tsx
// 4. Use existing screen templates as reference
```

**New Component:**
```typescript
// 1. Create in /src/components/MyComponent.tsx
// 2. Export as default
// 3. Make it reusable (accept props)
// 4. Use theme colors from constants
```

**New Redux Slice:**
```typescript
// 1. Create in /src/store/slices/mySlice.ts
// 2. Define state interface in /src/types/index.ts
// 3. Import and add to store in /src/store/index.ts
```

**New Utility:**
```typescript
// 1. Add to /src/utils/myUtil.ts
// 2. Export functions
// 3. Add TypeScript types
// 4. Write pure functions (no side effects)
```

## Coding Standards

### TypeScript
```typescript
// ✅ Good
interface Props {
  name: string;
  age: number;
  onPress: () => void;
}

const MyComponent: React.FC<Props> = ({ name, age, onPress }) => {
  // ...
};

// ❌ Bad
const MyComponent = (props: any) => {
  // ...
};
```

### Component Structure
```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../store';
import { COLORS, SIZES } from '../constants/theme';

interface Props {
  // Props here
}

const MyComponent: React.FC<Props> = ({ /* props */ }) => {
  // 1. Hooks
  const { isDarkTheme } = useAppSelector((state) => state.settings);
  const [state, setState] = useState();

  // 2. Derived values
  const colors = isDarkTheme ? COLORS.dark : COLORS.light;

  // 3. Effects
  useEffect(() => {
    // Side effects
  }, []);

  // 4. Handlers
  const handlePress = () => {
    // Logic
  };

  // 5. Render
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Content</Text>
    </View>
  );
};

// 6. Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.md,
  },
  text: {
    fontSize: SIZES.md,
  },
});

export default MyComponent;
```

### Styling
```typescript
// ✅ Use theme constants
import { COLORS, SIZES, FONTS } from '../constants/theme';

const styles = StyleSheet.create({
  container: {
    padding: SIZES.md,
    borderRadius: SIZES.sm,
  },
  text: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.light.text, // or get from theme
  },
});

// ❌ Don't hardcode
const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
});
```

### State Management

**When to use Redux:**
- Data needed across multiple screens
- User authentication state
- App-wide settings
- Data from database/API

**When to use local state:**
- Form inputs
- UI state (expanded/collapsed)
- Loading/error states
- Temporary data

```typescript
// Redux
const { customers } = useAppSelector((state) => state.customers);
const dispatch = useAppDispatch();
dispatch(addCustomer(newCustomer));

// Local state
const [searchQuery, setSearchQuery] = useState('');
```

### Navigation

```typescript
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type MyScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MyScreen'
>;

interface Props {
  navigation: MyScreenNavigationProp;
}

// Navigate with params
navigation.navigate('CustomerDetail', { customerId: '123' });

// Navigate back
navigation.goBack();

// Replace screen
navigation.replace('MainTabs');
```

### Internationalization

```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

// Use in JSX
<Text>{t('home.greeting', { name: 'John' })}</Text>

// Use in code
const message = t('customers.customerAdded');
```

### Database Operations

```typescript
import { saveCustomer, getAllCustomers } from '../services/database';

// Save
await saveCustomer(customerData);

// Get all
const customers = await getAllCustomers(userId);

// Update Redux
dispatch(setCustomers(customers));
```

## Common Patterns

### Loading State
```typescript
const [loading, setLoading] = useState(false);

const loadData = async () => {
  setLoading(true);
  try {
    const data = await fetchData();
    setData(data);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoading(false);
  }
};

return loading ? <ActivityIndicator /> : <DataView />;
```

### Form Handling
```typescript
const [name, setName] = useState('');
const [errors, setErrors] = useState<{ [key: string]: string }>({});

const validate = () => {
  const newErrors: { [key: string]: string } = {};
  if (!name.trim()) {
    newErrors.name = t('validation.required');
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  if (!validate()) return;
  // Submit logic
};
```

### List Rendering
```typescript
<FlatList
  data={customers}
  renderItem={({ item }) => <CustomerCard customer={item} />}
  keyExtractor={(item) => item.id}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
  ListEmptyComponent={<EmptyState />}
/>
```

## Debugging

### Console Logging
```typescript
console.log('Debug:', data);
console.warn('Warning:', message);
console.error('Error:', error);
```

### React DevTools
```bash
# Install globally
npm install -g react-devtools

# Run
react-devtools

# In Expo Go, shake device → "Toggle Element Inspector"
```

### Redux DevTools
```typescript
// State inspection
const state = store.getState();
console.log('Current state:', state);

// In component
const customers = useAppSelector((state) => state.customers);
console.log('Customers:', customers);
```

### Database Debugging
```typescript
import { getAllCustomers, getAllTransactions } from '../services/database';

const debugDB = async () => {
  const customers = await getAllCustomers(userId);
  const transactions = await getAllTransactions();
  console.log('DB Customers:', customers);
  console.log('DB Transactions:', transactions);
};
```

## Testing

### Manual Testing Checklist

**Authentication Flow:**
- [ ] Splash screen displays for 2 seconds
- [ ] Language selection works
- [ ] Login accepts 10-digit number
- [ ] OTP accepts any 6 digits
- [ ] Registration saves to database
- [ ] Sample data loads on first registration

**Home Screen:**
- [ ] Greeting shows correct time-based message
- [ ] Summary cards show correct data
- [ ] Transactions list displays recent items
- [ ] Pull-to-refresh works
- [ ] FAB navigates to add transaction

**Navigation:**
- [ ] All tabs navigate correctly
- [ ] Back button works
- [ ] Screen transitions are smooth
- [ ] Tab bar highlights active tab

**Settings:**
- [ ] Language switching works instantly
- [ ] Theme toggle works
- [ ] Changes persist after app restart

**Offline:**
- [ ] App works without internet
- [ ] Data persists in SQLite
- [ ] No crashes when offline

### Test Different Scenarios

1. **First-time user** - Fresh install
2. **Returning user** - Launch after closing
3. **Different languages** - Switch between all 10
4. **Dark theme** - Toggle theme in settings
5. **Data operations** - Add, edit, delete customers/transactions
6. **Edge cases** - Empty lists, long names, large numbers

## Performance Tips

1. **Use FlatList** for long lists, not ScrollView
2. **Memoize** expensive components with React.memo
3. **useCallback** for functions passed as props
4. **Optimize images** - compress before including
5. **Lazy load** - defer loading non-critical data
6. **SQLite indexes** - already added on foreign keys

## Common Issues & Solutions

**Issue: Metro bundler won't start**
```bash
npm start -- --clear
```

**Issue: Changes not reflecting**
```bash
# Reload app in Expo Go
# Or restart metro bundler
```

**Issue: SQLite errors**
```bash
# Clear app data in Expo Go
# Or reinstall app
```

**Issue: Type errors**
```bash
npm run type-check
# Fix errors shown
```

**Issue: Navigation errors**
```typescript
// Check route names match types
// Check all screens are registered
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/customer-list

# Make changes
# Commit frequently
git add .
git commit -m "feat: add customer list screen"

# Push
git push origin feature/customer-list

# Create pull request
```

### Commit Message Convention
```
feat: new feature
fix: bug fix
docs: documentation
style: formatting
refactor: code restructure
test: add tests
chore: maintenance
```

## Code Review Checklist

- [ ] TypeScript types defined
- [ ] No `any` types
- [ ] Error handling present
- [ ] Loading states handled
- [ ] Empty states handled
- [ ] Uses theme colors
- [ ] Uses i18n for text
- [ ] Follows file structure
- [ ] No console.logs (except error)
- [ ] Responsive to different screen sizes

## Resources

- **Expo Docs:** https://docs.expo.dev/
- **React Native Docs:** https://reactnative.dev/
- **React Navigation:** https://reactnavigation.org/
- **Redux Toolkit:** https://redux-toolkit.js.org/
- **TypeScript:** https://www.typescriptlang.org/

## Need Help?

1. Check QUICKSTART.md
2. Check PROJECT_STRUCTURE.md
3. Check IMPLEMENTATION_NOTES.md
4. Search existing code for examples
5. Check React Native/Expo docs

---

Happy coding! 🚀
