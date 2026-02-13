// ==========================================
// CONFIGURATION - Loaded from JSON file
// ==========================================
// All editable client/static data now lives in `data.profile.json`
// at the project root. Update that file to change card details.
let cardData = {};

async function loadCardData() {
  try {
      const response = await fetch('data.profile.json');
      if (!response.ok) {
          throw new Error(`Failed to load data.profile.json: ${response.status}`);
      }
      cardData = await response.json();
  } catch (error) {
      console.error('Error loading card data:', error);
      if (typeof showNotification === 'function') {
          showNotification('Failed to load card data');
      }
  }
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', async function() {
  // Load card data from JSON, then initialize UI
  await loadCardData();

  if (!cardData || !cardData.name) {
      console.warn('Card data is missing or incomplete; skipping UI initialization.');
      return;
  }

  // Update DOM elements with card data
  updateCardData();
  
  // Initialize QR Code
  initQRCode();
  
  // Register service worker for PWA
  registerServiceWorker();
  
  // Show install bar on mobile (e.g. iOS) where beforeinstallprompt doesn't fire
  maybeShowInstallBarMobile();
});

// ==========================================
// UPDATE CARD DATA
// ==========================================
function updateCardData() {
  // Update text content
  document.getElementById('cardName').textContent = cardData.name.toUpperCase();
  document.getElementById('cardTitle').textContent = cardData.title.toUpperCase();
  document.getElementById('cardCompany').textContent = cardData.company.toUpperCase();
  document.getElementById('cardEmail').textContent = cardData.email;
  document.getElementById('cardPhone').textContent = cardData.phone;
  document.getElementById('cardWebsite').textContent = cardData.website;
  
  // Update links
  document.getElementById('emailLink').href = `mailto:${cardData.email}`;
  document.getElementById('phoneLink').href = `tel:${cardData.phoneRaw}`;
  document.getElementById('websiteLink').href = cardData.websiteUrl;
  
  // Update social media links
  document.getElementById('linkedinLink').href = cardData.linkedin;
  document.getElementById('twitterLink').href = cardData.twitter;
  document.getElementById('instagramLink').href = cardData.instagram;
  document.getElementById('facebookLink').href = cardData.facebook;
  document.getElementById('youtubeLink').href = cardData.youtube;
  document.getElementById('whatsappLink').href = cardData.whatsapp;
  
  // Update profile image if provided
  if (cardData.photo) {
      const img = document.getElementById('profileImage');
      img.src = cardData.photo;
      img.classList.remove('hidden');
  }
}

// ==========================================
// QR CODE GENERATION
// ==========================================
function initQRCode() {
  new QRCode(document.getElementById('qrcode'), {
      text: cardData.cardUrl,
      width: 180,
      height: 180,
      colorDark: '#1e293b',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
  });
}

// ==========================================
// VCARD DOWNLOAD
// ==========================================
function downloadVCard() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${cardData.name}
ORG:${cardData.company}
TITLE:${cardData.title}
TEL;TYPE=WORK,VOICE:${cardData.phoneRaw}
EMAIL:${cardData.email}
URL:${cardData.websiteUrl}
END:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${cardData.name.replace(/\s+/g, '_')}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
  
  // Show success message
  showNotification('Contact saved successfully!');
}

// ==========================================
// CATALOG DOWNLOAD
// ==========================================
function downloadCatalog() {
  // Open catalog in new tab
  window.open(cardData.catalogUrl, '_blank');
  
  // Optional: Show notification
  showNotification('Opening catalog...');
}

// ==========================================
// SHARE MODAL
// ==========================================
function openShareModal() {
  const modal = document.getElementById('shareModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeShareModal() {
  const modal = document.getElementById('shareModal');
  modal.classList.remove('flex');
  modal.classList.add('hidden');
}

// Close modal when clicking outside
document.getElementById('shareModal')?.addEventListener('click', function(e) {
  if (e.target === this) {
      closeShareModal();
  }
});

// ==========================================
// INQUIRY MODAL
// ==========================================
function openInquiryModal() {
  const modal = document.getElementById('inquiryModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeInquiryModal() {
  const modal = document.getElementById('inquiryModal');
  modal.classList.remove('flex');
  modal.classList.add('hidden');
}

function submitEnquiry(event, channel) {
  event.preventDefault();
  const form = document.getElementById('inquiryForm');
  const name = form.inquiryName.value.trim();
  const email = form.inquiryEmail.value.trim();
  const phone = form.inquiryPhone.value.trim();
  const subject = form.inquirySubject.value.trim();
  const message = form.inquiryMessage.value.trim();

  // Validate required fields
  if (!name || !email || !subject || !message) {
    showNotification('Please fill in all required fields.');
    return;
  }

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    `Subject: ${subject}`,
    '',
    'Message:',
    message
  ].join('\n');

  if (channel === 'whatsapp') {
    const waBase = cardData.whatsapp || 'https://wa.me/919714422777';
    const waNum = waBase.replace(/^https?:\/\/wa\.me\//i, '').split('?')[0];
    const waText = encodeURIComponent(body);
    const waUrl = `https://wa.me/${waNum}?text=${waText}`;
    window.open(waUrl, '_blank');
    showNotification('Opening WhatsApp to send enquiry...');
  } else {
    const mailtoUrl = `mailto:${cardData.email || 'contact@kkflex.in'}?subject=${encodeURIComponent('Enquiry: ' + subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    showNotification('Opening your email client to send enquiry...');
  }

  closeInquiryModal();
  form.reset();
}

document.getElementById('inquiryModal')?.addEventListener('click', function(e) {
  if (e.target === this) {
    closeInquiryModal();
  }
});

// ==========================================
// SHARE FUNCTIONALITY
// ==========================================
function shareVia(platform) {
  const shareText = `Check out ${cardData.name}'s digital business card from ${cardData.company}!`;
  const shareUrl = cardData.cardUrl;
  
  const urls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(`${cardData.name} - ${cardData.company}`)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`,
      sms: `sms:?&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`
  };
  
  if (platform === 'copy') {
      copyToClipboard(shareUrl);
      showNotification('Link copied to clipboard!');
      closeShareModal();
  } else if (platform === 'native') {
      if (navigator.share) {
          navigator.share({
              title: `${cardData.name} - ${cardData.company}`,
              text: shareText,
              url: shareUrl
          }).then(() => {
              showNotification('Shared successfully!');
              closeShareModal();
          }).catch((error) => {
              if (error.name !== 'AbortError') {
                  console.log('Error sharing:', error);
              }
          });
      } else {
          showNotification('Share not supported on this device');
      }
  } else if (urls[platform]) {
      window.open(urls[platform], '_blank');
      closeShareModal();
  }
}

// ==========================================
// COPY TO CLIPBOARD
// ==========================================
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
  } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
          document.execCommand('copy');
          textArea.remove();
          return Promise.resolve();
      } catch (error) {
          textArea.remove();
          return Promise.reject(error);
      }
  }
}

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'fixed top-6 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-6 py-3 rounded-xl shadow-2xl z-[9999] font-semibold tracking-wide animate-slide-up';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(-50%) translateY(-20px)';
      notification.style.transition = 'all 0.3s ease';
      setTimeout(() => {
          document.body.removeChild(notification);
      }, 300);
  }, 3000);
}

// ==========================================
// PWA INSTALLATION (install bar – use like an app on mobile)
// ==========================================
// Dismiss only for current session so bar reappears on next visit until user installs
const PWA_DISMISS_SESSION_KEY = 'pwaInstallDismissedSession';

let deferredPrompt;

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true ||
    document.referrer.includes('android-app://');
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

/** True only if user dismissed the bar in this tab/session. Resets on new visit. */
function wasInstallDismissedThisSession() {
  try {
    return sessionStorage.getItem(PWA_DISMISS_SESSION_KEY) === '1';
  } catch (_) {
    return false;
  }
}

function showInstallBar() {
  // Only hide if already running as installed app or dismissed this session
  if (isStandalone() || wasInstallDismissedThisSession()) return;
  const el = document.getElementById('installPrompt');
  const hint = document.getElementById('installPromptHint');
  if (hint) hint.classList.toggle('hidden', !isIOS());
  el.classList.remove('hidden');
  el.classList.add('block');
}

function hideInstallBar() {
  const el = document.getElementById('installPrompt');
  el.classList.add('hidden');
  el.classList.remove('block');
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallBar();
});

// On mobile (e.g. iOS) beforeinstallprompt never fires – show bar after load, every visit
function maybeShowInstallBarMobile() {
  if (isStandalone() || wasInstallDismissedThisSession()) return;
  if (!isMobile()) return;
  if (deferredPrompt) return; // already shown by beforeinstallprompt
  setTimeout(showInstallBar, 1500);
}

function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          showNotification('Added to Home Screen!');
          hideInstallBar();
        }
        deferredPrompt = null;
      })
      .catch(() => {
        deferredPrompt = null;
      });
    return;
  }
  // iOS: no native prompt; show instructions
  if (isIOS()) {
    showNotification('Tap Share (↑) then "Add to Home Screen"');
    const hint = document.getElementById('installPromptHint');
    if (hint) {
      hint.classList.remove('hidden');
      hint.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

function dismissInstall() {
  try {
    sessionStorage.setItem(PWA_DISMISS_SESSION_KEY, '1');
  } catch (_) {}
  hideInstallBar();
}

// ==========================================
// SERVICE WORKER REGISTRATION
// ==========================================
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
          .then((registration) => {
              console.log('ServiceWorker registered:', registration);
          })
          .catch((error) => {
              console.log('ServiceWorker registration failed:', error);
          });
  }
}

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================
document.addEventListener('keydown', function(e) {
  // ESC to close modals
  if (e.key === 'Escape') {
    closeShareModal();
    closeInquiryModal();
  }
});