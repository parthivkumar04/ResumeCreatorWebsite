import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";

import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume4";

import styles from "./Body.module.css";

function Template4() {
  const colors = [
    "#1c3d5a", "#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936",
    "#f56565", "#38b2ac", "#9f7aea", "#ed64a6", "#f6ad55", "#1a202c", "#d53f8c", "#FF0000",
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
  const [col2Color, setCol2Color] = useState("#698fc0");
  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: { id: sections.basicInfo, sectionTitle: sections.basicInfo, detail: {} },
    [sections.workExp]: { id: sections.workExp, sectionTitle: sections.workExp, details: [] },
    [sections.project]: { id: sections.project, sectionTitle: sections.project, details: [] },
    [sections.education]: { id: sections.education, sectionTitle: sections.education, details: [] },
    [sections.achievement]: { id: sections.achievement, sectionTitle: sections.achievement, points: [] },
    [sections.summary]: { id: sections.summary, sectionTitle: sections.summary, detail: "" },
    [sections.other]: { id: sections.other, sectionTitle: sections.other, detail: "" },
  });

  const handleColorChange = (e) => {
    setActiveColor(e.target.value);
  };

  const handleCol2ColorChange = (e) => {
    setCol2Color(e.target.value);
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
              id="col2ColorPicker"
              value={col2Color}
              onChange={handleCol2ColorChange}
              className={styles.colorWheel}
            />
          </div>
        </div>

        <div className={styles.toolbarOptions}>
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
          col2Color={col2Color}
        />
      </div>
    </div>
  );
}

export default Template4;
