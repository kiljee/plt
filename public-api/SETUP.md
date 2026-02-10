# Paleto Events API - Development Setup

## Prerequisites

1. **PostgreSQL** - Install and run locally
2. **Node.js** - Version 18 or higher
3. **Wasp** - Install globally: `curl -sSL https://get.wasp-lang.dev/installer.sh | sh`

## Database Setup

### 1. Install PostgreSQL
```bash
# macOS with Homebrew
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Create Database and User
```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE paleto_dev;
CREATE USER postgres WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE paleto_dev TO postgres;
\q
```

## Environment Configuration

### 1. Copy Environment File
```bash
cp .env.example .env.server
```

### 2. Update .env.server File
Edit `.env.server` and update database credentials if different:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/paleto_dev"
```

## Running the Application

### 1. Install Dependencies and Run Migrations
```bash
wasp db migrate-dev --name init
```

### 2. Start Development Server
```bash
wasp start
```

The API will be available at:
- **Server**: http://localhost:3001
- **Client**: http://localhost:3000

## Database Management

### Reset Database
```bash
wasp db reset --force
```

### Create New Migration
```bash
wasp db migrate-dev --name migration_name
```

### View Database
```bash
wasp db studio
```

## API Endpoints

### Public Endpoints
- `GET /api/events` - List all events
- `GET /api/events/by-slug` - Get event by slug
- `POST /api/reservations` - Create reservation

### Admin Endpoints (require authentication)
- `GET /api/admin/events` - List events for admin
- `POST /api/admin/events` - Create new event
- `PUT /api/admin/events/:id` - Update event
- `DELETE /api/admin/events/:id` - Delete event

## Troubleshooting

### Database Connection Issues
1. Check if PostgreSQL is running: `pg_isready`
2. Verify database exists: `psql -U postgres -l`
3. Test connection: `psql -U postgres -d paleto_dev`

### Migration Issues
1. Check migration status: `wasp db migrate status`
2. Reset and re-run: `wasp db reset --force && wasp db migrate-dev --name init`

## Next Steps

1. Create your first admin user by registering at http://localhost:3000/signup
2. Access admin dashboard at http://localhost:3000/dashboard
3. Create some test events
4. Test the API endpoints with Postman or curl