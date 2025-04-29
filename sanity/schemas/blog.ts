export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    },
    {
      name: 'short_description',
      type: 'text',
      title: 'Short Description',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              title: 'Alternative Text',
              name: 'alt',
              type: 'string',
            },
            {
              title: 'Caption',
              name: 'caption',
              type: 'string',
            },
            {
              title: 'Image Link (Optional)',
              name: 'imageLink',
              type: 'url',
              validation: (Rule: {optional: () => unknown}) => Rule.optional(),
            },
          ],
        },
        {
          type: 'table',
          title: 'Table',
          options: {
            layout: 'grid',
          },
        },
        {
          name: 'dynamicTable',
          type: 'object',
          title: 'Dynamic Table',
          description:
            'Create and configure a table with customizable rows, columns, and rich text content in each cell',
          fields: [
            {
              name: 'rows',
              type: 'number',
              title: 'Number of Rows',
              description:
                'Set how many rows your table should have (e.g., 3 for a table with 3 rows)',
              initialValue: 3,
              validation: (Rule: {
                required: () => {min: (n: number) => {max: (n: number) => unknown}}
              }) => Rule.required().min(1).max(20),
            },
            {
              name: 'columns',
              type: 'number',
              title: 'Number of Columns',
              description:
                'Set how many columns your table should have (e.g., 3 for a table with 3 columns)',
              initialValue: 3,
              validation: (Rule: {
                required: () => {min: (n: number) => {max: (n: number) => unknown}}
              }) => Rule.required().min(1).max(10),
            },
            {
              name: 'cells',
              title: 'Cells',
              description:
                'Add and edit content for each cell in your table. Each cell can contain formatted text, links, and other rich content',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'row',
                      type: 'number',
                      title: 'Row',
                      description: 'The row number for this cell (starts from 0)',
                      validation: (Rule: {required: () => unknown}) => Rule.required(),
                    },
                    {
                      name: 'column',
                      type: 'number',
                      title: 'Column',
                      description: 'The column number for this cell (starts from 0)',
                      validation: (Rule: {required: () => unknown}) => Rule.required(),
                    },
                    {
                      name: 'content',
                      title: 'Cell Content',
                      description:
                        'The content of this cell. You can add text, format it, add links, and more using the rich text editor',
                      type: 'array',
                      of: [
                        {
                          type: 'block',
                          styles: [
                            {title: 'Normal', value: 'normal'},
                            {title: 'H1', value: 'h1'},
                            {title: 'H2', value: 'h2'},
                            {title: 'H3', value: 'h3'},
                            {title: 'H4', value: 'h4'},
                          ],
                          marks: {
                            decorators: [
                              {title: 'Strong', value: 'strong'},
                              {title: 'Emphasis', value: 'em'},
                              {title: 'Underline', value: 'underline'},
                              {title: 'Strike', value: 'strike-through'},
                              {title: 'Code', value: 'code'},
                            ],
                            annotations: [
                              {
                                title: 'URL',
                                name: 'link',
                                type: 'object',
                                fields: [
                                  {
                                    title: 'URL',
                                    name: 'href',
                                    type: 'url',
                                  },
                                ],
                              },
                            ],
                          },
                        },
                      ],
                    },
                  ],
                  preview: {
                    select: {
                      row: 'row',
                      column: 'column',
                      content: 'content',
                    },
                    prepare({
                      row,
                      column,
                      content,
                    }: {
                      row: number
                      column: number
                      content?: Array<{children?: Array<{text: string}>}>
                    }) {
                      return {
                        title: `Cell (${row}, ${column})`,
                        subtitle:
                          content?.[0]?.children?.map((child) => child.text).join(' ') || '',
                      }
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              rows: 'rows',
              columns: 'columns',
            },
            prepare({rows, columns}: {rows: number; columns: number}) {
              return {
                title: `Table ${rows}×${columns}`,
              }
            },
          },
        },
      ],
    },
  ],
}
