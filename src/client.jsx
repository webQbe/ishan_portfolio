/* Create and export configured instance of Sanity client. */
import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: 'jaqk0ajn',     // Copied from 'my-portfolio-website/sanity.config.js'
  dataset: 'production',     
  apiVersion: '2023-05-03',  // Use a specific date for the API version
  useCdn: true,              // `true` for faster, cached responses
});

export default sanityClient;


