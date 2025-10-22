import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' // Allows navigation to individual blog post pages
import sanityClient from '../client'    // Configured Sanity API client used to fetch posts

const Post = () => {

  // Store fetched data
  const [ postData, setPostData ] = useState(null)

  // Data Fetching
  useEffect(() => { // Runs once when the component mounts 

    // Fetch all documents of _type == "post" from Sanity CMS

    /* For each post, get:
        title    : The blog post title
        slug     : Used to generate the URL
        mainImage: With asset info and alt text */

    sanityClient.fetch(`*[_type == "post"]{
                        title, 
                        slug, 
                        mainImage{
                            asset-> {
                              _id,
                              url
                            },
                            alt
                        }
                      }`)
                      .then((data) => setPostData(data)) // Set the result into postData
                      .catch(console.error)
  }, [])

  return (
    <main className='bg-green-100 min-h-screen p-12'>
      <section className='container mx-auto'>
        <h1 className='text-5xl flex justify-center cursive'>Blog Posts Page</h1>
        <h2 className='text-lg text-gray-600 flex justify-center mb-12'>Welcome to my page of blog posts</h2>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'> 
        
          {/* Layout & Styling:
              Responsive grid layout: 1 column on small screens / 2 on medium (md) / 3 on large (lg)
              gap-8: Space between grid items  */}

          {/* Render Posts */}
          { postData && // Check if postData is available
              postData.map((post, index) => ( // Loop through each post

                  /* Render each post in an <article> */
                  <article key={ post.slug.current }>
                    {/* Each post links to /post/<slug> using React Router <Link> */}
                    <Link to={ "/post/" + post.slug.current }>

                      {/* Create a styled post preview box */}
                      <span className='flex h-64 relative rounded shadow leading-snug bg-white border-l-8 border-green-400'>
                        
                        {/* Cover the background with 'absolute' and 'object-cover' */}
                        <img src={ post.mainImage.asset.url } 
                          alt={ post.mainImage.alt }
                          className='w-full h-full rounded-r object-cover absolute'
                        />

                        {/* Post title in a red background label at bottom right corner */}
                        <span className='flex relative h-full justify-end items-end pb-4' style={{ paddingLeft: '30%' }}>
                          <h3 className='text-gray-300 text-lg font-bold px-3 py-4 bg-red-700 bg-opacity-75 rounded'>
                            { post.title }
                          </h3>

                        </span> 
                        
                      </span>
                    </Link>
                </article>
              ))
          }

        </div>
      </section>
    </main>
  )
}

export default Post