import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({
  logger: true
});

// Register CORS
fastify.register(cors, {
  origin: true
});

// Health check endpoint
fastify.get('/api/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Example API endpoint
fastify.get('/api/hello', async (request, reply) => {
  return { message: 'Hello from Fastify!' };
});

// Resume endpoints
fastify.get('/api/resumes/:username', async (request, reply) => {
  const { username } = request.params as { username: string };
  
  // TODO: Fetch from database
  return { 
    username,
    message: 'Resume data would be here'
  };
});

fastify.post('/api/resumes', async (request, reply) => {
  const body = request.body;
  
  // TODO: Save to database
  return { 
    success: true,
    message: 'Resume saved'
  };
});

// Export for Vercel serverless
export default async (req: any, res: any) => {
  await fastify.ready();
  fastify.server.emit('request', req, res);
};