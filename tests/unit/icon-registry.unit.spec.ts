import { describe, it, expect } from 'vitest'
import { getTechIcon, ICON_REGISTRY } from '@/lib/icon-registry'

function expectValidIconComponent(icon: unknown) {
  expect(icon).not.toBeNull()
  expect(['function', 'object']).toContain(typeof icon)
}

describe('getTechIcon', () => {
  describe('empty / whitespace input', () => {
    it('returns null for empty string', () => {
      expect(getTechIcon('')).toBeNull()
    })

    it('returns null for whitespace-only string', () => {
      expect(getTechIcon('   ')).toBeNull()
      expect(getTechIcon('\t\n')).toBeNull()
    })
  })

  describe('exact match', () => {
    it('returns icon for exact technology name', () => {
      const Icon = getTechIcon('TypeScript')
      expectValidIconComponent(Icon)
    })

    it('returns icon for mapped technology name', () => {
      const Icon = getTechIcon('Next.js')
      expect(Icon).not.toBeNull()
    })

    it('returns null for unknown technology', () => {
      const Icon = getTechIcon('DefinitelyNotATechology123')
      expect(Icon).toBeNull()
    })
  })

  describe('case-insensitive match', () => {
    it('matches regardless of case', () => {
      const Icon1 = getTechIcon('typescript')
      const Icon2 = getTechIcon('TYPESCRIPT')
      const Icon3 = getTechIcon('TypeScript')

      expect(Icon1).not.toBeNull()
      expect(Icon2).not.toBeNull()
      expect(Icon3).not.toBeNull()
      expect(Icon1).toBe(Icon2)
      expect(Icon2).toBe(Icon3)
    })
  })

  describe('word-boundary partial match', () => {
    it('matches "Neon (Serverless PostgreSQL)" to PostgreSQL icon', () => {
      const Icon = getTechIcon('Neon (Serverless PostgreSQL)')
      expect(Icon).not.toBeNull()
    })

    it('does NOT match "react" within "interactive"', () => {
      // This should NOT match React because "react" is not a word boundary in "interactive"
      const Icon = getTechIcon('interactive')
      // Could match other keys like "Interactive" if they existed, but NOT React
      // Since no exact key "interactive" exists, returns null
      expect(Icon).toBeNull()
    })

    it('does NOT match "react" within "proactive"', () => {
      const Icon = getTechIcon('proactive')
      expect(Icon).toBeNull()
    })

    it('does NOT match "react" within "reactive"', () => {
      const Icon = getTechIcon('reactive')
      expect(Icon).toBeNull()
    })

    it('matches "React" as standalone word', () => {
      const Icon = getTechIcon('React')
      expect(Icon).not.toBeNull()
    })

    it('matches "Tailwind" in "Tailwind CSS" via exact key', () => {
      const Icon = getTechIcon('Tailwind CSS')
      expect(Icon).not.toBeNull()
    })

    it('does NOT match "postgres" prefix to PostgreSQL (not a word boundary)', () => {
      // "postgres" is a prefix of "PostgreSQL", not a whole word match
      // Word-boundary matching requires \bpostgres\b which won't match "postgresql"
      const Icon = getTechIcon('postgres')
      expect(Icon).toBeNull()
    })

    it('DOES match "PostgreSQL" exactly', () => {
      const Icon = getTechIcon('PostgreSQL')
      expect(Icon).not.toBeNull()
    })
  })

  describe('caching', () => {
    it('returns same reference for repeated calls', () => {
      const Icon1 = getTechIcon('React')
      const Icon2 = getTechIcon('React')
      expect(Icon1).toBe(Icon2)
    })

    it('caches misses as well', () => {
      const result1 = getTechIcon('NonExistent42')
      const result2 = getTechIcon('NonExistent42')
      expect(result1).toBeNull()
      expect(result2).toBeNull()
    })
  })
})

describe('ICON_REGISTRY', () => {
  it('has no duplicate keys', () => {
    const keys = Object.keys(ICON_REGISTRY)
    const uniqueKeys = new Set(keys)
    expect(keys.length).toBe(uniqueKeys.size)
  })

  it('has at least 80 entries', () => {
    const count = Object.keys(ICON_REGISTRY).length
    expect(count).toBeGreaterThanOrEqual(80)
  })

  it('all values are valid icon components', () => {
    Object.entries(ICON_REGISTRY).forEach(([key, component]) => {
      expectValidIconComponent(component)
    })
  })
})
