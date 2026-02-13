# 🚀 Quick Deployment Guide

## Step-by-Step Deployment to Vercel

### Prerequisites

✅ A Vercel account (free) - Sign up at https://vercel.com
✅ Your domain `kkflex.in` ready for DNS configuration
✅ All files from this project

---

## 📦 Option 1: Deploy via Vercel Dashboard (Easiest)

### 1. Prepare Your Files

- Download all files from this project
- Make sure you have:
  - `index.html`
  - `app.js`
  - `manifest.json`
  - `sw.js`
  - `vercel.json`
  - `icon-192.png` (generate using icon-generator.html)
  - `icon-512.png` (generate using icon-generator.html)

### 2. Edit Configuration

Open `app.js` and update the `cardData` object with your information:

- Your name
- Your title
- Contact details
- Social media links
- Catalog URL

### 3. Deploy to Vercel

1. Go to https://vercel.com
2. Click **"Add New Project"**
3. Choose **"Import Git Repository"** OR **"Upload Files"**
4. If uploading files:
   - Create a ZIP of all your files
   - Upload the ZIP
   - Click **"Deploy"**

### 4. Your site is now live!

You'll get a URL like: `https://your-project-name.vercel.app`

---

## 🌐 Option 2: Deploy via Git (Recommended for Updates)

### 1. Create a GitHub Repository

```bash
# Initialize git in your project folder
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: KK Flex Digital Business Card"

# Create a new repository on GitHub
# Then connect and push
git remote add origin https://github.com/your-username/kkflex-card.git
git branch -M main
git push -u origin main
```

### 2. Connect to Vercel

1. Go to https://vercel.com
2. Click **"Add New Project"**
3. **"Import Git Repository"**
4. Select your GitHub repository
5. Click **"Deploy"**

### 3. Automatic Updates

Now whenever you push to GitHub, Vercel will automatically deploy your changes!

### 4. Visitor & page view analytics

To count visitors and page views:

1. **Enable Web Analytics** in the [Vercel Dashboard](https://vercel.com/dashboard): open your project → **Analytics** tab → **Enable**.
2. The project already includes the analytics script in `index.html` (script tag for static sites). No code change needed.
3. **Redeploy** so the `/_vercel/insights/script.js` route is available. Data will appear under your project’s **Analytics** tab after visits.

*Note: This is a static HTML site, so we use the script-tag method. The `import { Analytics } from "@vercel/analytics/next"` pattern is for Next.js apps only.*

**If production shows an old/different UI:** The app uses a service worker that caches files. We’ve made two changes so production matches local after deploy:
1. **Cache version** in `service-worker.js` is bumped (e.g. `kkflex-card-v5`) when we change the UI—redeploy so clients get the new worker.
2. **Network-first for HTML:** The service worker now uses a *network-first* strategy for the main page and itself, so each load tries the server first and only falls back to cache when offline. Deployed updates should appear without a hard refresh.
3. **No-cache for HTML on Vercel:** `vercel.json` sets `Cache-Control: no-cache` for `/` and `/index.html` so the server doesn’t tell browsers to keep old HTML.
4. After redeploying, do one **hard refresh** (Ctrl+Shift+R or Cmd+Shift+R) on the production URL if you still see the old UI; after that, new visits should get the latest UI.

---

## 🔗 Connecting Your Custom Domain (kkflex.in)

### 1. Add Domain in Vercel

1. Go to your project in Vercel
2. Click **"Settings"** → **"Domains"**
3. Add `kkflex.in`
4. Also add `www.kkflex.in`

### 2. Update DNS Settings

Go to your domain registrar (where you bought kkflex.in) and add these DNS records:

**For root domain (kkflex.in):**

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**For www subdomain:**

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 3. Wait for DNS Propagation

- Usually takes 5-30 minutes
- Can take up to 48 hours in rare cases
- Check status in Vercel dashboard

### 4. Enable HTTPS (Automatic)

Vercel automatically provides free SSL certificate once DNS is configured!

---

## ✅ Post-Deployment Checklist

After deployment, test these features:

- [ ] Website loads at your domain
- [ ] All contact information is correct
- [ ] Email, phone, website links work
- [ ] Social media links work
- [ ] vCard download works
- [ ] QR code displays and scans correctly
- [ ] Share functionality works
- [ ] Catalog download works
- [ ] PWA install prompt appears (may need to visit twice)
- [ ] Works on mobile devices
- [ ] Works offline (after first visit)

---

## 📱 Testing PWA Installation

### On Desktop (Chrome/Edge):

1. Visit your site
2. Look for install icon in address bar
3. Click to install
4. App appears in Applications folder

### On iOS:

1. Open in Safari
2. Tap the share button
3. Tap "Add to Home Screen"
4. Tap "Add"

### On Android:

1. Visit in Chrome
2. Tap the three dots menu
3. Tap "Install app" or "Add to Home Screen"
4. Tap "Install"

---

## 🔄 Updating Your Card

### Via Git:

```bash
# Make changes to files
# Commit and push
git add .
git commit -m "Updated contact information"
git push
# Vercel auto-deploys!
```

### Via Vercel Dashboard:

1. Go to your project
2. Click "Deployments"
3. Click "..." on latest deployment
4. Click "Redeploy"

---

## 🐛 Troubleshooting

### Site not loading?

- Check DNS settings are correct
- Wait for DNS propagation (up to 48 hours)
- Clear browser cache

### PWA not installing?

- Must be on HTTPS (automatic with Vercel)
- Try visiting the site twice
- Check manifest.json is loading (DevTools → Application tab)

### Share not working?

- Some features require HTTPS
- Test on deployed URL, not localhost

### Icons not showing?

- Make sure icon-192.png and icon-512.png are in root directory
- Icons must be exactly 192x192 and 512x512 pixels
- Use icon-generator.html to create them

---

## 💡 Pro Tips

1. **Update catalog regularly**: Change catalogUrl in app.js when you have new catalog
2. **Test on multiple devices**: Desktop, iPhone, Android
3. **Monitor analytics**: Add Vercel Analytics for insights
4. **Keep it updated**: Update contact info as needed
5. **Backup files**: Keep a copy of all files

---

## 📞 Need Help?

If you run into issues:

1. Check Vercel documentation: https://vercel.com/docs
2. Check browser console for errors (F12 → Console)
3. Verify all files are uploaded correctly

---

## 🎉 You're Done!

Your digital business card is now live at **https://kkflex.in**!

Share it with:

- QR code on physical business cards
- Email signature
- Social media profiles
- WhatsApp status
- LinkedIn profile

---

**Made with ❤️ for KK Flex Industries**
