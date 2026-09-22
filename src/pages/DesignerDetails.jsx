import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/api/axiosInstance";
import { fabric } from "fabric";
import { loadFromJSON } from "../utils/helpers/canvasTools";
import RadioComponent from "../components/RadioComponent";
import SizeCharts from "../features/productDetails/SizeCharts.jsx";
import XIcon from "../icons/XIcon";

import {
  addText,
  calculateTotalPrice,
  captureScreenShot,
  handleAddImage,
  removeSelectedObject,
  resetCanvas,
  resizeCanvas,
  saveAsJSON,
  updateTextProps,
} from "../utils/helpers/canvasTools.js";
import { saveCanvasToBackend } from "../utils/api/designerApi.js";
import { toast } from "react-toastify";

export default function DesignerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [design, setDesign] = useState(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const canvasRef = useRef(null); // Reference to the canvas element
  const [selectedText, setSelectedText] = useState(null); // Track the currently selected text object
  const [textProps, setTextProps] = useState({
    fontSize: 24, // Initial font size
    fill: "#000000", // Initial text color (black)
    fontFamily: "Arial", // Initial font family
    fontWeight: "",
    fontStyle: "",
    textBackgroundColor: "transparent", // Initial background color (transparent)
  });
  const [backgroundImage, setBackgroundImage] = useState(""); // State for background image
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [canvasWidth, setCanvasWidth] = useState(0); // State for canvas width
  const [canvasHeight, setCanvasHeight] = useState(0); // State for canvas height
  const [selectedSize, setSelectedSize] = useState(""); // State for size
  const [isEditing, setIsEditing] = useState(false); // Track if in edit mode
  const [isAdding, setIsAdding] = useState(false);
  const [dragImages, setDragImages] = useState([]);

  useEffect(() => {
    const fetchDesignDetails = async () => {
      try {
        const response = await axiosInstance.get(`/designs/${id}`);
        //console.log(response.data.data);
        setDesign(response.data.data.design);
        setBackgroundImage(response.data.data.design.image);
        setName(response.data.data.design.name);
        setPrice(response.data.data.design.totalPrice);
        setCanvasWidth(response.data.data.design.canvasWidth);
        setCanvasHeight(response.data.data.design.canvasHeight);
      } catch (error) {
        console.error("Error fetching design details:", error);
      }
    };

    fetchDesignDetails();
  }, [id]);

  useEffect(() => {
    if (design && design.canvas && canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current);
      setFabricCanvas(canvas);
      loadFromJSON(canvas, JSON.parse(design.canvas));

      // Function to handle when text is selected or updated
      const handleSelection = (e) => {
        if (e.selected[0].type === "textbox") {
          // Check if a textbox was selected
          setSelectedText(e.selected[0]); // Set the selected text
          setTextProps({
            fontSize: e.selected[0].fontSize, // Set the current text properties in the state
            fill: e.selected[0].fill, // Use the current text color from the state
            fontFamily: e.selected[0].fontFamily,
            fontWeight: e.selected[0].fontWeight,
            fontStyle: e.selected[0].fontStyle,
            // textBackgroundColor: e.selected[0].backgroundColor, // Use the current background color from the state
          });

          console.log("Text selected:", e.selected[0]); // Debugging
        }
      };

      // Listen for text selection and update events
      canvas.on("selection:created", handleSelection);
      canvas.on("selection:updated", handleSelection);

      // Handle clearing of the selection
      canvas.on("selection:cleared", () => {
        setSelectedText(null); // No text is selected
        console.log("Selection cleared"); // Debugging
      });
    }
  }, [design]);

  const handleAddText = () => {
    addText(fabricCanvas.current, textProps);
  };

  const handleUpdateTextProps = (prop, value) => {
    setTextProps((prev) => ({ ...prev, [prop]: value }));
    updateTextProps(selectedText, prop, value, fabricCanvas.current);
  };

  const handleSaveAsJSON = async () => {
    try {
      const canvasJSON = saveAsJSON(fabricCanvas.current);
      setSavedCanvas(canvasJSON);
      console.log("Canvas JSON:", canvasJSON);

      // Get the image data
      const imageOfDesign = await handleCaptureScreenShot();
      console.log("screenshot", imageOfDesign);

      const basePrice = design.totalPrice; // Assuming you have a design object with a totalPrice
      const totalPrice = calculateTotalPrice(basePrice, fabricCanvas.current);

      // Convert base64 to blob
      const base64Response = await fetch(imageOfDesign);
      const blob = await base64Response.blob();

      // Create a File object
      const imageFile = new File([blob], "design.jpg", { type: "image/jpeg" });
      console.log(imageFile.name);

      // Create FormData object
      const formData = new FormData();
      formData.append("productId", design.productId);
      formData.append("userId", design.userId);
      formData.append("canvas", JSON.stringify(canvasJSON));
      formData.append("image", imageFile);
      formData.append("totalPrice", totalPrice.toString());
      formData.append("isGamed", "false");
      dragImages.forEach((image) => {
        formData.append(`dragImages`, image); // Append each image to FormData
      });

      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Make the API call to save the design
      const saveResponse = await saveCanvasToBackend(formData);
      toast.success("Your Design saved successfully");
      console.log("Canvas saved successfully:", saveResponse);
      setIsEditing(true);
      return saveResponse;
    } catch (error) {
      console.error("Error saving canvas:", error);
    }
  };

  const handleButtonClick = async () => {
    await handleSaveAsJSON(); // Save as JSON if not in edit mode
  };

  const handleResetCanva = () => resetCanvas(fabricCanvas.current);

  const handleAddImageOnCanva = (e) =>
    handleAddImage(e, fabricCanvas.current, setDragImages);

  const handleRemoveSelectedObj = () =>
    removeSelectedObject(fabricCanvas.current);

  if (!design) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-2/4 p-4 bg-base-200 text-base-content">
        <div
          style={{ width: "100%", height: "100%", borderColor: "#4e7f62" }}
          className="flex flex-col border border-indigo-600 rounded-lg p-5"
        >
          <div className="flex justify-between">
            <div className="mb-5 font-bold text-3xl text-black">{name}</div>
            <div className="mb-5 font-bold text-3xl text-green-800">
              EGP {price}
            </div>
          </div>
          <div className="flex flex-col justify-center mb-5">
            {/* Image Upload */}
            <div className="flex justify-between items-center">
              <input
                id="chooseImg"
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleAddImageOnCanva} // Handle the image upload
              />

              {/* Custom Button */}
              <label
                style={{ borderColor: "#4e7f62" }}
                htmlFor="chooseImg" // Triggers the hidden file input
                className=" bg-white text-gray-700 py-2 px-4 rounded cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out mt-5 w-44 border border-indigo-600 text-center"
              >
                Choose Image
              </label>
              <span className=" text-2xl text-green-800">EGP 100</span>
            </div>

            {/* Button to Add Text */}
            <div className="flex justify-between items-center">
              <button
                style={{ borderColor: "#4e7f62" }}
                className=" bg-white text-gray-700 py-2 px-4 rounded cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out mt-5 w-44 border border-indigo-600 "
                id="addTextBtn"
                onClick={handleAddText}
              >
                Add Text
              </button>
              <span className=" text-2xl text-green-800">EGP 50</span>
            </div>
          </div>
          <div>
            <button
              style={{ borderColor: "#4e7f62" }}
              className="inline-block bg-white text-gray-700 py-2 px-4 rounded cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out mt-5 w-44 border border-indigo-600 mb-5"
              onClick={handleRemoveSelectedObj} // Handle image removal
            >
              Remove Selected Element
            </button>
          </div>
          {/*chart */}

          <div className="flex flex-col justify-between mb-5">
            <div className="flex gap-3">
              <button
                className="font-bold underline"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                Sizes table
              </button>
            </div>
            <RadioComponent
              setSize={setSelectedSize}
              stock={new Set(["S", "M", "L"])}
            />
          </div>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <form method="dialog">
                <div className="p-3">
                  <button className="float-right rounded-full">
                    <XIcon />
                  </button>
                </div>
              </form>
              <h3 className="font-bold text-2xl ">Size Charts</h3>
              <p className="py-4">Choose your size carfully ..</p>
              <div className="modal-action justify-center">
                <form method="dialog">
                  <SizeCharts />
                </form>
              </div>
            </div>
          </dialog>

          {/* Color Picker for Text */}
          <div className="flex gap-9 items-center mt-3">
            <div className="">
              <label
                htmlFor="color_picker"
                className="text-sm font-medium mb-2"
              >
                Color
              </label>
            </div>
            <div className="">
              <input
                id="color_picker"
                className="p-1 h-8 w-12 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                type="color"
                value={textProps.fill} // Bind the color picker to the current text color
                onChange={(e) => {
                  handleUpdateTextProps("fill", e.target.value);
                  console.log("Color changed to:", e.target.value); // Debugging
                  console.log(textProps);
                }} // Update the fill color when changed
              />
            </div>
          </div>

          {/* Font Size Input */}
          <div className="flex gap-9 items-center mt-3">
            <div className="">
              <label htmlFor="font-size">Font Size</label>
            </div>
            <div className="">
              <input
                id="font-size"
                type="range"
                min={1}
                max="50"
                value={textProps.fontSize} // Bind the input to the current font size
                className="range range-xs"
                onChange={(e) => {
                  if (parseInt(e.target.value) <= 0 || e.target.value === "") {
                    e.target.value = 1;
                  }
                  handleUpdateTextProps("fontSize", parseInt(e.target.value));
                  console.log("Font size changed to:", e.target.value); // Debugging
                  console.log(textProps);
                }}
              />
            </div>
          </div>

          {/* Font Family Selector */}
          <div className="flex gap-9 items-center mt-3">
            <div className="">
              <label htmlFor="font-style">Font Style</label>
            </div>
            <div className="">
              <select
                id="font-style"
                className="select select-sm select-success w-full max-w-xs"
                value={textProps.fontFamily} // Bind the select dropdown to the current font family
                onChange={(e) => {
                  handleUpdateTextProps("fontFamily", e.target.value);
                  console.log("Font family changed to:", e.target.value); // Debugging
                  console.log(textProps);
                }} // Update the font family when changed
              >
                <option defaultValue value="arial">
                  Arial
                </option>
                <option value="helvetica">Helvetica</option>
                <option value="verdana">Verdana</option>
                <option value="georgia">Georgia</option>
                <option value="courier">Courier</option>
                <option value="comic sans ms">Comic Sans MS</option>
                <option value="impact">Impact</option>
                <option value="monaco">Monaco</option>
              </select>
            </div>
          </div>
          {/* Button to make text Bold */}
          <div className="flex gap-9 items-center mt-3">
            <div>
              <label htmlFor="bold-button">Bold</label>
            </div>
            <div>
              <input
                id="bold-button"
                type="checkbox"
                onChange={() => {
                  handleUpdateTextProps(
                    "fontWeight",
                    textProps.fontWeight === "" ? "bold" : ""
                  );
                  console.log("Bold changed to:", textProps.fontWeight); // Debugging
                }}
                className="checkbox"
              />{" "}
            </div>
          </div>
          <div className="flex gap-9 items-center mt-3">
            <div>
              <label htmlFor="italic-button">Italic</label>
            </div>
            <div>
              <input
                id="italic-button"
                type="checkbox"
                value={textProps.italic}
                onChange={() => {
                  handleUpdateTextProps(
                    "fontStyle",
                    textProps.fontStyle === "" ? "italic" : ""
                  );
                }}
                className="checkbox"
              />{" "}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleButtonClick}
              className="py-2 px-4 rounded cursor-pointer bg-SecondaryColor hover:bg-green-900 transition duration-700 ease-in-out  text-white btn  mt-5 w-44 me-10 "
              disabled={isAdding}
            >
              {isAdding ? (
                <span className="loading loading-ring loading-md"></span>
              ) : (
                "Save Design"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* T-shirt Canvas */}
      <div className="w-full lg:w-3/4 flex justify-center items-center p-4">
        <div
          id="divToTakeScreenshot"
          style={{
            width: "100%",
            height: "600px",
            backgroundImage: `url(${backgroundImage})`,
            borderColor: "#4e7f62",
          }}
          className="flex flex-col justify-center items-center bg-center bg-no-repeat bg-white relative rounded-lg border bg-cover xs:bg-contain mdplus:bg-cover lgplus:bg-contain p-5 "
        >
          {/* Fabric.js Canvas */}
          <canvas
            id="canvasBorder"
            ref={canvasRef} // Reference to the canvas element
            style={{
              border: "1px dashed gray",
            }}
          />
        </div>
      </div>
    </div>
  );
}
