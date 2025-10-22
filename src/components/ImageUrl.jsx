/* Reusable Sanity Image Helper */
import sanityClient from '../client'
import ImageUrlBuilder from '@sanity/image-url' // comes from the official Sanity package

const builder = ImageUrlBuilder(sanityClient)

// Provide function to convert Sanity image objects into usable URLs
export const urlFor = (source) => {
    return builder.image(source)
  }

  /* urlFor() is used to render author or post images in About.jsx, SinglePost.jsx, etc. */