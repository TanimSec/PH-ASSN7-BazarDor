# 🛒 বাজার দর (BazarDor)

> ঢাকা সহ দেশের প্রধান প্রধান পাইকারি ও খুচরা বাজারের নিত্যপ্রয়োজনীয় পণ্যের নির্ভরযোগ্য আজকের বাজার দর মনিটরিং ও মূল্য বিশ্লেষণ ওয়েব অ্যাপ্লিকেশন।

---

## 🌐 Live & Repository Links
- **Live Deployment Link:** [https://ph-assn-7-bazar-dor.vercel.app](https://ph-assn-7-bazar-dor.vercel.app)
- **GitHub Repository Link:** [https://github.com/TanimSec/PH-ASSN7-BazarDor](https://github.com/TanimSec/PH-ASSN7-BazarDor)

---

## 📖 Short Description (বর্ণনা)
**বাজার দর (BazarDor)** হলো একটি আধুনিক, দ্রুতগতির ও রেস্পন্সিভ ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন যা ভোক্তাদের নিত্যপ্রয়োজনীয় পণ্যের (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা) সঠিক বাজার দর যাচাই করতে সাহায্য করে। এই প্ল্যাটফর্মে বিভিন্ন বাজারের মধ্যকার তুলনামূলক সর্বনিম্ন, সর্বাধিক ও জাতীয় গড় দর পর্যবেক্ষণ করা যায়।

---

## 🛠️ Technologies Used (ব্যবহৃত প্রযুক্তিসমূহ)
- **Frontend Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 & Vanilla CSS (Figma / Penpot Design System)
- **Authentication:** BetterAuth (Email/Password + Google & GitHub Social Login)
- **Icons & UI:** Lucide React & Google Fonts (Hind Siliguri for authentic Bangla typography)
- **Notifications:** React Hot Toast (`react-hot-toast`)
- **Deployment Platform:** Vercel

---

## ✨ 5 Key Features (প্রধান ৫টি বৈশিষ্ট্য)

### ১. 🔝 ফিগমা অনুসারী ন্যাভবার ও লাইভ প্রাইস টিকার (Marquee Ticker)
- বাংলা ডাইনামিক তারিখ প্রদর্শনসহ ব্র্যান্ড লোগো।
- ক্যাটাগরিভিত্তিক দ্রুত ফিল্টারিং এবং সক্রিয় ক্যাটাগরি হাইলাইট।
- ন্যাভবারের নিচে অবিরাম চলমান (infinite scrolling) লাইভ প্রাইজ টিকার যা পণ্যের আজকের দর ও শতকরা হ্রাস-বৃদ্ধি (▲/▼) প্রদর্শন করে।

### ২. ⚖️ হোম পেজে মূল্য পরিবর্তন সেকশন (Top Risers & Fallers)
- **আজ দাম বেড়েছে ▲:** শীর্ষ ৬টি মূল্যবৃদ্ধিকৃত পণ্যের বিশেষ হাইলাইট।
- **আজ দাম কমেছে ▼:** শীর্ষ ৬টি হ্রাসকৃত পণ্যের বিশেষ হাইলাইট।
- **সব পণ্য সেকশন:** ৩৩+ সকল নিত্যপ্রয়োজনীয় পণ্যের পূর্ণাঙ্গ গ্রিড যা মোবাইল, ট্যাবলেট ও ডেস্কটপে সুন্দরভাবে রেসপন্সিভ।
- প্রতিটি কার্ডে বাংলা সংখ্যা (১৪৮ টাকা), একক (প্রতি কেজি/লিটার) ও স্ট্যাটাস ব্যাজ।

### ৩. 📊 সুরক্ষিত প্রোডাক্ট ডিটেইলস ও বাজারভিত্তিক দর তুলনা (Protected Route)
- শুধুমাত্র অথেন্টিকেটেড ব্যবহারকারীদের জন্য অ্যাক্সেসযোগ্য সুরক্ষিত রুট (`/product/[slug]`); অননুমোদিত প্রবেশে টোস্ট অ্যালার্টসহ রিডাইরেক্ট।
- পণ্যের সর্বোচ্চ, সর্বনিম্ন এবং জাতীয় গড় মূল্যের সারসংক্ষেপ কার্ড।
- দেশের বিভিন্ন বিভাগের (ঢাকা, চট্টগ্রাম, রাজশাহী, সিলেট, খুলনা, ময়মনসিংহ) পাইকারি বাজারের দামের তুলনামূলক বিস্তারিত টেবিল।

### ৪. 🔀 ক্যাটাগরি পেজ ও চ্যালেঞ্জ ১: সংখ্যাভিত্তিক সর্টিং (Numeric Sorting)
- ক্যাটাগরিভিত্তিক ফিল্টারিং পেজ (`/category/[slug]`)।
- ড্রপডাউন অপশন: `ডিফল্ট`, `দাম: কম থেকে বেশি`, `দাম: বেশি থেকে কম` যা বাংলা সংখ্যার সঠিক নিউমেরিক ভ্যালু অনুযায়ী পণ্যের তালিকা সঠিকভাবে সাজায়।
- ডেটা লোডিংয়ের সময় স্কেলিটন (Skeleton Loader) অ্যানিমেশন এবং ক্যাটাগরিতে পণ্য না থাকলে ফ্রেন্ডলি এম্পটি স্টেট।

### ৫. 🔐 BetterAuth প্রমাণীকরণ ও চ্যালেঞ্জ ৩: প্রোফাইল তথ্য আপডেট
- ইমেইল/পাসওয়ার্ড ও সোশ্যাল লগইন (Google ও GitHub) সুবিধা।
- প্রতিটি ধাপে রিয়েল-টাইম টোস্ট নোটিফিকেশন ও ফর্ম ভ্যালিডেশন।
- **চ্যালেঞ্জ ৩:** প্রোফাইল রুটে (`/profile`) তথ্য আপডেট বোতাম যার মাধ্যমে ব্যবহারকারীকে আলাদা রুটে (`/profile/update`) নিয়ে BetterAuth ব্যবহারকারী তথ্য আপডেট API-এর মাধ্যমে নাম পরিবর্তন সম্পন্ন করা হয়।

---

## 🚀 Running the Project Locally (লোকালি চালানোর নিয়ম)

১. রিপোজিটরি ক্লোন করুন:
```bash
git clone https://github.com/TanimSec/PH-ASSN7-BazarDor.git
cd PH-ASSN7-BazarDor
```

২. ডিপেন্ডেন্সি ইনস্টল করুন:
```bash
npm install
```

৩. এনভায়রনমেন্ট ভ্যারিয়েবল কনফিগার করুন (`.env.local`):
```env
BETTER_AUTH_SECRET=bazardor-super-secret-auth-key-2026
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

৪. ডেভেলপমেন্ট সার্ভার চালু করুন:
```bash
npm run dev
```
ব্রাউজারে ওপেন করুন: [http://localhost:3000](http://localhost:3000)

৫. প্রোডাকশন বিল্ড যাচাই করুন:
```bash
npm run build
```

---

## 📂 Project Structure (প্রজেক্ট কাঠামো)
```
├── public/
│   ├── bazar-hero.png          # Hero banner image
│   └── logo-icon.png           # Brand icon
├── src/
│   ├── app/
│   │   ├── api/auth/[...all]/  # BetterAuth catch-all handler
│   │   ├── category/[slug]/    # Category page with sort control
│   │   ├── product/[slug]/     # Protected product details page
│   │   ├── profile/            # User profile page
│   │   │   └── update/         # C3: Profile update page
│   │   ├── signin/             # Login page
│   │   ├── signup/             # Registration page
│   │   ├── globals.css         # Theme tokens & animations
│   │   ├── layout.tsx          # Root layout with AuthProvider & Toaster
│   │   ├── loading.tsx         # Global skeleton loader
│   │   ├── not-found.tsx       # Custom 404 page
│   │   └── page.tsx            # Home page (Hero, Risers, Fallers, All)
│   ├── components/
│   │   ├── footer.tsx          # Figma footer component
│   │   ├── hero.tsx            # Hero banner & CTA
│   │   ├── navbar.tsx          # Figma navbar & price ticker
│   │   └── product-card.tsx    # Card & skeleton components
│   ├── context/
│   │   └── auth-context.tsx    # Auth state & notification context
│   ├── lib/
│   │   ├── api.ts              # Resilient dual-API layer
│   │   ├── auth.ts             # BetterAuth server configuration
│   │   ├── auth-client.ts      # BetterAuth React client
│   │   └── utils.ts            # Bengali numbers & date utilities
│   └── types/
│       └── index.ts            # TypeScript interfaces
└── README.md
```

---

## 👨‍💻 Author & Submission
- **Student / Developer:** Tasnim Rahman Tanim (TanimSec)
- **Batch:** Programming Hero Batch 14 - Assignment 07