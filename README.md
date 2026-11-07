# 🩺 Dhanush Medicals — Pharmacy Web Ordering & Delivery System

A premium, modern Single Page Web Application designed **exclusively for Pharmacy & Medicine Ordering**. Features medicine search with salt compositions, prescription (Rx) uploads, value deals, admin product/category CRUD, pharmacist verification queue, rider delivery portal, dual-database mode, **customizable store application name/tagline**, and **automated email order notifications to the Admin via Google Apps Script**.

---

## ⚡ Key Features & Updates

* 💊 **100% Pure Pharmacy Focus**: Removed all non-pharmacy services (no doctors or lab tests). Navigation is dedicated strictly to:
  * All Medicines & Healthcare Products
  * Prescription Drugs (Rx)
  * Upload Doctor's Prescription
  * OTC & Personal Care
  * Ayurveda & Herbal
  * Baby Care
  * Medical Devices & Wellness
* 🏷️ **Dynamic & Editable Application Name**:
  * Store / App Name (`MediExpress Pharmacy` by default) and Tagline (`ONLINE PHARMACY WEB ORDERING`) can be **customized directly in the Admin Panel** under **App Name & Branding** tab!
  * Updating the application name dynamically updates the header brand logo, page title, order slips, and automated order emails.
* 📄 **Prescription (Rx) Upload & Verification**: Dedicated prescription file upload modal (images/PDF) for doctor's orders with registered pharmacist review queue.
* 🖥️ **Admin Control Center (Full CRUD)**:
  * Full CRUD for Medicines (Title, Brand, Salt composition, Category, Price, MRP, Discount %, Stock count, Rx toggle, Image URL / Drive Upload).
  * Full CRUD for Pharmacy Categories.
  * App Name & Branding Customization.
  * Live Order Management & Status Dispatch (Pending ➔ Rx Verified ➔ Packing ➔ On The Way ➔ Delivered).
* 📧 **Automated Admin Email Alerts**: Every customer order automatically sends a styled HTML email alert to the configured Admin email address via Google Apps Script (`MailApp.sendEmail()`).
* 🩺 **Pharmacist Verification Queue**: Log in as a Pharmacist to review doctor's prescriptions attached to orders and approve/reject them before dispatch.
* 🛵 **Rider Delivery Portal**: Log in as a Rider to view assigned delivery routes, update order delivery status, and track flat-rate commissions ($5.00/order).

---

## 🚀 Staff Account Logins

Click **Staff Portal** on the top right bar of `index.html`:
* **Admin Dashboard**: Username: `admin` | Password: `admin123`
* **Pharmacist Queue**: Username: `pharmacist` | Password: `pharma123`
* **Rider Dashboard**: Username: `rider` | Password: `rider123`

---

## 🌐 Connecting to Live Google Sheets & Apps Script Backend

1. Create a blank Google Sheet (e.g. `Pharmacy Web Ordering Database`).
2. Go to **Extensions** ➔ **Apps Script** and copy the contents of `Pharmacy/Code.gs`.
3. Deploy as **Web App** with access set to **`Anyone`**.
4. Paste the generated Web App URL into **App & Store Settings** modal inside the application.


---

## 🎨 Premium UI (v3)

* `premium.css` is the new design layer (loaded after `styles.css`) — white sticky header, new logo, illustrated hero banners, refined cards, "How it works", full footer, floating WhatsApp button.
* Logo files: `logo-mark.svg` (icon), `logo.svg` (icon + wordmark), `favicon.svg`, `icon-192.png`, `icon-512.png`. Hero art lives in `img/`.
* **Edit your public details** in `app.js` → `state.config` (look for the comment *PUBLIC STORE PROFILE*): `whatsappNumber`, `storeAddress`, `storeHours`, `drugLicense`.
  > ⚠️ `whatsappNumber` is still the placeholder `919876543210` — set your real customer-facing WhatsApp number.

## 📲 WhatsApp order alerts to the Admin

Every order (cart checkout **and** prescription upload) triggers a WhatsApp message to the admin phone, sent from Google Apps Script (`Code.gs`), in addition to the email.

1. Paste the new `Code.gs` into Apps Script → **Deploy ▸ Manage deployments ▸ Edit ▸ New version ▸ Deploy** (the URL stays the same).
2. **Project Settings ▸ Script Properties** → add the properties listed at the top of `Code.gs`:
   * **CallMeBot (free, quickest):** `WA_PROVIDER=callmebot`, `WA_ADMIN_PHONE=+91XXXXXXXXXX`, `WA_API_KEY=<key from the CallMeBot bot>` (activation steps: callmebot.com).
   * **Official WhatsApp Business Cloud API (recommended for a live store):** `WA_PROVIDER=meta`, `WA_ADMIN_PHONE`, `WA_META_TOKEN`, `WA_META_PHONE_ID`, `WA_META_TEMPLATE`.
3. In the editor choose function `testWhatsAppAlert` ▸ **Run** and approve the permission prompt (external requests).
4. Or use **Staff Login ▸ Admin ▸ Branding ▸ Send Test Order Alert** to test from the website.

Credentials are stored only in Script Properties (never in the website code).
Customers also get a **"Send this order to the pharmacy on WhatsApp"** button on their order slip.
