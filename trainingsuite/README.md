# TrainingSuite

API for creating, storing, and exporting training routines in PDF.

## Setup

1. Install dependencies: `npm install`

2. Configure environment: Copy `.env.example` to `.env` and fill in the values (e.g., MONGO_URI for your MongoDB connection).

3. Run the server in development mode: `npm run dev`

4. Import exercises from ExerciseDB: `npm run import`

5. Test endpoints using Swagger UI: Visit `http://localhost:4000/api/docs`

6. Generate PDF for a routine: Use the POST `/api/routines/:id/pdf` endpoint.

## Usage

- **Import Exercises**: Populate the database with exercises from ExerciseDB API.
- **Create Routines**: Manually create training routines referencing imported exercises.
- **Export to PDF**: Generate a downloadable PDF for any routine, including exercise details and images.

Note: ExerciseDB API docs: https://exercisedb-api.vercel.app/docs