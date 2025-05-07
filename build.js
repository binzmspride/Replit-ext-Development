// This file is used for building the application for production
// It handles both CommonJS and ESM compatibility

const { exec, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Build the client-side code
console.log('Building client code...');
try {
  execSync('npx vite build client --outDir ../dist/client', { stdio: 'inherit' });
  console.log('Client code built successfully.');
} catch (error) {
  console.error(`Error building client code: ${error.message}`);
  process.exit(1);
}

// Build the server-side code with CommonJS format for Phusion Passenger compatibility
console.log('Building server code...');
try {
  execSync('npx esbuild server/index.ts --bundle --platform=node --packages=external --format=cjs --outfile=dist/server.js', { stdio: 'inherit' });
  console.log('Server code built successfully.');
} catch (error) {
  console.error(`Error building server code: ${error.message}`);
  process.exit(1);
}

// Create the app.js entry point for Phusion Passenger
console.log('Creating app.js entry point...');
const appJsContent = `
// This is the entry point for Phusion Passenger
// It's a CommonJS module that loads the bundled server code
'use strict';

// Load environment variables
require('dotenv').config();

// Require the bundled server code
const server = require('./server.js');

// The server should export an initServer function
if (typeof server.initServer === 'function') {
  server.initServer();
} else {
  console.error('Error: server.js does not export an initServer function');
  process.exit(1);
}
`;

fs.writeFileSync(path.join('dist', 'app.js'), appJsContent);
console.log('app.js entry point created successfully.');

// Copy .env file to dist directory
if (fs.existsSync('.env')) {
  fs.copyFileSync('.env', path.join('dist', '.env'));
  console.log('.env file copied to dist directory.');
}

console.log('Build completed successfully!');