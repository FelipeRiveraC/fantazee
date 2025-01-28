# README

Rails application using typescript, react, built using [Vite](https://vitejs.dev/guide/) and the [vite_rails](https://vite-ruby.netlify.app/guide/rails.html) gem.

### Versions

- Rails 7
- Ruby 3.1
- Node 18.7

### Setting up the application

- Here we use an `app/frontend` folder to store our front end application. Rails will generate an `app/javascript` folder by default

- `prettier` and `eslint` are configured with several recommended base templates. Custom eslint rules can be configured in the `.eslintrc.rules.cjs` file

- We've opted to build the front end using `Vite`, which comes with two configuration files: [`vite.config.ts`](https://vite-ruby.netlify.app/config/index.html#configuring-vite-%E2%9A%A1) and [`config/vite.json`](https://vite-ruby.netlify.app/config/index.html#shared-configuration-file-%F0%9F%93%84)

  - The `vite.config.ts` is used to configure the vite package provided by our node_modules. Here we include any plugins that run along side vite
  - The `config/vite.json` file is our configuration for the `vite_rails` gem.

## Configuration

---

- Install postgres

  `brew install postgresql`

  `brew services start postgresql`

- Install ruby version

  `rvm install 3.1.0`

  `rvm use`

- Install node

  `nvm install`

  `nvm use`

- Install bundler

  `gem install bundler`

- Install rails and node modules

  `bundle install`

  `yarn`

- Setup the database

  `bundle exec rails db:prepare`

  `bundle exec rails db:migrate`

  `bundle exec rails db:migrate`

- Start the rails server

  `bin/rails server`

- In a separate tab, start the frontend app

  `bin/vite dev`

- Visit the app at `localhost:3000`

## Testing

---

- Run the frontend tests

  `yarn run test`

- Run the frontend test suite in watch mode

  `yarn run watch`

- Run the rails specs

  `bundle exec rspec`

## Docker

## Docker

### Prerequisites

-------------------

- Docker
- Docker Compose
- Make (optional)

### Installation

-------------

1. Clone the repository:

   ```bash
   git clone git@github.com:your-username/draft-team-builder.git
   cd draft-team-builder
   ```

2. Build containers:

   ```bash
   make setup
   ```

   Alternative without Make:

   ```bash
   docker-compose build
   docker-compose run --rm app bundle install
   docker-compose run --rm app yarn install
   docker-compose run --rm app rails db:setup
   ```

### Starting the Application

-----------------------

1. Start all services:

   ```bash
   make start
   ```

   Alternative without Make:

   ```bash
   docker-compose up
   ```

2. The application will be available at:
   - Frontend: <http://localhost:5173>
   - API: <http://localhost:3000>

### Useful Commands

----------------

- Access Rails console:

  ```bash
  make console
  # or: docker-compose run --rm app rails console
  ```

- Access container bash:

  ```bash
  make bash
  # or: docker-compose run --rm app bash
  ```

- View logs:

  ```bash
  make logs
  # or: docker-compose logs -f
  ```

- Stop application:

  ```bash
  make stop
  # or: docker-compose down
  ```

### Troubleshooting

1. If changes are not reflected:
   - Verify containers are running:

     ```bash
     docker-compose ps
     ```

   - Restart services:

     ```bash
     make stop && make start
     ```

2. Database issues:
   - Reset database:

     ```bash
     make bash
     rails db:reset
     ```

3. Dependency issues:
   - Rebuild containers:

     ```bash
     make clean
     make setup
     ```

### Development

- Code changes are reflected automatically
- Frontend code is in `app/frontend`
- API endpoints are in `app/controllers/api`
- Models are in `app/models`

### Important File Structure

.
├── app/
│   ├── frontend/        # Código React/TypeScript
│   ├── controllers/     # Controladores Rails
│   └── models/         # Modelos Rails
├── config/            # Configuración
├── db/               # Migraciones
└── docker/          # Archivos Docker
