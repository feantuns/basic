import {defineType} from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'Call to Action',
  type: 'object',
  fields: [
    {name: 'text', title: 'Texto', type: 'string'},
    {name: 'buttonLabel', title: 'Label do botão', type: 'string'},
    {name: 'buttonUrl', title: 'URL do botão', type: 'url'},
  ],
})
