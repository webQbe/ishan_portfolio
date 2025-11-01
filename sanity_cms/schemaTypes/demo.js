import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'demo',
  title: 'Demo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'videoLink',
      title: 'Video link',
      type: 'url',
    }),
    defineField({
      name: 'videoPreview',
      title: 'Video preview',
      type: 'code',
      options: { language: 'html', withFilename: false }
    }),
  ],

  preview: {
    select: {
      title: 'title',
      videoPreview: 'videoPreview',
    },
  },
})
