import React, { useEffect, useState } from 'react'
import sanityClient from '../client'
import { PortableText } from '@portabletext/react'
import { urlFor } from './ImageUrl'
import { myPortableTextComponents } from './BlockContent'

import codingMonkey from '../img/monkey-doing-coding.jpg'

/* Fetch Author Bio from Sanity */
const About = () => {

  // Store fetched data in React state
  const [author, setAuthor] = useState(null)

  useEffect(() => {
    // Fetch author's name, bio (Portable Text), and author image URL
    sanityClient.fetch(`*[_type == "author"]{
        name,
        bio,
        "authorImage": image.asset -> url
      }`)
      .then((data) => setAuthor(data[0]))
      .catch(console.error)
  },[])

  if (!author) return <div>Loading...</div>

  return (
    <main className='relative'>
      <img src={codingMonkey} alt="Coding Monkey" className='absolute object-cover w-full h-full' />
      <div className='p-10 lg:pt-48 container mx-auto relative'>
        <section className='bg-screen-800 rounded-lg shadow-2xl lg:flex p-20'>
          <img src={urlFor(author.authorImage).url()} className='rounded w-32 h-32 mr-8' alt={author.name} />
          <div className='text-lg flex flex-col justify-center'>
            <h1 className='cursive text-6xl text-green-100 mb-4'>
              Hey there. I'm{" "}
              <span className="text-green-100">{author.name}</span>
            </h1>
            <div className='prose lg:prose-xl text-white'>

              {/* Render rich text in author.bio using PortableText */}
              <PortableText 
                value={author.bio} 
                // Use custom myPortableTextComponents to format bold, italic, lists, images, etc.
                components={myPortableTextComponents} 
              />
              
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default About