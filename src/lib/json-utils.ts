export type JsonFormatResult =
  | {
      ok: true
      parsed: unknown
      pretty: string
      minified: string
      error: null
    }
  | {
      ok: false
      parsed: null
      pretty: string
      minified: string
      error: string
    }

export function formatJson(input: string): JsonFormatResult {
  const trimmed = input.trim()

  if (!trimmed) {
    return {
      ok: false,
      parsed: null,
      pretty: '',
      minified: '',
      error: 'JSON is empty.'
    }
  }

  try {
    const parsed = JSON.parse(trimmed)

    return {
      ok: true,
      parsed,
      pretty: JSON.stringify(parsed, null, 2),
      minified: JSON.stringify(parsed),
      error: null
    }
  } catch (error) {
    return {
      ok: false,
      parsed: null,
      pretty: input,
      minified: input,
      error: error instanceof Error ? error.message : 'Invalid JSON.'
    }
  }
}

export function isLikelyJsonPaste(text: string): boolean {
  const trimmed = text.trim()

  return (
    trimmed.length > 1 &&
    (
      trimmed.startsWith('{') ||
      trimmed.startsWith('[') ||
      trimmed.startsWith('"')
    )
  )
}