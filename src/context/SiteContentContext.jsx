import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  loadPublished,
  loadDraft,
  saveDraft,
  clearDraft,
  publishContent,
  readPreviewFlag,
  writePreviewFlag,
  DEFAULT_CONTENT,
} from '../data/contentStore.js'

/**
 * SiteContentProvider — supplies the live site content to every
 * public component and lets the admin panel edit draft content,
 * preview it on the public site, then publish it.
 */
const SiteContentContext = createContext(null)

export function SiteContentProvider({ children }) {
  const [published, setPublished] = useState(() => loadPublished())
  const [draft, setDraft] = useState(() => loadDraft())
  const [previewing, setPreviewing] = useState(() => readPreviewFlag())

  // The live content the public site renders: draft while the
  // administrator previews, otherwise the published content.
  const content = previewing && draft ? draft : published

  const updateDraft = useCallback((updater) => {
    setDraft((cur) => {
      const base = cur && typeof cur === 'object' ? cur : loadDraft() || published
      // Updaters may mutate the clone in place (returning nothing) or
      // return a new object — accept both styles.
      const next =
        typeof updater === 'function'
          ? updater(structuredCloneSimple(base)) ?? base
          : updater ?? base
      saveDraft(next)
      return next
    })
  }, [published])

  const startPreview = useCallback(() => {
    writePreviewFlag(true)
    setPreviewing(true)
  }, [])

  const stopPreview = useCallback(() => {
    writePreviewFlag(false)
    setPreviewing(false)
  }, [])

  const discardDraft = useCallback(() => {
    clearDraft()
    setDraft(null)
    stopPreview()
  }, [stopPreview])

  const publish = useCallback(() => {
    const toPublish = draft || published
    if (publishContent(toPublish)) {
      setPublished(toPublish)
      setDraft(null)
      stopPreview()
      return true
    }
    return false
  }, [draft, published, stopPreview])

  const resetToDefaults = useCallback(() => {
    const fresh = structuredCloneSimple(DEFAULT_CONTENT)
    setPublished(fresh)
    setDraft(null)
    stopPreview()
  }, [stopPreview])

  const hasDraft = draft !== null

  useEffect(() => {
    // Keep the tab title honest during preview.
    if (previewing) document.title = '[PREVIEW] Alberto Watch Company'
    else document.title = 'Alberto Watch Company — Luxury Watch SPA'
  }, [previewing])

  const value = useMemo(
    () => ({
      content,
      published,
      draft,
      hasDraft,
      previewing,
      updateDraft,
      startPreview,
      stopPreview,
      publish,
      discardDraft,
      resetToDefaults,
    }),
    [content, published, draft, hasDraft, previewing, updateDraft, startPreview, stopPreview, publish, discardDraft, resetToDefaults],
  )

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext)
  if (!ctx) throw new Error('useSiteContent must be used inside <SiteContentProvider>')
  return ctx
}

function structuredCloneSimple(v) {
  return JSON.parse(JSON.stringify(v))
}
