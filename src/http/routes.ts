import { FastifyInstance } from 'fastify'
import { verifyJWT } from './middlewares/verify-jwt'

import { register } from './controllers/register.controller'
import { authenticate } from './controllers/authenticate.controller'
import { createStock } from './controllers/create-stock.controller'
import { createProduct } from './controllers/create-product.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.post('/stocks', { onRequest: [verifyJWT] }, createStock)
  app.post('/products', { onRequest: [verifyJWT] }, createProduct)
}
