import {defineType} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Galeria',
  type: 'object',
  fields: [
    {
      name: 'images',
      title: 'Imagens',
      type: 'array',
      of: [{type: 'image'}],
    },
  ],
})
