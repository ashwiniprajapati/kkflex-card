# KK Flex Digital Business Card - PWA

A modern, professional Progressive Web App (PWA) digital business card for KK Flex Industries - Machine Manufacturing Company.

## Features

✅ **Complete Contact Information** - Email, Phone, Website
✅ **vCard Download** - Save contact directly to phone
✅ **QR Code** - Easy sharing via scan
✅ **Social Media Links** - LinkedIn, WhatsApp, Instagram, Facebook, Twitter, YouTube
✅ **Catalog Download** - Direct link to company catalog
✅ **Share Functionality** - Share via WhatsApp, SMS, Email, Social Media, or copy link
✅ **PWA Support** - Install as app on any device
✅ **Offline Ready** - Works without internet connection after first visit
✅ **Responsive Design** - Works perfectly on all devices
✅ **Industrial Theme** - Professional design matching manufacturing industry

## Quick Setup

### 1. Edit Configuration

Open `app.js` and update the `cardData` object with your information:

```javascript
const cardData = {
  name: "Your Name",
  title: "Your Title",
  company: "KK Flex Industries",
  email: "your-email@kkflex.in",
  phone: "+91 XXXXX XXXXX",
  phoneRaw: "+91XXXXXXXXXX",
  website: "kkflex.in",
  websiteUrl: "https://kkflex.in",
  cardUrl: "https://kkflex.in",

  // Social Media - Update with your links
  linkedin: "https://linkedin.com/company/kkflex",
  twitter: "https://twitter.com/kkflex",
  instagram: "https://instagram.com/kkflex",
  facebook: "https://facebook.com/kkflex",
  youtube: "https://youtube.com/@kkflex",
  whatsapp: "https://wa.me/91XXXXXXXXXX",

  // Optional: Add profile photo URL
  photo: "https://example.com/your-photo.jpg",

  // Catalog URL
  catalogUrl: "https://example.com/your-catalog.pdf",
  catalogFilename: "KK_Flex_Catalog.pdf",
};
```

### 2. Add Icons (Optional but Recommended)

Create and add these icon files to the root directory:

- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

You can use your company logo or create icons at: https://realfavicongenerator.net/

### 3. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Option B: Using Vercel Dashboard

1. Go to https://vercel.com
2. Sign up / Login
3. Click "Add New Project"
4. Import your GitHub repository (or drag and drop files)
5. Click "Deploy"

### 4. Connect Custom Domain

1. In Vercel Dashboard, go to your project
2. Click "Settings" > "Domains"
3. Add `kkflex.in`
4. Update your DNS settings as shown by Vercel:
   - Type: `A` Record
   - Name: `@`
   - Value: `76.76.21.21`
   - Type: `CNAME` Record
   - Name: `www`
   - Value: `cname.vercel-dns.com`

## File Structure

```
.
├── index.html          # Main HTML file
├── app.js             # JavaScript functionality
├── manifest.json      # PWA manifest
├── sw.js             # Service Worker
├── vercel.json       # Vercel configuration
├── icon-192.png      # App icon (192x192)
├── icon-512.png      # App icon (512x512)
└── README.md         # This file
```

## Customization

### Change Colors

Edit the Tailwind config in `tailwind.config.js`:

```javascript
colors: {
  industrial: {
    // Customize these color values
    800: '#1e293b',
    900: '#0f172a',
  },
  orange: {
    500: '#a33c3c', // Logo / primary accent color
    600: '#8b3232',
  },
}
```

### Change Fonts

The design uses:

- **Bebas Neue** - Display font (headings)
- **Rajdhani** - Body font

To change fonts, update the Google Fonts import in `index.html`.

## Testing

### Test Locally

1. Use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

2. Open `http://localhost:8000` in your browser

### Test PWA Functionality

1. Open in Chrome DevTools
2. Go to "Application" tab
3. Check "Service Workers" and "Manifest"
4. Test "Add to Home Screen"

## Browser Support

- ✅ Chrome/Edge (Recommended)
- ✅ Safari (iOS/macOS)
- ✅ Firefox
- ✅ Samsung Internet
- ✅ All modern mobile browsers

## Features Explanation

### vCard Download

Generates a `.vcf` file that can be imported into any contact app (iOS, Android, Outlook, Gmail, etc.)

### QR Code

Dynamically generates a QR code pointing to your card URL. Users can scan to open the card instantly.

### Share Functionality

- **WhatsApp**: Share via WhatsApp chat
- **SMS**: Send via text message
- **Email**: Share via email
- **Twitter**: Tweet the card
- **LinkedIn**: Share on LinkedIn
- **Facebook**: Share on Facebook
- **Copy Link**: Copy URL to clipboard
- **Native Share**: Use device's native share menu (mobile)

### PWA Installation

Users can install the card as an app on their device:

- **Desktop**: Add to Chrome/Edge
- **iOS**: Add to Home Screen
- **Android**: Install app

## Troubleshooting

### QR Code not showing

- Make sure `qrcode.min.js` is loading correctly
- Check browser console for errors

### Share not working

- Some share features require HTTPS
- Test on a deployed URL (not localhost)

### PWA not installing

- Ensure you're using HTTPS
- Check manifest.json is valid
- Verify service worker is registered

## Support

For questions or issues:

- Email: contact@kkflex.in
- Update this README with your support contact

## License

© 2024 KK Flex Industries. All rights reserved.

---

Made with ❤️ for KK Flex Industries
