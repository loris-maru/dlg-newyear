import sanity from "@/sanity";

export const videoQuery = () => {
  const query = `*[_type == 'videoItem']{
    title, 
    videoLink
  }`;
  return sanity.fetch(query);
};
