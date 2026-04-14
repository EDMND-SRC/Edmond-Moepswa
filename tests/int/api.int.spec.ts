import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, afterAll, expect } from 'vitest'

/**
 * NOTE: This test runs against the test database configured in .env.test.
 * Ensure DATABASE_URL points to a dedicated test database (edmond-moepswa-test)
 * to prevent test data from polluting production or development databases.
 */
let payload: Payload

describe('API Integration Tests', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  afterAll(async () => {
    // Clean up any test data if needed
  })

  describe('Users collection', () => {
    it('fetches users with expected structure', async () => {
      const users = await payload.find({
        collection: 'users',
        depth: 0,
      })
      expect(users).toBeDefined()
      expect(users).toHaveProperty('docs')
      expect(users).toHaveProperty('totalDocs')
      expect(Array.isArray(users.docs)).toBe(true)
    })
  })

  describe('Pages collection', () => {
    it('query returns expected structure', async () => {
      const pages = await payload.find({
        collection: 'pages',
        depth: 0,
        where: {
          _status: { equals: 'published' },
        },
      })
      expect(pages).toBeDefined()
      expect(pages).toHaveProperty('docs')
      expect(pages.docs.every((doc) => doc.title)).toBe(true)
    })
  })

  describe('Services collection', () => {
    it('query returns pricing data', async () => {
      const services = await payload.find({
        collection: 'services',
        depth: 0,
        sort: 'price',
      })
      expect(services).toBeDefined()
      expect(services).toHaveProperty('docs')

      if (services.docs.length > 0) {
        const firstService = services.docs[0]
        expect(firstService).toHaveProperty('title')
        expect(firstService).toHaveProperty('description')
        expect(firstService).toHaveProperty('price')
        expect(typeof firstService.price).toBe('number')
      }
    })
  })

  describe('Projects collection', () => {
    it('query returns project data', async () => {
      const projects = await payload.find({
        collection: 'projects',
        depth: 0,
      })
      expect(projects).toBeDefined()
      expect(projects).toHaveProperty('docs')

      if (projects.docs.length > 0) {
        const firstProject = projects.docs[0]
        expect(firstProject).toHaveProperty('title')
        expect(firstProject).toHaveProperty('slug')
        expect(firstProject).toHaveProperty('category')
      }
    })
  })

  describe('FAQs collection', () => {
    it('returns only active items when filtered', async () => {
      const activeFAQs = await payload.find({
        collection: 'faqs',
        depth: 0,
        where: {
          isActive: { equals: true },
        },
        sort: 'order',
      })
      expect(activeFAQs).toBeDefined()
      expect(activeFAQs.docs.every((faq) => faq.isActive === true)).toBe(true)
    })

    it('returns FAQs sorted by order', async () => {
      const faqs = await payload.find({
        collection: 'faqs',
        depth: 0,
        sort: 'order',
      })
      expect(faqs).toBeDefined()

      if (faqs.docs.length > 1) {
        for (let i = 0; i < faqs.docs.length - 1; i++) {
          expect((faqs.docs[i] as any).order).toBeLessThanOrEqual((faqs.docs[i + 1] as any).order)
        }
      }
    })
  })

  describe('Test database isolation', () => {
    it('can create and delete test data without affecting production', async () => {
      // Create a test FAQ
      const testFAQ = await payload.create({
        collection: 'faqs',
        data: {
          question: 'Test FAQ - should be cleaned up',
          answer: 'This is a test FAQ and should be deleted after the test.',
          category: 'general',
          order: 9999,
          isActive: false,
        },
      })
      expect(testFAQ).toBeDefined()
      expect(testFAQ.question).toBe('Test FAQ - should be cleaned up')

      // Verify it exists
      const found = await payload.findByID({
        collection: 'faqs',
        id: testFAQ.id,
      })
      expect(found).toBeDefined()
      expect(found?.question).toBe('Test FAQ - should be cleaned up')

      // Clean up
      await payload.delete({
        collection: 'faqs',
        id: testFAQ.id,
      })

      // Verify it's gone
      const deleted = await payload.findByID({
        collection: 'faqs',
        id: testFAQ.id,
      })
      expect(deleted).toBeNull()
    })
  })
})
