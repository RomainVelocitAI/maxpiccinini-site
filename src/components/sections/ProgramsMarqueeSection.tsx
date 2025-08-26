'use client'

import { Play, ArrowRight } from 'lucide-react'

const programs = [
  {
    id: '3m',
    title: '3M - MaxMasterMind',
    subtitle: 'Pour dirigeants 1-20M€',
    description: 'Libérez-vous de l\'opérationnel et décuplez votre rentabilité',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop',
    video: 'https://player.vimeo.com/video/913259360',
    color: 'from-purple-600 to-purple-700'
  },
  {
    id: 'mentormax',
    title: 'MentorMax',
    subtitle: 'Dépassez 100K€ de CA',
    description: 'Rejoignez le Club des 6 chiffres rapidement',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    video: 'https://player.vimeo.com/video/906539696',
    color: 'from-blue-600 to-blue-700'
  },
  {
    id: 'excellence',
    title: 'Excellence Academy',
    subtitle: 'Devenez coach d\'excellence',
    description: 'Créez une carrière lucrative pleine de sens',
    image: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=600&fit=crop',
    video: 'https://player.vimeo.com/video/716858570',
    color: 'from-emerald-600 to-emerald-700'
  },
  {
    id: 'destination',
    title: 'Destination Réussite',
    subtitle: 'Faites voler vos limites',
    description: 'Boostez vos performances et créez la vie que vous méritez',
    image: 'https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=800&h=600&fit=crop',
    video: 'https://player.vimeo.com/video/853344505',
    color: 'from-orange-600 to-orange-700'
  },
  {
    id: 'businessmax',
    title: 'BusinessMax',
    subtitle: 'Maximisez votre profitabilité',
    description: 'Devenez le leader de votre marché',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    video: 'https://player.vimeo.com/video/744481633',
    color: 'from-red-600 to-red-700'
  },
  {
    id: 'financemax',
    title: 'FinanceMax',
    subtitle: 'Créez plus d\'argent',
    description: 'Investissez intelligemment et accroissez votre patrimoine',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop',
    video: 'https://player.vimeo.com/video/896908879',
    color: 'from-yellow-600 to-yellow-700'
  },
  {
    id: 'lifemax',
    title: 'LifeMax',
    subtitle: 'Rallumez la flamme',
    description: 'Créez le bonheur et la sensualité dans votre couple',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop',
    video: 'https://player.vimeo.com/video/372624503',
    color: 'from-pink-600 to-pink-700'
  }
]

export default function ProgramsMarqueeSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header minimaliste */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Programmes qui transforment
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez la méthode qui a permis à 500+ dirigeants de se libérer
          </p>
        </div>
      </div>

      {/* Marquee Container - Full Width */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        
        {/* Marquee Wrapper */}
        <div className="flex overflow-hidden">
          {/* First set */}
          <div className="flex animate-marquee whitespace-nowrap">
            {programs.map((program) => (
              <div
                key={`${program.id}-1`}
                className="mx-3 inline-block"
              >
                <div className="w-[380px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden group">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-60`} />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-black ml-1" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {program.subtitle}
                    </p>
                    <p className="text-gray-700 mb-6">
                      {program.description}
                    </p>

                    {/* CTA */}
                    <button className="w-full py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center gap-2 group/btn">
                      Découvrir
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Second set (duplicate for seamless loop) */}
          <div className="flex animate-marquee whitespace-nowrap" aria-hidden="true">
            {programs.map((program) => (
              <div
                key={`${program.id}-2`}
                className="mx-3 inline-block"
              >
                <div className="w-[380px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden group">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-60`} />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-black ml-1" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {program.subtitle}
                    </p>
                    <p className="text-gray-700 mb-6">
                      {program.description}
                    </p>

                    {/* CTA */}
                    <button className="w-full py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center gap-2 group/btn">
                      Découvrir
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16 px-6">
        <p className="text-gray-600 mb-4">
          Rejoignez 160,000+ entrepreneurs dans 25+ pays
        </p>
        <button className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-colors duration-200 text-lg">
          Réserver un appel stratégique
        </button>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }

        .animate-marquee {
          animation: marquee 35s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}