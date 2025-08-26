'use client'

import { useState } from 'react'
import { Phone, Mail, Calendar, ArrowRight, CheckCircle } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    revenue: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const benefits = [
    "Audit gratuit de 30 minutes",
    "Plan d'action personnalisé", 
    "ROI garanti sous 90 jours",
    "Accompagnement sur-mesure"
  ]

  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left side - Value Proposition */}
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Prêt à transformer 
              <span className="text-red-600"> votre entreprise ?</span>
            </h2>
            
            <p className="text-xl text-gray-700 mb-8">
              Rejoignez 500+ dirigeants qui ont déjà libéré leur potentiel et multiplié leur rentabilité.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-lg text-gray-800">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div>
                <p className="text-3xl font-bold text-black">500+</p>
                <p className="text-gray-600">Dirigeants accompagnés</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-black">+67%</p>
                <p className="text-gray-600">Marge moyenne</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-black">-50%</p>
                <p className="text-gray-600">Heures travaillées</p>
              </div>
            </div>

            {/* Testimonial quote */}
            <div className="bg-black text-white rounded-2xl p-6">
              <p className="text-lg italic mb-3">
                "Le meilleur investissement que j'ai fait pour mon entreprise. ROI en 3 mois."
              </p>
              <p className="text-sm opacity-80">
                — Laurent M., CEO Tech (8M€ CA)
              </p>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
            <h3 className="text-2xl font-bold mb-6">
              Réservez votre appel stratégique
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                  placeholder="Jean Dupont"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email professionnel *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                  placeholder="jean@entreprise.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Entreprise *
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                  placeholder="Nom de votre entreprise"
                />
              </div>

              {/* Revenue */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chiffre d'affaires annuel *
                </label>
                <select
                  name="revenue"
                  required
                  value={formData.revenue}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                >
                  <option value="">Sélectionnez une tranche</option>
                  <option value="1-3M">1M€ - 3M€</option>
                  <option value="3-5M">3M€ - 5M€</option>
                  <option value="5-10M">5M€ - 10M€</option>
                  <option value="10-20M">10M€ - 20M€</option>
                  <option value="20M+">Plus de 20M€</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Votre principal défi actuel
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors resize-none"
                  placeholder="Décrivez brièvement votre situation et vos objectifs..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all duration-200 text-lg flex items-center justify-center gap-2 group"
              >
                Réserver mon appel gratuit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Privacy notice */}
              <p className="text-xs text-gray-500 text-center">
                En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
                Vos données sont confidentielles et ne seront jamais partagées.
              </p>
            </form>

            {/* Urgency */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-sm text-yellow-800 text-center">
                ⚡ Seulement 3 places disponibles ce mois-ci
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 p-8 bg-gray-900 text-white rounded-3xl">
          <p className="text-2xl font-bold mb-2">
            Préférez-vous un contact direct ?
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-6">
            <a href="tel:+33612345678" className="flex items-center gap-3 text-lg hover:text-yellow-400 transition-colors">
              <Phone className="w-5 h-5" />
              +33 6 12 34 56 78
            </a>
            <a href="mailto:contact@maxpiccinini.com" className="flex items-center gap-3 text-lg hover:text-yellow-400 transition-colors">
              <Mail className="w-5 h-5" />
              contact@maxpiccinini.com
            </a>
            <a href="#" className="flex items-center gap-3 text-lg hover:text-yellow-400 transition-colors">
              <Calendar className="w-5 h-5" />
              Calendly direct
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}