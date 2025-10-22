import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import sanityClient from '../client'
import { PortableText } from '@portabletext/react'
import { urlFor } from './ImageUrl' // Generates usable image URLs from Sanity image assets
import { myPortableTextComponents } from './BlockContent' // 	Customizes how Sanity Portable Text renders (e.g. bold, italic, lists, images)

const SinglePost = () => {

  /* State and Router Param Setup */
  // Initialize state to hold fetched post
  const [ singlePost, setSinglePost ] = useState(null)
  // Retrieve the slug from the URL
  const { slug } = useParams() // (e.g., /post/my-post-slug → slug = "my-post-slug")

  /* Fetching Post from Sanity */
  useEffect(() => { // Runs on component mount or when slug changes

    /* Sanity query: Look for a document where slug.current == slug from the URL 

        Fields fetched:
          title, _id, slug, body
          mainImage (with image URL)
          author -> name and author -> image

    */
    sanityClient.fetch(`*[slug.current == "${slug}"]{
        title,
        _id,
        slug,
        mainImage{
          asset -> { _id, url }
        },
        body,
        "name": author -> name,
        "authorImage": author -> image
      }`)
      .then((data) => setSinglePost(data[0])) // Sets the first result to singlePost state
      .catch(console.error)
  }, [slug])

  /* While waiting for data, show a loading message */
  if (!singlePost) return <div className="text-center py-10">Loading...</div>

  /* Render the Post */
  return (
    <main className='bg-gray-200 min-h-screen p-4 sm:p-6 md:p-12'>
      <article className='container shadow-lg mx-auto bg-green-100 rounded-lg overflow-hidden'>
        {/* Post Header */}
        <header className='relative'>
          <div className='absolute h-full w-full flex items-center justify-center p-4 sm:p-6'>
           
            {/* Post title & author info are overlaid in a semi-transparent box */}
            <div className='bg-white bg-opacity-75 rounded p-4 sm:p-6 md:p-12 text-center'>
              <h1 className='cursive text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4'>
                { singlePost.title }
              </h1>
              <div className='flex justify-center items-center text-gray-800'>
                <img 
                  // Author's image is shown using a utility function urlFor(...)
                  src={ urlFor(singlePost.authorImage).url() } 
                  alt={singlePost.name}
                  className='w-10 h-10 rounded-full'
                />
                <p className='cursive pl-2 text-lg sm:text-xl'>
                  { singlePost.name }  
                </p>
              </div>
            </div>

          </div>

          {/* Background image of the post */}
          <img 
            src={ singlePost.mainImage.asset.url } 
            alt={ singlePost.title } 
            className='w-full object-cover rounded-t h-64 sm:h-80 md:h-96'
            style={{ height: '400px' }}
          />

        </header>
        <div className='px-4 sm:px-6 md:px-16 lg:px-48 py-8 sm:py-12 lg:py-20 prose prose-sm sm:prose lg:prose-xl max-w-full'>

          {/* Render Body with PortableText */}
           <PortableText 
              value={singlePost.body} 
              components={myPortableTextComponents} //  Render Sanity’s rich text format
            />

          {/* This container gets more spacing as screen size increases — for a responsive layout.
              Tailwind classes for:
              Paddings (p-, px-, py-):
                Horizontal padding (left + right):
                px-4	    On mobile                             : 16px
                sm:px-6	  On small screens and up (sm ≥ 640px)  → 24px	        
                md:px-16	On medium screens and up (md ≥ 768px) → 64px	        
                lg:px-48	On large screens and up (lg ≥ 1024px) → 192px	  

              Vertical padding (top + bottom):
                py-8	    On mobile                             : 32px
                sm:py-12	On small screens and up               → 48px  
                lg:py-20	On large screens and up               → 80px    


              Typography (prose classes):
              Pre-defined typographic styles to rich text (like markdown or CMS content).

              | Class         | Meaning                                        |
              | ------------- | ---------------------------------------------- |
              | `prose-sm`    | Small text size                                |
              | `sm:prose`    | Base size typography from `sm` screen and up   |
              | `lg:prose-xl` | Extra-large typography from `lg` screen and up |

              These control things like: 
                Font size, 
                Line height, 
                Spacing between elements like h1, p, ul
                Styling of bold, italic, blockquotes, images, etc.

              Layout:
              `max-w-full`:	Maximum width is 100% of the parent.
              This overrides the default prose max width (which usually limits content width to ~65 characters), allowing the container to take up the full width of its parent.

              The custom CSS in App.css centers image blocks & rounds image corners
          */}

        </div>
      </article>
    </main>
  )
}

export default SinglePost