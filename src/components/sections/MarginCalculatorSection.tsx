'use client'

import { useState } from 'react'
import { Calculator, TrendingUp, Euro } from 'lucide-react'

export default function MarginCalculatorSection() {
  const [revenue, setRevenue] = useState(5000000)
  const [currentMargin, setCurrentMargin] = useState(8)

  // Calculs
  const currentProfit = (revenue * currentMargin) / 100
  const profit5Percent = (revenue * (currentMargin + 5)) / 100
  const profit10Percent = (revenue * (currentMargin + 10)) / 100
  
  const gain5Percent = profit5Percent - currentProfit
  const gain10Percent = profit10Percent - currentProfit

  // Formatage des nombres
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(num)
  }

  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Et si votre marge augmentait de <span className="text-red-600">5%</span> ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez l'impact réel d'une optimisation de marge sur votre rentabilité.
            Spoiler : c'est plus que vous ne pensez.
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Inputs */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Votre chiffre d'affaires annuel
              </label>
              <div className="relative">
                <Euro className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full pl-12 pr-4 py-4 text-2xl font-semibold border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                  step="100000"
                  min="0"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Entre 1M€ et 20M€</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Votre marge actuelle
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">%</span>
                <input
                  type="number"
                  value={currentMargin}
                  onChange={(e) => setCurrentMargin(Number(e.target.value))}
                  className="w-full pl-12 pr-4 py-4 text-2xl font-semibold border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                  step="1"
                  min="0"
                  max="100"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Moyenne du secteur : 8-12%</p>
            </div>
          </div>

          {/* Results */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Current */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-600">Marge actuelle</h3>
                <span className="text-2xl font-bold">{currentMargin}%</span>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-gray-900">
                  {formatNumber(currentProfit)}
                </p>
                <p className="text-sm text-gray-500">de profit annuel</p>
              </div>
            </div>

            {/* +5% */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-blue-700">Avec +5% de marge</h3>
                <span className="text-2xl font-bold text-blue-700">{currentMargin + 5}%</span>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-blue-900">
                  {formatNumber(profit5Percent)}
                </p>
                <p className="text-sm text-blue-600">de profit annuel</p>
                <div className="pt-3 mt-3 border-t border-blue-200">
                  <p className="text-lg font-bold text-green-600">
                    +{formatNumber(gain5Percent)}
                  </p>
                  <p className="text-sm text-gray-600">de gain supplémentaire</p>
                </div>
              </div>
            </div>

            {/* +10% */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-red-700">Avec +10% de marge</h3>
                <span className="text-2xl font-bold text-red-700">{currentMargin + 10}%</span>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-red-900">
                  {formatNumber(profit10Percent)}
                </p>
                <p className="text-sm text-red-600">de profit annuel</p>
                <div className="pt-3 mt-3 border-t border-red-200">
                  <p className="text-lg font-bold text-green-600">
                    +{formatNumber(gain10Percent)}
                  </p>
                  <p className="text-sm text-gray-600">de gain supplémentaire</p>
                </div>
              </div>
            </div>
          </div>

          {/* Insight Box */}
          <div className="mt-12 bg-black text-white rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-3">
                  Le secret que 95% des dirigeants ignorent
                </h3>
                <p className="text-lg opacity-90 mb-4">
                  Augmenter votre marge de 5% ne demande PAS de travailler 5% plus dur.
                  Ça demande de travailler différemment.
                </p>
                <p className="text-lg opacity-90">
                  Avec la bonne stratégie, cette augmentation représente{' '}
                  <span className="font-bold text-yellow-400">
                    {formatNumber(gain5Percent)}
                  </span>{' '}
                  de profit supplémentaire. Imaginez avec 10%...
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              500+ dirigeants ont déjà augmenté leur marge de 10 à 25% en moyenne
            </p>
            <button className="px-10 py-5 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors duration-200 text-lg">
              Découvrir comment augmenter votre marge
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}