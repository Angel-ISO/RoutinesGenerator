import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TrainingSuite API',
      version: '1.0.0',
      description: 'API for creating, storing, and exporting training routines in PDF. ExerciseDB API docs: https://exercisedb-api.vercel.app/docs',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/api/routes/*.js'], 
};

const specs = swaggerJSDoc(options);

export default specs;