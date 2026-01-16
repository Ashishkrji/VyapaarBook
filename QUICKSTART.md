# VyapaarBook - Quick Start Guide

## Get Started in 5 Minutes

### 1. Prerequisites
Ensure you have installed:
- Node.js (v18+)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (iOS/Android)

### 2. Installation
```bash
# Install dependencies
npm install

# Start the development server
npm start
```

### 3. Run on Your Phone
1. Open Expo Go app on your phone
2. Scan the QR code from the terminal
3. App will load in 30-60 seconds

### 4. Test the App

#### First Time Setup
1. **Splash Screen** - Wait 2 seconds
2. **Select Language** - Choose any of 10 languages
3. **Login** - Enter any 10-digit phone number (e.g., 9876543210)
4. **OTP** - Enter any 6 digits (e.g., 123456)
5. **Registration** - Fill in:
   - Business Name: "My Shop"
   - Owner Name: Your name
   - Toggle WhatsApp same number: ON
   - Business Category: Select any
   - Click "Register"

#### Explore the App
The app will auto-load 10 sample customers and 20 transactions!

**Home Tab:**
- View today's sales
- See pending dues
- Check total customers
- Browse recent transactions
- Tap FAB (+) to add transactions

**Customers Tab:**
- Browse customer list
- Search customers
- View customer details
- Add new customers

**Dues Tab:**
- See all pending dues
- Send WhatsApp reminders
- Sort by amount/date/name

**Reports Tab:**
- View sales analytics
- Filter by date range
- See top customers
- Payment method breakdown

**More Tab:**
- Change language
- Toggle dark theme
- Enable biometric auth
- Backup & restore

### 5. Key Features to Test

#### Add a Customer
1. Go to Customers tab
2. Tap FAB (+)
3. Fill in details
4. Save

#### Add a Transaction
1. Go to Home tab
2. Tap FAB (+)
3. Select customer
4. Enter amount
5. Choose payment status
6. Save

#### Send WhatsApp Reminder
1. Go to Dues tab
2. Long-press a customer
3. Tap "Send Reminder"
4. Select template
5. Customize message
6. Send (opens WhatsApp)

#### Change Language
1. Go to More tab
2. Tap "Language"
3. Select any language
4. UI updates instantly

#### Dark Theme
1. Go to More tab
2. Toggle "Dark Theme"
3. Theme changes immediately

### 6. Development Tips

**Clear Cache:**
```bash
npm start -- --clear
```

**Type Check:**
```bash
npm run type-check
```

**Lint Code:**
```bash
npm run lint
```

**Format Code:**
```bash
npm run format
```

**Reset App Data:**
- Shake device (or Cmd+D on iOS, Cmd+M on Android)
- Tap "Reload"

### 7. Troubleshooting

**App not loading?**
- Ensure phone and computer are on same Wi-Fi
- Try: `npm start -- --clear`

**SQLite errors?**
- Restart Expo server
- Clear app data in Expo Go

**Type errors?**
- Run: `npm install`
- Run: `npm run type-check`

**Navigation errors?**
- Check all screens are imported
- Verify route names match types

### 8. Test Credentials

**Any Phone Number:** 9876543210
**Any OTP:** 123456
**Sample Customers:** Auto-loaded on registration

### 9. What's Mocked?

- **OTP Verification:** Any 6 digits work
- **User Authentication:** No real backend
- **Sample Data:** 10 customers, 20 transactions auto-loaded
- **WhatsApp:** Opens real WhatsApp with pre-filled message

### 10. Next Steps

1. **Customize:** Update colors in `/src/constants/theme.ts`
2. **Add Features:** Build new screens in `/src/screens`
3. **Connect Backend:** Implement API calls in `/src/services`
4. **Build APK:** Run `npx expo build:android`

## Support

- **Docs:** See README.md for detailed documentation
- **Issues:** Check TROUBLESHOOTING.md
- **Architecture:** Review /src folder structure

---

**Happy Building! 🚀**
