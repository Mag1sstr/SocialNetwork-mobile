import { useEffect } from "react";

export const useMetadata = (title: string, description: string) => {
  useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector(
      'meta[name="description"]',
    ) as HTMLMetaElement | null;

    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.name = "description";
      newMetaDescription.content = description;
      document.head.appendChild(newMetaDescription);
    }
  }, [title, description]);
};
