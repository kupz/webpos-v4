import React, { useEffect, useState } from "react";

const ImageUploader = (props) => {
  const [imageSrc, setImageSrc] = useState(props.imgsrc); // Local state for this instance
  const [placeHolder, setPlaceHolder] = useState(false);

  useEffect(() => {
    // Update imageSrc when props.imgsrc changes
    setImageSrc(props.imgsrc);
  }, [props.imgsrc]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setImageSrc(event.target.result);
      props.setImageData(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    setPlaceHolder(true);
  };

  return (
    <div
      style={{
        width: "150px",
        height: "150px",
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        cursor: "pointer",
        border: "1px solid black",
        margin: "auto auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => {
        document.getElementById("fileInput").click();
      }}
    >
      <h5
        style={{
          textAlign: "center",
          margin: "auto 20px",
          display: placeHolder ? "none" : "flex",
        }}
      >
        Click to upload image
      </h5>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;
