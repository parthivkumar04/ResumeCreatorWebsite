import React, { useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import { useNavigate } from "react-router-dom";  // Import useNavigate

import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume1";

const sections = {
  basicInfo: "Basic Info",
  workExp: "Work Experience",
  project: "Projects",
  education: "Education",
  achievement: "Achievements",
  summary: "Summary",
  other: "Other",
};

function Template1() {
  const resumeRef = useRef();
  const navigate = useNavigate(); 
  const [activeColor, setActiveColor] = useState("#239ce2");

  const colors = [
    "#00FF00", "#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", 
    "#ed8936", "#f56565", "#38b2ac", "#9f7aea", "#ed64a6",
    "#f6ad55", "#1a202c", "#d53f8c", "#FF0000",
  ];

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

  return (
    <div style={{ padding: "20px" }}>
      {/* Template 1 Heading with margin below it */}
      <h2 style={{ textAlign: "center", color: "darkblue", marginBottom: "30px" }}>
        
      </h2>

      {/* Toolbar with color picker */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        {/* Color Picker */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", border: "1px solid #ccc", borderRadius: "10px", padding: "10px", width: "auto" }}>
          {colors.map((item) => (
            <span
              key={item}
              style={{
                backgroundColor: item,
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                margin: "0 5px",
                cursor: "pointer",
                border: activeColor === item ? "2px solid black" : "none",
              }}
              onClick={() => setActiveColor(item)}
            />
          ))}
        </div>

        {/* Download Button */}
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

      {/* Editor and Resume Components */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1, marginRight: "20px" }}>
          <Editor
            sections={sections}
            information={resumeInformation}
            setInformation={setResumeInformation}
          />
        </div>

        <div style={{ flex: 1 }}>
          <Resume
            ref={resumeRef}
            sections={sections}
            information={resumeInformation}
            activeColor={activeColor}
          />
        </div>
      </div>
    </div>
  );
}

export default Template1;
