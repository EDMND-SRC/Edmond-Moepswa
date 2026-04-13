import type { RichTextField } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  type LexicalEditorProps as LexicalEditorConfig,
} from '@payloadcms/richtext-lexical'

type HeadingSizes = 'h1' | 'h2' | 'h3' | 'h4'

interface CreateLexicalEditorOptions {
  /** Enabled heading sizes. Default: ['h1', 'h2', 'h3', 'h4'] */
  headingSizes?: HeadingSizes[]
  /** Enable fixed toolbar. Default: true */
  fixedToolbar?: boolean
  /** Enable inline toolbar. Default: true */
  inlineToolbar?: boolean
}

/**
 * Create a default lexical editor configuration with common features.
 * Use this factory instead of copy-pasting lexicalEditor() calls across blocks.
 */
export function createLexicalEditor(options: CreateLexicalEditorOptions = {}) {
  const {
    headingSizes = ['h1', 'h2', 'h3', 'h4'],
    fixedToolbar = true,
    inlineToolbar = true,
  } = options

  return lexicalEditor({
    features: ({ rootFeatures }) => {
      const features = [...rootFeatures]

      if (headingSizes.length > 0) {
        features.push(HeadingFeature({ enabledHeadingSizes: headingSizes }))
      }
      if (fixedToolbar) {
        features.push(FixedToolbarFeature())
      }
      if (inlineToolbar) {
        features.push(InlineToolbarFeature())
      }

      return features
    },
  })
}

/**
 * The default lexical editor with all features enabled.
 * Kept for backward compatibility - prefer createLexicalEditor() for new code.
 */
export const defaultLexical = createLexicalEditor()
