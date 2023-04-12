import React, { useState, useEffect } from "react";

function RandomPhoto() {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    async function fetchPhoto() {
      const response = await fetch("https://source.unsplash.com/random/1280x720");
      const data = await response.json();
      setPhotoUrl(data.urls.regular);
    }
    fetchPhoto();
  }, []);

  return <img src={photoUrl} alt="Random" />;
}

export default RandomPhoto;
