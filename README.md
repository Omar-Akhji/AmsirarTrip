# AmsirarTrip - Morocco Travel & Tours Website

A modern React 19 + Vite single-page application for a Morocco travel and tourism website, featuring desert tours, city excursions, and adventure camping experiences.

## 🚀 Features

- **Responsive Design**: Mobile-first design
- **Image Galleries**: Dynamic header image rotation and photo galleries
- **Tour Listings**: Featured tours with detailed information
- **Preloader**: Smooth loading animations for images and fonts
- **Modern React**: Built with React 19, React Router v6, and React Compiler

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Custom CSS layers
- **Routing**: React Router v6
- **Build Tool**: Vite with React Compiler
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Yellowtail)

## 📁 Project Structure

```/
src/
├── components/
│   ├── shared/
│   │   ├── Navbar.jsx          # Navigation with hamburger menu
│   │   ├── Footer.jsx          # Site footer
│   │   ├── Preloader.jsx       # Loading animation component
│   │   └── HeaderRotator.jsx   # Hero image carousel
│   └── home/
│       ├── FeaturedTours.jsx
│       ├── ServicesSection.jsx
│       ├── TestimonialsSection.jsx
│       └── VideoSection.jsx
├── pages/
│   ├── Home.jsx
│   ├── Gallery.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Tours.jsx
│   └── Tours-pages/            # Individual tour detail pages
├── constants/
│   ├── routes.js               # Route constants
│   └── toursData.js            # Tour information
├── hooks/
│   ├── useNavbar.js            # Navbar scroll/resize effects
│   └── [other utility hooks]
└── assets/                     # CSS layers (fonts, normalize, utility, style, responsive)
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd vite-project
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

## 🎨 Key Components

### Preloader Component

Handles loading states for images and fonts with smooth animations.

```jsx
import { Preloader } from "./components/shared";

// Automatically manages loading state based on route changes
<Preloader />;
```

### HeaderRotator Component

Creates an animated image carousel for hero sections.

```jsx
import { HeaderRotator } from "./components/shared";

<HeaderRotator
  images="/images/header-1.jpg,/images/header-2.jpg"
  interval={3000}>
  <div className="hero-content">
    <h1>Welcome to Morocco</h1>
  </div>
</HeaderRotator>;
```

### Navbar Component

Responsive navigation with hamburger menu for mobile devices.

```jsx
import { Navbar } from "./components/shared";

<Navbar />; // Automatically handles scroll effects and mobile menu
```

## 📋 Development Guidelines

### CSS Import Order (Critical)

Maintain this exact order in `src/main.jsx`:

```javascript
import "./assets/fonts.css";
import "./assets/normalize.css";
import "./assets/utility.css";
import "./assets/style.css";
import "./assets/responsive.css";
```

### Asset Paths

Always use absolute paths starting with `/`:

```jsx
// ✅ Correct
<img src="/images/tour-1.jpg" alt="Tour" />

// ❌ Wrong - breaks on nested routes
<img src="../images/tour-1.jpg" alt="Tour" />
```

### Route Constants

Import routes from constants instead of hardcoding:

```jsx
import { ROUTES } from './constants/routes';

// ✅ Correct
<Route path={ROUTES.HOME} element={<Home />} />

// ❌ Wrong
<Route path="/home" element={<Home />} />
```

### Component Organization

Group related components in folders with index.js exports:

```javascript
// src/components/shared/index.js
export { default as Navbar } from "./Navbar";
export { default as Footer } from "./Footer";
export { default as Preloader } from "./Preloader";
export { default as HeaderRotator } from "./HeaderRotator";
```

## 🔧 Configuration

### Styling & PostCSS pipeline

Styling is handled with legacy/custom CSS layers and a PostCSS pipeline (preset-env, PurgeCSS in production). Tailwind was used in earlier iterations but is no longer part of the active build pipeline.

### ESLint

Custom rules in `eslint.config.js`:

- React hooks rules enabled
- Custom `no-unused-vars` ignores variables matching `/^[A-Z_]/`

### Vite

React Compiler enabled in `vite.config.js` for optimized builds.

## 📱 Responsive Design

The site is fully responsive with breakpoints:

- Mobile: < 768px
- Tablet: 768px - 991px
- Desktop: > 991px

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is private and proprietary.

---

Built with ❤️ for Morocco travel enthusiasts
