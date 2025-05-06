# Architecture Documentation

## Overview

This application is a full-stack web application called "HeartDraw" that allows users to create and save heart drawings. It follows a modern web architecture with a React frontend and an Express backend, using a PostgreSQL database for persistent storage. The application implements user authentication, allowing users to save and manage their heart drawings.

The system utilizes a monorepo structure with clear separation between client, server, and shared code. It leverages modern web technologies like React, Express, and Drizzle ORM for database operations.

## System Architecture

### High-Level Architecture

The application follows a client-server architecture with the following main components:

1. **Frontend**: React application with modern UI components from Shadcn/UI
2. **Backend**: Express.js server handling API requests and business logic
3. **Database**: PostgreSQL database using Drizzle ORM for schema management
4. **Authentication**: Session-based authentication using Passport.js

```
┌───────────────┐         ┌───────────────┐         ┌───────────────┐
│               │         │               │         │               │
│  React Client │ ◄────► │  Express API  │ ◄────► │  PostgreSQL   │
│               │         │               │         │               │
└───────────────┘         └───────────────┘         └───────────────┘
```

### Directory Structure

```
├── client/               # Frontend React application
│   ├── src/              # React source code
│   │   ├── components/   # UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   └── pages/        # Page components
├── server/               # Backend Express application
│   ├── auth.ts           # Authentication logic
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Database access layer
│   └── vite.ts           # Vite server setup
├── db/                   # Database management
│   ├── index.ts          # Database connection setup
│   ├── migrations/       # Database migrations
│   └── seed.ts           # Database seeding
├── shared/               # Shared code between frontend and backend
│   └── schema.ts         # Database schema definitions with Drizzle
```

## Key Components

### Frontend Architecture

The frontend is built with React and follows a modern component-based architecture. It uses several key libraries and patterns:

1. **Component Library**: Custom UI components built on top of Radix UI using the ShadCN approach
2. **Routing**: Uses Wouter for lightweight client-side routing
3. **State Management**: Uses React Context API for global state (auth state) and React Query for server state management
4. **Form Handling**: Uses React Hook Form with Zod validation
5. **Styling**: Tailwind CSS for utility-first styling

Key frontend components include:
- `AuthProvider`: Manages user authentication state
- `CanvasArea`: Handles the drawing canvas functionality
- `ToolsPanel`: Provides drawing tools and controls

### Backend Architecture

The backend is built with Express.js and follows a modular architecture:

1. **Routes**: API endpoints in `server/routes.ts`
2. **Authentication**: Passport.js for local username/password auth in `server/auth.ts`
3. **Storage**: Database access layer in `server/storage.ts`
4. **Server Setup**: Express configuration in `server/index.ts`

The backend implements RESTful API endpoints for:
- User authentication (login/register)
- Heart drawing CRUD operations

### Database Schema

The database schema is defined using Drizzle ORM in `shared/schema.ts`:

1. **Users Table**: Stores user credentials
   - `id`: Primary key
   - `username`: Unique username
   - `password`: Hashed password

2. **Hearts Table**: Stores user-created heart drawings
   - `id`: Primary key
   - `userId`: Foreign key to users table
   - `name`: Name of the heart drawing
   - `image`: Base64 encoded image data
   - `createdAt`: Timestamp

The schema includes relations between tables and Zod validation schemas for type safety.

### Authentication System

The authentication system uses:

1. **Passport.js**: For authentication strategy implementation
2. **Express-session**: For session management
3. **connect-pg-simple**: For storing sessions in PostgreSQL
4. **Crypto**: For secure password hashing using scrypt

The authentication flow includes:
1. User register/login through the `/api/login` and `/api/register` endpoints
2. Password verification against stored hash
3. Session creation and storage in database
4. Protected routes that check for authenticated session

## Data Flow

### Authentication Flow

1. User enters credentials on the frontend login/register form
2. Credentials are validated with Zod schema
3. Frontend sends credentials to backend API
4. Backend verifies credentials against database
5. On success, a session is created and stored in the database
6. Session ID is returned to the client as a cookie
7. Frontend uses the authenticated session for subsequent requests

### Heart Drawing Flow

1. User creates a heart drawing using the canvas tools
2. Drawing is encoded as a base64 image
3. Frontend sends drawing data to backend API
4. Backend validates the request and saves the drawing to the database
5. Updated list of drawings is fetched and displayed to the user

### API Structure

The API follows RESTful conventions:

- `GET /api/user`: Get current user info
- `POST /api/login`: Authenticate user
- `POST /api/register`: Register new user
- `GET /api/hearts`: Get all hearts for current user
- `GET /api/hearts/:id`: Get specific heart by ID
- `POST /api/hearts`: Create a new heart
- `PUT /api/hearts/:id`: Update an existing heart
- `DELETE /api/hearts/:id`: Delete a heart

## External Dependencies

### Frontend Dependencies

- **React**: UI library
- **Wouter**: Lightweight router
- **@tanstack/react-query**: Data fetching and caching
- **@radix-ui**: Primitive UI components
- **@hookform/resolvers**: Form validation
- **clsx/tailwind-merge**: CSS utility functions
- **Lucide React**: Icon library

### Backend Dependencies

- **Express**: Web server framework
- **Passport**: Authentication middleware
- **express-session**: Session management
- **connect-pg-simple**: PostgreSQL session store
- **@neondatabase/serverless**: PostgreSQL client (Neon)

### Database Dependencies

- **Drizzle ORM**: Type-safe ORM
- **Zod**: Schema validation

## Deployment Strategy

The application is configured for deployment on the Replit platform, as indicated by the `.replit` configuration file. The deployment strategy includes:

1. **Build Process**:
   - Frontend build with Vite
   - Backend bundling with esbuild
   - Combined static and server files

2. **Environment Configuration**:
   - Node.js 20 runtime
   - Environment variables for database connection and session secrets

3. **Database**:
   - Uses Neon PostgreSQL database (serverless)
   - Database URL provided via environment variables

4. **Development Workflow**:
   - `npm run dev`: Development server with hot reloading
   - `npm run build`: Production build
   - `npm run start`: Start production server
   - `npm run db:push`: Apply schema changes to database
   - `npm run db:seed`: Seed database with initial data

The application is prepared for containerized deployment with proper configuration for handling connections, sessions, and serving static files.

## Security Considerations

1. **Password Security**:
   - Uses scrypt for password hashing
   - Implements random salting
   - Uses timing-safe comparison for password verification

2. **Authentication**:
   - Session-based authentication
   - Secure cookies
   - CSRF protection via token

3. **API Security**:
   - Input validation with Zod
   - Proper error handling
   - Route protection for authenticated routes