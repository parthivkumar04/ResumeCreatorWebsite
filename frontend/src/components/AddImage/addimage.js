import React, { useState } from "react";

function AddImage({ onImageUpload }) {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader(); // Create FileReader to read the image
      reader.onloadend = () => {
        setImage(reader.result); // Store the image data
      };
      reader.readAsDataURL(file); // Convert file to base64 string
    }
  };

  const handleInsertClick = () => {
    if (image) {
      onImageUpload(image); // Trigger onImageUpload to pass the image to the parent
    }
  };

  return (
    <div>
      <h3>Upload an Image</h3>
      <input type="file" accept="image/*" onChange={handleImageChange} /> {/* File input */}
      {image && (
        <button onClick={handleInsertClick} style={{ marginTop: 10 }}>
          Insert
        </button>
      )}
    </div>
  );
}

export default AddImage;
