import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";

import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume5";

import styles from "./Body.module.css";

function Template5() {
  const colors = [

  ];

  const sections = {
    basicInfo: "Basic Info",
    workExp: "Work Experience",
    project: "Projects",
    education: "Education",
    achievement: "Achievements",
    summary: "Summary",
    other: "Other",
  };

  const resumeRef = useRef();
  const [activeColor, setActiveColor] = useState(colors[0]);
  const [leftColColor, setLeftColColor] = useState("#698fc0");
  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: { id: sections.basicInfo, sectionTitle: sections.basicInfo, detail: {} },
    [sections.workExp]: { id: sections.workExp, sectionTitle: sections.workExp, details: [] },
    [sections.project]: { id: sections.project, sectionTitle: sections.project, details: [] },
    [sections.education]: { id: sections.education, sectionTitle: sections.education, details: [] },
    [sections.achievement]: { id: sections.achievement, sectionTitle: sections.achievement, points: [] },
    [sections.summary]: { id: sections.summary, sectionTitle: sections.summary, detail: "" },
    [sections.other]: { id: sections.other, sectionTitle: sections.other, detail: "" },
  });

  const [image, setImage] = useState(null);

  const handleImageClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (e) => {
    setActiveColor(e.target.value);
  };

  const handleLeftColColorChange = (e) => {
    setLeftColColor(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.colorPanel}>
          {colors.map((item) => (
            <span
              key={item}
              style={{ backgroundColor: item }}
              className={`${styles.color} ${activeColor === item ? styles.active : ""}`}
              onClick={() => setActiveColor(item)}
            />
          ))}
          <div className={styles.colorBox}>
            <input
              type="color"
              id="leftColColorPicker"
              value={leftColColor}
              onChange={handleLeftColColorChange}
              className={styles.colorWheel}
            />
          </div>
        </div>

        <div className={styles.toolbarOptions}>
          <button style={{ backgroundColor: "#0968cd" }} onClick={handleImageClick}>Add Image</button>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />

          <ReactToPrint
            trigger={() => <button>Download</button>}
            content={() => resumeRef.current}
          />
        </div>
      </div>

      <div className={styles.main}>
        <Editor
          sections={sections}
          information={resumeInformation}
          setInformation={setResumeInformation}
        />

        <Resume
          ref={resumeRef}
          sections={sections}
          information={resumeInformation}
          activeColor={activeColor}
          leftColColor={leftColColor}
          image={image}  
        />
      </div>
    </div>
  );
}

export default Template5;
