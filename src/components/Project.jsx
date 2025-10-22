import React, { useEffect, useState } from 'react'
import sanityClient from '../client'

const Project = () => {

  /* State & Effect Hook */
  // Store fetched result in projectData
  const [projectData, setProjectData] = useState(null)

  useEffect(() => { // Fetch all documents of type project from Sanity when this component mounts
    
    /* Sanity Query */
    // Fetch fields like title, date, place, description, projectType, link, and tags
    sanityClient.fetch(`*[_type == "project"]{
          title,
          date,
          place,
          description,
          projectType,
          link,
          tags
      }`)
      .then((data) => setProjectData(data))
      .catch(console.error)
  }, [])

  /* Render the UI */
  return (
    <main className='bg-green-100 min-h-screen p-4 sm:p-6 md:p-8 lg:p-12'>

      {/* Container Padding:
            The outer <main> uses p-4 sm:p-6 md:p-8 lg:p-12, 
            so content isn’t flush against the viewport.
      */}

      <section className='container mx-auto'>

        <h1 className='text-4xl sm:text-5xl md:text-6xl flex justify-center cursive mb-4 sm:mb-6'>
          My Projects
        </h1>
        <h2 className='text-base sm:text-lg md:text-xl text-gray-600 flex justify-center mb-8'>
          Welcome to my projects page!
        </h2>

        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          
          {/* Grid Container :
                grid-cols-1 (default on small screens)
                switches to grid-cols-2 at md (≥768px)
                switches to grid-cols-3 at lg (≥1024px)
                use smaller gap-6 on mobile, then md:gap-8 on medium+ screens.
          */}

          { 
            projectData && // Handle missing data safely
              projectData.map((project, index) => ( // Map over each project
                <article key={index}
                    className='relative rounded-lg shadow-xl bg-white p-6 sm:p-8 md:p-12 lg:p-16'
                >
                  {/* Responsive Padding on <article> :
                        p-6 on mobile (≤640px)
                        bumps up to sm:p-8 (≥640px)
                        then md:p-12 (≥768px)
                        then back to lg:p-16 (≥1024px)  
                  */}

                  {/* Project Title (as a link) */}
                  <h3 className='text-gray-800 font-bold mb-2 hover:text-red-700 text-2xl sm:text-3xl'>
                    
                    {/* Responsive Text Sizes in Heading (h3): 
                          text-2xl by default (on mobile), 
                          then sm:text-3xl on ≥640px.
                    */}
                  
                    <a
                      href={ project.link || '#'} // // Fallback to "#" in case link is missing
                      alt={ project.title || 'Untitled Project' } // Fallback to "Untitled Project" in case title is missing
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      { project.title || 'Untitled Project' }
                    </a>
                  </h3>

                  
                  <div className='text-gray-500 space-y-2 text-xs sm:text-sm md:text-base'>

                    {/* Responsive Text Sizes in Meta text container: 
                          text-xs on mobile, 
                          then sm:text-sm, 
                          then md:text-base. */}

                    {/* Finished Date */}
                    { project.date && (
                      <p>
                        <strong className='font-bold'>Finished on:</strong>{' '}
                        {/* Formatted Date */}
                        {new Date(project.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    )}

                    {/* Company / Place */}
                    { project.place && (
                      <p>
                        <strong className='font-bold'>Company:</strong>{' '}
                        { project.place }
                      </p>
                    )}

                    {/* Project Type */}
                    { project.projectType && (
                      <p>
                        <strong className='font-bold'>Type:</strong>{' '}
                        { project.projectType }
                      </p>
                    )}

                    {/* Description */}
                    { project.description && (
                      <p className='my-4 sm:my-6 md:my-8 text-sm sm:text-base md:text-lg leading-relaxed'>
                        
                        { project.description }

                        {/* Responsive Text Sizes & Spacing in Description paragraph:
                        
                              Paragraph:
                                text-sm (mobile) to sm:text-base to md:text-lg;  

                              Margins/Padding: 
                                my-4 (mobile) to sm:my-6 to md:my-8
                        */}
                      </p>
                    )}

                    {/* Link to the project (with an emoji pointer) */}
                    { project.link && (
                      <a
                        href={ project.link }
                        rel='noopener noreferrer'
                        target='_blank'
                        className='text-red-500 font-bold hover:underline 
                                  hover:text-red-400 text-sm sm:text-base'
                      >
                        View The Project{' '}
                        <span role='img' aria-label='right pointer'>
                          👉
                        </span>
                      </a>
                    )}

                    {/* Render Tags */}
                    <div className="mt-4">
                      { project.tags?.map((tag, i) => (
                        <span key={i} className="inline-block bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm mr-2">
                          #{ tag }
                        </span>
                      ))}

                    </div>
                  </div>
                </article>
              ))
          }
        </section>
      </section>
    </main>
  )
}

export default Project