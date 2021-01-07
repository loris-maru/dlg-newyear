import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "ggj0zzvg",
  dataset: "production",
  useCdn: true,
});
