import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { useNavigate } from "react-router-dom";  


import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";

import styles from "./Body.module.css";

function Body() {
  const navigate = useNavigate(); 
  const colors = [
    "#00FF00",
    "#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936", 
    "#f56565", "#38b2ac", "#9f7aea", "#ed64a6", "#f6ad55",
    "#1a202c", "#d53f8c", "#FF0000", 
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
  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.achievement]: {
      id: sections.achievement,
      sectionTitle: sections.achievement,
      points: [],
    },
    [sections.summary]: {
      id: sections.summary,
      sectionTitle: sections.summary,
      detail: "",
    },
    [sections.other]: {
      id: sections.other,
      sectionTitle: sections.other,
      detail: "",
    },
  });

  // Navigate to Redirect1.js on Templates button click
  

  return (
    <div className={styles.container}><span
    style={{ fontFamily: "Montserrat, sans-serif", 
       fontSize: "3rem", color: " rgb(28, 146, 185)",  display: "block",  
       textAlign: "center",  margin: "20px 0" ,marginBottom:"60px",lineHeight:"0.8" }}
    >Create A Resume With Our Live Builder<br></br><span2
    style={{fontSize:"1.7rem",color:" rgb(2, 199, 243)"}}
    >Try Out Our Different Templates</span2></span>
      <div className={styles.toolbar}>
        <div className={styles.colorPanel}>
          {colors.map((item) => (
            <span
              key={item}
              style={{ backgroundColor: item }}
              className={`${styles.color} ${
                activeColor === item ? styles.active : ""
              }`}
              onClick={() => setActiveColor(item)}
            />
          ))}
        </div>

        <div className={styles.toolbarOptions}>
          

          <ReactToPrint
            trigger={() => {
              return (
                <button>
                  Download
                </button>
              );
            }}
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
        />
      </div>
    </div>
  );
}

export default Body;
