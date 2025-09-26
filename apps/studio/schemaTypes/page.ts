import {defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Página',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
    },
    {
      name: 'modules',
      title: 'Seções',
      type: 'array',
      of: [{type: 'hero'}, {type: 'gallery'}, {type: 'ctaSection'}],
    },
  ],
})
