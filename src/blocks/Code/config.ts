import type { Block } from 'payload'

const useCloudflarePayloadTextarea = process.env.CLOUDFLARE_WORKER_VARIANT === 'payload'

export const Code: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: 'typescript',
      options: [
        { label: 'TypeScript', value: 'typescript' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'CSS', value: 'css' },
        { label: 'HTML', value: 'html' },
        { label: 'Python', value: 'python' },
        { label: 'Bash/Shell', value: 'bash' },
        { label: 'JSON', value: 'json' },
        { label: 'SQL', value: 'sql' },
        { label: 'YAML', value: 'yaml' },
        { label: 'Java', value: 'java' },
        { label: 'C#', value: 'csharp' },
        { label: 'PHP', value: 'php' },
        { label: 'Ruby', value: 'ruby' },
        { label: 'Go', value: 'go' },
        { label: 'Rust', value: 'rust' },
      ],
    },
    {
      name: 'code',
      ...(useCloudflarePayloadTextarea
        ? {
            admin: {
              rows: 16,
            },
            type: 'textarea' as const,
          }
        : {
            type: 'code' as const,
          }),
      label: false,
      required: true,
    },
  ],
}
