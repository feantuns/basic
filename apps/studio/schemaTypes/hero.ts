import {defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    {name: 'headline', title: 'Título', type: 'string'},
    {name: 'subheadline', title: 'Subtítulo', type: 'text'},
    {name: 'backgroundImage', title: 'Imagem de fundo', type: 'image'},
  ],
})
