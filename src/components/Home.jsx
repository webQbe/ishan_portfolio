import React from 'react'
import image from '../img/computer-laptop-macbook-coding.jpg' // Import local image

const Home = () => {
  return (
    <main>

      <img 
        src={image} 
        alt="Macbook" 
        className='absolute object-cover w-full h-full' 

        /* <img> sits in the background

              absolute: 
              Positioned absolutely with respect to the first ancestor.
            
              object-cover: 
              Ensures the image fills the container without distortion (crop if needed).

              w-full h-full: 
              Sets image to full width and height of its parent (<main>). 
        */

      />

      <section 
        className='relative flex justify-center min-h-screen pt-12 lg:pt-64 px-8'

        /* <section> sits above the image

            relative: 
            Ensures the absolutely positioned image is “behind” this element, not overlapping it.

            flex justify-center: 
            Centers content horizontally.

            min-h-screen: 
            Makes the section at least full viewport height.

            pt-12 lg:pt-64: 
            Adds top padding (small on mobile, larger on large screens).

            px-8: 
            Side padding for spacing. 
      */
      >
        <h1 
          className='text-6xl text-green-100 font-bold cursive leading-none lg:leading-snug home-name'

          /* <h1> appears in the center, on top of everything 

            text-6xl            : Big headline font size.

            text-green-100      : Light green text.

            font-bold cursive   : Bold and custom Amatic font (from your CSS).

            leading-none        : Set line-height to none.

            lg:leading-snug     : Adjusts line-height for large screens.

            home-name           : Extra large font size from your CSS.
        */
        >
            Hello! I'm Webcube.
        </h1>
      </section>
    </main>
  )
}

export default Home