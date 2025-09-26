import {defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Configurações',
  type: 'document',
  fields: [
    {
      name: 'siteTitle',
      title: 'Título do site',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
    },
    {
      name: 'navigation',
      title: 'Navegação principal',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
})
