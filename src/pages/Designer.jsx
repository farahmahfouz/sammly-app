/* eslint-disable no-unused-vars */
import "../styles/scroll.css";

import { useRef, useEffect, useState, useContext } from "react";
import { fabric } from "fabric";
import { useNavigate, useParams } from "react-router";
import RadioComponent from "../components/RadioComponent";
import SizeCharts from "../features/productDetails/SizeCharts.jsx";
import Downloads from "../icons/Downloads";
import ShowMore from "../icons/ShowMore.jsx";

import {
  addText,
  calculateTotalPrice,
  captureScreenShot,
  handleAddImage,
  loadFromJSON,
  removeSelectedObject,
  resetCanvas,
  resizeCanvas,
  saveAsJSON,
  updateTextProps,
} from "../utils/helpers/canvasTools.js";
import { getIsDesignableProductById } from "../utils/api/productsapi.js";
import {
  getdesignById,
  saveCanvasToBackend,
  updateCanvasToBackend,
} from "../utils/api/designerApi.js";
import AuthContext from "../context/AuthContext.jsx";
import { toast } from "react-toastify";

import useCart from "../features/cart/useCart.js";
import Steps from "../features/designs/Steps.jsx";
import { MdFormatTextdirectionLToR } from "react-icons/md";
import { LuImageUp } from "react-icons/lu";
import { FiBookmark, FiShoppingCart } from "react-icons/fi";
import DeleteIcon from './../icons/DeleteIcon';
import NeedHelp from "../features/designs/NeedHelp.jsx";


export default function Designer() {
  const { addToCart } = useCart();

  const { id } = useParams();
  const { userId } = useContext(AuthContext);
  const [savedCanvas, setSavedCanvas] = useState({ front: null, back: null });
  const canvasRefFront = useRef(null); // Reference to the front canvas element
  const canvasRefBack = useRef(null); // Reference to the back canvas element
  const fabricCanvasFront = useRef(null); // Reference to the Fabric.js front canvas
  const fabricCanvasBack = useRef(null); // Reference to the Fabric.js back canvas
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
  const [backgroundBackImage, setBackgroundBackImage] = useState(""); // State for background back image
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [canvasWidth, setCanvasWidth] = useState(0); // State for canvas width
  const [canvasHeight, setCanvasHeight] = useState(0); // State for canvas height
  const [selectedSize, setSelectedSize] = useState(""); // State for size
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [dragImages, setDragImages] = useState([]);

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [designId, setDesignId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [canvasObjects, setCanvasObjects] = useState([]);
  const [displayedCanvas, setDisplayedCanvas] = useState(null);
  const [activeView, setActiveView] = useState("front"); // "front" | "back"

  const handleFront = () => {
    setActiveView("front");
    scrollToFront();
  };

  const handleBack = () => {
    setActiveView("back");
    scrollToBack();
  };

  const fetchProductAndDesign = async () => {
    if (!id) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const fetchedProduct = await getIsDesignableProductById(id);
      setProduct(fetchedProduct);

      const params = new URLSearchParams(window.location.search);
      const editDesignId = params.get("edit");

      if (editDesignId) {
        setDesignId(editDesignId);
        const fetchedDesign = await getdesignById(editDesignId);
        setSavedCanvas({
          front: fetchedDesign.canvases.front,
          back: fetchedDesign.canvases.back,
        });
        loadFromJSON(fabricCanvasFront.current, fetchedDesign.canvases.front);
        loadFromJSON(fabricCanvasBack.current, fetchedDesign.canvases.back);
        setSelectedSize(fetchedDesign.size);
        setDragImages(fetchedDesign.dragImages || []);
      }
    } catch (err) {
      setIsError(true);
      setError(err);
      console.error("Failed to fetch product or design:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const sizeChartRef = useRef(null);

  const scrollToSizeChart = () => {
    sizeChartRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    fetchProductAndDesign();
    if (savedCanvas.front) {
      loadFromJSON(fabricCanvasFront.current, savedCanvas.front);
    }
    if (savedCanvas.back) {
      loadFromJSON(fabricCanvasBack.current, savedCanvas.back);
    }
  }, []);

  const navigateToLogin = () => {
    navigate(`/login?redirect=designer/${id}`);
  };

  const stockAvailable = new Set(
    product?.stock?.map((el) => {
      if (el.quantity > 0) {
        return el.size;
      }
    })
  );

  useEffect(() => {
    if (product && canvasRefFront.current && canvasRefBack.current) {
      setBackgroundImage(product.image);
      setBackgroundBackImage(product.backImage);
      setName(product.name);
      setPrice(product.price);
      setCanvasWidth(product.canvasWidth);
      setCanvasHeight(product.canvasHeight);
    }

    fabricCanvasFront.current = new fabric.Canvas(canvasRefFront.current);
    fabricCanvasBack.current = new fabric.Canvas(canvasRefBack.current);

    setDisplayedCanvas(fabricCanvasFront);
    scrollToFront();

    const handleObjectAdded = (e) => {
      setCanvasObjects((prevObjects) => [...prevObjects, e.target]);
    };

    const handleObjectRemoved = (e) => {
      setCanvasObjects((prevObjects) =>
        prevObjects.filter((obj) => obj !== e.target)
      );
    };

    fabricCanvasFront.current.on("object:added", handleObjectAdded);
    fabricCanvasFront.current.on("object:removed", handleObjectRemoved);
    fabricCanvasBack.current.on("object:added", handleObjectAdded);
    fabricCanvasBack.current.on("object:removed", handleObjectRemoved);

    updateTotalPrice();

    const handleSelection = (e) => {
      if (e.selected[0].type === "textbox") {
        setSelectedText(e.selected[0]);
        setTextProps({
          fontSize: e.selected[0].fontSize,
          fill: e.selected[0].fill,
          fontFamily: e.selected[0].fontFamily,
          fontWeight: e.selected[0].fontWeight,
          fontStyle: e.selected[0].fontStyle,
        });
      }
    };

    fabricCanvasFront.current.on("selection:created", handleSelection);
    fabricCanvasFront.current.on("selection:updated", handleSelection);
    fabricCanvasBack.current.on("selection:created", handleSelection);
    fabricCanvasBack.current.on("selection:updated", handleSelection);

    fabricCanvasFront.current.on("selection:cleared", () => {
      setSelectedText(null);
      console.log("Selection cleared");
    });
    fabricCanvasBack.current.on("selection:cleared", () => {
      setSelectedText(null);
      console.log("Selection cleared");
    });

    const handleResize = () => {
      resizeCanvas(fabricCanvasFront, canvasWidth, canvasHeight);
      resizeCanvas(fabricCanvasBack, canvasWidth, canvasHeight);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      if (fabricCanvasFront.current) {
        const canvasFront = fabricCanvasFront.current;
        canvasFront.off("selection:created");
        canvasFront.off("selection:cleared");
        fabricCanvasFront.current.off("object:added", handleObjectAdded);
        fabricCanvasFront.current.off("object:removed", handleObjectRemoved);
      }
      if (fabricCanvasBack.current) {
        const canvasBack = fabricCanvasBack.current;
        canvasBack.off("selection:created");
        canvasBack.off("selection:cleared");
        fabricCanvasBack.current.off("object:added", handleObjectAdded);
        fabricCanvasBack.current.off("object:removed", handleObjectRemoved);
      }
      window.removeEventListener("resize", handleResize);
      fabricCanvasFront.current.dispose();
      fabricCanvasBack.current.dispose();
      const addTextBtn = document.getElementById("addTextBtn");
      if (addTextBtn) {
        addTextBtn.removeEventListener("click", addText);
      }
    };
  }, [product, id, canvasHeight, canvasWidth]);

  useEffect(() => {
    updateTotalPrice();
  }, [canvasObjects]);

  const updateTotalPrice = () => {
    if (product && fabricCanvasFront.current && fabricCanvasBack.current) {
      const basePrice = parseFloat(product.price);
      const newTotalPrice = calculateTotalPrice(
        basePrice,
        fabricCanvasFront.current,
        fabricCanvasBack.current
      );
      setTotalPrice(newTotalPrice);
    }
  };

  const handleAddText = (canvas) => {
    addText(canvas, textProps);
  };

  const handleUpdateTextProps = (prop, value) => {
    if (selectedText) {
      setTextProps((prev) => ({ ...prev, [prop]: value }));
      updateTextProps(selectedText, prop, value, fabricCanvasFront.current);
      updateTextProps(selectedText, prop, value, fabricCanvasBack.current);
    } else {
      console.warn("No text object selected");
    }
  };

  const handleSaveDesign = async (action) => {
    if (action === "save") {
      setIsSaving(true);
    }

    try {
      const canvasJSONFront = saveAsJSON(fabricCanvasFront.current);
      const canvasJSONBack = saveAsJSON(fabricCanvasBack.current);
      setSavedCanvas({ front: canvasJSONFront, back: canvasJSONBack });

      const imageOfDesignFront = await captureScreenShot(
        fabricCanvasFront.current,
        "divToTakeScreenshotFront",
        false
      );
      const imageOfDesignBack = await captureScreenShot(
        fabricCanvasBack.current,
        "divToTakeScreenshotBack",
        false
      );

      const basePrice = product.price;
      const totalPrice = calculateTotalPrice(
        basePrice,
        fabricCanvasFront.current,
        fabricCanvasBack.current
      );

      const base64ResponseFront = await fetch(imageOfDesignFront);
      const blobFront = await base64ResponseFront.blob();
      const imageFileFront = new File([blobFront], "designFront.jpg", {
        type: "image/jpeg",
      });

      const base64ResponseBack = await fetch(imageOfDesignBack);
      const blobBack = await base64ResponseBack.blob();
      const imageFileBack = new File([blobBack], "designBack.jpg", {
        type: "image/jpeg",
      });

      const formData = new FormData();
      formData.append("productId", id);
      if (action === "save") {
        formData.append("userId", userId);
      }
      formData.append(
        "canvases",
        JSON.stringify({ front: canvasJSONFront, back: canvasJSONBack })
      );
      formData.append("image", imageFileFront);
      formData.append("image", imageFileBack);
      formData.append("totalPrice", totalPrice.toString());
      formData.append("isGamed", "false");
      dragImages.forEach((image) => {
        formData.append(`dragImages`, image);
      });

      setTotalPrice(totalPrice);

      let saveResponse;
      if (designId) {
        saveResponse = await updateCanvasToBackend(designId, formData);
        if (action === "save") {
          toast.success("Design Saved To Your Profile");
        }
        console.log("Canvas updated successfully:", saveResponse);
        return saveResponse;
      } else {
        saveResponse = await saveCanvasToBackend(formData);
        const newDesignId = saveResponse.data.design._id;
        setDesignId(newDesignId);
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("edit", newDesignId);
        window.history.pushState({}, "", currentUrl.toString());
        if (action === "save") {
          toast.success("Design Saved To Your Profile");
        }
        console.log(saveResponse);
        return saveResponse;
      }
    } catch (error) {
      toast.error("Drag 5 images only");
      console.error("Error saving canvas:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetCanva = (canvas) => {
    resetCanvas(canvas);
    setSelectedText(null); // Reset selected text
    setTextProps({
      fontSize: 24,
      fill: "#000000",
      fontFamily: "Arial",
      fontWeight: "",
      fontStyle: "",
      textBackgroundColor: "transparent",
    }); // Reset text properties
  };

  const handleAddImageOnCanva = (e, canvas) => {
    handleAddImage(e, canvas, setDragImages);
    e.target.value = ""; // Reset the file input element
  };

  const handleRemoveSelectedObj = (canvas) => {
    removeSelectedObject(canvas);
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.warn("Please choose your size");
      return;
    }

    const res = await handleSaveDesign("add");
    const cartItem = {
      designId: res.data.design._id,
      quantity: 1,
      size: selectedSize,
      type: "Design",
    };
    try {
      setIsAdding(true);
      const response = await addToCart(cartItem);
      if (response.status === "Not-Modified") {
        toast.warn(response.message);
      } else if (response.status === "success") {
        toast.success("Item added to cart successfully");
      }
      setIsAdding(false);
    } catch (error) {
      setIsAdding(false);
      toast.error(`${error.message}`);
    }
  };

  const isRemoveButtonDisabled = (canvas) => {
    return (
      selectedText === null &&
      textProps.fontSize === 24 &&
      textProps.fill === "#000000" &&
      textProps.fontFamily === "Arial" &&
      textProps.fontWeight === "" &&
      textProps.fontStyle === "" &&
      textProps.textBackgroundColor === "transparent" &&
      (canvas ? canvas.getObjects().length === 0 : true)
    );
  };

  const frontImageRef = useRef(null);
  const backImageRef = useRef(null);

  const scrollToFront = () => {
    frontImageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    setDisplayedCanvas(fabricCanvasFront);
    fabricCanvasFront.current.discardActiveObject();
    fabricCanvasFront.current.renderAll();
  };

  const scrollToBack = () => {
    backImageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    setDisplayedCanvas(fabricCanvasBack);
    fabricCanvasBack.current.discardActiveObject();
    fabricCanvasBack.current.renderAll();
  };

  const handleDownloadScreenShot = async () => {
    const imageOfDesignFront = await captureScreenShot(
      fabricCanvasFront.current,
      "divToTakeScreenshotFront",
      true
    );

    const imageOfDesignBack = await captureScreenShot(
      fabricCanvasBack.current,
      "divToTakeScreenshotBack",
      true
    );
    console.log("Front Image:", imageOfDesignFront);
    console.log("Back Image:", imageOfDesignBack);
  };

  return (
    <div className="container mx-auto py-14">
      <div className="flex justify-between pb-10">
        <div className="max-w-[420px]">
          <img src="/style.png" alt="object-contain" />
          <p className="text-2xl sm:text-4xl tracking-wide font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-purple-600 to-purple-400">
            Customize your design
          </p>
          <p className="text-textMuted tracking-tight">Create something unique. Add your text, image or both and
            turn it into your perfect t-shirt.
          </p>
        </div>
        <Steps />
      </div>
      <div className="flex flex-col lg:flex-row gap-6  justify-between  custom:gap-4 ">
        <div className="w-full lg:w-3/5 flex flex-col justify-start items-center ">
          {/* designer images and buttons  */}
          <div className="flex flex-col w-full">
            <div className="flex flex-col sm:flex-row sm:justify-center items-center sm:items-start ">
              {/* Buttons for Scrolling */}
              <div className="flex flex-row sm:flex-col justify-start p-4 mr-4 gap-5 bg-surfaceLavender/40 shadow-cardShadow rounded-md h-full w-2/4 sm:w-1/5">
                <button
                  className={`text-white py-2 rounded-sm border-2 transition-colors ${activeView === "front" ? "border-primary" : "border-transparent"
                    }`}
                  onClick={handleFront}
                >
                  <img src={backgroundImage} alt="front model" />
                </button>

                <button
                  className={`text-white py-2 rounded-sm border-2 transition-colors ${activeView === "back" ? "border-primary" : "border-transparent"
                    }`}
                  onClick={handleBack}
                >
                  <img src={backgroundBackImage} alt="back model" />
                </button>
              </div>

              {/* Scroll images */}
              <div
                className="flex overflow-hidden w-full hide-scrollbar rounded-lg shadow-cardShadow"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #d9d4f768 0%, rgb(245 242 255 / 0.4) 50%, #d9d4f753 100%)'
                }}
              >              

                <div
                  id="divToTakeScreenshotFront"
                  ref={frontImageRef}
                  style={{
                    backgroundImage: `url(${backgroundImage})`,
                    minWidth: "400px", // Ensure the div has a minimum width
                    height: "700px", // Ensure the div has a fixed height
                    flexShrink: 0, // Prevent the div from shrinking
                  }}
                  className="w-full flex flex-col justify-center items-center py-10 bg-center bg-no-repeat relative rounded-lg bg-cover sm:bg-contain xs:bg-contain mdplus:bg-contain lgplus:bg-contain p-5 md:w-[600px] md:h-[700px]  "
                >
                  <canvas
                    id="canvasBorderFront"
                    ref={canvasRefFront}
                    style={{
                      border: "1px dashed gray",
                    }}
                  />
                </div>
                <div
                  id="divToTakeScreenshotBack"
                  ref={backImageRef}
                  style={{
                    backgroundImage: `url(${backgroundBackImage})`,
                    minWidth: "400px", // Ensure the div has a minimum width
                    height: "500px", // Ensure the div has a fixed height
                    flexShrink: 0, // Prevent the div from shrinking
                  }}
                  className="w-full flex flex-col justify-center items-center bg-center bg-no-repeat relative rounded-lg bg-cover sm:bg-contain xs:bg-contain mdplus:bg-cover lgplus:bg-contain smplus:bg-cover p-5 md:w-[600px] md:h-[600px]"
                >
                  <canvas
                    id="canvasBorderBack"
                    ref={canvasRefBack}
                    style={{
                      border: "1px dashed gray",
                    }}
                  />
                </div>
              </div>
            </div>
            
          </div>
            <div className="flex gap-2 py-4">
                  <button
                    className="border border-primary/40 text-primary/40 bg-white/90 backdrop-blur-sm py-2 px-3 rounded-full text-sm cursor-pointer transition duration-300 ease-in-out"
                    onClick={() => handleResetCanva(displayedCanvas?.current)}
                  >
                    Clear Design
                  </button>

                  <button
                    className={`flex items-center gap-1 bg-white/90 backdrop-blur-sm text-primary tracking-tighter py-2 px-3 rounded-full text-sm transition duration-300 ease-in-out border border-primary ${isRemoveButtonDisabled(displayedCanvas?.current)
                      ? "bg-gray-200 border-none text-gray-400"
                      : ""
                      }`}
                    onClick={() =>
                      handleRemoveSelectedObj(displayedCanvas?.current)
                    }
                    disabled={isRemoveButtonDisabled(displayedCanvas?.current)}
                  >
                    <DeleteIcon />

                    Remove Selected
                  </button>
                </div>
        </div>

        <div className="w-full lg:w-2/4 p-6 shadow-cardShadow rounded-lg border text-textPrimary border-borderLight">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <div className="font-bold text-xl sm:text-2xl tracking-tighter">
                {name}
              </div>
              <div className=" font-bold text-xl sm:text-2xl  tracking-tighter">
                {totalPrice} EG
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <div className="flex justify-between tracking-tighter">
                <div className="text-lg sm:text-xl font-semibold">
                  Choose Image{" "}
                </div>
                <span className="text-textSecondary">+ 100EG</span>
              </div>

              <div className="flex justify-between items-center">
                <input
                  id="chooseImgFront"
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleAddImageOnCanva(e, displayedCanvas.current)
                  }
                />
                <label
                  htmlFor="chooseImgFront"
                  className="text-primary flex items-center gap-2 justify-center py-4 px-4 rounded cursor-pointer hover:text-primaryDark transition duration-300 ease-in-out  w-full border border-dashed border-surfaceLavender text-center"
                >
                  <div className="flex flex-col items-center">
                  <LuImageUp className="size-8"/>
                    <p className="flex gap-2">
                      Choose Image
                      <ShowMore />
                    </p>
                    <p className="text-xs text-textMuted">
                      PNG. JPG (Max SMB)
                    </p>
                  </div>
                  <div className="relative group inline-block">

                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-max px-2 py-1 mb-3 shadow-md border-gray-300 text-sm text-primary bg-white border rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Drag 5 images only
                    </span>
                  </div>
                </label>
              </div>

              <div className="">
                <div className="flex justify-between ">
                  <div className="text-lg sm:text-xl font-semibold tracking-tighter">Add Text</div>
                  <span className="text-textSecondary">+ 50EG</span>
                </div>
                <button
                  className="text-textMuted flex items-center gap-2 justify-start py-4 px-4 rounded cursor-pointer hover:text-textSecondary transition duration-300 ease-in-out  w-full border border-surfaceLavender tracking-tighter"
                  id="addTextBtnFront"
                  onClick={() => handleAddText(displayedCanvas.current)}
                >
                  <span className="text-xl bg-surfaceLavender text-primary rounded-full p-2">
                    <MdFormatTextdirectionLToR />
                  </span>
                  Add your text here...
                </button>
              </div>
            </div>
            <div className="">
              <p className="text-lg sm:text-xl font-semibold tracking-tighter">Text Control</p>
              <div className="bg-surfacePurple/40 px-4 py-3 rounded-md border border-surfaceLavender">
                <div className="">
                  <div className="flex gap-8 items-center">
                    <div className="font-medium tracking-tighter text-sm">
                      <label htmlFor="font-size">Font Size</label>
                    </div>
                    <span className="ml-4 text-sm">{textProps.fontSize}</span>
                    <div className="flex-1">
                      <input
                        id="font-size"
                        type="range"
                        min={1}
                        max="50"
                        value={textProps.fontSize}
                        className="range range-xs w-full"
                        onChange={(e) => {
                          if (parseInt(e.target.value) <= 0 || e.target.value === "") {
                            e.target.value = 1;
                          }
                          handleUpdateTextProps("fontSize", parseInt(e.target.value));
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-12 items-center mt-3">
                    <div className="font-medium tracking-tighter text-sm">
                      <label htmlFor="font-style">Font Style</label>
                    </div>
                    <div className="">
                      <select
                        id="font-style"
                        className="border border-primary py-2 px-4 rounded-full  outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        value={textProps.fontFamily}
                        onChange={(e) => {
                          handleUpdateTextProps("fontFamily", e.target.value);
                        }}
                      >
                        <option defaultValue value="arial">Arial</option>
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
                </div>

                <div className="flex items-center justify-between gap-9 mt-3">
                  <div className="flex items-center gap-3">
                    <label htmlFor="color_picker" className="font-medium tracking-tighter text-sm">
                      Color
                    </label>
                    <input
                      id="color_picker"
                      className="p-1 h-8 w-12 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                      type="color"
                      value={textProps.fill}
                      onChange={(e) => {
                        handleUpdateTextProps("fill", e.target.value);
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label htmlFor="bold-button" className="font-medium tracking-tighter text-sm">
                      Bold
                    </label>
                    <input
                      id="bold-button"
                      type="checkbox"
                      checked={textProps.fontWeight === "bold"}
                      onChange={() => {
                        handleUpdateTextProps(
                          "fontWeight",
                          textProps.fontWeight === "bold" ? "" : "bold"
                        );
                      }}
                      className="toggle toggle-sm toggle-primary"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label htmlFor="italic-button" className="font-medium tracking-tighter text-sm">
                      Italic
                    </label>
                    <input
                      id="italic-button"
                      type="checkbox"
                      checked={textProps.fontStyle === "italic"}
                      onChange={() => {
                        handleUpdateTextProps(
                          "fontStyle",
                          textProps.fontStyle === "italic" ? "" : "italic"
                        );
                      }}
                      className="toggle toggle-sm toggle-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between" onClick={scrollToSizeChart}>
              <RadioComponent
                setSize={setSelectedSize}
                stock={stockAvailable}
              />
            </div>

            <div className="w-full max-w-md mx-auto flex flex-col gap-3">
              <div className="flex gap-3">
                <button
                  onClick={handleDownloadScreenShot}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full 
                 border border-borderLight bg-white text-sm font-medium text-textSecondary
                 hover:bg-gray-50 transition duration-300 ease-in-out"
                >
                  <Downloads className="size-3" />
                  <span>Save Design to Device</span>
                </button>

                {isLoggedIn && (
                  <button
                    onClick={() => handleSaveDesign("save")}
                    disabled={isSaving}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-full 
                    border border-borderLight bg-white text-sm font-medium text-textSecondary
                    hover:bg-gray-50 transition duration-300 ease-in-out
                    ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isSaving ? (
                      <span className="loading loading-ring loading-sm"></span>
                    ) : (
                      <>
                        <FiBookmark className="size-4" />
                        <span>Save to Profile</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {isLoggedIn ? (
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full text-sm shadow-cardShadow flex items-center justify-center gap-2 py-2 px-4 rounded-full 
                 text-white bg-primaryGradient tracking-tight cursor-pointer
                 hover:opacity-90 transition duration-300 ease-in-out"
                >
                  {isAdding ? (
                    <span className="loading loading-ring loading-md"></span>
                  ) : (
                    <>
                      <FiShoppingCart className="w-5 h-5" />
                      <span>ADD TO CART</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={navigateToLogin}
                  className="w-full bg-red-500 hover:bg-red-600 transition duration-700 ease-in-out 
                 rounded-full text-white py-3 px-4 font-medium"
                >
                  Login to save and Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <NeedHelp/>

      <div ref={sizeChartRef} className="py-10">
        <SizeCharts />
      </div>
    </div>
  );
}