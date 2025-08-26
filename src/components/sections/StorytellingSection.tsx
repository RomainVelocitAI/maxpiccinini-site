'use client'

export default function StorytellingSection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Contenu texte à gauche */}
          <div className="lg:pr-12">
            <p className="text-red-600 font-semibold text-sm uppercase tracking-wider mb-4">
              L'expertise de 500+ accompagnements
            </p>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              500 dirigeants. 15 ans. 
              <span className="text-red-600"> Toujours la même erreur.</span>
            </h2>

            <div className="prose prose-lg text-gray-700 space-y-6">
              <p className="text-xl font-medium text-black">
                Chaque dirigeant que je rencontre pense que son cas est unique.
              </p>
              
              <p className="text-xl">
                <span className="font-bold">Spoiler : il ne l'est pas.</span>
              </p>

              <p>
                Après 500+ accompagnements, je peux prédire avec 90% de précision :
              </p>

              <ul className="space-y-3 my-6">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 text-xl">→</span>
                  <span>À combien d'heures vous travaillez <strong>(65-75h)</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 text-xl">→</span>
                  <span>Votre marge <strong>(8-12%)</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 text-xl">→</span>
                  <span>Combien de décisions remontent à vous par jour <strong>(10-20)</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 text-xl">→</span>
                  <span>Votre dernière vraie semaine de vacances <strong>(il y a 2 ans)</strong></span>
                </li>
              </ul>

              <p className="text-lg">
                <strong>Comment je sais ?</strong>
              </p>

              <p className="text-lg">
                Parce que TOUS les entrepreneurs brillants font la même erreur fatale : 
                <span className="font-bold text-black"> ils construisent une entreprise qui a besoin d'eux pour fonctionner.</span>
              </p>

              <div className="bg-black text-white p-6 rounded-lg my-8">
                <p className="text-xl font-bold">
                  Résultat : Plus l'entreprise grandit, plus ils rétrécissent.
                </p>
              </div>

              <p className="text-lg">
                La bonne nouvelle ? Ce n'est pas une fatalité. C'est un pattern. 
                <span className="font-bold"> Et un pattern, ça se brise.</span>
              </p>

              <p className="text-lg">
                J'ai vu des centaines de dirigeants passer de "homme-orchestre" à "chef d'orchestre". 
                De 70h à 30h. De 8% à 25% de marge.
              </p>

              <p className="text-xl font-bold text-black mt-8">
                La seule question : combien de temps allez-vous attendre ?
              </p>
            </div>

            <button className="mt-10 px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-colors duration-200 text-lg flex items-center gap-2 group">
              Découvrez à quelle phase vous êtes
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Images empilées à droite */}
          <div className="relative h-[600px] lg:h-[700px]">
            {/* Image 1 - Arrière */}
            <div className="absolute top-0 right-0 w-72 h-96 transform rotate-[-5deg] translate-x-0">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop"
                alt="Max Piccinini - Expertise dirigeant"
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </div>
            
            {/* Image 2 - Milieu */}
            <div className="absolute top-20 right-12 w-72 h-96 transform rotate-[2deg]">
              <img 
                src="https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?w=600&h=800&fit=crop"
                alt="Max Piccinini - Coach business"
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </div>
            
            {/* Image 3 - Devant */}
            <div className="absolute top-40 right-24 w-72 h-96 transform rotate-[-3deg]">
              <img 
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=800&fit=crop"
                alt="Max Piccinini - Formation dirigeant"
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </div>

            {/* Badge flottant */}
            <div className="absolute bottom-10 left-0 bg-red-600 text-white px-6 py-4 rounded-full shadow-xl transform rotate-[5deg]">
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm">dirigeants accompagnés</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}