import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom"; 

import template1 from "../../assets/template1.jpg"; // Example template images
import template2 from "../../assets/template2.jpg";
import template3 from "../../assets/template3.jpg";
import template4 from "../../assets/template4.jpg";
import template5 from "../../assets/bord3.jpg";

function Redirect1() {
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    
    slidesToShow: 3,
    slidesToScroll: 1,
    
    arrows: true,
    beforeChange: () => setDragging(true),
    afterChange: () => setDragging(false),
  };

  const templates = [
    { id: 1, img: template1, name: "Template 1", route: "/template1" },
    { id: 2, img: template5, name: "Template 5", route: "/template5" },
    { id: 3, img: template4, name: "Template 4", route: "/template4" },
    { id: 4, img: template3, name: "Template 3", route: "/template3" },
    { id: 5, img: template2, name: "Template 2", route: "/template2" }
  ];

  const handleTemplateClick = (route) => {
    if (!dragging) {
      navigate(route); // Navigate to the respective route
    }
  };

  return (
    <div style={{ padding: "10px", textAlign: "center" }}>
      <h2 style={{ color: "#17588a",fontFamily:"Montserrat, sans-serif",fontSize:"45px"}}>CHOOSE YOUR TEMPLATE</h2>

      <div style={{ cursor: 'grab' }}>
        <Slider
          {...settings}
          style={{
            marginBottom: "30px", 
            marginTop: "0px", 
            width: "100%", 
            maxWidth: "1170px", 
            marginLeft: "auto", 
            marginRight: "auto" 
            
          }}
        >
          {templates.map((template) => (
            <div
              key={template.id}
              style={{
                position: "relative",
                width: "350px", 
                height: "600px",
                
                display: "flex",
                flexDirection: "column", 
                justifyContent: "flex-start",
                alignItems: "center", 
                boxSizing: "border-box",
                padding: "0px", 
              }}
            >
              <div 
                style={{
                  width: "100%",
                  height: "58px", 
                }}
                onMouseDown={(e) => e.preventDefault()}
              />
              <img
                src={template.img}
                alt={template.name}
                style={{
                  width: "350px", 
                  height: "500px", 
                  borderRadius: "0px",
                  padding:"1px"
                  
                }}
                onClick={() => handleTemplateClick(template.route)}
              />
              <div 
                style={{
                  width: "100%",
                  height: "50px", 
                }}
                onMouseDown={(e) => e.preventDefault()} 
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Redirect1;
