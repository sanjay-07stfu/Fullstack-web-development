import { useEffect, useMemo } from 'react'

const LANGUAGE_OPTIONS = [
  'en',
  'hi',
  'te',
  'ta',
  'bn',
  'ml',
  'kn',
  'mr',
  'gu',
  'pa',
  'ur',
  'es',
  'fr',
  'de',
  'ar',
  'zh-CN',
  'ja',
  'ko',
  'ru',
  'pt',
  'it',
]

const GoogleTranslate = () => {
  const includedLanguages = useMemo(() => LANGUAGE_OPTIONS.join(','), [])

  useEffect(() => {
    const initTranslate = () => {
      if (!window.google?.translate?.TranslateElement) return

      const container = document.getElementById('google_translate_element')
      if (!container || container.childNodes.length > 0) return

      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages,
          autoDisplay: false,
        },
        'google_translate_element',
      )
    }

    window.googleTranslateElementInit = initTranslate

    if (window.google?.translate?.TranslateElement) {
      initTranslate()
      return undefined
    }

    const existingScript = document.getElementById('google-translate-script')
    if (!existingScript) {
      const script = document.createElement('script')
      script.id = 'google-translate-script'
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.body.appendChild(script)
    }

    return () => {
      if (window.googleTranslateElementInit === initTranslate) {
        delete window.googleTranslateElementInit
      }
    }
  }, [includedLanguages])

  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-900">
      <span className="text-xs text-slate-600 dark:text-slate-300">Language</span>
      <div id="google_translate_element" className="min-h-6" />
    </div>
  )
}

export default GoogleTranslate