export default function removeHTMLTags (str) {
  return str.replace(/<[^>]*>?/gm, '');
};