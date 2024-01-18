import * as p5 from "p5";
import React, { useRef, useEffect, useState } from "react";
import c1 from "./img/corner.png";
import b1 from "./img/bordernew.png";
import t1 from "./img/t1.png";
import t2 from "./img/t2.png";
import b2 from "./img/b2.png";
import c2 from "./img/c2.png";
import t3 from "./img/t3.png";
import c3 from "./img/c3.png";
import b3 from "./img/b3.png";
import t4 from "./img/t4.png";
import b4 from "./img/b4.png";
import c4 from "./img/c4.png";
import main from "./img/main.png";
import t5 from "./img/t5.png";

const ImageFrameSelector = () => {
  const canvasRef = useRef(null);
  const [borderDraw, setBorderDraw] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  let myp5;
 
  const frames = [
    { thumbnails: t2, borderImage: b1, cornerImage: c1, name: "1" },
    { thumbnails: t1, borderImage: b2, cornerImage: c2, name: "2" },
    { thumbnails: t3, borderImage: b3, cornerImage: c3, name: "3" },
    { thumbnails: t4, borderImage: b4, cornerImage: c4, name: "4" },
    { thumbnails: t5, borderImage: "", cornerImage: "", name: "no frame" },
  ];

  const borderImages = [b1];
  const cornerImages = [c1];
  const [selectedFrame, setSelectedFrame] = useState({
    borderImage: borderImages[0],
    cornerImage: cornerImages[0],
  });
 

  useEffect(() => {
    

    const sketch = (p) => {
      let img;
      let borderImage;
      let flowerImage;

      p.preload = () => {
        if (selectedFrame.cornerImage) {
          img = p.loadImage(selectedFrame.cornerImage);
        }
        if (selectedFrame.borderImage) {
          borderImage = p.loadImage(selectedFrame.borderImage);
        }
        flowerImage = p.loadImage(main);
      };

      p.setup = () => {
        p.createCanvas(500, 500);
        p.imageMode(p.CENTER);
        p.angleMode(p.DEGREES);
        setCanvasReady(true);
      };

      const drawImageWithBorder = () => {
        let length=90;
        if (selectedFrame.cornerImage) {
          p.push();
          p.translate(40, 40);
          p.rotate(90);
          p.image(img, 0, 0, length, length);
          p.pop();

          p.push();
          p.translate(100, 40);
          p.scale(-1, 1);
          p.rotate(180);
          p.image(img, -62, 0, length, length);
          p.pop();

          p.push();
          p.translate(400, 40);
          p.rotate(180);
          p.image(img, -60, 0, length, length);
          p.pop();

          p.push();
          p.translate(460, 40);
          p.scale(-1, 1);
          p.rotate(90);
          p.image(img, 0, 0, length, length);
          p.pop();

          p.push();
          p.translate(460, 460);
          p.rotate(270);
          p.image(img, 0, 0, length, length);
          p.pop();

          p.push();
          p.translate(460, 460);
          p.scale(-1, 1);
          p.rotate(0);
          p.image(img, 0, 0, length,length);
          p.pop();

          p.push();
          p.translate(40, 460);
          p.rotate(0);
          p.image(img, 0, 0, length, length);
          p.pop();

          p.push();
          p.translate(40, 460);
          p.scale(-1, 1);
          p.rotate(270);
          p.image(img, 0, 0, length, length);
          p.pop();
        }
        let width=330;
        if (selectedFrame.borderImage) {
          //border up
          p.push();
          p.translate(250, 40);
          p.scale(-1, 1);
          p.rotate(180);
          p.image(borderImage, 0, 0, width+10, length);
          p.pop();
          //border left
          p.push();
          p.translate(40, 250);
          p.rotate(90);
          p.image(borderImage, 0, 0, width, length);
          p.pop();

          //border right

          p.push();
          p.translate(458, 250); // Move to the center of the canvas
          p.rotate(270);
          p.image(borderImage, 0, 0, width, length);
          p.pop();

          //border bottome

          p.push();
          p.translate(250, 460); // Move to the center of the canvas
          p.rotate(0);
          p.image(borderImage, 0, 0, width, length);
          p.pop();
        }

        if (selectedFrame.borderImage && selectedFrame.cornerImage) {
          p.image(flowerImage, 250, 250, 330, 330);
          setBorderDraw(true);
        } else {
          p.image(flowerImage, 250, 250, 500, 500);
          setBorderDraw(false);
        }
      };

      p.draw = () => {
        drawImageWithBorder();
      };
      p.canvasReady = () => {
                 setCanvasReady(true);
            };
     
    };
    myp5 = new p5(sketch, canvasRef.current);

    return () => {
      myp5.remove();
    };
  }, [selectedFrame]);
   const handleDownloadSvg = () => {
     if (!canvasReady || !myp5) {
       console.error("Canvas is not properly initialized.");
       return;
     }
  
     const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
     svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
     svgElement.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink"); // Add xlink namespace
     svgElement.setAttribute("width", "500");
     svgElement.setAttribute("height", "500");
  
     // Create an image element and set its source to the canvas
     const imgElement = document.createElementNS("http://www.w3.org/2000/svg", "image");
     imgElement.setAttributeNS("http://www.w3.org/1999/xlink", "href", myp5.canvas.toDataURL("image/png")); // Use 'href' instead of 'xlink:href'
     imgElement.setAttribute("width", "500");
     imgElement.setAttribute("height", "500");
     svgElement.appendChild(imgElement);
  
     // Create a Blob from the SVG string
     const svgBlob = new Blob([svgElement.outerHTML], { type: "image/svg+xml" });
  
     // Create a download link and trigger the download
     const downloadLink = document.createElement("a");
     downloadLink.href = URL.createObjectURL(svgBlob);
     downloadLink.download = "my_canvas_image.svg";
     document.body.appendChild(downloadLink);
     downloadLink.click();
     document.body.removeChild(downloadLink);
   };

  const handleFrameClick = (index) => {
    const clickedFrame = frames[index];
    setSelectedFrame({
      borderImage: clickedFrame.borderImage,
      cornerImage: clickedFrame.cornerImage,
    });
  };

  return (
    <div className="container">
      <div
        className="canvas"
        ref={canvasRef}
        style={{
          border: borderDraw ? "none" : "1px solid black",
        }}
      ></div>

      <div
        className="options"
        style={{ display: "flex", alignItems: "center" }}
      >
        {frames.map((frame, index) => (
          <div key={index}>
            <img
              src={frame.thumbnails}
              alt={`Thumbnail ${index + 1}`}
              style={{
                width: "50px",
                height: "50px",
                margin: "5px",
                cursor: "pointer",
              }}
              onClick={() => handleFrameClick(index)}
            />
            <p style={{margin:"30px"}}>{frame.name}</p>
          </div>
        ))}
      </div>
      <button onClick={handleDownloadSvg}>Download as SVG</button>
    
    </div>
  );
};

export default ImageFrameSelector;


  // import React, { useRef, useEffect, useState } from "react";

  // import * as PIXI from 'pixi.js';

  // import c1 from "./img/corner.png";
  // import b1 from "./img/bordernew.png";
  // import flower from "./img/flower.jpg";
  // import t1 from "./img/t1.png";
  // import t2 from "./img/t2.png";
  // import b2 from "./img/b2.png";
  // import c2 from "./img/c2.png";
  // import t3 from "./img/t3.png";
  // import c3 from "./img/c3.png";
  // import b3 from "./img/b3.png";
  // import t4 from "./img/t4.png";
  // import b4 from "./img/b4.png";
  // import c4 from "./img/c4.png";
  // import main from "./img/main.png";
  // import t5 from "./img/t5.png";

  // const ImageFrameSelector = () => {
  //   const canvasRef = useRef(null);
  //   const [borderDraw, setBorderDraw] = useState(false);
  //   const [canvasReady, setCanvasReady] = useState(false);
  //   let app;
  //   let cornerSprite;
  //   let borderSprite;
  //   let flowerSprite;

  //   const frames = [
  //     { thumbnails: t2, borderImage: b1, cornerImage: c1, name: "1" },
  //     { thumbnails: t1, borderImage: b2, cornerImage: c2, name: "2" },
  //     { thumbnails: t3, borderImage: b3, cornerImage: c3, name: "3" },
  //     { thumbnails: t4, borderImage: b4, cornerImage: c4, name: "4" },
  //     { thumbnails: t5, borderImage: "", cornerImage: "", name: "no frame" },
  //   ];

  //   const borderImages = [b1];
  //   const cornerImages = [c1];
  //   const [selectedFrame, setSelectedFrame] = useState({
  //     borderImage: borderImages[0],
  //     cornerImage: cornerImages[0],
  //   });

  //   const drawCornerImage = (x, y, rotation, length) => {
  //     if (selectedFrame.cornerImage) {
  //       cornerSprite = new PIXI.Sprite.from(selectedFrame.cornerImage);
  //       cornerSprite.anchor.set(0.5);
  //       cornerSprite.position.set(x, y);
  //       cornerSprite.rotation = (rotation * Math.PI) / 180;

  //       app.stage.addChild(cornerSprite);
  //     }
  //   };
    
  //   const drawBorderImage = (x, y, rotation, width, length) => {
  //     if (selectedFrame.borderImage) {
  //       borderSprite = new PIXI.Sprite.from(selectedFrame.borderImage);
  //       borderSprite.anchor.set(0.5);
  //       borderSprite.position.set(x, y);
  //       borderSprite.rotation = (rotation * Math.PI) / 180;

  //       borderSprite.width = width;
  //       borderSprite.height = length;
  //       app.stage.addChild(borderSprite);
  //     }
  //   };
    

  //   useEffect(() => {
  //     const loadImages = () => {
  //       if (selectedFrame.cornerImage) {
  //         cornerSprite = new PIXI.Sprite.from(selectedFrame.cornerImage);
  //       }
  //       if (selectedFrame.borderImage) {
  //         borderSprite = new PIXI.Sprite.from(selectedFrame.borderImage);
  //       }
  //       flowerSprite = new PIXI.Sprite.from(main);

  //       cornerSprite.position.set(40, 40);
  //       borderSprite.position.set(250, 40);

  //       app.stage.addChild(cornerSprite, borderSprite, flowerSprite);

  //       drawImageWithBorder();
  //       setCanvasReady(true);
  //     };

  //     const setupPixiApp = () => {
  //       app = new PIXI.Application({ width: 500, height: 500 });
  //       canvasRef.current.appendChild(app.view);
  //       loadImages();
  //     };

  //     setupPixiApp();

  //     return () => {
  //       app.destroy();
  //     };
  //   }, [selectedFrame]);

  //   const drawImageWithBorder = () => {
  //     app.stage.removeChildren(); // Clear the stage

  //     let length = 90;
  //     if (selectedFrame.cornerImage) {
  //       drawCornerImage(40, 40, 90, 90);
  //       drawCornerImage(100, 40, -62, 90);
  //       drawCornerImage(400, 40, -60, 90);
  //       drawCornerImage(460, 40, 0, 90);
  //       drawCornerImage(460, 460, 0, -90);
  //       drawCornerImage(460, 460, 0, 0);
  //       drawCornerImage(40, 460, 0, 0);
  //       drawCornerImage(40, 460, 0, -90);
  //     }

  //     let width = 330;
  //     if (selectedFrame.borderImage) {
  //       drawBorderImage(250, 40, 180, width + 10, length);
  //       drawBorderImage(40, 250, 90, width, length);
  //       drawBorderImage(458, 250, 270, width, length);
  //       drawBorderImage(250, 460, 0, width, length);
  //     }

  //     if (selectedFrame.borderImage && selectedFrame.cornerImage) {
  //       flowerSprite.position.set(250, 250);
  //       flowerSprite.width = 330;
  //       flowerSprite.height = 330;
  //       app.stage.addChild(flowerSprite);
  //       setBorderDraw(true);
  //     } else {
  //       flowerSprite.position.set(250, 250);
  //       flowerSprite.width = 500;
  //       flowerSprite.height = 500;
  //       app.stage.addChild(flowerSprite);
  //       setBorderDraw(false);
  //     }

  //     app.renderer.render(app.stage);
  //   };

  //   const handleFrameClick = (index) => {
  //     const clickedFrame = frames[index];
  //     setSelectedFrame({
  //       borderImage: clickedFrame.borderImage,
  //       cornerImage: clickedFrame.cornerImage,
  //     });
  //   };

  //   return (
  //     <div className="container">
  //       <div
  //         className="canvas"
  //         ref={canvasRef}
  //         style={{
  //           border: borderDraw ? "none" : "1px solid black",
  //         }}
  //       ></div>

  //       <div
  //         className="options"
  //         style={{ display: "flex", alignItems: "center" }}
  //       >
  //         {frames.map((frame, index) => (
  //           <div key={index}>
  //             <img
  //               src={frame.thumbnails}
  //               alt={`Thumbnail ${index + 1}`}
  //               style={{
  //                 width: "50px",
  //                 height: "50px",
  //                 margin: "5px",
  //                 cursor: "pointer",
  //               }}
  //               onClick={() => handleFrameClick(index)}
  //             />
  //             <p style={{ margin: "30px" }}>{frame.name}</p>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  // export default ImageFrameSelector;
