// A/B Testing utilities for optimizing conversions

interface ABTestVariant {
  id: string
  name: string
  weight?: number // Distribution weight (0-1)
}

interface ABTestConfig {
  testId: string
  variants: ABTestVariant[]
  defaultVariant: string
}

// Store selected variants in sessionStorage to ensure consistency
const STORAGE_KEY = 'ab_test_variants'

// Get or set user's variant for a test
export function getVariant(testConfig: ABTestConfig): string {
  if (typeof window === 'undefined') {
    return testConfig.defaultVariant
  }

  try {
    // Check if variant already selected for this session
    const storedVariants = sessionStorage.getItem(STORAGE_KEY)
    const variants = storedVariants ? JSON.parse(storedVariants) : {}
    
    if (variants[testConfig.testId]) {
      return variants[testConfig.testId]
    }

    // Select variant based on weights
    const selectedVariant = selectWeightedVariant(testConfig.variants)
    
    // Store selection
    variants[testConfig.testId] = selectedVariant
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(variants))
    
    // Track variant selection
    trackVariantSelection(testConfig.testId, selectedVariant)
    
    return selectedVariant
  } catch (error) {
    console.error('Error in A/B test variant selection:', error)
    return testConfig.defaultVariant
  }
}

// Select variant based on weights
function selectWeightedVariant(variants: ABTestVariant[]): string {
  // Normalize weights
  const totalWeight = variants.reduce((sum, v) => sum + (v.weight || 1), 0)
  const random = Math.random() * totalWeight
  
  let accumulated = 0
  for (const variant of variants) {
    accumulated += (variant.weight || 1)
    if (random < accumulated) {
      return variant.id
    }
  }
  
  return variants[0].id // Fallback
}

// Track variant selection in analytics
function trackVariantSelection(testId: string, variantId: string) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'ab_test_variant_selected',
      testId,
      variantId,
    })
  }
}

// Track conversion for a test
export function trackConversion(testId: string, conversionType: string) {
  if (typeof window === 'undefined') return
  
  try {
    const storedVariants = sessionStorage.getItem(STORAGE_KEY)
    const variants = storedVariants ? JSON.parse(storedVariants) : {}
    const variantId = variants[testId]
    
    if (variantId && window.dataLayer) {
      window.dataLayer.push({
        event: 'ab_test_conversion',
        testId,
        variantId,
        conversionType,
      })
    }
  } catch (error) {
    console.error('Error tracking A/B test conversion:', error)
  }
}

// Predefined A/B tests
export const AB_TESTS = {
  heroHeadline: {
    testId: 'hero_headline_v1',
    variants: [
      {
        id: 'control',
        name: 'Dirigeant esclave',
        weight: 0.5,
      },
      {
        id: 'variant_a',
        name: 'CEO prisonnier',
        weight: 0.25,
      },
      {
        id: 'variant_b',
        name: 'Entrepreneur épuisé',
        weight: 0.25,
      },
    ],
    defaultVariant: 'control',
  },
  
  heroCTA: {
    testId: 'hero_cta_v1',
    variants: [
      {
        id: 'control',
        name: 'Découvrir votre Score de Liberté Entrepreneuriale',
        weight: 0.5,
      },
      {
        id: 'variant_a',
        name: 'Obtenir mon Audit Stratégique Gratuit',
        weight: 0.25,
      },
      {
        id: 'variant_b',
        name: 'Commencer ma Transformation Maintenant',
        weight: 0.25,
      },
    ],
    defaultVariant: 'control',
  },
  
  urgencyMessage: {
    testId: 'urgency_message_v1',
    variants: [
      {
        id: 'control',
        name: '7 places restantes',
        weight: 0.33,
      },
      {
        id: 'variant_a',
        name: 'Places limitées ce mois',
        weight: 0.33,
      },
      {
        id: 'variant_b',
        name: 'Agenda complet dans 48h',
        weight: 0.34,
      },
    ],
    defaultVariant: 'control',
  },
  
  socialProofNumber: {
    testId: 'social_proof_v1',
    variants: [
      {
        id: 'control',
        name: '12 dirigeants',
        weight: 0.33,
      },
      {
        id: 'variant_a',
        name: '17 dirigeants',
        weight: 0.33,
      },
      {
        id: 'variant_b',
        name: '23 dirigeants',
        weight: 0.34,
      },
    ],
    defaultVariant: 'control',
  },
}

// Get headline variant
export function getHeadlineVariant(): {
  variant: string
  text: string
} {
  const variant = getVariant(AB_TESTS.heroHeadline)
  
  const headlines = {
    control: {
      main: "Vous dirigez une entreprise à 7 chiffres mais vous êtes toujours le pompier en chef ?",
      highlight1: "7 chiffres",
      highlight2: "pompier en chef",
    },
    variant_a: {
      main: "Vous êtes CEO d'une entreprise à 7 chiffres mais prisonnier de votre propre succès ?",
      highlight1: "7 chiffres",
      highlight2: "prisonnier de votre propre succès",
    },
    variant_b: {
      main: "Entrepreneur à 7 chiffres épuisé par 80h/semaine ? Il existe une autre voie.",
      highlight1: "7 chiffres",
      highlight2: "80h/semaine",
    },
  }
  
  return {
    variant,
    text: headlines[variant as keyof typeof headlines]?.main || headlines.control.main,
  }
}

// Get CTA variant
export function getCTAVariant(): {
  variant: string
  text: string
} {
  const variant = getVariant(AB_TESTS.heroCTA)
  
  const ctas = {
    control: "Découvrir votre Score de Liberté Entrepreneuriale",
    variant_a: "Obtenir mon Audit Stratégique Gratuit",
    variant_b: "Commencer ma Transformation Maintenant",
  }
  
  return {
    variant,
    text: ctas[variant as keyof typeof ctas] || ctas.control,
  }
}

// Get urgency variant
export function getUrgencyVariant(): {
  variant: string
  text: string
} {
  const variant = getVariant(AB_TESTS.urgencyMessage)
  
  const messages = {
    control: "7 places restantes pour ce mois",
    variant_a: "Places limitées - agenda presque complet",
    variant_b: "Attention : agenda complet dans 48h",
  }
  
  return {
    variant,
    text: messages[variant as keyof typeof messages] || messages.control,
  }
}

// Get social proof variant
export function getSocialProofVariant(): {
  variant: string
  number: number
} {
  const variant = getVariant(AB_TESTS.socialProofNumber)
  
  const numbers = {
    control: 12,
    variant_a: 17,
    variant_b: 23,
  }
  
  return {
    variant,
    number: numbers[variant as keyof typeof numbers] || numbers.control,
  }
}