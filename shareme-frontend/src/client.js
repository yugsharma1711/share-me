import sanityClient from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';
export const client = sanityClient({
    projectId : 'tsng88gz',
    dataset : 'production',
    apiVersion : '2021-11-16',
    useCdn : true,
    token : 'skU8RSZhbGjo4vY5QSMteHeNCkbaBxHobQm4XinrItkPVKWWdOGjNpOhMSdZAtkztOZMAZTMfDfmy20wFUaIdQwWalf8gqVBeEfqMEsuWaMBZ8Odj2FqoWnUC0O99wCm8YsGJTUyZxV34aBK7F49FIfuIp1ml3RN1yQezOil47ujJi8qkBq1',
}); 

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => {
    builder.Image(source);
}
