// Analytics utility functions for tracking events

declare global {
  interface Window {
    dataLayer: any[]
    gtag?: (...args: any[]) => void
  }
}

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXX'
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

// Initialize dataLayer
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || []
}

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'pageview',
      page: url,
    })
  }
}

// Track custom events
interface EventParams {
  action: string
  category: string
  label?: string
  value?: number
  [key: string]: any
}

export const trackEvent = ({ action, category, label, value, ...otherParams }: EventParams) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'customEvent',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
      eventValue: value,
      ...otherParams,
    })
  }
}

// Track form submissions
export const trackFormSubmission = (formName: string, formData?: Record<string, any>) => {
  trackEvent({
    action: 'form_submit',
    category: 'engagement',
    label: formName,
    ...formData,
  })
}

// Track CTA clicks
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent({
    action: 'cta_click',
    category: 'engagement',
    label: ctaName,
    ctaLocation: location,
  })
}

// Track scroll depth
export const trackScrollDepth = (percentage: number) => {
  trackEvent({
    action: 'scroll',
    category: 'engagement',
    label: `${percentage}%`,
    value: percentage,
  })
}

// Track lead magnet downloads
export const trackLeadMagnetDownload = (magnetName: string) => {
  trackEvent({
    action: 'download',
    category: 'lead_generation',
    label: magnetName,
  })
}

// Track exit intent popup
export const trackExitIntent = (action: 'shown' | 'closed' | 'submitted') => {
  trackEvent({
    action: `exit_intent_${action}`,
    category: 'engagement',
    label: 'exit_intent_popup',
  })
}

// Track social proof widget interactions
export const trackSocialProof = (action: 'shown' | 'minimized' | 'maximized') => {
  trackEvent({
    action: `social_proof_${action}`,
    category: 'engagement',
    label: 'social_proof_widget',
  })
}

// Enhanced Ecommerce tracking for audit requests
export const trackAuditRequest = (step: number, stepName: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'audit_request_step',
      ecommerce: {
        checkout: {
          actionField: { step: step, option: stepName },
          products: [{
            name: 'Audit Stratégique Gratuit',
            id: 'audit-strategique',
            price: '0',
            category: 'Lead Generation',
            quantity: 1,
          }]
        }
      }
    })
  }
}

// Track time on page
let startTime: number
if (typeof window !== 'undefined') {
  startTime = Date.now()
  
  window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000)
    trackEvent({
      action: 'time_on_page',
      category: 'engagement',
      value: timeOnPage,
      label: window.location.pathname,
    })
  })
}