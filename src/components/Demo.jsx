import React, { useEffect, useState } from 'react'
import sanityClient from '../client'
import DOMPurify from 'dompurify' // To sanitize HTML (strip scripts, dangerous attributes)

const Demo = () => {

  /* State & Effect Hook */
  // Store fetched result in demoData
  const [demoData, setDemoData] = useState(null)

  useEffect(() => { // Fetch all documents of type demo from Sanity when this component mounts
    
    /* Sanity Query */
    // Fetch fields 
    sanityClient.fetch(`*[_type == "demo"]{
           title, 
           videoLink, 
           videoPreview
      }`)
      .then((data) => setDemoData(data))
      .catch(console.error)
  }, [])

  function HtmlBlock({ codeField }) {
    // codeField can be the whole object or a string; support both
    if (!codeField) return null
  
    // If codeField is an object (Sanity code field), use .code
    const rawHtml = typeof codeField === 'string' ? codeField : codeField.code || ''
  
    // Configure DOMPurify to allow iframe tag and the typical iframe attributes
    const clean = DOMPurify.sanitize(rawHtml, {
      ADD_TAGS: ['iframe'],
      ADD_ATTR: [
        'allow',
        'allowfullscreen',
        'frameborder',
        'referrerpolicy',
        'loading',
        'style',
        'sandbox',
        'width',
        'height',
        'title',
        'src'
      ],
    })
    
    // Inject the HTML
    return <div dangerouslySetInnerHTML={{ __html: clean }} />
  }

function YoutubeEmbed({ codeField, className = '' }) {
  if (!codeField) return null
  const html = typeof codeField === 'string' ? codeField : codeField.code || ''

  // Extract src attribute
  const match = html.match(/src=["']([^"']+)["']/i)
  const src = match ? match[1] : null
  if (!src) return null

  // whitelist youtube hosts
  if (!/youtube\.com|youtu\.be|youtube-nocookie\.com/.test(src)) return null

  return (
    <div className={`w-full ${className}`}>
      <div className="aspect-video w-full"> {/* `aspect-video` keeps a 16:9 ratio; <iframe> fills it with w-full h-full. */}
        <iframe
          src={src}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full h-full"
          loading="lazy" /* to improve performance */
        />
      </div>
    </div>
  )
}



  /* Render the UI */
  return (
    <main className='bg-green-100 min-h-screen p-4 sm:p-6 md:p-8 lg:p-12'>
      <section className='container mx-auto'>

        <h1 className='text-4xl sm:text-5xl md:text-6xl flex justify-center cursive mb-4 sm:mb-6'>
          My Project Demos
        </h1>
        <h2 className='text-base sm:text-lg md:text-xl text-gray-600 flex justify-center mb-8'>
          Welcome to my project demos page!
        </h2>
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          { 
            demoData && // Handle missing data safely
              demoData.map((demo, index) => ( // Map over each demo
                <article key={index}
                    className='relative rounded-lg shadow-xl bg-white p-6 sm:p-8 md:p-12 lg:p-16'
                >
                  {/* Demo Title (as a link) */}
                  <h3 className='text-gray-800 font-bold mb-2 hover:text-red-700 text-2xl sm:text-3xl'>
                    <a
                      href={ demo.videoLink || '#'} // Fallback to "#" in case link is missing
                      alt={ demo.title || 'Untitled Demo' } // Fallback to "Untitled Demo" in case title is missing
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      { demo.title || 'Untitled Demo' }
                    </a>
                  </h3>
                  <div className='text-gray-500 space-y-2 text-xs sm:text-sm md:text-base'>
                     { demo.videoPreview && (
                          <div className='my-4 sm:my-6 md:my-8'>
                            <YoutubeEmbed codeField={demo.videoPreview} />
                          </div>)
                      }
                  </div>
                </article>
              ))
          }
        </section>
      </section>
    </main>
  )
}

export default Demo