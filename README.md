# Pokémon Capture & Management App

## Description
This is a Pokémon-themed application built with Electron, React, Redux, and SQLite, featuring a backend powered by Node.js and PostgreSQL. The app allows users to explore wild Pokémon, capture them, manage a party of up to 6 Pokémon, and store the extras in a PC Box. The PC Box Pokémon are stored and managed using a PostgreSQL backend, which runs automatically with the application.

---

## Features
1. **Wild Pokémon Exploration:**
   - Fetch Pokémon by type from the PokéAPI.
   - Display detailed information (types, moves, description, etc.).
   - Capture Pokémon directly.

2. **Party Management:**
   - Display a party of up to 6 Pokémon stored locally in SQLite.
   - Automatically move Pokémon to the PC Box when the party is full.

3. **PC Box Management:**
   - Display and manage Pokémon stored in a PostgreSQL database using an integrated backend.
   - Scrollable display for viewing all PC Box Pokémon.

4. **Real-time Updates:**
   - Redux is used to manage the state of captured Pokémon and the PC Box Pokémon count.
   - Synchronization between frontend and backend.

5. **Toast Notifications:**
   - Inform users of successful actions or errors using `react-toastify`.

---

## Tech Stack
- **Frontend:**
  - Electron
  - React (Vite)
  - Redux Toolkit
  - Tailwind CSS

- **Database:**
  - SQLite (local Pokémon party)
  - PostgreSQL (PC Box storage)

- **Backend:**
  - Node.js
  - Express.js

---

## Getting Started

### Prerequisites
- **Node.js** (v18+)
- **PostgreSQL** (v14+)
- **SQLite** (bundled with the app)

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/pokemon-app.git
   cd pokemon-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
   
3. **Set Up PostgreSQL:**
   - Run the SQL script located at `src/backend/models/postgres.sql` to set up the PostgreSQL database. The script includes the creation of the database, user, and their permissions.

4. **Run in Development:**
   ```bash
   npm run dev
   ```

5. **Build for Production:**
   - For Windows:
     ```bash
     npm run build:win
     ```
   - For macOS:
     ```bash
     npm run build:mac
     ```
   - For Linux:
     ```bash
     npm run build:linux
     ```

---

## Releases
[Link to Releases](#)

---

## Notes
- The backend starts automatically with the application, so no separate process is required.
- In development, `npm run dev` runs both the Electron app and the backend together.
- The PC Box is scrollable, while the rest of the app layout is fixed to prevent layout overflow.
- Party management is local to the app (SQLite), while PC Box management is handled via PostgreSQL.