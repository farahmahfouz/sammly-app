import { fabric } from "fabric";
import { takeScreenShotFunc } from "./screenshot";

//resize canva in responsive
export const resizeCanvas = (fabricCanvas, canvasWidth, canvasHeight) => {
  if (!fabricCanvas) return;
  fabricCanvas.current.setWidth(canvasWidth);
  fabricCanvas.current.setHeight(canvasHeight);
  fabricCanvas.current.renderAll(); // Re-render the canvas to apply changes
};
//////////////////////////////////////////////////original code/////////////////////////////
//screenshot capture
// export const captureScreenShot = async (fabricCanvas) => {
//   fabricCanvas.discardActiveObject();
//   fabricCanvas.renderAll();
//   const imageOfDesign = await takeScreenShotFunc(
//     "divToTakeScreenshot",
//     "MyImage",
//     "image/jpeg",
//     "#f5f5f5"
//   );
//   console.log(imageOfDesign);
//   if (imageOfDesign) {
//     return imageOfDesign;
//   } else {
//     throw new Error("Screenshot capture failed");
//   }
// };

export const captureScreenShot = async (
  fabricCanvas,
  elementId,
  isDownload,
) => {
  fabricCanvas.discardActiveObject();
  fabricCanvas.renderAll();
  const imageOfDesign = await takeScreenShotFunc(
    elementId,
    "MyImage",
    isDownload,
    "image/jpeg",
  );
  if (imageOfDesign) {
    return imageOfDesign;
  } else {
    throw new Error("Screenshot capture failed");
  }
};
/////////////////////////////////////////////////////////////////////////////////

// add text on canva
export const addText = (fabricCanvas, textProps) => {
  const textbox = new fabric.Textbox("Enter text here", {
    fontSize: textProps.fontSize,
    fill: textProps.fill,
    fontFamily: textProps.fontFamily,
    fontWeight: textProps.fontWeight,
    fontStyle: textProps.fontStyle,
    editable: true,
  });
  fabricCanvas.add(textbox);
  fabricCanvas.centerObject(textbox);
  fabricCanvas.setActiveObject(textbox);
  fabricCanvas.renderAll();
};

//Function to update the properties of the selected text
export const updateTextProps = (selectedText, prop, value, fabricCanvas) => {
  if (selectedText) {
    selectedText.set(prop, value); // Update the specific property of the selected text
    fabricCanvas.renderAll(); // Re-render the canvas immediately to apply the change

    console.log("Text properties updated:", prop, value); // Debugging
  } else {
    console.warn("No text object selected"); // Debugging
  }
};

// save designer as json
// export const saveAsJSON = (fabricCanvas) => {
//   return JSON.stringify(fabricCanvas.toJSON());

//   // You can send this JSON to your backend to save it
// };
export const saveAsJSON = (fabricCanvas) => {
  const json = JSON.stringify(fabricCanvas.toJSON());
  console.log("Saved JSON:", json); // Log the saved JSON to inspect its structure
  return json;
};

///////////////////////////////////////////
//load from json
// export const loadFromJSON = (fabricCanvas, savedCanvas) => {
//   // Load the canvas from the JSON string
//   fabricCanvas.loadFromJSON(savedCanvas, () => {
//     fabricCanvas.renderAll(); // Render the canvas after loading
//     console.log("Canvas loaded from JSON");
//   });
// };

export const loadFromJSON = (canvas, json) => {
  canvas.loadFromJSON(json, () => {
    canvas.renderAll();
  });
};

//reset canva
export const resetCanvas = (fabricCanvas) => {
  // Clear all objects from the canvas
  fabricCanvas.clear();
};

//Function to handle adding an image to the canvas

export const handleAddImage = (e, fabricCanvas, setDragImages) => {
  let imgObj = e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(imgObj);
  reader.onload = (e) => {
    let imgElement = document.createElement("img");
    imgElement.src = e.target.result;
    imgElement.onload = function () {
      const image = new fabric.Image(imgElement, {
        scaleX: 0.1,
        scaleY: 0.1,
      });
      console.log(image);
      fabricCanvas.add(image);
      fabricCanvas.centerObject(image);
      fabricCanvas.setActiveObject(image);
      fabricCanvas.renderAll(); // 👈 السطر المفقود
      setDragImages((prevImages) => [...prevImages, imgObj]);
    };
  };
  return imgObj;
};

//remove selected object
export const removeSelectedObject = (fabricCanvas) => {
  const activeObject = fabricCanvas.getActiveObject(); // Get the selected object
  console.log(activeObject);

  if (activeObject) {
    // Check if the selected object is an image
    fabricCanvas.remove(activeObject); // Remove the selected object
    fabricCanvas.renderAll(); // Re-render the canvas to reflect the changes
    // console.log("Image removed"); // Debugging
  } else {
    console.warn("No object is selected to remove");
  }
};

// export const calculateTotalPrice = (basePrice, canvas) => {
//   let totalPrice = basePrice;
//   const IMAGE_PRICE = 100; // Price per image
//   const TEXT_PRICE = 50; // Price per text element

//   canvas.getObjects().forEach((obj) => {
//     if (obj.type === "image" || obj.type === "img") {
//       totalPrice += IMAGE_PRICE;
//     } else if (obj.type === "textbox") {
//       totalPrice += TEXT_PRICE;
//     }
//   });

//   return totalPrice;
// };

export const calculateTotalPrice = (basePrice, ...canvases) => {
  let totalPrice = basePrice;

  canvases.forEach((canvas) => {
    canvas.getObjects().forEach((obj) => {
      if (obj.type === "textbox") {
        totalPrice += 50; // Assuming each text adds 50 to the price
      } else if (obj.type === "image") {
        totalPrice += 100; // Assuming each image adds 100 to the price
      }
    });
  });

  return totalPrice;
};
