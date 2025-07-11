# replit.md

## Overview

This is a full-stack e-commerce application for NIKZONE, a men's clothing brand. The application features a React-based frontend with TypeScript, an Express.js backend, and uses Drizzle ORM for database operations. The project is structured as a monorepo with shared schemas and separate client/server directories.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API for global state (Auth, Products, Cart)
- **Routing**: Hash-based client-side routing system
- **UI Components**: Radix UI primitives with custom styling
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: In-memory storage (MemStorage class)
- **API Structure**: RESTful endpoints under `/api` prefix
- **Development Setup**: Hot reloading with Vite middleware integration

### Key Design Decisions

**Monorepo Structure**: The project uses a shared schema approach where database models and types are defined in the `shared/` directory and used by both client and server. This ensures type safety across the full stack.

**Hash-based Routing**: Instead of using React Router, the application implements a custom hash-based routing system for simplicity and to avoid server-side routing complexities.

**Context-based State Management**: Three main contexts handle global state:
- AuthContext: Admin authentication
- ProductContext: Product CRUD operations
- CartContext: Shopping cart functionality

**Component Architecture**: Uses a combination of page components and reusable UI components, with hooks for complex logic separation.

## Key Components

### Database Layer
- **Schema Definition**: `shared/schema.ts` defines PostgreSQL tables using Drizzle ORM
- **User Management**: Basic user table with username/password authentication
- **Storage Interface**: `server/storage.ts` provides an abstraction layer with in-memory fallback

### Authentication System
- **Admin Authentication**: Simple username/password system stored in localStorage
- **Default Credentials**: admin/admin123 (configurable)
- **Session Management**: Token-based authentication with localStorage persistence

### Product Management
- **Product CRUD**: Full create, read, update, delete operations
- **Categories**: t-shirts, shirts, bottoms, jackets, accessories
- **Specifications**: Detailed product specifications including fit, fabric, care instructions
- **Inventory**: Size/color variants with stock management

### E-commerce Features
- **Shopping Cart**: Add/remove items with size selection and quantity management
- **Product Filtering**: Advanced filtering by price, color, size, sleeve type
- **Product Search**: Search functionality across product catalog
- **Checkout Process**: Form-based checkout with EmailJS integration for order notifications

### Admin Panel
- **Dashboard**: Product statistics and management overview
- **Product Management**: Add, edit, delete products with image upload
- **Order Management**: Basic order tracking (placeholder)
- **Configuration**: EmailJS settings for order notifications

## Data Flow

### Client-Side Flow
1. React components consume data from Context providers
2. Context providers manage local state and localStorage persistence
3. Custom hooks handle complex filtering and modal logic
4. Hash-based navigation triggers page transitions

### Server-Side Flow
1. Express middleware handles request logging and error catching
2. Route handlers interact with storage interface
3. Storage interface abstracts database operations
4. Drizzle ORM handles PostgreSQL operations

### Authentication Flow
1. Admin login validates credentials against stored values
2. Successful authentication stores token in localStorage
3. AuthContext provides authentication state across components
4. Protected routes check authentication status

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend framework with hooks and concurrent features
- **Express.js**: Backend web framework
- **TypeScript**: Type safety across the entire application
- **Drizzle ORM**: Type-safe database operations with PostgreSQL

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **shadcn/ui**: Pre-built component library
- **Lucide React**: Icon library

### Database and Storage
- **@neondatabase/serverless**: PostgreSQL database connection
- **PostgreSQL**: Primary database system
- **connect-pg-simple**: Session storage adapter

### Development Tools
- **Vite**: Build tool and development server
- **ESBuild**: Fast JavaScript bundler for production
- **tsx**: TypeScript execution for development

### Third-Party Integrations
- **EmailJS**: Email service for order notifications
- **Replit Plugins**: Development environment integration

## Deployment Strategy

### Development Environment
- **Hot Reloading**: Vite provides instant feedback during development
- **Type Checking**: Continuous TypeScript compilation
- **Development Scripts**: `npm run dev` starts both frontend and backend
- **Database Push**: `npm run db:push` syncs schema changes

### Production Build
- **Frontend Build**: Vite optimizes and bundles React application
- **Backend Bundle**: ESBuild creates optimized server bundle
- **Static Assets**: Frontend builds to `dist/public` directory
- **Server Deployment**: Node.js serves both API and static files

### Database Strategy
- **Schema Management**: Drizzle Kit handles migrations
- **Environment Configuration**: DATABASE_URL environment variable required
- **Connection Pooling**: Uses Neon's serverless PostgreSQL adapter

### Scalability Considerations
- **Stateless Backend**: In-memory storage can be replaced with persistent storage
- **CDN Ready**: Static assets can be served from CDN
- **API Separation**: Backend can be separated and scaled independently
- **Database Scaling**: PostgreSQL supports horizontal scaling through read replicas

The application is designed for easy deployment on platforms like Replit, Vercel, or any Node.js hosting service with PostgreSQL support.