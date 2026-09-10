/**
 * Pharmacy Web Ordering - Application Logic
 * Supports Real-time Storefront Search Grid Filtering,
 * Direct Rx Upload Email Notifications to Admin,
 * Dynamic Store Branding, Multi-role Auth & Dual DB Mode.
 */

// Initial Seed Data
const INITIAL_CATEGORIES = [
  { id: "cat-1", name: "Prescription Medicines", icon: "fa-prescription", description: "Doctor prescribed prescription drugs" },
  { id: "cat-2", name: "Personal Care", icon: "fa-pump-soap", description: "Soaps, body washes, deodorants and shampoos" },
  { id: "cat-3", name: "Baby Care", icon: "fa-baby", description: "Baby diapers, wipes, and skincare" },
  { id: "cat-4", name: "Ayurveda", icon: "fa-leaf", description: "Herbal medicines and natural remedies" },
  { id: "cat-5", name: "Health Devices", icon: "fa-heart-pulse", description: "BP monitors, thermometers, glucometers" },
  { id: "cat-6", name: "Nutritional Drinks", icon: "fa-bottle-water", description: "Protein powders, multivitamins & supplements" },
  { id: "cat-7", name: "Home Essentials", icon: "fa-house-medical", description: "First aid, hand sanitizers, disinfectants" }
];

const INITIAL_MEDICINES = [
  {
    id: "med-101",
    title: "Activated Charcoal Skin Care Soap, 250g (2x125g)",
    brand: "Pharmacy Direct",
    salt: "Charcoal & Vitamin E",
    category: "Personal Care",
    price: 99.4,
    mrp: 177.5,
    discount: "44% OFF",
    stock: 120,
    rxRequired: false,
    dealTag: "Value Deal",
    imageUrl: "https://images.unsplash.com/photo-1607006482172-35891d9e1158?w=400&auto=format&fit=crop&q=80",
    description: "Deep cleansing activated charcoal soap for radiant skin."
  },
  {
    id: "med-102",
    title: "Aqua Blue Antibacterial Hand Wash, 500 ml",
    brand: "Health Essentials",
    salt: "Germ Protect Formula",
    category: "Personal Care",
    price: 99.2,
    mrp: 160.0,
    discount: "38% OFF",
    stock: 85,
    rxRequired: false,
    dealTag: "Value Deal",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80",
    description: "Moisturizing antibacterial liquid hand wash refill."
  },
  {
    id: "med-103",
    title: "Refreshing Ocean Minerals Body Wash, 400ml",
    brand: "Pure Care",
    salt: "Ocean Minerals & Aloe",
    category: "Personal Care",
    price: 100.0,
    mrp: 200.0,
    discount: "50% OFF",
    stock: 60,
    rxRequired: false,
    dealTag: "50% OFF",
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=80",
    description: "Invigorating shower gel for fresh all-day feel."
  },
  {
    id: "med-104",
    title: "Premium Citrus Refreshing Wet Wipes, 60 Wipes",
    brand: "Health Essentials",
    salt: "Citrus Extract & Glycerin",
    category: "Personal Care",
    price: 99.2,
    mrp: 159.0,
    discount: "38% OFF",
    stock: 140,
    rxRequired: false,
    dealTag: "Value Deal",
    imageUrl: "https://images.unsplash.com/photo-1608248597260-6582054b2b8a?w=400&auto=format&fit=crop&q=80",
    description: "Soft alcohol-free cleansing facial wipes."
  },
  {
    id: "med-105",
    title: "Pure Aloe Vera Skin Care Gel, 200g",
    brand: "Herbal Organics",
    salt: "99% Pure Aloe Vera",
    category: "Personal Care",
    price: 99.2,
    mrp: 166.0,
    discount: "38% OFF",
    stock: 90,
    rxRequired: false,
    dealTag: "Value Deal",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80",
    description: "Soothing natural aloe vera gel for skin hydrations."
  },
  {
    id: "med-106",
    title: "Natural Sandalwood Bath Soap, 250g (2x125g)",
    brand: "Pharmacy Direct",
    salt: "Pure Sandalwood Oil",
    category: "Personal Care",
    price: 99.4,
    mrp: 177.5,
    discount: "44% OFF",
    stock: 110,
    rxRequired: false,
    dealTag: "Value Deal",
    imageUrl: "https://images.unsplash.com/photo-1607006482172-35891d9e1158?w=400&auto=format&fit=crop&q=80",
    description: "Aromatic sandalwood soap for smooth skin."
  },
  {
    id: "med-107",
    title: "Nivea Men Fresh Active Deodorant Spray, 150ml",
    brand: "Nivea Men",
    salt: "Ocean Extracts",
    category: "Personal Care",
    price: 149.0,
    mrp: 299.0,
    discount: "50% OFF",
    stock: 50,
    rxRequired: false,
    dealTag: "50% OFF",
    imageUrl: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=400&auto=format&fit=crop&q=80",
    description: "48-hour deodorant protection for active men."
  },
  {
    id: "med-108",
    title: "Lacto Calamine SPF 50 Sunscreen Lotion, 50g",
    brand: "Lacto Calamine",
    salt: "Kaolin Clay & Zinc Oxide",
    category: "Personal Care",
    price: 125.0,
    mrp: 250.0,
    discount: "50% OFF",
    stock: 75,
    rxRequired: false,
    dealTag: "50% OFF",
    imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&auto=format&fit=crop&q=80",
    description: "Oil control matte sunscreen lotion."
  },
  {
    id: "med-109",
    title: "Dabur Red Toothpaste Paste, 200g",
    brand: "Dabur",
    salt: "Clove Oil & Pudina",
    category: "Ayurveda",
    price: 65.0,
    mrp: 130.0,
    discount: "50% OFF",
    stock: 200,
    rxRequired: false,
    dealTag: "50% OFF",
    imageUrl: "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=400&auto=format&fit=crop&q=80",
    description: "Ayurvedic toothpaste for total gum and teeth care."
  },
  {
    id: "med-110",
    title: "Little's Premium Comfort Baby Diapers - Large (60 Pants)",
    brand: "Little's",
    salt: "Cotton Soft Weave",
    category: "Baby Care",
    price: 299.0,
    mrp: 599.0,
    discount: "50% OFF",
    stock: 40,
    rxRequired: false,
    dealTag: "50% OFF",
    imageUrl: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&auto=format&fit=crop&q=80",
    description: "Absorbent leak-proof pant style baby diapers."
  },
  {
    id: "med-111",
    title: "Dolo 650mg Paracetamol Tablets (15 Strip)",
    brand: "Micro Labs",
    salt: "Paracetamol 650mg",
    category: "Prescription Medicines",
    price: 30.5,
    mrp: 35.0,
    discount: "13% OFF",
    stock: 300,
    rxRequired: false,
    dealTag: "Bestseller",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80",
    description: "Fever and mild to moderate pain relief tablet."
  },
  {
    id: "med-112",
    title: "Amoxicillin 500mg Antibiotic Capsules (10 Strip)",
    brand: "Cipla",
    salt: "Amoxicillin Trihydrate",
    category: "Prescription Medicines",
    price: 85.0,
    mrp: 105.0,
    discount: "19% OFF",
    stock: 150,
    rxRequired: true,
    dealTag: "Rx Required",
    imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&auto=format&fit=crop&q=80",
    description: "Broad spectrum antibiotic capsule. Doctor prescription mandatory."
  },
  {
    id: "med-113",
    title: "Omron Smart Digital Blood Pressure Monitor",
    brand: "Omron",
    salt: "Oscillometric Sensor",
    category: "Health Devices",
    price: 1890.0,
    mrp: 2490.0,
    discount: "24% OFF",
    stock: 25,
    rxRequired: false,
    dealTag: "Top Rated",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop&q=80",
    description: "Automatic arm BP monitor with memory storage."
  },
  {
    id: "med-114",
    title: "Waterproof Rapid Digital Thermometer",
    brand: "Health Devices",
    salt: "Precision Microchip",
    category: "Health Devices",
    price: 199.0,
    mrp: 349.0,
    discount: "43% OFF",
    stock: 80,
    rxRequired: false,
    dealTag: "Value Deal",
    imageUrl: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&auto=format&fit=crop&q=80",
    description: "10-second fast fever reading digital thermometer."
  }
];

const INITIAL_USERS = [
  { username: "admin", password: "admin123", role: "admin", name: "Pharmacy Admin" },
  { username: "pharmacist", password: "pharma123", role: "pharmacist", name: "Dr. Rajesh Pharmacist" },
  { username: "rider", password: "rider123", role: "rider", name: "Suresh Delivery Rider" }
];

const INITIAL_COUPONS = [
  {
    id: "coup-1",
    code: "WEB200",
    description: "Flat ₹200 OFF on orders above ₹500",
    discountType: "flat",
    discountValue: 200,
    minOrderValue: 500,
    maxDiscount: 200,
    status: "active"
  },
  {
    id: "coup-2",
    code: "HALF50",
    description: "50% OFF on orders above ₹100 (Max ₹150 OFF)",
    discountType: "percentage",
    discountValue: 50,
    minOrderValue: 100,
    maxDiscount: 150,
    status: "active"
  },
  {
    id: "coup-3",
    code: "SAVE20",
    description: "20% OFF on all orders above ₹100",
    discountType: "percentage",
    discountValue: 20,
    minOrderValue: 100,
    maxDiscount: 100,
    status: "active"
  }
];

const INITIAL_BANNERS = [
  {
    id: "banner-1",
    tag: "EXPRESS PHARMACY",
    title: "Same Salt, Bigger Savings",
    description: "Quality generic & branded prescription medicines delivered directly to your doorstep with up to 50% savings.",
    buttonText: "Explore Pharmacy Savings",
    buttonAction: "switchCategoryFilter('Prescription Medicines')",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80",
    bgGradient: "linear-gradient(135deg, #013728 0%, #004d40 60%, #00695c 100%)",
    status: "active"
  },
  {
    id: "banner-2",
    tag: "DOCTOR PRESCRIPTION",
    title: "Upload Prescription for Instant Order",
    description: "Got a prescription from your doctor? Upload it here and our registered pharmacist will verify and fulfill your medicines.",
    buttonText: "Upload Prescription Now",
    buttonAction: "openRxUploadModal()",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format&fit=crop&q=80",
    bgGradient: "linear-gradient(135deg, #0f172a 0%, #005641 100%)",
    status: "active"
  },
  {
    id: "banner-3",
    tag: "SPECIAL PROMO",
    title: "Flat 20% OFF + Extra Savings",
    description: "Use promo code SAVE20 on orders above ₹100 for instant discount on health & wellness products.",
    buttonText: "View Promo Offers",
    buttonAction: "openCartDrawer()",
    imageUrl: "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=500&auto=format&fit=crop&q=80",
    bgGradient: "linear-gradient(135deg, #004d40 0%, #00897b 100%)",
    status: "active"
  }
];

const THEMES = {
  emerald: {
    dark: "#013728",
    main: "#005641",
    accent: "#00897b",
    mintLight: "#e0f2f1",
    mintSoft: "#f0fdf4",
    glow: "0 4px 20px rgba(0, 137, 123, 0.25)"
  },
  gold: {
    dark: "#451a03",
    main: "#78350f",
    accent: "#d97706",
    mintLight: "#fef3c7",
    mintSoft: "#fffbeb",
    glow: "0 4px 20px rgba(217, 119, 6, 0.3)"
  },
  sapphire: {
    dark: "#0f172a",
    main: "#1e3a8a",
    accent: "#0284c7",
    mintLight: "#e0f2fe",
    mintSoft: "#f0f9ff",
    glow: "0 4px 20px rgba(2, 132, 199, 0.3)"
  },
  amethyst: {
    dark: "#3b0764",
    main: "#581c87",
    accent: "#7c3aed",
    mintLight: "#f3e8ff",
    mintSoft: "#faf5ff",
    glow: "0 4px 20px rgba(124, 58, 237, 0.3)"
  },
  ruby: {
    dark: "#4c0519",
    main: "#881337",
    accent: "#e11d48",
    mintLight: "#ffe4e6",
    mintSoft: "#fff1f2",
    glow: "0 4px 20px rgba(225, 29, 72, 0.3)"
  },
  rose: {
    dark: "#500724",
    main: "#831843",
    accent: "#db2777",
    mintLight: "#fce7f3",
    mintSoft: "#fdf2f8",
    glow: "0 4px 20px rgba(219, 39, 119, 0.3)"
  }
};

const INITIAL_ORDERS = [];

// App State
let state = {
  medicines: [],
  categories: [],
  banners: [],
  activeBannerIndex: 0,
  orders: [],
  users: [],
  cart: [],
  coupons: [],
  appliedCoupon: null,
  currentUser: null,
  activeCategoryFilter: "all",
  searchQuery: "",
  sortBy: "relevance",
  viewLayout: "grid",
  filters: { rx: "all", discount: 0, price: "all" },
  attachedRxData: null,
  attachedRxName: "",
  activeInspectedOrderId: null,
  config: {
    dbMode: "live",
    apiUrl: "https://script.google.com/macros/s/AKfycbzCova6urulEts5tGl1-ZdRsCIMqpHtyqI8MjDwQ2X6brif9WmV6MMXd01S6F9i_gN2/exec",
    adminEmail: "vinaylakkakula1701@gmail.com",
    whatsappNumber: "919876543210",
    showFloatingCoupons: true,
    storeName: "Dhanush Medicals",
    storeTagline: "ONLINE PHARMACY WEB ORDERING",
    logoIcon: "fa-prescription-bottle-medical",
    themePreset: "emerald",
    emailAlertsEnabled: true
  }
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Emergency reset: open index.html?reset to clear all stored data
    if (window.location.search.includes("reset")) {
      try {
        localStorage.removeItem("pharmacy_app_config");
        localStorage.removeItem("pharmacy_app_medicines");
        localStorage.removeItem("pharmacy_app_categories");
        localStorage.removeItem("pharmacy_app_banners");
        localStorage.removeItem("pharmacy_app_orders");
        localStorage.removeItem("pharmacy_app_cart");
        localStorage.removeItem("pharmacy_app_users");
        localStorage.removeItem("pharmacy_app_coupons");
        console.log("[PHARMACY] All localStorage data cleared via ?reset");
      } catch(e) {}
      window.location.href = window.location.pathname;
      return;
    }

    loadStateFromStorage();
    updateBrandUI();
    renderHeroBanner();
    startHeroBannerAutoSlider();
    renderCategoryChips();
    renderProducts();
    updateCartBadge();
    setupSearchInput();
    renderAvailableCouponsList();
    startFloatingOfferAutoSlider();
    initPWAInstaller();
    console.log("[PHARMACY] App initialized successfully ✓");
  } catch(err) {
    console.error("[PHARMACY] Initialization error:", err);
    // If init crashes, try to clear bad data and reload
    try {
      localStorage.removeItem("pharmacy_app_config");
      localStorage.removeItem("pharmacy_app_medicines");
      localStorage.removeItem("pharmacy_app_categories");
      localStorage.removeItem("pharmacy_app_banners");
      localStorage.removeItem("pharmacy_app_orders");
      localStorage.removeItem("pharmacy_app_cart");
      localStorage.removeItem("pharmacy_app_users");
      localStorage.removeItem("pharmacy_app_coupons");
      console.log("[PHARMACY] Cleared corrupted localStorage, reloading...");
      window.location.reload();
    } catch(e) {}
  }
});

// State Persistence
function loadStateFromStorage() {
  try {
    const savedConfig = localStorage.getItem("pharmacy_app_config");
    if (savedConfig) {
      try { state.config = { ...state.config, ...JSON.parse(savedConfig) }; } catch(e) {}
    }
  } catch(e) {}

  // Ensure default Live API URL and Admin Email are configured
  state.config.dbMode = "live";
  state.config.apiUrl = "https://script.google.com/macros/s/AKfycbzCova6urulEts5tGl1-ZdRsCIMqpHtyqI8MjDwQ2X6brif9WmV6MMXd01S6F9i_gN2/exec";
  if (!state.config.adminEmail || state.config.adminEmail === "admin@pharmacy-express.com") {
    state.config.adminEmail = "vinaylakkakula1701@gmail.com";
  }

  try {
    const savedMeds = localStorage.getItem("pharmacy_app_medicines");
    if (savedMeds) {
      const parsed = JSON.parse(savedMeds);
      state.medicines = (Array.isArray(parsed) && parsed.length > 0) ? parsed : INITIAL_MEDICINES;
    } else {
      state.medicines = INITIAL_MEDICINES;
    }
  } catch(e) {
    state.medicines = INITIAL_MEDICINES;
  }

  try {
    const savedCats = localStorage.getItem("pharmacy_app_categories");
    if (savedCats) {
      const parsed = JSON.parse(savedCats);
      state.categories = (Array.isArray(parsed) && parsed.length > 0) ? parsed : INITIAL_CATEGORIES;
    } else {
      state.categories = INITIAL_CATEGORIES;
    }
  } catch(e) {
    state.categories = INITIAL_CATEGORIES;
  }

  try {
    const savedBanners = localStorage.getItem("pharmacy_app_banners");
    if (savedBanners) {
      const parsed = JSON.parse(savedBanners);
      state.banners = (Array.isArray(parsed) && parsed.length > 0) ? parsed : INITIAL_BANNERS;
    } else {
      state.banners = INITIAL_BANNERS;
    }
  } catch(e) {
    state.banners = INITIAL_BANNERS;
  }

  try {
    const savedCoupons = localStorage.getItem("pharmacy_app_coupons");
    if (savedCoupons) {
      const parsed = JSON.parse(savedCoupons);
      state.coupons = (Array.isArray(parsed) && parsed.length > 0) ? parsed : INITIAL_COUPONS;
    } else {
      state.coupons = INITIAL_COUPONS;
    }
  } catch(e) {
    state.coupons = INITIAL_COUPONS;
  }

  try {
    const savedOrders = localStorage.getItem("pharmacy_app_orders");
    state.orders = savedOrders ? JSON.parse(savedOrders) : INITIAL_ORDERS;
  } catch(e) {
    state.orders = INITIAL_ORDERS;
  }

  try {
    const savedCart = localStorage.getItem("pharmacy_app_cart");
    state.cart = savedCart ? JSON.parse(savedCart) : [];
  } catch(e) {
    state.cart = [];
  }

  try {
    const savedUsers = localStorage.getItem("pharmacy_app_users");
    state.users = savedUsers ? JSON.parse(savedUsers) : INITIAL_USERS;
  } catch(e) {
    state.users = INITIAL_USERS;
  }

  saveStateToStorage();
}

function saveStateToStorage() {
  try {
    localStorage.setItem("pharmacy_app_config", JSON.stringify(state.config));
    localStorage.setItem("pharmacy_app_medicines", JSON.stringify(state.medicines));
    localStorage.setItem("pharmacy_app_categories", JSON.stringify(state.categories));
    localStorage.setItem("pharmacy_app_banners", JSON.stringify(state.banners));
    localStorage.setItem("pharmacy_app_orders", JSON.stringify(state.orders));
    localStorage.setItem("pharmacy_app_cart", JSON.stringify(state.cart));
    localStorage.setItem("pharmacy_app_users", JSON.stringify(state.users));
    localStorage.setItem("pharmacy_app_coupons", JSON.stringify(state.coupons));
  } catch(e) {
    console.warn("Storage write skipped or restricted:", e);
  }
}

// Dynamic Branding UI & Theme Preset Update
function updateBrandUI() {
  const storeName = state.config.storeName || "MediExpress Pharmacy";
  const storeTagline = state.config.storeTagline || "ONLINE PHARMACY WEB ORDERING";
  const logoInput = state.config.logoIcon || "fa-prescription-bottle-medical";
  const themePreset = state.config.themePreset || "emerald";

  const brandNameEl = document.getElementById("headerBrandName");
  if (brandNameEl) brandNameEl.innerText = storeName;

  const brandSubEl = document.getElementById("headerBrandSub");
  if (brandSubEl) brandSubEl.innerText = storeTagline;

  const docTitleEl = document.getElementById("docTitle");
  if (docTitleEl) docTitleEl.innerText = `${storeName} - Online Medical Store & Web Ordering`;

  // Dynamic Brand Icon / Logo Image
  const brandIconContainer = document.querySelector(".brand-logo .brand-icon");
  if (brandIconContainer) {
    if (logoInput.startsWith("http://") || logoInput.startsWith("https://") || logoInput.startsWith("data:")) {
      brandIconContainer.innerHTML = `<img src="${logoInput}" style="width:30px; height:30px; object-fit:contain;" alt="Pharmacy Logo">`;
    } else {
      const iconClass = logoInput.startsWith("fa-") ? logoInput : ("fa-" + logoInput);
      brandIconContainer.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
    }
  }

  applyThemePreset(themePreset);
}

function applyThemePreset(themeKey) {
  const theme = THEMES[themeKey] || THEMES.emerald;
  const root = document.documentElement;
  root.style.setProperty("--pharmacy-emerald-dark", theme.dark);
  root.style.setProperty("--pharmacy-emerald-main", theme.main);
  root.style.setProperty("--pharmacy-teal-accent", theme.accent);
  root.style.setProperty("--pharmacy-mint-light", theme.mintLight);
  root.style.setProperty("--pharmacy-mint-soft", theme.mintSoft);
  root.style.setProperty("--shadow-glow", theme.glow);
}

function previewThemePreset(themeKey) {
  applyThemePreset(themeKey);
}

// Category Chips Bar
function renderCategoryChips() {
  const chipBar = document.getElementById("categoryChipBar");
  if (!chipBar) return;

  let html = `<div class="cat-chip ${state.activeCategoryFilter === 'all' && !state.searchQuery ? 'active' : ''}" data-category="all" onclick="switchCategoryFilter('all')"><i class="fa-solid fa-border-all"></i> All Products</div>`;
  
  state.categories.forEach(cat => {
    const isActive = state.activeCategoryFilter === cat.name && !state.searchQuery;
    html += `
      <div class="cat-chip ${isActive ? 'active' : ''}" data-category="${cat.name}" onclick="switchCategoryFilter('${cat.name}')">
        <i class="fa-solid ${cat.icon || 'fa-pills'}"></i> ${cat.name}
      </div>
    `;
  });

  chipBar.innerHTML = html;
}

function switchCategoryFilter(categoryName) {
  state.searchQuery = "";
  const input = document.getElementById("medicineSearchInput");
  if (input) input.value = "";

  state.activeCategoryFilter = categoryName;
  renderCategoryChips();
  renderProducts();

  if (categoryName !== 'all') {
    const catListing = document.getElementById("categoryListingSection");
    if (catListing) {
      catListing.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function toggleCategoryLayout() {
  state.viewLayout = state.viewLayout === 'grid' ? 'list' : 'grid';
  const icon = document.getElementById("layoutToggleIcon");
  const btn = document.getElementById("btnLayoutToggle");
  if (icon) {
    icon.className = state.viewLayout === 'grid' ? 'fa-solid fa-border-all' : 'fa-solid fa-list';
  }
  if (btn) {
    btn.title = state.viewLayout === 'grid' ? 'Switch to List View' : 'Switch to Grid View';
  }
  renderProducts();
}

function handleSortChange(sortVal) {
  state.sortBy = sortVal;
  renderProducts();
}

function openCategoryFilterModal() {
  const overlay = document.getElementById("categoryFilterModalOverlay");
  if (overlay) overlay.classList.add("active");
  const rxSelect = document.getElementById("filterRxSelect");
  const discSelect = document.getElementById("filterDiscountSelect");
  const priceSelect = document.getElementById("filterPriceSelect");
  if (rxSelect) rxSelect.value = state.filters.rx;
  if (discSelect) discSelect.value = state.filters.discount;
  if (priceSelect) priceSelect.value = state.filters.price;
}

function closeCategoryFilterModal() {
  const overlay = document.getElementById("categoryFilterModalOverlay");
  if (overlay) overlay.classList.remove("active");
}

function applyCategoryFilters(e) {
  if (e) e.preventDefault();
  const rxVal = document.getElementById("filterRxSelect").value;
  const discVal = Number(document.getElementById("filterDiscountSelect").value);
  const priceVal = document.getElementById("filterPriceSelect").value;

  state.filters = { rx: rxVal, discount: discVal, price: priceVal };
  closeCategoryFilterModal();
  renderProducts();
  showToast("Filters applied", "info");
}

function resetCategoryFilters() {
  state.filters = { rx: "all", discount: 0, price: "all" };
  const rxSelect = document.getElementById("filterRxSelect");
  const discSelect = document.getElementById("filterDiscountSelect");
  const priceSelect = document.getElementById("filterPriceSelect");
  if (rxSelect) rxSelect.value = "all";
  if (discSelect) discSelect.value = "0";
  if (priceSelect) priceSelect.value = "all";
  closeCategoryFilterModal();
  renderProducts();
  showToast("Filters reset", "info");
}

// Render Products Grid & Live Search Filtering
function renderProducts() {
  const heroSec = document.querySelector(".hero-slider-section");
  const trustSec = document.querySelector(".trust-badges-strip");
  const quickSec = document.querySelector(".quick-services-grid");
  const secValue = document.getElementById("sectionValueDeals");
  const secFifty = document.getElementById("sectionFiftyPercent");
  const secMeds = document.getElementById("sectionMedicines");
  const categoryListing = document.getElementById("categoryListingSection");

  const isFilteredView = (state.activeCategoryFilter !== 'all') || (state.searchQuery && state.searchQuery.trim().length > 0);

  if (isFilteredView) {
    // Hide Home view clutter
    if (heroSec) heroSec.style.display = 'none';
    if (trustSec) trustSec.style.display = 'none';
    if (quickSec) quickSec.style.display = 'none';
    if (secValue) secValue.style.display = 'none';
    if (secFifty) secFifty.style.display = 'none';
    if (secMeds) secMeds.style.display = 'none';
    if (categoryListing) categoryListing.style.display = 'block';

    // Update Header & Breadcrumbs
    const catBreadcrumb = document.getElementById("categoryBreadcrumbActive");
    const catTitle = document.getElementById("categoryTitleName");

    if (state.searchQuery) {
      if (catBreadcrumb) catBreadcrumb.innerText = `Search: "${state.searchQuery}"`;
      if (catTitle) catTitle.innerText = `Search Results`;
    } else {
      if (catBreadcrumb) catBreadcrumb.innerText = state.activeCategoryFilter;
      if (catTitle) catTitle.innerText = state.activeCategoryFilter;
    }

    // Filter Products
    let filtered = state.medicines;
    if (state.searchQuery && state.searchQuery.trim().length > 0) {
      const q = state.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(q) || 
        (m.salt && m.salt.toLowerCase().includes(q)) || 
        (m.brand && m.brand.toLowerCase().includes(q)) ||
        m.category.toLowerCase().includes(q)
      );
    } else if (state.activeCategoryFilter !== 'all') {
      filtered = filtered.filter(m => m.category === state.activeCategoryFilter);
    }

    // Apply Filter Options
    if (state.filters.rx === 'otc') {
      filtered = filtered.filter(m => !m.rxRequired);
    } else if (state.filters.rx === 'rx') {
      filtered = filtered.filter(m => m.rxRequired);
    }

    if (state.filters.discount > 0) {
      filtered = filtered.filter(m => {
        const pct = m.mrp ? Math.round(((m.mrp - m.price) / m.mrp) * 100) : 0;
        return pct >= state.filters.discount;
      });
    }

    if (state.filters.price !== 'all') {
      const maxPrice = Number(state.filters.price);
      filtered = filtered.filter(m => m.price <= maxPrice);
    }

    // Apply Sorting
    if (state.sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === 'discount') {
      filtered.sort((a, b) => {
        const pctA = a.mrp ? Math.round(((a.mrp - a.price) / a.mrp) * 100) : 0;
        const pctB = b.mrp ? Math.round(((b.mrp - b.price) / b.mrp) * 100) : 0;
        return pctB - pctA;
      });
    } else if (state.sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    const totalCountEl = document.getElementById("categoryTotalCount");
    if (totalCountEl) totalCountEl.innerText = `- Total Items (${filtered.length})`;

    // Update Active Filter Pills Bar
    const pillsBar = document.getElementById("categoryActiveFilterPills");
    if (pillsBar) {
      let activePillsHtml = '';
      if (state.filters.rx !== 'all') {
        activePillsHtml += `<span class="active-pill">${state.filters.rx === 'rx' ? 'Rx Only' : 'OTC Only'} <i class="fa-solid fa-times" onclick="state.filters.rx='all'; renderProducts();"></i></span>`;
      }
      if (state.filters.discount > 0) {
        activePillsHtml += `<span class="active-pill">${state.filters.discount}%+ OFF <i class="fa-solid fa-times" onclick="state.filters.discount=0; renderProducts();"></i></span>`;
      }
      if (state.filters.price !== 'all') {
        activePillsHtml += `<span class="active-pill">Under ₹${state.filters.price} <i class="fa-solid fa-times" onclick="state.filters.price='all'; renderProducts();"></i></span>`;
      }

      if (activePillsHtml) {
        pillsBar.style.display = 'flex';
        pillsBar.innerHTML = activePillsHtml + `<span class="clear-all-pills" onclick="resetCategoryFilters()">Clear All</span>`;
      } else {
        pillsBar.style.display = 'none';
      }
    }

    renderApolloGrid("categoryProductsGrid", filtered);

  } else {
    // Show Standard Home View
    if (heroSec) heroSec.style.display = 'grid';
    if (trustSec) trustSec.style.display = 'grid';
    if (quickSec) quickSec.style.display = 'grid';
    if (secValue) secValue.style.display = 'block';
    if (secFifty) secFifty.style.display = 'block';
    if (secMeds) secMeds.style.display = 'block';
    if (categoryListing) categoryListing.style.display = 'none';

    const valueDeals = state.medicines.filter(m => m.price <= 100 || m.dealTag === "Value Deal");
    renderGrid("valueDealsGrid", valueDeals.slice(0, 6));

    const fiftyPercent = state.medicines.filter(m => m.mrp > 0 && Math.round(((m.mrp - m.price) / m.mrp) * 100) >= 40);
    renderGrid("fiftyPercentGrid", fiftyPercent.slice(0, 6));

    const medicines = state.medicines.filter(m => m.category === "Prescription Medicines" || m.rxRequired);
    renderGrid("medicinesGrid", medicines.length > 0 ? medicines : state.medicines.slice(0, 6));
  }
}

// Apollo Pharmacy Style Product Cards Renderer
function renderApolloGrid(containerId, productList) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!productList || productList.length === 0) {
    container.innerHTML = `
      <div class="apollo-empty-state">
        <i class="fa-solid fa-box-open" style="font-size:3rem; color:#cbd5e1; margin-bottom:12px;"></i>
        <h4>No Products Available</h4>
        <p style="font-size:0.85rem; color:var(--pharmacy-text-muted);">Try resetting filters or searching for another category.</p>
        <button class="btn btn-secondary" onclick="resetCategoryFilters(); switchCategoryFilter('all');" style="margin-top:14px;"><i class="fa-solid fa-rotate-left"></i> View All Products</button>
      </div>
    `;
    return;
  }

  container.className = state.viewLayout === 'list' ? 'apollo-products-list-view' : 'apollo-products-grid';

  container.innerHTML = productList.map(med => {
    const discountPct = med.mrp ? Math.round(((med.mrp - med.price) / med.mrp) * 100) : 0;
    const cartItem = state.cart.find(c => c.id === med.id);
    const qty = cartItem ? cartItem.qty : 0;
    const img = med.imageUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300';
    
    // Tag labels e.g. Pack / Diaper / Tablet
    let packTag = 'Pack';
    if (med.title.toLowerCase().includes('soap')) packTag = 'Soap';
    else if (med.title.toLowerCase().includes('diaper')) packTag = 'Diaper';
    else if (med.title.toLowerCase().includes('tablet')) packTag = 'Tablet';
    else if (med.title.toLowerCase().includes('wash')) packTag = 'Bottle';
    else if (med.title.toLowerCase().includes('capsule')) packTag = 'Capsule';

    let unitPrice = '';
    if (med.price <= 100) {
      unitPrice = `₹${med.price.toFixed(2)}/unit`;
    } else {
      unitPrice = `₹${(med.price / 10).toFixed(2)}/unit`;
    }

    return `
      <div class="apollo-product-card">
        <!-- Top Image Container with Light Soft BG -->
        <div class="apollo-img-box">
          ${discountPct > 0 ? `
            <span class="apollo-badge-discount">${med.dealTag ? med.dealTag + ', ' : ''}${discountPct}% OFF</span>
          ` : (med.rxRequired ? `<span class="apollo-badge-rx"><i class="fa-solid fa-file-prescription"></i> Rx</span>` : '')}

          <img src="${img}" alt="${med.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300'">

          <!-- Apollo Style Add Button Positioned at Bottom Right of Image Container -->
          <div class="apollo-action-slot">
            ${qty === 0 ? `
              <button class="apollo-btn-add" onclick="addToCart('${med.id}', event)">
                Add
              </button>
            ` : `
              <div class="apollo-qty-stepper">
                <button class="apollo-stepper-btn" onclick="updateCartQty('${med.id}', -1)">-</button>
                <span class="apollo-stepper-val">${qty}</span>
                <button class="apollo-stepper-btn" onclick="updateCartQty('${med.id}', 1, event)">+</button>
              </div>
            `}
          </div>
        </div>

        <!-- Product Information below Image Container -->
        <div class="apollo-card-details">
          <div class="apollo-tags-container">
            <span class="apollo-tag-chip">${packTag}</span>
            ${med.brand ? `<span class="apollo-tag-chip brand-chip">${med.brand.substring(0, 14)}</span>` : ''}
          </div>

          <h4 class="apollo-product-title" title="${med.title}">${med.title}</h4>
          
          <div class="apollo-product-sub">${med.salt ? med.salt : (med.description || 'Quality Healthcare Product')}</div>

          <div class="apollo-price-section">
            <div class="apollo-mrp-row">
              ${med.mrp ? `<span class="apollo-mrp-text">MRP ₹${med.mrp.toFixed(2)}</span>` : ''}
              ${discountPct > 0 ? `<span class="apollo-disc-green">${discountPct}% off</span>` : ''}
            </div>

            <div class="apollo-main-price-row">
              <span class="apollo-final-price">₹${med.price.toFixed(2)}</span>
              <span class="apollo-unit-cost">(${unitPrice})</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderGrid(containerId, productList) {
  renderApolloGrid(containerId, productList);
}

// Cart Management
function addToCart(medId, event) {
  const med = state.medicines.find(m => m.id === medId);
  if (!med) return;

  const existing = state.cart.find(c => c.id === medId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ id: med.id, title: med.title, price: med.price, imageUrl: med.imageUrl, rxRequired: med.rxRequired, qty: 1 });
  }

  saveStateToStorage();
  updateCartBadge();
  renderProducts();
  renderCartDrawer();

  if (event) {
    animateFlyingCart(event, med.imageUrl);
  }

  showToast(`Added "${med.title.substring(0, 20)}..." to cart`, "success");
}

function animateFlyingCart(event, imgUrl) {
  const targetBadge = document.getElementById("headerCartBadge") || document.querySelector(".cart-btn-badge");
  if (!targetBadge) return;

  const btn = event.currentTarget || event.target;
  const startRect = btn.getBoundingClientRect();
  const targetRect = targetBadge.getBoundingClientRect();

  const flyImg = document.createElement("img");
  flyImg.src = imgUrl || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100";
  flyImg.className = "flying-cart-item";
  flyImg.style.left = `${startRect.left + startRect.width / 2 - 27}px`;
  flyImg.style.top = `${startRect.top + startRect.height / 2 - 27}px`;

  document.body.appendChild(flyImg);

  const dx = targetRect.left - (startRect.left + startRect.width / 2 - 27);
  const dy = targetRect.top - (startRect.top + startRect.height / 2 - 27);

  requestAnimationFrame(() => {
    flyImg.style.transform = `translate(${dx}px, ${dy}px) scale(0.18) rotate(360deg)`;
    flyImg.style.opacity = "0.2";
  });

  setTimeout(() => {
    flyImg.remove();

    // Trigger bounce pop animation on Cart Badge & Header Icon
    targetBadge.classList.remove("cart-bounce-pop");
    void targetBadge.offsetWidth;
    targetBadge.classList.add("cart-bounce-pop");

    const cartIcon = document.querySelector(".main-header .fa-cart-shopping");
    if (cartIcon) {
      cartIcon.classList.remove("cart-bounce-pop");
      void cartIcon.offsetWidth;
      cartIcon.classList.add("cart-bounce-pop");
    }
  }, 750);
}

function updateCartQty(medId, delta, event) {
  const index = state.cart.findIndex(c => c.id === medId);
  if (index > -1) {
    const item = state.cart[index];
    state.cart[index].qty += delta;
    if (state.cart[index].qty <= 0) {
      state.cart.splice(index, 1);
    } else if (delta > 0 && event && item) {
      animateFlyingCart(event, item.imageUrl);
    }
  }

  saveStateToStorage();
  updateCartBadge();
  renderProducts();
  renderCartDrawer();
}

function updateCartBadge() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById("headerCartBadge");
  const drawerCount = document.getElementById("cartDrawerCount");
  if (badge) badge.innerText = totalItems;
  if (drawerCount) drawerCount.innerText = totalItems;
}

function openCartDrawer() {
  renderCartDrawer();
  document.getElementById("cartDrawerOverlay").classList.add("active");
  document.getElementById("cartDrawer").classList.add("active");
}

function closeCartDrawer() {
  document.getElementById("cartDrawerOverlay").classList.remove("active");
  document.getElementById("cartDrawer").classList.remove("active");
}

function renderCartDrawer() {
  const body = document.getElementById("cartDrawerBody");
  if (!body) return;

  if (state.cart.length === 0) {
    body.innerHTML = `
      <div style="text-align:center; padding:50px 20px; color:var(--pharmacy-text-muted);">
        <i class="fa-solid fa-cart-flatbed" style="font-size:3rem; margin-bottom:12px; color:#cbd5e1;"></i>
        <h4>Your Shopping Cart is Empty</h4>
        <p style="font-size:0.85rem;">Browse medicines and health items to add them to your cart.</p>
      </div>
    `;
    updateCartTotals(0);
    return;
  }

  let subtotal = 0;
  const html = state.cart.map(item => {
    subtotal += item.price * item.qty;
    const img = item.imageUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100';
    return `
      <div class="cart-item-card">
        <img src="${img}" class="cart-item-img" alt="${item.title}">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-price">₹${item.price.toFixed(2)} x ${item.qty} = ₹${(item.price * item.qty).toFixed(2)}</div>
          ${item.rxRequired ? `<span class="status-pill status-rx_pending" style="font-size:0.65rem; margin-top:4px;">Rx Required</span>` : ''}
        </div>
        <div class="qty-counter-control">
          <button class="btn-qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
          <span class="qty-val">${item.qty}</span>
          <button class="btn-qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
        </div>
      </div>
    `;
  }).join('');

  body.innerHTML = html;
  updateCartTotals(subtotal);
}

function updateCartTotals(subtotal) {
  const subtotalEl = document.getElementById("cartSubtotalVal");
  if (subtotalEl) subtotalEl.innerText = `₹${subtotal.toFixed(2)}`;

  const discountRow = document.getElementById("cartCouponDiscountRow");
  const discountVal = document.getElementById("cartCouponDiscountVal");
  const codeTag = document.getElementById("appliedCouponCodeTag");
  const statusEl = document.getElementById("appliedCouponStatus");

  let discountAmount = 0;

  if (state.appliedCoupon && subtotal > 0) {
    const c = state.appliedCoupon;
    if (subtotal >= c.minOrderValue) {
      if (c.discountType === "flat") {
        discountAmount = c.discountValue;
      } else if (c.discountType === "percentage") {
        discountAmount = subtotal * (c.discountValue / 100);
        if (c.maxDiscount && c.maxDiscount > 0) {
          discountAmount = Math.min(discountAmount, c.maxDiscount);
        }
      }
      state.appliedCoupon.discountAmount = discountAmount;

      if (discountRow) discountRow.style.display = "flex";
      if (discountVal) discountVal.innerText = `-₹${discountAmount.toFixed(2)}`;
      if (codeTag) codeTag.innerText = c.code;

      if (statusEl) {
        statusEl.innerHTML = `<div style="font-size:0.75rem; color:#15803d; font-weight:800; display:flex; justify-content:space-between; align-items:center;">
          <span><i class="fa-solid fa-circle-check"></i> Coupon "${c.code}" Applied (-₹${discountAmount.toFixed(2)})</span>
          <a href="#" onclick="removeAppliedCoupon(); return false;" style="color:#ef4444; font-size:0.75rem; text-decoration:underline;">Remove</a>
        </div>`;
      }
    } else {
      const diff = c.minOrderValue - subtotal;
      if (discountRow) discountRow.style.display = "none";
      if (statusEl) {
        statusEl.innerHTML = `<div style="font-size:0.74rem; color:#b91c1c; font-weight:700;">
          Add ₹${diff.toFixed(2)} more to use coupon "${c.code}"
        </div>`;
      }
    }
  } else {
    if (discountRow) discountRow.style.display = "none";
    if (statusEl) statusEl.innerHTML = "";
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);
  const totalEl = document.getElementById("cartTotalVal");
  if (totalEl) totalEl.innerText = `₹${finalTotal.toFixed(2)}`;
}

// Checkout Modal
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast("Please add items to your cart first!", "error");
    return;
  }
  closeCartDrawer();
  document.getElementById("checkoutModalOverlay").classList.add("active");
}

function closeCheckoutModal() {
  document.getElementById("checkoutModalOverlay").classList.remove("active");
}

function previewRxFile(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    state.attachedRxName = file.name;
    const reader = new FileReader();
    reader.onload = (e) => {
      state.attachedRxData = e.target.result;
      document.getElementById("rxFileName").innerText = file.name;
      document.getElementById("rxPreviewBox").style.display = "block";
    };
    reader.readAsDataURL(file);
  }
}

async function handlePlaceOrder(e) {
  e.preventDefault();

  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  const address = document.getElementById("custAddress").value;
  const payment = document.getElementById("custPayment").value;

  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  let discountAmount = 0;
  let appliedCode = "";

  if (state.appliedCoupon && subtotal >= (state.appliedCoupon.minOrderValue || 0)) {
    discountAmount = state.appliedCoupon.discountAmount || 0;
    appliedCode = state.appliedCoupon.code;
  }

  const total = Math.max(0, subtotal - discountAmount);
  const hasRx = state.cart.some(item => item.rxRequired) || Boolean(state.attachedRxData);

  const orderId = "ORD-" + Math.floor(1000 + Math.random() * 9000);
  const newOrder = {
    id: orderId,
    date: new Date().toLocaleString(),
    customerName: name,
    phone: phone,
    address: address,
    paymentMethod: payment,
    items: [...state.cart],
    subtotal: subtotal,
    couponCode: appliedCode,
    discountAmount: discountAmount,
    total: total,
    status: hasRx ? "rx_pending" : "pending",
    rxRequired: hasRx,
    rxUrl: state.attachedRxData || "",
    rxFileName: state.attachedRxName || "",
    assignedRider: "rider"
  };

  state.orders.unshift(newOrder);
  state.cart = [];
  state.appliedCoupon = null;
  state.attachedRxData = null;
  state.attachedRxName = "";
  saveStateToStorage();
  updateCartBadge();
  renderProducts();

  closeCheckoutModal();

  // Send Order & Trigger Instant Admin Email Notification
  triggerAdminOrderEmailAlert(newOrder);
  openOrderTracker(newOrder.id);
}

// Prescription Direct Submit - Triggers Admin Email Alert!
function openRxUploadModal(e) {
  if (e && e.preventDefault) e.preventDefault();
  const overlay = document.getElementById("rxUploadModalOverlay");
  if (overlay) overlay.classList.add("active");
}

function closeRxUploadModal() {
  document.getElementById("rxUploadModalOverlay").classList.remove("active");
}

function handleDirectRxSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("rxPatientName").value;
  const phone = document.getElementById("rxPatientPhone").value;
  const notes = document.getElementById("rxNotes").value;
  const fileInput = document.getElementById("directRxFileInput");

  if (!fileInput || !fileInput.files || !fileInput.files[0]) {
    showToast("Please select a prescription file to upload!", "error");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(evt) {
    const uploadedBase64 = evt.target.result;
    const orderId = "RX-" + Math.floor(1000 + Math.random() * 9000);

    const rxOrder = {
      id: orderId,
      date: new Date().toLocaleString(),
      customerName: name,
      phone: phone,
      address: "Prescription Direct Upload (Address to be confirmed)",
      paymentMethod: "Cash on Delivery",
      items: [{ id: "rx-custom", title: "Direct Prescription Upload: " + (notes || "Rx Review"), price: 0.0, qty: 1 }],
      total: 0.0,
      status: "rx_pending",
      rxRequired: true,
      rxUrl: uploadedBase64,
      rxFileName: file.name,
      assignedRider: "rider"
    };

    state.orders.unshift(rxOrder);
    saveStateToStorage();
    closeRxUploadModal();

    // Trigger Instant Admin Email Alert for Prescription Upload!
    triggerAdminOrderEmailAlert(rxOrder);
    openOrderTracker(orderId);
  };

  reader.readAsDataURL(file);
}

// Helper to trigger Admin Email Notification
async function triggerAdminOrderEmailAlert(orderObj, isTestMode = false) {
  const emailInput = document.getElementById("adminConfigEmailInput");
  const targetEmail = (emailInput && emailInput.value.trim()) ? emailInput.value.trim() : (state.config.adminEmail || "vinaylakkakula1701@gmail.com");
  const storeName = state.config.storeName || "Dhanush Medicals";

  if (isTestMode) {
    showToast(`Firing test email alert to ${targetEmail}...`, "success");
  } else {
    showToast(`🎉 Order #${orderObj.id} Placed Successfully! Processing express delivery.`, "success");
  }

  if (state.config.dbMode === "live" && state.config.apiUrl) {
    const payload = JSON.stringify({
      action: "saveOrder",
      data: orderObj,
      adminEmail: targetEmail,
      storeName: storeName
    });

    try {
      await fetch(state.config.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: payload
      });
      if (isTestMode) {
        showToast(`📧 Live Email Alert Dispatched to ${targetEmail}!`, "success");
      }
    } catch (err) {
      try {
        await fetch(state.config.apiUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: payload
        });
        if (isTestMode) {
          showToast(`📧 Live Email Alert Dispatched to ${targetEmail}!`, "success");
        }
      } catch (err2) {
        console.warn("Background email notification error:", err2);
      }
    }
  } else if (isTestMode) {
    showToast(`📧 [SANDBOX MODE] Email Alert triggered for (${targetEmail})!`, "success");
  }
}

async function sendTestAdminEmailAlert() {
  const emailInput = document.getElementById("adminConfigEmailInput");
  const targetEmail = (emailInput && emailInput.value.trim()) ? emailInput.value.trim() : (state.config.adminEmail || "vinaylakkakula1701@gmail.com");

  if (!targetEmail) {
    showToast("Please enter an Admin Notification Email Address!", "error");
    return;
  }

  const testOrder = {
    id: "TEST-" + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toLocaleString(),
    customerName: "Test Order Alert Notification",
    phone: "+91 9876543210",
    address: "Korutla Main Street, Telangana 505326",
    paymentMethod: "Cash on Delivery",
    items: [{ id: "test-item", title: "Dolo 650mg Paracetamol Tablets", price: 35.0, qty: 2 }],
    total: 70.0,
    status: "rx_pending",
    rxRequired: true,
    assignedRider: "rider"
  };

  await triggerAdminOrderEmailAlert(testOrder, true);
}

// Prescription Inspection & Preview Modal (Admin & Pharmacist)
function openRxPreviewModal(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  state.activeInspectedOrderId = orderId;
  document.getElementById("rxPreviewOrderId").innerText = "#" + order.id;
  document.getElementById("rxCustName").innerText = order.customerName;
  document.getElementById("rxCustPhone").innerText = order.phone;
  document.getElementById("rxCustAddr").innerText = order.address;

  const badge = document.getElementById("rxPreviewStatusBadge");
  badge.className = `status-pill status-${order.status}`;
  badge.innerText = order.status.replace('_', ' ');

  const imgBox = document.getElementById("rxPreviewImageContainer");
  const rxImgUrl = order.rxUrl;

  if (rxImgUrl && rxImgUrl.trim().length > 0) {
    imgBox.innerHTML = `
      <div style="text-align:center; width:100%;">
        <img src="${rxImgUrl}" style="max-width:100%; max-height:360px; border-radius:10px; box-shadow:var(--shadow-md); object-fit:contain;" alt="Uploaded Doctor Prescription">
        <div style="font-size:0.82rem; color:var(--pharmacy-text-muted); margin-top:8px; font-weight:700;">
          <i class="fa-solid fa-file-image"></i> ${order.rxFileName || 'Uploaded_Prescription.jpg'}
        </div>
      </div>
    `;
  } else {
    imgBox.innerHTML = `
      <div style="text-align:center; color:var(--pharmacy-text-muted); padding:30px;">
        <i class="fa-solid fa-file-circle-xmark" style="font-size:3rem; margin-bottom:10px; color:#cbd5e1;"></i>
        <p>No prescription image attached to this order.</p>
      </div>
    `;
  }

  const itemsHtml = order.items.map(i => `
    <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:6px;">
      <span>${i.title} (x${i.qty})</span>
      <strong>₹${(i.price * i.qty).toFixed(2)}</strong>
    </div>
  `).join('');
  document.getElementById("rxPreviewItemList").innerHTML = itemsHtml;

  document.getElementById("rxPreviewModalOverlay").classList.add("active");
}

function closeRxPreviewModal() {
  document.getElementById("rxPreviewModalOverlay").classList.remove("active");
  state.activeInspectedOrderId = null;
}

function approvePrescriptionAction() {
  if (state.activeInspectedOrderId) {
    updateOrderStatus(state.activeInspectedOrderId, "verified");
    closeRxPreviewModal();
    showToast(`Prescription #${state.activeInspectedOrderId} Approved & Verified!`, "success");
  }
}

function dispatchToRiderAction() {
  if (state.activeInspectedOrderId) {
    updateOrderStatus(state.activeInspectedOrderId, "on_the_way");
    closeRxPreviewModal();
    showToast(`Order #${state.activeInspectedOrderId} Dispatched to Rider!`, "success");
  }
}

// Order Tracker Modal
function openOrderTracker(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  document.getElementById("trackOrderId").innerText = "#" + order.id;
  document.getElementById("trackCustDetails").innerText = `${order.customerName} | ${order.phone}\n${order.address}`;
  document.getElementById("trackTotalPaid").innerText = `₹${order.total.toFixed(2)}`;

  const itemsHtml = order.items.map(i => `
    <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px;">
      <span>${i.title} (x${i.qty})</span>
      <strong>₹${(i.price * i.qty).toFixed(2)}</strong>
    </div>
  `).join('');
  document.getElementById("trackItemsList").innerHTML = itemsHtml;

  const steps = ["Placed", "Verified", "Packing", "Way", "Delivered"];
  const statusMap = { "pending": 1, "rx_pending": 1, "verified": 2, "packing": 3, "on_the_way": 4, "delivered": 5 };
  const currentLevel = statusMap[order.status] || 1;

  steps.forEach((step, idx) => {
    const el = document.getElementById("step" + step);
    if (el) {
      el.classList.remove("completed", "active");
      if (idx + 1 < currentLevel) {
        el.classList.add("completed");
      } else if (idx + 1 === currentLevel) {
        el.classList.add("active");
      }
    }
  });

  document.getElementById("orderTrackerModalOverlay").classList.add("active");
}

function closeTrackerModal() {
  document.getElementById("orderTrackerModalOverlay").classList.remove("active");
}

// Live Search Input Handler - Directs to search results on main page grid!
function setupSearchInput() {
  const input = document.getElementById("medicineSearchInput");
  if (!input) return;

  // Direct to search results on Enter keypress
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitSearchQuery();
    }
  });

  // Close search dropdown on outside click
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-wrapper")) {
      const dropdown = document.getElementById("searchResultsDropdown");
      if (dropdown) dropdown.classList.remove("active");
    }
  });
}

function handleSearchInput(query) {
  state.searchQuery = query;
  renderProducts();

  const dropdown = document.getElementById("searchResultsDropdown");
  if (!dropdown) return;

  if (!query || query.trim().length === 0) {
    dropdown.classList.remove("active");
    return;
  }

  const q = query.toLowerCase().trim();
  const matches = state.medicines.filter(m => 
    m.title.toLowerCase().includes(q) || 
    (m.salt && m.salt.toLowerCase().includes(q)) || 
    (m.brand && m.brand.toLowerCase().includes(q)) ||
    m.category.toLowerCase().includes(q)
  );

  if (matches.length === 0) {
    dropdown.innerHTML = `<div style="padding:14px; text-align:center; color:var(--pharmacy-text-muted); font-size:0.85rem;">No medicines found matching "${query}"</div>`;
  } else {
    dropdown.innerHTML = matches.slice(0, 8).map(m => `
      <div class="search-item-row" onclick="selectSearchProduct('${m.id}')">
        <img src="${m.imageUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100'}" class="search-item-img" alt="${m.title}">
        <div class="search-item-info">
          <div class="search-item-title">${m.title}</div>
          <div class="search-item-meta">${m.brand} • ${m.category}</div>
        </div>
        <div class="search-item-price">₹${m.price.toFixed(2)}</div>
      </div>
    `).join('');
  }

  dropdown.classList.add("active");
}

function selectSearchProduct(medId) {
  const med = state.medicines.find(m => m.id === medId);
  if (!med) return;

  // Direct to search results for this medicine on the main page
  state.searchQuery = med.title;
  const input = document.getElementById("medicineSearchInput");
  if (input) input.value = med.title;

  switchView('storefront');
  
  const dropdown = document.getElementById("searchResultsDropdown");
  if (dropdown) dropdown.classList.remove("active");

  renderProducts();

  // Scroll smoothly to search results on storefront
  setTimeout(() => {
    const filterTitleBar = document.getElementById("activeFilterTitleBar");
    if (filterTitleBar) {
      filterTitleBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
}

function submitSearchQuery() {
  const input = document.getElementById("medicineSearchInput");
  if (!input) return;

  const val = input.value.trim();
  state.searchQuery = val;

  switchView('storefront');

  const dropdown = document.getElementById("searchResultsDropdown");
  if (dropdown) dropdown.classList.remove("active");

  renderProducts();

  if (val.length > 0) {
    setTimeout(() => {
      const filterTitleBar = document.getElementById("activeFilterTitleBar");
      if (filterTitleBar) {
        filterTitleBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
}

// Clean View Switcher (Storefront vs Dashboard)
function switchView(viewName) {
  const storefront = document.getElementById("storefrontView");
  const categoryBar = document.getElementById("storefrontCategoryBar");
  const dashboard = document.getElementById("staffDashboardView");

  if (viewName === 'storefront') {
    if (storefront) storefront.style.display = 'block';
    if (categoryBar) categoryBar.style.display = 'block';
    if (dashboard) dashboard.style.display = 'none';
  } else {
    if (storefront) storefront.style.display = 'none';
    if (categoryBar) categoryBar.style.display = 'none';
    if (dashboard) dashboard.style.display = 'block';
  }
}

function openLoginModal(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (state.currentUser) {
    switchView('dashboard');
    renderStaffDashboard();
    showToast(`Already logged in as ${state.currentUser.name} (${state.currentUser.role.toUpperCase()})`, "info");
    return;
  }
  const overlay = document.getElementById("loginModalOverlay");
  if (overlay) overlay.classList.add("active");
}

function closeLoginModal() {
  document.getElementById("loginModalOverlay").classList.remove("active");
}

function handleStaffLogin(e) {
  e.preventDefault();
  const u = document.getElementById("loginUsername").value.trim();
  const p = document.getElementById("loginPassword").value.trim();

  const user = state.users.find(usr => usr.username.toLowerCase() === u.toLowerCase() && usr.password === p);

  if (!user) {
    showToast("Invalid credentials! Try admin / admin123", "error");
    return;
  }

  state.currentUser = user;
  closeLoginModal();
  document.getElementById("userAuthText").innerText = user.name;
  
  renderStaffDashboard();
  switchView('dashboard');
  showToast(`Welcome ${user.name} (${user.role.toUpperCase()})`, "success");
}

function logoutStaff() {
  state.currentUser = null;
  document.getElementById("userAuthText").innerText = "Login";
  switchView('storefront');
  showToast("Logged out successfully", "success");
}

function renderStaffDashboard() {
  if (!state.currentUser) return;

  const role = state.currentUser.role;
  const adminSec = document.getElementById("adminPanelSection");
  const pharmaSec = document.getElementById("pharmacistPanelSection");
  const riderSec = document.getElementById("riderPanelSection");
  const roleBadge = document.getElementById("staffRoleBadge");

  adminSec.style.display = "none";
  pharmaSec.style.display = "none";
  riderSec.style.display = "none";

  if (role === "admin") {
    adminSec.style.display = "block";
    roleBadge.innerText = "Role: Administrator";
    renderAdminTables();
  } else if (role === "pharmacist") {
    pharmaSec.style.display = "block";
    roleBadge.innerText = "Role: Registered Pharmacist";
    renderPharmacistQueue();
  } else if (role === "rider") {
    riderSec.style.display = "block";
    roleBadge.innerText = "Role: Delivery Rider";
    renderRiderPortal();
  }
}

// Admin Tab Switching
function switchAdminTab(tabName, event) {
  const tabs = ["tabMedicinesCrud", "tabCategoriesCrud", "tabBannersCrud", "tabCouponsCrud", "tabOrdersCrud", "tabUsersCrud", "tabAppBranding"];
  tabs.forEach(t => {
    const el = document.getElementById(t);
    if (el) el.style.display = (t.toLowerCase().includes(tabName.toLowerCase())) ? "block" : "none";
  });

  const btns = document.querySelectorAll(".dashboard-tabs .tab-btn");
  btns.forEach(btn => btn.classList.remove("active"));
  if (event && event.currentTarget) {
    event.currentTarget.classList.add("active");
  }

  renderAdminTables();
}

function renderAdminTables() {
  const totalOrdersEl = document.getElementById("statTotalOrders");
  if (totalOrdersEl) totalOrdersEl.innerText = state.orders.length;

  const totalRev = state.orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalRevEl = document.getElementById("statTotalRevenue");
  if (totalRevEl) totalRevEl.innerText = `₹${totalRev.toFixed(2)}`;

  const pendingRxCount = state.orders.filter(o => o.rxRequired || o.status === "rx_pending").length;
  const pendingRxEl = document.getElementById("statPendingRx");
  if (pendingRxEl) pendingRxEl.innerText = pendingRxCount;

  const catalogEl = document.getElementById("statCatalogCount");
  if (catalogEl) catalogEl.innerText = state.medicines.length;

  // Medicines Table
  const medTbody = document.getElementById("adminMedicinesTableBody");
  if (medTbody) {
    medTbody.innerHTML = state.medicines.map(m => {
      const img = m.imageUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=60';
      return `
        <tr>
          <td><img src="${img}" style="width:40px; height:40px; object-fit:contain; border-radius:6px;" onerror="this.src='https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=60'"></td>
          <td><strong>${m.title}</strong><br><small style="color:var(--pharmacy-text-muted);">${m.brand}</small></td>
          <td><span class="status-pill status-packing">${m.category}</span></td>
          <td>₹${m.price.toFixed(2)} ${m.mrp ? `<del style="color:#9ca3af; font-size:0.75rem;">₹${m.mrp.toFixed(2)}</del>` : ''}</td>
          <td>${m.rxRequired ? `<span class="status-pill status-rx_pending">Yes (Rx)</span>` : `OTC`}</td>
          <td>${m.stock}</td>
          <td>
            <button class="btn btn-secondary" style="padding:4px 8px;" onclick="openEditMedicineModal('${m.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="btn btn-danger" style="padding:4px 8px;" onclick="deleteMedicine('${m.id}')"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Categories Table
  const catTbody = document.getElementById("adminCategoriesTableBody");
  if (catTbody) {
    catTbody.innerHTML = state.categories.map(c => `
      <tr>
        <td><i class="fa-solid ${c.icon}" style="font-size:1.2rem; color:var(--pharmacy-emerald-dark);"></i></td>
        <td><strong>${c.name}</strong></td>
        <td>${c.description}</td>
        <td>
          <button class="btn btn-danger" style="padding:4px 8px;" onclick="deleteCategory('${c.id}')"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `).join('');
  }

  // Banners Table
  renderAdminBannersTable();

  // Coupons Table
  renderAdminCouponsTable();

  // Staff Accounts Table
  renderAdminUsersTable();

  // Orders Management Table
  const ordTbody = document.getElementById("adminOrdersTableBody");
  if (ordTbody) {
    ordTbody.innerHTML = state.orders.map(o => `
      <tr>
        <td><strong>#${o.id}</strong><br><small style="color:#9ca3af;">${o.date}</small></td>
        <td>${o.customerName}<br><small style="color:var(--pharmacy-text-muted);">${o.phone}</small></td>
        <td>
          ${o.items.length} items 
          ${o.rxRequired ? `<button class="btn btn-secondary" style="padding:2px 8px; font-size:0.75rem;" onclick="openRxPreviewModal('${o.id}')"><i class="fa-solid fa-file-medical"></i> Inspect Rx</button>` : ''}
        </td>
        <td>
          <strong>₹${o.total.toFixed(2)}</strong>
          ${o.couponCode ? `<br><small style="color:#15803d; font-weight:700;"><i class="fa-solid fa-ticket"></i> ${o.couponCode} (-₹${(o.discountAmount || 0).toFixed(2)})</small>` : ''}
        </td>
        <td><span class="status-pill status-${o.status}">${o.status.replace('_', ' ')}</span></td>
        <td>${o.assignedRider || 'rider'}</td>
        <td>
          <select onchange="updateOrderStatus('${o.id}', this.value)" style="padding:4px; font-size:0.8rem; border-radius:4px;">
            <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Pending</option>
            <option value="verified" ${o.status === 'verified' ? 'selected' : ''}>Rx Verified</option>
            <option value="packing" ${o.status === 'packing' ? 'selected' : ''}>Packing</option>
            <option value="on_the_way" ${o.status === 'on_the_way' ? 'selected' : ''}>On The Way</option>
            <option value="delivered" ${o.status === 'delivered' ? 'selected' : ''}>Delivered</option>
          </select>
        </td>
      </tr>
    `).join('');
  }

  // App Branding fields
  const storeNameInput = document.getElementById("adminConfigStoreName");
  if (storeNameInput) storeNameInput.value = state.config.storeName || "MediExpress Pharmacy";

  const taglineInput = document.getElementById("adminConfigStoreTagline");
  if (taglineInput) taglineInput.value = state.config.storeTagline || "ONLINE PHARMACY WEB ORDERING";

  const logoInput = document.getElementById("adminConfigLogoInput");
  if (logoInput) logoInput.value = state.config.logoIcon || "fa-prescription-bottle-medical";

  const themeSelect = document.getElementById("adminConfigThemeSelect");
  if (themeSelect) themeSelect.value = state.config.themePreset || "emerald";

  const emailInput = document.getElementById("adminConfigEmailInput");
  if (emailInput) emailInput.value = state.config.adminEmail || "admin@pharmacy-express.com";

  const emailToggle = document.getElementById("adminConfigEmailToggle");
  if (emailToggle) emailToggle.value = state.config.emailAlertsEnabled !== false ? "true" : "false";

  const whatsappInput = document.getElementById("adminConfigWhatsappInput");
  if (whatsappInput) whatsappInput.value = state.config.whatsappNumber || "919876543210";

  const couponToggle = document.getElementById("adminConfigFloatingCouponToggle");
  if (couponToggle) couponToggle.value = state.config.showFloatingCoupons !== false ? "true" : "false";
}

// Medicine CRUD
function openAddMedicineModal() {
  document.getElementById("medId").value = "";
  document.getElementById("medicineCrudForm").reset();
  document.getElementById("medicineModalTitle").innerHTML = `<i class="fa-solid fa-plus"></i> Add Pharmacy Item`;
  
  const select = document.getElementById("medCategory");
  select.innerHTML = state.categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');

  document.getElementById("medicineModalOverlay").classList.add("active");
}

function openEditMedicineModal(medId) {
  const m = state.medicines.find(item => item.id === medId);
  if (!m) return;

  document.getElementById("medId").value = m.id;
  document.getElementById("medTitle").value = m.title;
  document.getElementById("medBrand").value = m.brand || "";
  document.getElementById("medSalt").value = m.salt || "";
  document.getElementById("medPrice").value = m.price;
  document.getElementById("medMrp").value = m.mrp || m.price;
  document.getElementById("medStock").value = m.stock || 100;
  document.getElementById("medRxRequired").value = m.rxRequired ? "true" : "false";
  document.getElementById("medImageUrl").value = m.imageUrl || "";
  document.getElementById("medDesc").value = m.description || "";

  const select = document.getElementById("medCategory");
  select.innerHTML = state.categories.map(c => `<option value="${c.name}" ${c.name === m.category ? 'selected' : ''}>${c.name}</option>`).join('');

  document.getElementById("medicineModalTitle").innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Pharmacy Item`;
  document.getElementById("medicineModalOverlay").classList.add("active");
}

function closeMedicineModal() {
  document.getElementById("medicineModalOverlay").classList.remove("active");
}

function handleSaveMedicine(e) {
  e.preventDefault();
  const id = document.getElementById("medId").value || ("med-" + Date.now());
  const title = document.getElementById("medTitle").value;
  const brand = document.getElementById("medBrand").value || "Pharmacy Direct";
  const category = document.getElementById("medCategory").value;
  const salt = document.getElementById("medSalt").value;
  const price = parseFloat(document.getElementById("medPrice").value);
  const mrp = parseFloat(document.getElementById("medMrp").value) || price;
  const stock = parseInt(document.getElementById("medStock").value) || 100;
  const rxRequired = document.getElementById("medRxRequired").value === "true";
  const imageUrl = document.getElementById("medImageUrl").value;
  const description = document.getElementById("medDesc").value;

  const itemObj = { id, title, brand, category, salt, price, mrp, stock, rxRequired, imageUrl, description, dealTag: rxRequired ? "Rx Required" : "Deal" };

  const existingIdx = state.medicines.findIndex(m => m.id === id);
  if (existingIdx > -1) {
    state.medicines[existingIdx] = itemObj;
  } else {
    state.medicines.unshift(itemObj);
  }

  saveStateToStorage();
  closeMedicineModal();
  renderProducts();
  renderAdminTables();
  showToast(`Saved product "${title}" successfully`, "success");
}

function deleteMedicine(id) {
  if (confirm("Are you sure you want to delete this medicine?")) {
    state.medicines = state.medicines.filter(m => m.id !== id);
    saveStateToStorage();
    renderProducts();
    renderAdminTables();
    showToast("Medicine deleted", "success");
  }
}

function deleteCategory(id) {
  if (confirm("Are you sure you want to delete this category?")) {
    state.categories = state.categories.filter(c => c.id !== id);
    saveStateToStorage();
    renderCategoryChips();
    renderAdminTables();
    showToast("Category deleted", "success");
  }
}

function updateOrderStatus(orderId, newStatus) {
  const order = state.orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    saveStateToStorage();
    renderAdminTables();
    renderPharmacistQueue();
    renderRiderPortal();
    showToast(`Order ${orderId} status updated to ${newStatus}`, "success");
  }
}

function saveBrandingSettings(e) {
  e.preventDefault();
  state.config.storeName = document.getElementById("adminConfigStoreName").value.trim();
  state.config.storeTagline = document.getElementById("adminConfigStoreTagline").value.trim();
  
  const logoEl = document.getElementById("adminConfigLogoInput");
  if (logoEl) state.config.logoIcon = logoEl.value.trim();

  const themeEl = document.getElementById("adminConfigThemeSelect");
  if (themeEl) state.config.themePreset = themeEl.value;

  state.config.adminEmail = document.getElementById("adminConfigEmailInput").value.trim();
  state.config.emailAlertsEnabled = document.getElementById("adminConfigEmailToggle").value === "true";

  const whatsappEl = document.getElementById("adminConfigWhatsappInput");
  if (whatsappEl) state.config.whatsappNumber = whatsappEl.value.trim();

  const couponToggleEl = document.getElementById("adminConfigFloatingCouponToggle");
  if (couponToggleEl) {
    state.config.showFloatingCoupons = couponToggleEl.value === "true";
    if (state.config.showFloatingCoupons) {
      sessionStorage.removeItem("floating_coupon_dismissed");
    }
  }

  saveStateToStorage();
  updateBrandUI();
  updateDynamicCouponsUI();
  showToast(`App Branding & WhatsApp Settings saved!`, "success");
}

// -------------------------------------------------------------
// STAFF ACCOUNT & ROLE MANAGEMENT (ADMIN CRUD & PASSWORD RESET)
// -------------------------------------------------------------

function renderAdminUsersTable() {
  const tbody = document.getElementById("adminUsersTableBody");
  if (!tbody) return;

  if (!state.users || state.users.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--pharmacy-text-muted);">No staff users created yet.</td></tr>`;
    return;
  }

  const roleBadges = {
    admin: `<span class="status-pill" style="background:#f3e8ff; color:#7e22ce; border:1px solid #d8b4fe;"><i class="fa-solid fa-user-shield"></i> Admin</span>`,
    pharmacist: `<span class="status-pill" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd;"><i class="fa-solid fa-user-nurse"></i> Pharmacist</span>`,
    rider: `<span class="status-pill" style="background:#fef3c7; color:#b45309; border:1px solid #fde68a;"><i class="fa-solid fa-motorcycle"></i> Rider</span>`
  };

  tbody.innerHTML = state.users.map(u => {
    const isSelf = state.currentUser && state.currentUser.username.toLowerCase() === u.username.toLowerCase();
    const roleBadge = roleBadges[u.role] || `<span class="status-pill status-packing">${u.role}</span>`;
    return `
      <tr>
        <td>
          <strong>${u.name}</strong>
          ${isSelf ? `<span class="status-pill status-verified" style="margin-left:6px; font-size:0.7rem;">(You)</span>` : ''}
        </td>
        <td><code style="background:#f1f5f9; padding:2px 8px; border-radius:4px; font-size:0.85rem; font-family:monospace;">${u.username}</code></td>
        <td>${roleBadge}</td>
        <td>
          <div style="display:flex; align-items:center; gap:6px;">
            <span id="pwdText_${u.username}" style="font-family:monospace; background:#f8fafc; padding:2px 8px; border-radius:4px; border:1px solid #e2e8f0; min-width:80px; display:inline-block; text-align:center;">••••••••</span>
            <button class="btn btn-secondary" style="padding:2px 6px; font-size:0.75rem;" onclick="togglePasswordVisibility('${u.username}', '${u.password}')" title="Toggle password preview">
              <i class="fa-solid fa-eye" id="pwdEye_${u.username}"></i>
            </button>
          </div>
        </td>
        <td>
          <div style="display:flex; gap:6px;">
            <button class="btn btn-secondary" style="padding:4px 10px; font-size:0.8rem;" onclick="openEditUserModal('${u.username}')" title="Edit Staff & Reset Password">
              <i class="fa-solid fa-pen-to-square"></i> Edit / Reset Pwd
            </button>
            <button class="btn btn-danger" style="padding:4px 8px; font-size:0.8rem;" onclick="deleteUser('${u.username}')" ${isSelf ? 'disabled title="Cannot delete your active admin account"' : 'title="Delete Staff Account"'}>
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function togglePasswordVisibility(username, actualPassword) {
  const el = document.getElementById(`pwdText_${username}`);
  const eye = document.getElementById(`pwdEye_${username}`);
  if (!el) return;
  if (el.innerText === "••••••••") {
    el.innerText = actualPassword;
    if (eye) eye.className = "fa-solid fa-eye-slash";
  } else {
    el.innerText = "••••••••";
    if (eye) eye.className = "fa-solid fa-eye";
  }
}

function openAddUserModal() {
  document.getElementById("userEditUsernameHidden").value = "";
  document.getElementById("userFullNameInput").value = "";
  
  const usernameInput = document.getElementById("userUsernameInput");
  usernameInput.value = "";
  usernameInput.disabled = false;
  
  document.getElementById("userRoleSelect").value = "pharmacist";
  document.getElementById("userPasswordInput").value = "";
  document.getElementById("userModalTitle").innerHTML = `<i class="fa-solid fa-user-plus"></i> Create New Staff Account`;
  
  document.getElementById("userModalOverlay").classList.add("active");
}

function openEditUserModal(username) {
  const u = state.users.find(usr => usr.username.toLowerCase() === username.toLowerCase());
  if (!u) return;

  document.getElementById("userEditUsernameHidden").value = u.username;
  document.getElementById("userFullNameInput").value = u.name;
  
  const usernameInput = document.getElementById("userUsernameInput");
  usernameInput.value = u.username;
  usernameInput.disabled = true;
  
  document.getElementById("userRoleSelect").value = u.role;
  document.getElementById("userPasswordInput").value = u.password;
  document.getElementById("userModalTitle").innerHTML = `<i class="fa-solid fa-user-pen"></i> Edit Staff Account & Reset Password`;

  document.getElementById("userModalOverlay").classList.add("active");
}

function closeUserModal() {
  document.getElementById("userModalOverlay").classList.remove("active");
}

function generateRandomStaffPassword() {
  const prefixes = ["Med", "Pharma", "Rx", "Staff", "Admin", "Fast"];
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const pass = `${randomPrefix}@${randomNum}`;
  document.getElementById("userPasswordInput").value = pass;
  showToast(`Generated secure password: ${pass}`, "info");
}

function handleSaveUser(e) {
  e.preventDefault();
  const editUsername = document.getElementById("userEditUsernameHidden").value.trim();
  const fullName = document.getElementById("userFullNameInput").value.trim();
  const username = document.getElementById("userUsernameInput").value.trim();
  const role = document.getElementById("userRoleSelect").value;
  const password = document.getElementById("userPasswordInput").value.trim();

  if (!fullName || !username || !password) {
    showToast("Please fill in all required user fields!", "error");
    return;
  }

  if (editUsername) {
    // Editing existing staff user
    const idx = state.users.findIndex(u => u.username.toLowerCase() === editUsername.toLowerCase());
    if (idx !== -1) {
      state.users[idx].name = fullName;
      state.users[idx].role = role;
      state.users[idx].password = password;

      // If updating currently logged in user, update active state
      if (state.currentUser && state.currentUser.username.toLowerCase() === editUsername.toLowerCase()) {
        state.currentUser.name = fullName;
        state.currentUser.role = role;
        state.currentUser.password = password;
        document.getElementById("userAuthText").innerText = fullName;
      }
      showToast(`Updated staff account for "${username}" successfully!`, "success");
    }
  } else {
    // Creating new staff user
    const existing = state.users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (existing) {
      showToast(`Username "${username}" is already in use. Please choose another.`, "error");
      return;
    }

    state.users.push({
      username: username,
      name: fullName,
      role: role,
      password: password
    });
    showToast(`New staff user "${username}" (${role.toUpperCase()}) created successfully!`, "success");
  }

  saveStateToStorage();
  closeUserModal();
  renderAdminUsersTable();
}

function deleteUser(username) {
  if (state.currentUser && state.currentUser.username.toLowerCase() === username.toLowerCase()) {
    showToast("You cannot delete your own active logged-in account!", "error");
    return;
  }

  const u = state.users.find(usr => usr.username.toLowerCase() === username.toLowerCase());
  if (!u) return;

  if (confirm(`Are you sure you want to delete staff account "${u.name}" (@${u.username})?`)) {
    state.users = state.users.filter(usr => usr.username.toLowerCase() !== username.toLowerCase());
    saveStateToStorage();
    renderAdminUsersTable();
    showToast(`Staff account "${username}" deleted.`, "info");
  }
}

// Pharmacist Queue Table
function renderPharmacistQueue() {
  const tbody = document.getElementById("pharmacistQueueTableBody");
  if (!tbody) return;

  const rxOrders = state.orders.filter(o => o.rxRequired || o.status === "rx_pending");

  if (rxOrders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:30px; color:var(--pharmacy-text-muted);">No pending prescriptions to verify.</td></tr>`;
    return;
  }

  tbody.innerHTML = rxOrders.map(o => `
    <tr>
      <td><strong>#${o.id}</strong></td>
      <td>${o.customerName}<br><small>${o.phone}</small></td>
      <td>
        <button class="btn btn-secondary" style="padding:4px 10px; font-size:0.8rem;" onclick="openRxPreviewModal('${o.id}')">
          <i class="fa-solid fa-eye"></i> Inspect Uploaded Prescription
        </button>
      </td>
      <td>${o.items.map(i => i.title).join(', ')}</td>
      <td>
        <button class="btn btn-primary" style="padding:4px 10px;" onclick="updateOrderStatus('${o.id}', 'verified')">
          <i class="fa-solid fa-circle-check"></i> Approve Rx
        </button>
      </td>
    </tr>
  `).join('');
}

// Rider Delivery Portal
function renderRiderPortal() {
  const container = document.getElementById("riderOrdersGrid");
  if (!container) return;

  const riderOrders = state.orders.filter(o => o.status === "packing" || o.status === "on_the_way" || o.status === "delivered");
  const deliveredCount = state.orders.filter(o => o.status === "delivered").length;
  document.getElementById("riderTotalEarnings").innerText = `$${(deliveredCount * 5.0).toFixed(2)}`;

  if (riderOrders.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1; background:#fff; padding:40px; text-align:center; border-radius:12px; color:var(--pharmacy-text-muted);">No active delivery orders assigned.</div>`;
    return;
  }

  container.innerHTML = riderOrders.map(o => `
    <div style="background:#fff; border-radius:var(--radius-md); padding:16px; border:1px solid var(--pharmacy-border); box-shadow:var(--shadow-sm);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <span style="font-weight:800; color:var(--pharmacy-emerald-dark);">#${o.id}</span>
        <span class="status-pill status-${o.status}">${o.status.replace('_', ' ')}</span>
      </div>
      <div style="font-size:0.9rem; font-weight:700; margin-bottom:4px;">${o.customerName}</div>
      <div style="font-size:0.82rem; color:var(--pharmacy-text-main); margin-bottom:8px;"><i class="fa-solid fa-location-dot"></i> ${o.address}</div>
      <div style="font-size:0.82rem; color:var(--pharmacy-text-muted); margin-bottom:14px;"><i class="fa-solid fa-phone"></i> ${o.phone}</div>

      <div style="display:flex; gap:8px;">
        ${o.status === 'packing' ? `
          <button class="btn btn-warning" style="width:100%;" onclick="updateOrderStatus('${o.id}', 'on_the_way')"><i class="fa-solid fa-motorcycle"></i> Start Delivery</button>
        ` : ''}
        ${o.status === 'on_the_way' ? `
          <button class="btn btn-primary" style="width:100%;" onclick="updateOrderStatus('${o.id}', 'delivered')"><i class="fa-solid fa-house-chimney-check"></i> Mark Delivered</button>
        ` : ''}
        ${o.status === 'delivered' ? `
          <div style="width:100%; text-align:center; font-weight:700; color:#15803d;"><i class="fa-solid fa-circle-check"></i> Commission Earned ($5.00)</div>
        ` : ''}
      </div>
    </div>
  `).join('');
}

// -------------------------------------------------------------
// HERO PROMOTIONAL BANNER MANAGEMENT (STOREFRONT & ADMIN CRUD)
// -------------------------------------------------------------

function renderHeroBanner() {
  const container = document.getElementById("heroBannerCarousel");
  if (!container) return;

  const activeBanners = state.banners.filter(b => b.status === "active");
  if (activeBanners.length === 0) {
    container.style.display = "none";
    return;
  }
  container.style.display = "flex";

  if (state.activeBannerIndex >= activeBanners.length) {
    state.activeBannerIndex = 0;
  }

  const cur = activeBanners[state.activeBannerIndex];
  container.style.background = cur.bgGradient || "linear-gradient(135deg, #013728 0%, #004d40 60%, #00695c 100%)";

  const dotsHtml = activeBanners.length > 1 ? `
    <div style="position:absolute; bottom:14px; left:50%; transform:translateX(-50%); display:flex; gap:6px; z-index:5;">
      ${activeBanners.map((b, idx) => `
        <span onclick="setHeroBannerIndex(${idx})" style="width:${idx === state.activeBannerIndex ? '20px' : '8px'}; height:8px; border-radius:4px; background:${idx === state.activeBannerIndex ? '#ffb300' : 'rgba(255,255,255,0.4)'}; cursor:pointer; transition:all 0.3s;"></span>
      `).join('')}
    </div>
  ` : '';

  container.innerHTML = `
    <div class="banner-slide-content">
      <span class="promo-badge" style="background:#fff; color:var(--pharmacy-emerald-dark); font-weight:800; font-size:0.75rem; padding:4px 12px; border-radius:12px; margin-bottom:10px; display:inline-block;">${cur.tag || 'EXPRESS PHARMACY'}</span>
      <h2>${cur.title}</h2>
      <p>${cur.description}</p>
      <button class="banner-btn" onclick="${cur.buttonAction || 'switchCategoryFilter(\'Prescription Medicines\')'}">
        <i class="fa-solid fa-arrow-right"></i> ${cur.buttonText || 'Explore Now'}
      </button>
    </div>
    <img src="${cur.imageUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500'}" alt="${cur.title}" class="banner-img-decor">
    ${dotsHtml}
  `;
}

function setHeroBannerIndex(idx) {
  state.activeBannerIndex = idx;
  renderHeroBanner();
}

let heroBannerIntervalId = null;

function startHeroBannerAutoSlider() {
  if (heroBannerIntervalId) clearInterval(heroBannerIntervalId);
  heroBannerIntervalId = setInterval(() => {
    const activeBanners = state.banners.filter(b => b.status === "active");
    if (activeBanners.length > 1) {
      state.activeBannerIndex = (state.activeBannerIndex + 1) % activeBanners.length;
      renderHeroBanner();
    }
  }, 2500);
}

function renderAdminBannersTable() {
  const tbody = document.getElementById("adminBannersTableBody");
  if (!tbody) return;

  if (state.banners.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--pharmacy-text-muted); padding:20px;">No banners created. Click "Add New Banner" above.</td></tr>`;
    return;
  }

  tbody.innerHTML = state.banners.map(b => `
    <tr>
      <td><img src="${b.imageUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80'}" style="width:60px; height:40px; object-fit:cover; border-radius:6px;" onerror="this.src='https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80'"></td>
      <td><strong>${b.title}</strong><br><small style="color:var(--pharmacy-emerald-dark); font-weight:700;">${b.tag}</small></td>
      <td style="max-width:220px; font-size:0.82rem; color:var(--pharmacy-text-muted);">${b.description}</td>
      <td><strong style="color:var(--pharmacy-emerald-dark);">${b.buttonText}</strong><br><small style="font-size:0.75rem; color:#64748b;">${b.buttonAction}</small></td>
      <td><span class="status-pill status-${b.status === 'active' ? 'delivered' : 'rx_pending'}">${b.status.toUpperCase()}</span></td>
      <td>
        <button class="btn btn-secondary" style="padding:4px 8px;" onclick="openEditBannerModal('${b.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="btn btn-secondary" style="padding:4px 8px;" onclick="toggleBannerStatus('${b.id}')"><i class="fa-solid fa-power-off"></i></button>
        <button class="btn btn-danger" style="padding:4px 8px;" onclick="deleteBanner('${b.id}')"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function openAddBannerModal() {
  document.getElementById("bannerEditId").value = "";
  document.getElementById("bannerForm").reset();
  document.getElementById("bannerModalTitle").innerHTML = `<i class="fa-solid fa-image"></i> Create Storefront Banner`;
  document.getElementById("bannerModalOverlay").classList.add("active");
}

function openEditBannerModal(bannerId) {
  const b = state.banners.find(item => item.id === bannerId);
  if (!b) return;

  document.getElementById("bannerEditId").value = b.id;
  document.getElementById("bannerTagInput").value = b.tag;
  document.getElementById("bannerTitleInput").value = b.title;
  document.getElementById("bannerDescInput").value = b.description;
  document.getElementById("bannerBtnTextInput").value = b.buttonText;
  document.getElementById("bannerBtnActionSelect").value = b.buttonAction;
  document.getElementById("bannerImageUrlInput").value = b.imageUrl || "";
  document.getElementById("bannerGradientSelect").value = b.bgGradient || "linear-gradient(135deg, #013728 0%, #004d40 60%, #00695c 100%)";
  document.getElementById("bannerStatusSelect").value = b.status;

  document.getElementById("bannerModalTitle").innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Banner (${b.title})`;
  document.getElementById("bannerModalOverlay").classList.add("active");
}

function closeBannerModal() {
  document.getElementById("bannerModalOverlay").classList.remove("active");
}

function handleSaveBanner(e) {
  e.preventDefault();
  const id = document.getElementById("bannerEditId").value || ("banner-" + Date.now());
  const tag = document.getElementById("bannerTagInput").value.trim();
  const title = document.getElementById("bannerTitleInput").value.trim();
  const description = document.getElementById("bannerDescInput").value.trim();
  const buttonText = document.getElementById("bannerBtnTextInput").value.trim();
  const buttonAction = document.getElementById("bannerBtnActionSelect").value;
  const imageUrl = document.getElementById("bannerImageUrlInput").value.trim();
  const bgGradient = document.getElementById("bannerGradientSelect").value;
  const status = document.getElementById("bannerStatusSelect").value;

  const bannerObj = { id, tag, title, description, buttonText, buttonAction, imageUrl, bgGradient, status };

  const existingIdx = state.banners.findIndex(b => b.id === id);
  if (existingIdx > -1) {
    state.banners[existingIdx] = bannerObj;
  } else {
    state.banners.unshift(bannerObj);
  }

  saveStateToStorage();
  closeBannerModal();
  renderHeroBanner();
  renderAdminBannersTable();
  showToast(`Banner "${title}" saved successfully`, "success");
}

function toggleBannerStatus(bannerId) {
  const b = state.banners.find(item => item.id === bannerId);
  if (b) {
    b.status = b.status === "active" ? "inactive" : "active";
    saveStateToStorage();
    renderHeroBanner();
    renderAdminBannersTable();
    showToast(`Banner status set to ${b.status}`, "success");
  }
}

function deleteBanner(bannerId) {
  if (confirm("Are you sure you want to delete this promotional banner?")) {
    state.banners = state.banners.filter(b => b.id !== bannerId);
    saveStateToStorage();
    renderHeroBanner();
    renderAdminBannersTable();
    showToast("Banner deleted successfully", "success");
  }
}

// -------------------------------------------------------------
// COUPON MANAGEMENT & PRICING-BASED DISCOUNT RULES (ADMIN & CART)
// -------------------------------------------------------------

function renderAdminCouponsTable() {
  const tbody = document.getElementById("adminCouponsTableBody");
  if (!tbody) return;

  if (state.coupons.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--pharmacy-text-muted); padding:20px;">No discount coupons created yet. Click "Create New Coupon" above.</td></tr>`;
    return;
  }

  tbody.innerHTML = state.coupons.map(c => `
    <tr>
      <td><strong style="color:var(--pharmacy-emerald-dark); background:#f0fdf4; padding:4px 10px; border-radius:6px; border:1px solid #bbf7d0; font-size:0.95rem;">${c.code}</strong></td>
      <td><strong>${c.description}</strong></td>
      <td><span class="status-pill status-verified" style="font-weight:800;">${c.discountType === 'percentage' ? c.discountValue + '% OFF' : 'Flat ₹' + parseFloat(c.discountValue).toFixed(2) + ' OFF'}</span></td>
      <td><strong>₹${parseFloat(c.minOrderValue).toFixed(2)}</strong></td>
      <td>${c.maxDiscount > 0 ? '₹' + parseFloat(c.maxDiscount).toFixed(2) : '<span style="color:var(--pharmacy-text-muted);">No Limit</span>'}</td>
      <td><span class="status-pill status-${c.status === 'active' ? 'delivered' : 'rx_pending'}">${c.status.toUpperCase()}</span></td>
      <td>
        <button class="btn btn-secondary" style="padding:4px 8px;" onclick="openEditCouponModal('${c.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="btn btn-secondary" style="padding:4px 8px;" onclick="toggleCouponStatus('${c.id}')"><i class="fa-solid fa-power-off"></i></button>
        <button class="btn btn-danger" style="padding:4px 8px;" onclick="deleteCoupon('${c.id}')"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function openAddCouponModal() {
  document.getElementById("couponEditId").value = "";
  document.getElementById("couponForm").reset();
  document.getElementById("couponModalTitle").innerHTML = `<i class="fa-solid fa-ticket"></i> Create Discount Coupon`;
  document.getElementById("couponModalOverlay").classList.add("active");
}

function openEditCouponModal(coupId) {
  const c = state.coupons.find(item => item.id === coupId);
  if (!c) return;

  document.getElementById("couponEditId").value = c.id;
  document.getElementById("couponCodeInput").value = c.code;
  document.getElementById("couponTypeSelect").value = c.discountType;
  document.getElementById("couponValueInput").value = c.discountValue;
  document.getElementById("couponMinOrderInput").value = c.minOrderValue;
  document.getElementById("couponMaxDiscountInput").value = c.maxDiscount || 0;
  document.getElementById("couponStatusSelect").value = c.status;
  document.getElementById("couponDescInput").value = c.description;

  toggleDiscountInputs();
  document.getElementById("couponModalTitle").innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Coupon (${c.code})`;
  document.getElementById("couponModalOverlay").classList.add("active");
}

function closeCouponModal() {
  document.getElementById("couponModalOverlay").classList.remove("active");
}

function toggleDiscountInputs() {
  const type = document.getElementById("couponTypeSelect").value;
  const label = document.getElementById("couponValueLabel");
  if (label) {
    label.innerText = type === "percentage" ? "Discount Percentage (%) *" : "Flat Discount Amount (₹) *";
  }
}

function handleSaveCoupon(e) {
  e.preventDefault();
  const id = document.getElementById("couponEditId").value || ("coup-" + Date.now());
  const code = document.getElementById("couponCodeInput").value.trim().toUpperCase();
  const discountType = document.getElementById("couponTypeSelect").value;
  const discountValue = parseFloat(document.getElementById("couponValueInput").value) || 0;
  const minOrderValue = parseFloat(document.getElementById("couponMinOrderInput").value) || 0;
  const maxDiscount = parseFloat(document.getElementById("couponMaxDiscountInput").value) || 0;
  const status = document.getElementById("couponStatusSelect").value;
  const description = document.getElementById("couponDescInput").value.trim();

  const couponObj = { id, code, discountType, discountValue, minOrderValue, maxDiscount, status, description };

  const existingIdx = state.coupons.findIndex(c => c.id === id);
  if (existingIdx > -1) {
    state.coupons[existingIdx] = couponObj;
  } else {
    state.coupons.unshift(couponObj);
  }

  saveStateToStorage();
  closeCouponModal();
  renderAdminCouponsTable();
  renderAvailableCouponsList();
  updateDynamicCouponsUI();
  showToast(`Coupon "${code}" saved successfully`, "success");
}

function toggleCouponStatus(coupId) {
  const c = state.coupons.find(item => item.id === coupId);
  if (c) {
    c.status = c.status === "active" ? "inactive" : "active";
    saveStateToStorage();
    renderAdminCouponsTable();
    renderAvailableCouponsList();
    updateDynamicCouponsUI();
    showToast(`Coupon ${c.code} status set to ${c.status}`, "success");
  }
}

function deleteCoupon(coupId) {
  if (confirm("Are you sure you want to delete this discount coupon?")) {
    state.coupons = state.coupons.filter(c => c.id !== coupId);
    saveStateToStorage();
    renderAdminCouponsTable();
    renderAvailableCouponsList();
    updateDynamicCouponsUI();
    showToast("Coupon deleted successfully", "success");
  }
}

let floatingCouponRotationIndex = 0;
let floatingCouponIntervalId = null;

function updateDynamicCouponsUI() {
  const activeCoupons = (state.coupons || []).filter(c => c.status === "active");
  const floatingStrip = document.querySelector(".floating-offer-strip");
  const floatingText = document.getElementById("floatingOfferText");
  const floatingBtn = document.getElementById("floatingOfferCodeBtn");
  const topBarPromo = document.getElementById("topBarPromoText");

  const isDismissed = sessionStorage.getItem("floating_coupon_dismissed") === "true";
  const isEnabledByAdmin = state.config.showFloatingCoupons !== false;

  if (activeCoupons.length === 0 || isDismissed || !isEnabledByAdmin) {
    if (floatingStrip) floatingStrip.style.display = "none";
    if (topBarPromo && activeCoupons.length === 0) {
      topBarPromo.innerHTML = "⚡ 2-Hour Express Delivery | Quality Generic & Branded Medicines";
    }
    return;
  }

  if (floatingStrip) floatingStrip.style.display = "inline-flex";

  if (floatingCouponRotationIndex >= activeCoupons.length) {
    floatingCouponRotationIndex = 0;
  }

  const currentCoupon = activeCoupons[floatingCouponRotationIndex];

  if (floatingText) {
    floatingText.innerHTML = `<span style="font-weight:800; color:var(--pharmacy-emerald-dark);">${currentCoupon.description}</span> &nbsp;|&nbsp; Code: <strong style="color:var(--pharmacy-emerald-dark); font-weight:800;">${currentCoupon.code}</strong>`;
  }

  if (floatingBtn) {
    floatingBtn.setAttribute("onclick", `copyCouponCode('${currentCoupon.code}')`);
    floatingBtn.innerText = "APPLY";
  }

  if (topBarPromo) {
    topBarPromo.innerHTML = `⚡ 2-Hour Express Delivery | Use Code <strong>${currentCoupon.code}</strong> for ${currentCoupon.description}`;
  }
}

function dismissFloatingCoupon(e) {
  if (e) e.stopPropagation();
  const strip = document.querySelector(".floating-offer-strip");
  if (strip) strip.style.display = "none";
  sessionStorage.setItem("floating_coupon_dismissed", "true");
}

function openWhatsAppOrder() {
  const rawNum = state.config.whatsappNumber || "919876543210";
  const cleanPhone = rawNum.replace(/[^0-9]/g, "");
  const storeName = state.config.storeName || "Dhanush Medicals";
  const message = encodeURIComponent(`Hello ${storeName}, I want to place a medicine order in Korutla (Delivery Pincode: 505326). Please assist.`);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;
  showToast("Opening WhatsApp Pharmacy Chat...", "info");
  window.open(whatsappUrl, "_blank");
}

function startFloatingOfferAutoSlider() {
  if (floatingCouponIntervalId) clearInterval(floatingCouponIntervalId);
  updateDynamicCouponsUI();
  floatingCouponIntervalId = setInterval(() => {
    const activeCoupons = (state.coupons || []).filter(c => c.status === "active");
    if (activeCoupons.length > 0) {
      floatingCouponRotationIndex = (floatingCouponRotationIndex + 1) % activeCoupons.length;
      updateDynamicCouponsUI();
    }
  }, 2500);
}

function renderAvailableCouponsList() {
  const container = document.getElementById("availableCouponsList");
  if (!container) return;

  const activeCoupons = state.coupons.filter(c => c.status === "active");
  if (activeCoupons.length === 0) {
    container.innerHTML = `<div style="font-size:0.78rem; color:var(--pharmacy-text-muted); padding:4px;">No active promo codes right now.</div>`;
    return;
  }

  container.innerHTML = activeCoupons.map(c => `
    <div style="background:#fff; border:1px solid #bbf7d0; border-radius:8px; padding:8px 10px; margin-bottom:6px; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <strong style="color:var(--pharmacy-emerald-dark); font-size:0.82rem;">${c.code}</strong>
        <div style="font-size:0.74rem; color:var(--pharmacy-text-muted);">${c.description}</div>
      </div>
      <button class="btn-offer-code" type="button" onclick="applyCouponCode('${c.code}')" style="font-size:0.72rem; padding:4px 10px;">APPLY</button>
    </div>
  `).join('');
}

function toggleAvailableCouponsList() {
  const container = document.getElementById("availableCouponsList");
  if (!container) return;
  container.style.display = container.style.display === "none" ? "block" : "none";
}

function copyCouponCode(code) {
  const input = document.getElementById("cartCouponInput");
  if (input) input.value = code;
  openCartDrawer();
  applyCouponCode(code);
}

function applyCouponCode(codeOverride) {
  const input = document.getElementById("cartCouponInput");
  const inputCode = (codeOverride || (input ? input.value : "")).trim().toUpperCase();

  if (!inputCode) {
    showToast("Please enter a valid coupon code!", "error");
    return;
  }

  const coupon = state.coupons.find(c => c.code.toUpperCase() === inputCode && c.status === "active");
  if (!coupon) {
    showToast(`Coupon code "${inputCode}" is invalid or expired!`, "error");
    return;
  }

  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (subtotal < coupon.minOrderValue) {
    const diff = coupon.minOrderValue - subtotal;
    showToast(`Order subtotal must be at least ₹${coupon.minOrderValue} to apply ${coupon.code}. Add ₹${diff.toFixed(2)} more!`, "error");
    return;
  }

  // Calculate Discount Amount
  let discountAmount = 0;
  if (coupon.discountType === "flat") {
    discountAmount = coupon.discountValue;
  } else if (coupon.discountType === "percentage") {
    discountAmount = subtotal * (coupon.discountValue / 100);
    if (coupon.maxDiscount && coupon.maxDiscount > 0) {
      discountAmount = Math.min(discountAmount, coupon.maxDiscount);
    }
  }

  state.appliedCoupon = {
    id: coupon.id,
    code: coupon.code,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    minOrderValue: coupon.minOrderValue,
    maxDiscount: coupon.maxDiscount,
    discountAmount: discountAmount
  };

  if (input) input.value = coupon.code;
  renderCartDrawer();
  showToast(`Coupon "${coupon.code}" applied! You saved ₹${discountAmount.toFixed(2)}`, "success");
}

function removeAppliedCoupon() {
  state.appliedCoupon = null;
  const input = document.getElementById("cartCouponInput");
  if (input) input.value = "";
  renderCartDrawer();
  showToast("Coupon removed", "secondary");
}

// Global Settings Modal
function openSettingsModal(e) {
  if (e && e.preventDefault) e.preventDefault();
  document.getElementById("configDbMode").value = state.config.dbMode;
  document.getElementById("configApiUrl").value = state.config.apiUrl || "";
  toggleApiUrlInput(state.config.dbMode);
  const overlay = document.getElementById("settingsModalOverlay");
  if (overlay) overlay.classList.add("active");
}

function closeSettingsModal() {
  document.getElementById("settingsModalOverlay").classList.remove("active");
}

function toggleApiUrlInput(mode) {
  document.getElementById("apiUrlGroup").style.display = (mode === "live") ? "block" : "none";
}

function handleSaveGlobalSettings(e) {
  e.preventDefault();
  state.config.dbMode = document.getElementById("configDbMode").value;
  state.config.apiUrl = document.getElementById("configApiUrl").value;
  saveStateToStorage();
  closeSettingsModal();
  showToast(`Settings Saved (${state.config.dbMode.toUpperCase()} Mode)`, "success");
}

// Helper Utilities
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i> <span>${message}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

function promptLocationChange() {
  const currentPin = localStorage.getItem("pharmacy_app_pincode") || "505326 Korutla";
  const pincode = prompt("Enter your Delivery Pincode & City:", currentPin);
  if (pincode && pincode.trim().length > 0) {
    const cleanPin = pincode.trim();
    localStorage.setItem("pharmacy_app_pincode", cleanPin);
    const displayEl = document.getElementById("currentAddressDisplay");
    if (displayEl) {
      displayEl.innerHTML = `${cleanPin} <i class="fa-solid fa-chevron-down" style="font-size:0.7rem;"></i>`;
    }
    const pinDigits = cleanPin.split(' ')[0];
    const pincodeInput = document.getElementById("custPincode");
    if (pincodeInput && pinDigits) {
      pincodeInput.value = pinDigits;
    }
    showToast(`Delivery location updated to ${cleanPin}`, "success");
  }
}

function openServiceInfo(serviceName) {
  showToast(`${serviceName} active. Registered pharmacists are available 24/7.`, "success");
}

/* -------------------------------------------------------------
   PROGRESSIVE WEB APP (PWA) INSTALL & SERVICE WORKER LOGIC
 ------------------------------------------------------------- */
let deferredPWAInstallPrompt = null;

function initPWAInstaller() {
  try {
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => console.log('[PWA] Service Worker registered scope:', reg.scope))
        .catch((err) => console.log('[PWA] Service Worker registration failed:', err));
    }
  } catch(e) {}

  try {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPWAInstallPrompt = e;

      const topBtn = document.getElementById('pwaInstallTopBtn');
      if (topBtn) topBtn.style.display = 'inline-flex';

      const banner = document.getElementById('pwaInstallBanner');
      let isDismissed = false;
      try { isDismissed = sessionStorage.getItem('pwa_banner_dismissed') === 'true'; } catch(err) {}
      if (banner && !isDismissed) {
        banner.style.display = 'flex';
      }
    });

    window.addEventListener('appinstalled', () => {
      showToast('🎉 Dhanush Medicals App Installed Successfully!', 'success');
      deferredPWAInstallPrompt = null;
      dismissPWABanner();
      const topBtn = document.getElementById('pwaInstallTopBtn');
      if (topBtn) topBtn.style.display = 'none';
    });
  } catch(e) {}
}

function triggerPWAInstall() {
  if (deferredPWAInstallPrompt) {
    deferredPWAInstallPrompt.prompt();
    deferredPWAInstallPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        showToast('Thank you for installing Dhanush Medicals App!', 'success');
      }
      deferredPWAInstallPrompt = null;
      dismissPWABanner();
      const topBtn = document.getElementById('pwaInstallTopBtn');
      if (topBtn) topBtn.style.display = 'none';
    });
  } else {
    openPWAInstallModal();
  }
}

function openPWAInstallModal() {
  const modal = document.getElementById("pwaInstallModalOverlay");
  if (modal) modal.classList.add("active");
}

function closePWAInstallModal() {
  const modal = document.getElementById("pwaInstallModalOverlay");
  if (modal) modal.classList.remove("active");
}

function dismissPWABanner() {
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) banner.style.display = 'none';
  sessionStorage.setItem('pwa_banner_dismissed', 'true');
}

/* -------------------------------------------------------------
   ROBUST EVENT LISTENER WIRING (Fallback for inline onclick)
   Ensures all buttons/links work even if inline onclick is blocked
   by browser caching, CSP, or browser extensions.
 ------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {

  // Helper: safely wire click by ID
  function wireById(id, handler) {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", handler);
  }

  // Helper: wire click by selector (first match)
  function wireBySelector(selector, handler) {
    const el = document.querySelector(selector);
    if (el) el.addEventListener("click", handler);
  }

  // Header buttons
  document.querySelectorAll(".btn-header-action").forEach(btn => {
    const text = btn.textContent.trim().toLowerCase();
    if (text.includes("upload rx")) {
      btn.addEventListener("click", (e) => openRxUploadModal(e));
    } else if (text.includes("cart")) {
      btn.addEventListener("click", (e) => openCartDrawer());
    } else if (text.includes("login")) {
      btn.addEventListener("click", (e) => openLoginModal(e));
    }
  });

  // Top bar links
  document.querySelectorAll(".top-bar-links a").forEach(link => {
    const text = link.textContent.trim().toLowerCase();
    if (text.includes("app") && text.includes("settings")) {
      link.addEventListener("click", (e) => openSettingsModal(e));
    } else if (text.includes("staff")) {
      link.addEventListener("click", (e) => openLoginModal(e));
    }
  });

  // PWA Install button
  wireById("pwaInstallTopBtn", () => triggerPWAInstall());

  // Brand logo -> storefront
  const brandLogo = document.querySelector(".brand-logo");
  if (brandLogo) brandLogo.addEventListener("click", () => switchView("storefront"));

  // Location selector
  const locationSel = document.querySelector(".location-selector");
  if (locationSel) locationSel.addEventListener("click", () => promptLocationChange());

  // Search icon
  const searchIcon = document.querySelector(".search-input-group .fa-magnifying-glass");
  if (searchIcon) searchIcon.addEventListener("click", () => submitSearchQuery());

  // Upload Rx & Order Medicines button (hero card)
  const rxUploadBtn = document.querySelector(".btn-upload-rx");
  if (rxUploadBtn) rxUploadBtn.addEventListener("click", () => openRxUploadModal());

  // Quick service cards
  document.querySelectorAll(".service-card").forEach(card => {
    const text = card.textContent.trim().toLowerCase();
    if (text.includes("upload prescription")) {
      card.addEventListener("click", () => openRxUploadModal());
    } else if (text.includes("whatsapp")) {
      card.addEventListener("click", () => openWhatsAppOrder());
    } else if (text.includes("ask pharmacist")) {
      card.addEventListener("click", () => openServiceInfo("Pharmacist Consultation"));
    } else if (text.includes("express delivery")) {
      card.addEventListener("click", () => openServiceInfo("2-Hour Express Delivery"));
    }
  });

  // Cart drawer overlay close
  wireById("cartDrawerOverlay", () => closeCartDrawer());

  // Cart drawer close button
  document.querySelectorAll(".btn-close-drawer").forEach(btn => {
    btn.addEventListener("click", (e) => {
      // Determine which close to fire based on closest parent
      const parent = btn.closest(".cart-drawer, .modal-overlay, #rxPreviewModalOverlay");
      if (parent) {
        if (parent.id === "cartDrawer" || parent.classList.contains("cart-drawer")) {
          closeCartDrawer();
        } else if (parent.id === "rxPreviewModalOverlay") {
          closeRxPreviewModal();
        }
      }
    });
  });

  // Checkout button in cart
  const checkoutBtn = document.querySelector(".btn-checkout");
  if (checkoutBtn) checkoutBtn.addEventListener("click", () => openCheckoutModal());

  // Floating Rx widget
  const floatingRx = document.querySelector(".floating-rx-widget");
  if (floatingRx) floatingRx.addEventListener("click", () => openRxUploadModal());

  // Mobile bottom navigation
  document.querySelectorAll(".mobile-nav-item").forEach(item => {
    const text = item.textContent.trim().toLowerCase();
    if (text.includes("home")) {
      item.addEventListener("click", () => switchView("storefront"));
    } else if (text.includes("upload rx") || text.includes("rx")) {
      item.addEventListener("click", () => openRxUploadModal());
    } else if (text.includes("cart")) {
      item.addEventListener("click", () => openCartDrawer());
    } else if (text.includes("account")) {
      item.addEventListener("click", () => openLoginModal());
    }
  });

  // Category chip bar clicks (event delegation)
  const chipBar = document.getElementById("categoryChipBar");
  if (chipBar) {
    chipBar.addEventListener("click", (e) => {
      const chip = e.target.closest(".cat-chip");
      if (chip) {
        const category = chip.dataset.category || chip.getAttribute("data-category");
        if (category) switchCategoryFilter(category);
      }
    });
  }

  // Floating coupon dismiss
  const couponDismiss = document.querySelector(".btn-close-floating-coupon");
  if (couponDismiss) couponDismiss.addEventListener("click", (e) => dismissFloatingCoupon(e));

  // PWA banner dismiss
  const pwaBannerDismiss = document.querySelector(".btn-close-pwa");
  if (pwaBannerDismiss) pwaBannerDismiss.addEventListener("click", () => dismissPWABanner());

  console.log("[PHARMACY] All event listeners wired successfully ✓");
});

