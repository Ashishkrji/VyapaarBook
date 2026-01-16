# VyapaarBook - Business Management Mobile App

A comprehensive mobile business management application built with React Native and Expo for iOS and Android. VyapaarBook helps shop owners manage customers, track sales, monitor dues, and send WhatsApp reminders in 10 Indian languages.

## Features

### 🌐 Multi-Language Support
- 10 languages: English, Hindi, Marathi, Gujarati, Tamil, Telugu, Bengali, Kannada, Malayalam, Punjabi, Urdu
- RTL support for Urdu
- Dynamic language switching without app restart

### 👤 Authentication & Onboarding
- Phone number-based authentication
- OTP verification (mock implementation ready for backend)
- User registration with business details
- Splash screen with animations

### 🏠 Home Dashboard
- Greeting with time-based messages
- Summary cards (Today's Sales, Pending Dues, Total Customers)
- Recent transactions list
- Pull-to-refresh functionality
- Quick action FAB

### 👥 Customer Management
- Add, edit, delete customers
- Search and filter customers
- Customer details with transaction history
- Balance tracking
- Contact integration (Call, WhatsApp)

### 💰 Transaction Management
- Add sales and payments
- Payment status (Paid, Due, Partial)
- Payment methods (Cash, Check, Digital, Other)
- Photo attachments for receipts
- Transaction filtering and sorting

### 📊 Dues Tracking
- Total dues overview
- Sort by amount, date, or customer name
- Color-coded due amounts
- Batch reminder sending

### 💬 WhatsApp Integration
- Pre-built reminder templates
- Custom message creation
- Variable substitution (Name, Amount, Business Name)
- Deep linking to WhatsApp

### 📈 Reports & Analytics
- Date range filtering (Today, Week, Month, Custom)
- Sales trends
- Payment method breakdown
- Top customers
- Export capabilities

### ⚙️ Settings
- Profile management
- Language selection
- Dark/Light theme toggle
- Biometric authentication setup
- Backup & restore functionality

### 💾 Data Management
- SQLite local database
- Redux state management
- AsyncStorage for persistence
- Offline-first architecture
- Sample data seeding

## Tech Stack

- **Framework:** React Native with Expo SDK
- **Language:** TypeScript
- **Navigation:** React Navigation (Native Stack + Bottom Tabs)
- **State Management:** Redux Toolkit
- **Database:** expo-sqlite
- **Internationalization:** i18next, react-i18next
- **UI Library:** React Native Paper
- **Animations:** react-native-reanimated
- **Gestures:** react-native-gesture-handler
- **Storage:** @react-native-async-storage/async-storage
- **Icons:** @expo/vector-icons (Ionicons)
- **Date Handling:** date-fns

## Project Structure

```
vyapaarbook/
├── src/
│   ├── screens/           # All screen components
│   │   ├── SplashScreen.tsx
│   │   ├── LanguageSelectionScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── OTPVerificationScreen.tsx
│   │   ├── RegistrationScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── CustomersScreen.tsx
│   │   ├── DuesScreen.tsx
│   │   ├── ReportsScreen.tsx
│   │   ├── MoreScreen.tsx
│   │   ├── CustomerDetailScreen.tsx
│   │   ├── AddCustomerScreen.tsx
│   │   └── AddTransactionScreen.tsx
│   ├── navigation/        # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   └── MainTabs.tsx
│   ├── components/        # Reusable components
│   ├── store/            # Redux store and slices
│   │   ├── index.ts
│   │   └── slices/
│   ├── services/         # API and database services
│   │   ├── database.ts
│   │   └── seedData.ts
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   │   ├── format.ts
│   │   └── whatsapp.ts
│   ├── types/            # TypeScript type definitions
│   ├── i18n/             # Internationalization
│   │   └── locales/      # Translation files
│   ├── constants/        # App constants and theme
│   │   ├── theme.ts
│   │   └── index.ts
│   └── assets/           # Images, fonts, etc.
├── App.tsx               # Root component
├── app.json              # Expo configuration
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Expo Go app (for testing on physical devices)

### Steps

1. **Clone the repository**
   ```bash
   cd /path/to/project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run on device/simulator**
   - **iOS Simulator:** Press `i` in the terminal
   - **Android Emulator:** Press `a` in the terminal
   - **Physical Device:** Scan the QR code with Expo Go app

## Testing on Physical Devices

### Using Expo Go (Recommended for Development)

1. **Install Expo Go**
   - iOS: Download from App Store
   - Android: Download from Google Play

2. **Connect to same network**
   - Ensure your computer and phone are on the same Wi-Fi network

3. **Scan QR Code**
   - Run `npx expo start`
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)

### Testing Features

- **Sample Data:** The app auto-seeds 10 customers and 20 transactions on first registration
- **Mock OTP:** Any 6-digit code works for OTP verification (in development mode)
- **Test Phone:** Use any 10-digit number for login

## Building for Production

### Development Build

```bash
npx expo prebuild
```

### iOS Build

```bash
eas build --platform ios
```

### Android Build

```bash
eas build --platform android
```

### Local Builds

```bash
# Android APK
npx expo build:android

# iOS IPA (requires Mac)
npx expo build:ios
```

## Environment Variables

Create a `.env` file in the root directory:

```env
API_BASE_URL=https://your-api.com
ENVIRONMENT=development
```

## Development

### Running Linter

```bash
npm run lint
```

### TypeScript Type Checking

```bash
npx tsc --noEmit
```

### Clear Cache

```bash
npx expo start --clear
```

## Database Schema

### Users Table
- id, businessName, ownerName, phoneNumber, whatsappNumber, languageCode, photoUrl, businessCategory, address, createdAt

### Customers Table
- id, userId, name, phoneNumber, whatsappNumber, address, photoUrl, businessType, notes, balance, lastTransactionDate, createdAt

### Transactions Table
- id, customerId, customerName, amount, type, paymentMethod, description, photoUrl, status, createdAt

### Reminders Table
- id, customerId, templateId, messageText, sentAt, scheduledFor, createdAt

## Key Features Implementation

### Material Design 3
- Consistent color theming
- Elevation and shadows
- Ripple effects on touch
- 56dp bottom tab bar
- FAB with scale animations

### Animations
- Fade-in splash screen
- Screen slide transitions
- Card slide-up on load
- Button press scale effects
- Pull-to-refresh animation

### Gestures
- Swipe to delete customers
- Long-press for multi-select
- Pull-to-refresh
- Haptic feedback on actions

### Offline-First
- SQLite for local storage
- Redux for app state
- AsyncStorage for settings
- Queue sync (ready for backend)

## API Integration (Ready)

The app structure is ready for backend integration:

1. **Auth Endpoints:** Login, Verify OTP, Register
2. **Customer Endpoints:** CRUD operations
3. **Transaction Endpoints:** CRUD operations
4. **Reminder Endpoints:** Send, Schedule

See `src/services/api.ts` (to be implemented) for API structure.

## Sample Data

On first registration, the app seeds:
- 10 diverse customers with Indian names
- Varied balances (₹500 to ₹50,000)
- 20 sample transactions
- Mixed payment statuses and methods

## Troubleshooting

### Common Issues

**Metro bundler not starting:**
```bash
npx expo start --clear
```

**SQLite errors:**
```bash
npm install expo-sqlite
npx expo prebuild --clean
```

**Navigation errors:**
```bash
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
```

**Type errors:**
```bash
npx tsc --noEmit
```

## Contributing

1. Follow TypeScript strict mode
2. Use existing code patterns
3. Add proper type definitions
4. Test on both iOS and Android
5. Update README for new features

## Version History

### v1.0.0 (MVP)
- Multi-language support (10 languages)
- Complete auth flow
- Customer management
- Transaction tracking
- WhatsApp integration
- Reports and analytics
- Dark theme support
- Offline-first architecture

## License

Proprietary - VyapaarBook MVP

## Support

For issues or questions:
- Create an issue in the repository
- Contact: support@vyapaarbook.com

## Credits

Built with ❤️ for Indian small businesses

---

**Note:** This is an MVP (Minimum Viable Product). Backend integration, advanced analytics, cloud sync, and additional features will be added in future versions.
