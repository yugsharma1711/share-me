// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'UserName',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'string',
    },
      {
          name: 'about',
          title: "About",
          type: 'string',
      },
    {
      name: 'facebook',
      title : 'Facebook Url',
      type : 'string',
    },
    {
      name: 'instagram',
      title : 'Instagram Url',
      type : 'string',
    },
    {
      name: 'twitter',
      title : 'Twitter Url',
      type : 'string',
    },
    {
      name: 'email',
      title : 'email',
      type : 'string',
    },
  ],
};
