import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'techStacks',
      title: 'Tech stack badges',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  defineField({
      name: 'demoLink',
      title: 'Demo link',
      type: 'url',
    }),
  defineField({
      name: 'gitHubLink',
      title: 'GitHub link',
      type: 'url',
    }),
  ],
})
