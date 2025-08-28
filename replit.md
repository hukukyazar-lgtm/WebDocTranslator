# WordSpin Pro

## Overview

WordSpin Pro is a Turkish word guessing game where players must correctly guess a spinning word within 30 seconds. The application features a modern React frontend with a sleek dark theme, animated spinning wheel mechanics, and multiple difficulty levels across various categories. Players interact with a virtual Turkish keyboard to input their guesses while the word spins and gradually slows down, creating an engaging time-pressure gaming experience.

**Latest Stable Version Features (January 2025):**
- **Unified Game Experience**: Integrated game over results directly into the game screen, eliminating separate modal popups for seamless gameplay flow
- **Advanced Visual Effects**: Comprehensive particle systems, confetti celebrations, shake animations for wrong answers, typing sparkle effects, and heartbeat timer animations
- **Category-Based Theming**: Dynamic color themes that adapt to each word category (Animals, Food, Science, etc.) for immersive visual consistency
- **Invisible Wheel Design**: Transparent spinning mechanism that maintains rotation effects while focusing attention on the floating letters
- **Optimized Scoring System**: Simple time-based scoring where players earn points equal to remaining seconds (faster guesses = higher scores)
- **Enhanced Mobile Experience**: Compact statistics layout and responsive design optimized for all screen sizes
- **Hareketli Gradient Backgrounds**: Animated color-shifting backgrounds with category-specific palettes

## User Preferences

Preferred communication style: Simple, everyday language.

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

**Game Mechanics**: 
- 30-second timer with visual progress indicators and heartbeat animations
- Invisible spinning wheel with transparent design and dynamic letter animations
- Turkish keyboard layout for culturally appropriate input
- Time-based scoring system: points equal to remaining seconds (faster = higher score)
- Statistical tracking for streaks, averages, and performance metrics
- Category emoji indicators visible during gameplay for better orientation
- Advanced visual feedback: confetti for correct answers, shake effects for wrong answers

**Animation System**: Comprehensive CSS animations including particle systems, gradient shifting backgrounds, typing sparkle effects, confetti celebrations, and responsive mobile-optimized transitions using Tailwind classes and CSS variables.

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