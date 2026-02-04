import { useEffect, useRef } from "react";
import { Viewer } from "mapillary-js";
import "mapillary-js/dist/mapillary.css";


export default function StreetView({ imageId }) {
  const ref = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!imageId) return;

    if (viewerRef.current) viewerRef.current.remove();

    viewerRef.current = new Viewer({
      accessToken: import.meta.env.VITE_MAPILLARY_TOKEN,
      container: ref.current,
      imageId: imageId,
    });

    return () => viewerRef.current?.remove();
  }, [imageId]);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
}
