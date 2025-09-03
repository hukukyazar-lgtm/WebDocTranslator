# LUMINA - Final Production Version (September 2025)

## Overview

LUMINA is a comprehensive Turkish word guessing game featuring original LUMINA branding, Replit authentication, and a complete statistics system. Players guess spinning words within 30 seconds across multiple categories and difficulty levels, with all progress tracked for authenticated users.

**Final Production Version Features (September 2025):**
- **Complete Authentication System**: Replit OAuth integration with user profiles and session management
- **Real-time Statistics Tracking**: Database-driven stats (games played, success rate, streaks, total score) with guest vs authenticated user distinction
- **Advanced Category System**: 10 categories with independent difficulty selection per category (easy/medium/hard with emoji indicators)
- **Enhanced UI/UX**: Gaming-themed login button ("Oyuncu Girişi - Rekorlarını Sakla") with visual feedback and click effects
- **Smart Visual Hierarchy**: Selected categories highlighted with enhanced shadows, borders, and scaling effects
- **Precision Interactions**: Independent difficulty button animations without affecting parent category cards
- **LUMINA Spinning Wheel**: Original LUMINA-style gradient letters with dynamic spinning and blur effects
- **Turkish Keyboard Integration**: 3-row layout (Q-Ğ-Ü / A-Ş-İ / Z-Ö-Ç) with gradient styling and visual feedback
- **Mobile-Optimized Design**: Touch-friendly interface with responsive gradient elements and animations

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (Final Production Version - September 2025)

### Authentication & Statistics Integration
- Implemented comprehensive Replit OAuth authentication system
- Added real-time database statistics tracking for authenticated users
- Created guest vs authenticated user experience distinction
- Enhanced login button with gaming theme ("Oyuncu Girişi - Rekorlarını Sakla") and gamepad icon

### Category Selection System
- Fixed category color system: only selected category changes color based on difficulty
- Implemented independent difficulty selection per category (no cross-category interference)
- Added visual hierarchy: selected category appears larger with enhanced shadows and borders
- Created precision button interactions: only clicked difficulty button animates

### UI/UX Improvements
- Enhanced visual feedback with click effects on all interactive elements
- Implemented smart category highlighting for active game selection
- Added responsive animations with proper event handling
- Improved mobile touch interactions with optimized button sizes

## System Architecture

### Frontend Architecture

**React + TypeScript SPA**: The application uses React 18 with TypeScript for type safety and modern development practices. The frontend is built with Vite for fast development and optimized builds.

**Component-Based Design**: The game is structured with reusable components including:
- Game screens (MenuScreen, GameScreen) for different application states
- Interactive elements (SpinningWheel, VirtualKeyboard) for core gameplay
- Integrated results display within GameScreen for seamless user experience
- Statistical displays (GameStats, GameHeader) for player feedback

**Routing Strategy**: Uses Wouter for lightweight client-side routing, managing navigation between the home page and 404 fallback.

**State Management**: Implements React hooks (useState, useEffect, useRef, useCallback) for local component state management. TanStack Query handles server state and caching with custom query functions.

### Styling and UI Framework

**Design System**: Built on shadcn/ui components with Radix UI primitives, providing accessible and customizable UI elements. Uses the "new-york" style variant with CSS variables for theming.

**Tailwind CSS**: Utility-first CSS framework with a custom dark theme configuration. Features gradient backgrounds, custom animations, and responsive design patterns.

**Typography**: Inter font family for modern, readable typography with multiple font weights and styles.

### Game Logic and Data

**Word Management**: Static word lists organized by categories (Animals, Food, Science, Countries, etc.) with three difficulty levels (easy, medium, hard) per category.

**LUMINA Game Mechanics**: 
- 30-second timer with LUMINA-style circular progress and color transitions (white to red)
- LUMINA spinning wheel with original gradient letters arranged in circular formation
- Dynamic wheel physics: fast spin → gradual slowdown → dramatic pause (final 5 seconds)
- Blur effects: letters blur during spinning, sharpen as wheel slows down for visibility
- Turkish keyboard with 3-row layout and LUMINA gradient button styling
- Visual feedback system: used letters change colors (green for correct, red for wrong)
- Time-based scoring system: points equal to remaining seconds (faster guesses = higher scores)
- Statistical tracking for streaks, averages, and performance metrics
- Category-based theming with emoji indicators and gradient backgrounds

**LUMINA Animation System**: Comprehensive animation suite featuring:
- Spinning wheel with 4 speed levels (normal → slow → very-slow → ultra-slow)
- Dynamic blur filters that adjust based on wheel speed and time remaining  
- Letter scaling effects with sine-wave animations for organic movement
- Floating particle backgrounds with staggered animation delays
- Gradient color transitions on interactive elements (keyboards, buttons)
- LUMINA-style card animations with shadows, scaling, and hover effects
- Responsive mobile-optimized transitions using Tailwind classes and CSS variables

### Backend Architecture

**Express.js Server**: Minimal Express server setup with TypeScript support, configured for development with tsx and production builds with esbuild.

**Development Tools**: Integrated Vite development server with HMR (Hot Module Replacement), custom error overlays, and Replit-specific development enhancements.

**Static File Serving**: Serves the built React application in production with appropriate middleware for logging and error handling.

### Database and Storage

**Database Schema**: Configured with Drizzle ORM for PostgreSQL using Neon database. Includes user management tables with username/password authentication fields.

**Storage Interface**: Implements both memory-based storage for development and database storage interface with CRUD operations for user management.

**Data Persistence**: Uses environment-based database configuration with migration support through Drizzle Kit.

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless database connection
- **drizzle-orm**: Type-safe SQL query builder and ORM
- **express**: Web application framework for the backend server
- **react**: Frontend UI library with hooks and modern features
- **vite**: Build tool and development server

### UI and Styling
- **@radix-ui/**: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for managing CSS class variants
- **lucide-react**: Modern icon library

### Development Tools
- **typescript**: Static type checking
- **@replit/vite-plugin-***: Replit-specific development enhancements
- **tsx**: TypeScript execution for development

### Game-Specific Libraries
- **wouter**: Lightweight client-side router
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Form validation and management
- **date-fns**: Date utility functions