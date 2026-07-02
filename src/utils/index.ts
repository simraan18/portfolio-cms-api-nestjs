export const generateSlug = (text: string) => {
  return text.split(' ').join('-').toLowerCase();
};
