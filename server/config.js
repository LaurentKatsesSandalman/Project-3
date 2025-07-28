import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

// ou fallback
dotenv.config(); // charge .env si .env.NODE_ENV n'existe pas