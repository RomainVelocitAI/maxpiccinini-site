'use client'

import { useState, useEffect } from 'react'
import { Container } from '@/components/atoms/Container'
import { Button } from '@/components/atoms/Button'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-premium'
          : 'bg-transparent'
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-serif font-bold text-primary-600">
              Max Piccinini
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('methode')}
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors"
            >
              Méthode
            </button>
            <button
              onClick={() => scrollToSection('resultats')}
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors"
            >
              Résultats
            </button>
            <Button
              onClick={() => scrollToSection('audit')}
              variant="premium"
              size="md"
            >
              Diagnostic Gratuit →
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-primary-600"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('methode')}
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors text-left"
              >
                Méthode
              </button>
              <button
                onClick={() => scrollToSection('resultats')}
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors text-left"
              >
                Résultats
              </button>
              <Button
                onClick={() => scrollToSection('audit')}
                variant="premium"
                size="md"
                className="w-full"
              >
                Diagnostic Gratuit →
              </Button>
            </div>
          </div>
        )}
      </Container>
    </nav>
  )
}