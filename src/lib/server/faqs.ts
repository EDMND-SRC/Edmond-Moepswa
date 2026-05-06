import { withPostgresClient } from '@/lib/server/postgres'

type FAQRow = {
  id: number | string
  question: string | null
  answer: string | null
  category: string | null
  order: number | string | null
  is_active: boolean | null
}

export type PublicFAQ = {
  answer: string
  category: string
  id: number | string
  isActive: boolean
  order: number
  question: string
}

export async function getFaqs(): Promise<PublicFAQ[]> {
  const result = await withPostgresClient(async (client) => {
    return (await client.query<FAQRow>(
      `
        select id, question, answer, category, "order", is_active
        from faqs
        where is_active = true
        order by "order" asc
        limit 100
      `,
    )) as { rows: FAQRow[] }
  })

  return result.rows.map((row) => ({
    answer: row.answer ?? '',
    category: row.category ?? 'general',
    id: row.id,
    isActive: row.is_active ?? true,
    order: typeof row.order === 'number' ? row.order : 0,
    question: row.question ?? '',
  }))
}
