'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Laurent Martel',
    title: 'CEO Tech - 8M€ CA',
    company: 'TechVision',
    image: '/testimonials/110522953_l.jpg',
    avatar: '/testimonials/110522953_l.jpg',
    quote: "En 18 mois, j'ai triplé ma marge et divisé par 2 mon temps de travail. Je dirige enfin au lieu de subir.",
    metric: '+67%',
    metricLabel: 'Marge nette',
    videoUrl: 'https://player.vimeo.com/video/913259360'
  },
  {
    id: 2,
    name: 'Sophie Dubois',
    title: 'Fondatrice SaaS - 5M€ CA',
    company: 'DataFlow',
    image: '/testimonials/57928945_l.jpg',
    avatar: '/testimonials/57928945_l.jpg',
    quote: "J'ai enfin une entreprise qui tourne sans moi. 3 semaines de vacances cet été, zéro appel.",
    metric: '-65%',
    metricLabel: 'Heures travaillées',
    videoUrl: 'https://player.vimeo.com/video/906539696'
  },
  {
    id: 3,
    name: 'Marc Rodriguez',
    title: 'Dirigeant Industrie - 12M€ CA',
    company: 'IndustPro',
    image: '/testimonials/64307391_l.jpg',
    avatar: '/testimonials/64307391_l.jpg',
    quote: "Ma valorisation a été multipliée par 3. Mon entreprise vaut maintenant 36M€ au lieu de 12M€.",
    metric: 'x3',
    metricLabel: 'Valorisation',
    videoUrl: 'https://player.vimeo.com/video/716858570'
  },
  {
    id: 4,
    name: 'Isabelle Chen',
    title: 'CEO E-commerce - 15M€ CA',
    company: 'LuxeStyle',
    image: '/testimonials/110522953_l.jpg',
    avatar: '/testimonials/110522953_l.jpg',
    quote: "De 70h à 30h par semaine. J'ai retrouvé ma famille et mon entreprise n'a jamais été aussi performante.",
    metric: '25%',
    metricLabel: 'Marge EBITDA',
    videoUrl: 'https://player.vimeo.com/video/853344505'
  },
  {
    id: 5,
    name: 'Thomas Bernard',
    title: 'Président Services - 10M€ CA',
    company: 'ConsultPro',
    image: '/testimonials/57928945_l.jpg',
    avatar: '/testimonials/57928945_l.jpg',
    quote: "Mes managers sont devenus des leaders. Plus une seule décision opérationnelle ne remonte à moi.",
    metric: '+85%',
    metricLabel: 'Productivité équipe',
    videoUrl: 'https://player.vimeo.com/video/744481633'
  }
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  
  const current = testimonials[currentIndex]

  const handleAvatarClick = (index: number) => {
    setCurrentIndex(index)
    setShowVideo(false)
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image - No Overlay */}
      <div className="absolute inset-0">
        <Image
          key={current.id}
          src={current.image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          
          {!showVideo ? (
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Left side - Text Content directly on image */}
              <div className="flex flex-col justify-center py-12 lg:py-20">
                {/* Quote Icon */}
                <Quote className="w-16 h-16 text-white mb-8 drop-shadow-lg" />
                
                {/* Metric */}
                <div className="mb-8">
                  <div className="text-6xl lg:text-8xl font-bold text-white mb-2 drop-shadow-2xl">
                    {current.metric}
                  </div>
                  <p className="text-xl text-white/90 drop-shadow-lg">
                    {current.metricLabel}
                  </p>
                </div>
                
                {/* Testimonial Text */}
                <blockquote className="text-2xl lg:text-3xl text-white mb-8 leading-relaxed drop-shadow-lg">
                  "{current.quote}"
                </blockquote>

                {/* Client Info */}
                <div className="mb-8">
                  <p className="text-xl font-bold text-white drop-shadow-lg">{current.name}</p>
                  <p className="text-lg text-white/90 drop-shadow-lg">{current.title}</p>
                  <p className="text-white/80 drop-shadow-lg">{current.company}</p>
                </div>

                {/* Video Button */}
                <button
                  onClick={() => setShowVideo(true)}
                  className="group flex items-center gap-4 px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300 w-fit border border-white/30"
                >
                  <Play className="w-6 h-6" />
                  <span className="text-lg font-medium">Voir le témoignage vidéo</span>
                </button>

                {/* Avatar Circles */}
                <div className="mt-12 flex items-center gap-4">
                  <p className="text-white/80 text-sm drop-shadow">Autres témoignages :</p>
                  <div className="flex -space-x-3">
                    {testimonials.map((testimonial, index) => (
                      <button
                        key={testimonial.id}
                        onClick={() => handleAvatarClick(index)}
                        className={`relative w-14 h-14 rounded-full overflow-hidden border-3 transition-all duration-300 hover:scale-110 hover:z-10 ${
                          index === currentIndex 
                            ? 'border-white ring-2 ring-white ring-offset-2 ring-offset-transparent z-10 scale-110' 
                            : 'border-white/60 hover:border-white'
                        }`}
                        aria-label={`Témoignage de ${testimonial.name}`}
                      >
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side - Empty space */}
              <div />
            </div>
          ) : (
            // Video Player - Centered
            <div className="flex items-center justify-center min-h-screen bg-black/90 p-8">
              <div className="w-full max-w-5xl">
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                  <iframe
                    src={`${current.videoUrl}?autoplay=1`}
                    className="w-full h-full"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                </div>
                <button
                  onClick={() => setShowVideo(false)}
                  className="mt-6 px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-all mx-auto block"
                >
                  Fermer la vidéo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}