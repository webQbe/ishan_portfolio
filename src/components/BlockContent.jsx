/* Custom Portable Text Renderer */
import { urlFor } from './ImageUrl'

export const myPortableTextComponents = {

  /* Defines how PortableText should render:

        images,
        bold (strong),
        italic (em),
        unordered and ordered lists,
        list items

    This object is passed to <PortableText> as the components prop */

  types: {
    // Render Sanity image blocks
    image: ({ value }) => {
      if (!value?.asset?._ref) { // Checks if value.asset._ref exists (to avoid errors if an image is missing)
        return null
      }
      return (
        <img
          src={urlFor(value).url()} // Get the image URL
          alt={value.alt || ' '}
        />
      )
    },
  },
  block: { /* Block types (e.g. headings, paragraphs, blockquotes) */

    // Apply Tailwind-based heading sizes and margins
    h1: ({ children }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-semibold my-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-medium my-2">{children}</h3>,

    // Standard paragraph spacing
    normal: ({ children }) => <p className="my-2">{children}</p>,

    // Left border, italic style, margin around the blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  list: { /* Lists (bulleted and numbered) */

    // Bulleted list container
    // Wrap children in <ul> with bullet points (list-disc) and some left indent (ml-4)
    bullet: ({ children }) => <ul className="list-disc list-inside ml-4 my-4">{children}</ul>,
    // Wrap children in an <ol> with decimal numbering (list-decimal)
    number: ({ children }) => <ol className="list-decimal list-inside ml-4 my-4">{children}</ol>,
  },
  listItem: {
    /* Wrap each item in <li> and add a small bottom margin (mb-1) */
    // Each <li> in a bulleted list
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    // Each <li> in a numbered list
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
  marks: { /* Inline marks (bold, italic) */

    // Wrap bold text in <strong> with a bold font class
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    // Wraps italic text in <em> with italic styling
    em: ({ children }) => <em className="italic">{children}</em>,
    // Render inline code spans in a monospace, light-gray background
    code: ({ children }) => (
      <code className="bg-gray-800 rounded px-1 py-0.5 font-mono">{children}</code>
    ),
    // Render inline links
    link: ({ value, children }) => {
      const href = value?.href || '#' 
      return (
        <a
          href={href}
          target={value.blank ? '_blank' : undefined} // opening in a new tab if value.blank is true
          rel={value.blank ? 'noopener noreferrer' : undefined}
          className="text-blue-600 bg-gray-100 hover:underline" // blue underline style
        >
          {children}
        </a>
      )
    },
  },
}