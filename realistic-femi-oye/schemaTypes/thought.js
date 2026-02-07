export default {
  name: 'post',
  title: 'Thoughts',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      // Optional: You can make this a selection list
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'A brief overview of the insight (shows on the card)',
    },
    {
      name: 'fullContent',
      title: 'Full Content',
      type: 'text',
      description: 'The main body of the article',
    },
    {
      name: 'date',
      title: 'Date Published',
      type: 'date',
    },
  ],


  preview: {
    select: {
      title: 'title',
      cat: 'category', // We rename these internally for the preview
      date: 'date',
    },
    prepare(selection) {
      const {title, cat, date} = selection
      return {
        title: title,
        subtitle: `${cat || 'No Category'} — ${date || 'No Date'}`, // Shows "HR Strategy — 2025-11-05"
      }
    },
  },
}
