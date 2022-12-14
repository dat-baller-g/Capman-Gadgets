import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@sanity/client";

export const client = sanityClient({
    projectId: "dgln3po8",
    dataset: "production",
    apiVersion: "2022-10-07",
    useCdn: true,
    token: process.env.NEXT_PUBLIC_TOKEN
});


const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source); 