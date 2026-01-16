# VyapaarBook Project Structure

## Directory Overview

```
vyapaarbook/
├── App.tsx                      # Root component with providers
├── app.json                     # Expo configuration
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── babel.config.js             # Babel configuration
├── .eslintrc.js                # ESLint configuration
├── .prettierrc.js              # Prettier configuration
├── .gitignore                  # Git ignore rules
├── README.md                   # Main documentation
├── QUICKSTART.md               # Quick start guide
├── CHANGELOG.md                # Version history
├── PROJECT_STRUCTURE.md        # This file
├── .env.example                # Environment variables template
│
├── assets/                     # Static assets
│   ├── icon.png
│   ├── splash-icon.png
│   ├── adaptive-icon.png
│   └── favicon.png
│
└── src/                        # Source code
    ├── navigation/             # Navigation configuration
    │   ├── AppNavigator.tsx    # Main navigation container
    │   └── MainTabs.tsx        # Bottom tab navigation
    │
    ├── screens/                # Screen components
    │   ├── SplashScreen.tsx
    │   ├── LanguageSelectionScreen.tsx
    │   ├── LoginScreen.tsx
    │   ├── OTPVerificationScreen.tsx
    │   ├── RegistrationScreen.tsx
    │   ├── HomeScreen.tsx
    │   ├── CustomersScreen.tsx
    │   ├── DuesScreen.tsx
    │   ├── ReportsScreen.tsx
    │   ├── MoreScreen.tsx
    │   ├── CustomerDetailScreen.tsx
    │   ├── AddCustomerScreen.tsx
    │   └── AddTransactionScreen.tsx
    │
    ├── components/             # Reusable components
    │   # (To be added as needed)
    │
    ├── store/                  # Redux store
    │   ├── index.ts            # Store configuration
    │   └── slices/             # Redux slices
    │       ├── authSlice.ts
    │       ├── customersSlice.ts
    │       ├── transactionsSlice.ts
    │       ├── remindersSlice.ts
    │       ├── settingsSlice.ts
    │       └── uiSlice.ts
    │
    ├── services/               # External services
    │   ├── database.ts         # SQLite operations
    │   └── seedData.ts         # Sample data generator
    │
    ├── hooks/                  # Custom hooks
    │   # (To be added as needed)
    │
    ├── utils/                  # Utility functions
    │   ├── format.ts           # Formatting utilities
    │   └── whatsapp.ts         # WhatsApp integration
    │
    ├── types/                  # TypeScript definitions
    │   └── index.ts            # All type definitions
    │
    ├── i18n/                   # Internationalization
    │   ├── index.ts            # i18n configuration
    │   └── locales/            # Translation files
    │       ├── en.json
    │       ├── hi.json
    │       ├── mr.json
    │       ├── gu.json
    │       ├── ta.json
    │       ├── te.json
    │       ├── bn.json
    │       ├── kn.json
    │       ├── ml.json
    │       ├── pa.json
    │       └── ur.json
    │
    ├── constants/              # App constants
    │   ├── theme.ts            # Theme colors and sizes
    │   └── index.ts            # Other constants
    │
    └── assets/                 # In-app assets
        # (Images, icons, etc.)
```

## Key Files Explained

### App.tsx
- Root component
- Initializes database
- Loads language settings
- Wraps app with providers (Redux, Navigation, Paper)

### Navigation
- **AppNavigator.tsx**: Manages auth vs main app navigation
- **MainTabs.tsx**: Bottom tab bar with 5 tabs

### Screens (13 total)
1. **SplashScreen**: App logo with fade-in animation
2. **LanguageSelectionScreen**: 10 language selection
3. **LoginScreen**: Phone number input
4. **OTPVerificationScreen**: 6-digit OTP input
5. **RegistrationScreen**: Business details form
6. **HomeScreen**: Dashboard with summary cards
7. **CustomersScreen**: Customer list (placeholder)
8. **DuesScreen**: Dues tracking (placeholder)
9. **ReportsScreen**: Analytics (placeholder)
10. **MoreScreen**: Settings (placeholder)
11. **CustomerDetailScreen**: Single customer view (placeholder)
12. **AddCustomerScreen**: Add/edit customer (placeholder)
13. **AddTransactionScreen**: Add sale/payment (placeholder)

### Redux Slices (6 total)
1. **authSlice**: User authentication state
2. **customersSlice**: Customer data management
3. **transactionsSlice**: Transaction records
4. **remindersSlice**: WhatsApp reminders
5. **settingsSlice**: App settings (language, theme, etc.)
6. **uiSlice**: UI state (modals, selections, etc.)

### Services
- **database.ts**: SQLite CRUD operations for all tables
- **seedData.ts**: Generates 10 sample customers and 20 transactions

### Utils
- **format.ts**: Currency, date, phone formatting; validation; helper functions
- **whatsapp.ts**: WhatsApp deep linking and phone call integration

### Types
- All TypeScript interfaces and types
- Navigation route params
- Redux state types
- Database model types

### i18n
- 10 language translation files
- RTL support for Urdu
- Dynamic language switching

### Constants
- **theme.ts**: Material Design 3 colors, sizes, fonts
- **index.ts**: API endpoints, business categories, templates, etc.

## Data Flow

```
User Action → Component → Redux Action → Reducer → State Update
                ↓
           Database Service (SQLite)
                ↓
         Update Local Data
                ↓
           Re-render UI
```

## State Management

**Global State (Redux):**
- User authentication
- Customers list
- Transactions list
- Reminders
- Settings (language, theme, biometric)
- UI state (modals, selections)

**Local State (Component):**
- Form inputs
- Loading states
- Error messages
- Temporary UI state

**Persistent State (AsyncStorage):**
- Auth token
- Language preference
- Theme preference
- Biometric setting

**Database (SQLite):**
- Users
- Customers
- Transactions
- Reminders

## Screen Flow

```
Splash (2s)
  ↓
Language Selection
  ↓
Login (Phone Number)
  ↓
OTP Verification
  ↓
Registration (if new user) → Main App
  ↓
Main Tabs:
  - Home
  - Customers → Customer Detail → Add/Edit Customer
  - Dues
  - Reports
  - More → Settings
  ↓
Add Transaction
```

## Component Patterns

**Screen Components:**
- Use SafeAreaView
- Get theme colors from Redux
- Use i18n for translations
- Handle loading and error states
- Navigate using typed navigation

**Form Components:**
- Validate on blur
- Show inline errors
- Keyboard-aware views
- Auto-focus first field
- Full-width buttons

**List Components:**
- Pull-to-refresh
- Empty states
- Loading skeletons
- Infinite scroll (if needed)
- Search and filter

## Styling Approach

- Use theme constants from `/src/constants/theme.ts`
- StyleSheet.create for performance
- Dynamic colors based on dark/light theme
- Material Design 3 guidelines
- Responsive sizing

## Testing Strategy

**Manual Testing:**
- Use Expo Go on physical devices
- Test on both iOS and Android
- Test in different languages
- Test dark/light themes
- Test offline functionality

**Automated Testing (Future):**
- Jest for unit tests
- React Native Testing Library
- E2E tests with Detox

## Build Process

**Development:**
```bash
npm start
```

**Production Build:**
```bash
npx expo prebuild
eas build --platform android
eas build --platform ios
```

## Future Enhancements

**Phase 2:**
- Backend API integration
- Cloud sync
- Advanced charts
- Inventory management
- Invoice generation

**Phase 3:**
- Payment gateway
- Multi-user support
- Widget support
- Push notifications
- Receipt printing

## Code Quality Tools

- **TypeScript**: Strict mode for type safety
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Husky** (Future): Pre-commit hooks

## Performance Considerations

- FlatList for long lists
- Memoization with React.memo
- useCallback for expensive functions
- SQLite indexes on foreign keys
- Pagination for large datasets
- Image optimization
- Code splitting (lazy loading)

## Security

- No sensitive data in code
- Environment variables for secrets
- Biometric authentication ready
- Secure SQLite storage
- HTTPS for API calls (when integrated)

## Accessibility

- Semantic labels for screen readers
- Sufficient color contrast
- Touch target sizes (min 44x44 dp)
- Keyboard navigation support
- Text scaling support

---

This structure is designed for scalability, maintainability, and team collaboration.
