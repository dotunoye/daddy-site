export default {
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    {
      name: 'caption', // Matches your "caption" key
      title: 'Caption',
      type: 'string',
    },
    {
      name: 'image', // Matches your "image" key
      title: 'Upload Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'date', // Matches your "date" key
      title: 'Event Date',
      type: 'date',
    },
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'image',
      date: ''
    }
  }
}