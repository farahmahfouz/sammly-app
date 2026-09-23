import "../styles/scroll.css";

import { useRef, useEffect, useState, useContext } from "react";
import { fabric } from "fabric";
import { useNavigate, useParams } from "react-router";
import RadioComponent from "../components/RadioComponent";
import SizeCharts from "../features/productDetails/SizeCharts.jsx";
import XIcon from "../icons/XIcon";
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

  const handleCaptureScreenShot = async (canvas) => {
    try {
      const imageOfDesign = await captureScreenShot(canvas);
      return imageOfDesign;
    } catch (error) {
      console.log("screenshoterror", error);
      return null;
    }
  };

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
      console.log("Object added:", e.target.type);
      setCanvasObjects((prevObjects) => [...prevObjects, e.target]);
    };

    const handleObjectRemoved = (e) => {
      console.log("Object removed:", e.target.type);
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
        console.log("Text selected:", e.selected[0]);
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

      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      setTotalPrice(totalPrice);
      console.log(totalPrice);

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
  // const handleWheel = (event) => {
  //   event.preventDefault();
  //   // event.stopImmediatePropagation()
  //   // event.stopPropagation();
  // };

  // solve error of handlewheel
  // useEffect(() => {
  //   const handleWheel = (event) => {
  //     event.preventDefault();
  //   };

  //   window.addEventListener("wheel", handleWheel, { passive: false });

  //   return () => {
  //     window.removeEventListener("wheel", handleWheel);
  //   };
  // }, []);
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
    <div className="container mx-auto px-4 mb-20 ">
      <div className="text-textColor text-3xl sm:text-4xl text-center my-5 sm:my-8 md:my-10 font-bold">
        Customize your design
      </div>
      <div className="flex flex-col lg:flex-row gap-6  justify-between  custom:mx-24 custom:gap-4 ">
        <div className="w-full lg:w-3/5 flex flex-col justify-start items-center ">
          {/* designer images and buttons  */}
          <div className="flex flex-col w-full">
            <div className="flex sm:justify-between justify-evenly w-full">
              <button
                className="border border-red-500 text-red-500 py-2 px-2 rounded w-32 sm:w-1/4 md:w-32 lg:w-32 cursor-pointer  transition duration-300 ease-in-out"
                onClick={() => handleResetCanva(displayedCanvas?.current)}
              >
                Clear Design
              </button>

              <button
                className={`bg-white text-buttonColor py-2 px-4 rounded w-44 sm:w-1/4 md:w-44 lg:w-44 transition duration-300 ease-in-out border border-buttonColor ${
                  isRemoveButtonDisabled(displayedCanvas?.current)
                    ? "bg-gray-200 border-none"
                    : ""
                }`}
                onClick={() =>
                  handleRemoveSelectedObj(displayedCanvas?.current)
                }
                disabled={isRemoveButtonDisabled(displayedCanvas?.current)}
              >
                Remove Selected
              </button>
            </div>

            <div className="flex flex-col  sm:flex-row   sm:justify-center items-center sm:items-start ">
              {/* Buttons for Scrolling */}
              <div className="flex flex-row sm:flex-col justify-center mt-5 gap-5 bg-lightBackGround w-2/4 sm:w-1/5">
                <button
                  className=" text-white py-2 px-4 rounded "
                  onClick={scrollToFront}
                >
                  <img src={backgroundImage} alt="front model" />
                </button>
                <button
                  className="  text-white py-2 px-4 rounded"
                  onClick={scrollToBack}
                >
                  <img src={backgroundBackImage} alt="back model" />
                </button>
              </div>

              {/* Scroll images */}
              <div className="flex overflow-hidden mt-5 w-full hide-scrollbar  ">
                <div
                  id="divToTakeScreenshotFront"
                  ref={frontImageRef}
                  style={{
                    backgroundImage: `url(${backgroundImage})`,
                    minWidth: "400px", // Ensure the div has a minimum width
                    height: "500px", // Ensure the div has a fixed height
                    flexShrink: 0, // Prevent the div from shrinking
                  }}
                  className="w-full flex flex-col justify-center items-center bg-center bg-no-repeat bg-white relative rounded-lg bg-cover sm:bg-contain xs:bg-contain mdplus:bg-contain lgplus:bg-contain p-5 md:w-[600px] md:h-[600px]  "
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
                  className="w-full flex flex-col justify-center items-center bg-center bg-no-repeat bg-white relative rounded-lg bg-cover sm:bg-contain xs:bg-contain mdplus:bg-cover lgplus:bg-contain smplus:bg-cover p-5 md:w-[600px] md:h-[600px]"
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
        </div>

        <div className="w-full lg:w-2/4 p-4 shadow-md rounded-lg border border-gray-300 text-base-content">
          <div className="flex flex-col p-5">
            <div className="flex justify-between">
              <div className="mb-5 font-bold text-xl sm:text-2xl text-black">
                {name}
              </div>
              <div className="mb-5 font-bold text-xl sm:text-2xl ">
                {totalPrice} EG
              </div>
            </div>
            <div className="flex flex-col justify-center mb-5">
              <div className="flex justify-between mt-5 mb-2">
                <div className="text-lg sm:text-xl font-bold">
                  Choose Image{" "}
                </div>
                <span>+ 100EG</span>
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
                  className=" bg-white text-buttonColor py-4 px-4 rounded cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out  w-full border border-buttonColor text-center "
                >
                  Choose Image
                  <div className="relative group inline-block">
                    <ShowMore />
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 mb-3 shadow-md rounded border border-gray-300 text-sm text-textColor bg-white border rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Drag 5 images only
                    </span>
                  </div>
                </label>
                {/* <inp-ut
                  id="chooseImgBack"
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleAddImageOnCanva(e, fabricCanvasBack.current)
                  }
                />
                <label
                  htmlFor="chooseImgBack"
                  className=" bg-white text-buttonColor py-4 px-4 rounded cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out  w-full border border-buttonColor text-center "
                >
                  Choose Image for Back
                </label> */}
              </div>

              <div className="mt-5">
                <div className="flex justify-between mb-2">
                  <div className="text-lg sm:text-xl font-bold">Add Text</div>
                  <span>+ 50EG</span>
                </div>
                <button
                  className=" bg-white text-buttonColor py-4 px-4 rounded cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out  w-full border border-buttonColor "
                  id="addTextBtnFront"
                  onClick={() => handleAddText(displayedCanvas.current)}
                >
                  Add Text
                </button>
              </div>
            </div>
            <div className="text-lg sm:text-xl font-bold">Text Control</div>
            <div className="bg-lightBackGround p-3 mt-3 rounded ">
              <div className="">
                <div className="flex gap-8  items-center mt-3">
                  <div className="">
                    <label htmlFor="font-size">Font Size</label>
                  </div>
                  <span className="ml-4 text-sm">{textProps.fontSize}</span>
                  <div className="">
                    <input
                      id="font-size"
                      type="range"
                      min={1}
                      max="50"
                      value={textProps.fontSize}
                      className="range range-xs"
                      onChange={(e) => {
                        if (
                          parseInt(e.target.value) <= 0 ||
                          e.target.value === ""
                        ) {
                          e.target.value = 1;
                        }
                        handleUpdateTextProps(
                          "fontSize",
                          parseInt(e.target.value)
                        );
                        console.log("Font size changed to:", e.target.value);
                        console.log(textProps);
                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-12 items-center mt-3 ">
                  <div className="">
                    <label htmlFor="font-style">Font Style</label>
                  </div>
                  <div className="">
                    <select
                      id="font-style"
                      className="select select-sm border-buttonColor select-success w-full max-w-xs"
                      value={textProps.fontFamily}
                      onChange={(e) => {
                        handleUpdateTextProps("fontFamily", e.target.value);
                        console.log("Font family changed to:", e.target.value);
                        console.log(textProps);
                      }}
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
              </div>
              <div className="lg:flex justify-between">
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
                      value={textProps.fill}
                      onChange={(e) => {
                        handleUpdateTextProps("fill", e.target.value);
                        console.log("Color changed to:", e.target.value);
                        console.log(textProps);
                      }}
                    />
                  </div>
                </div>

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
                        console.log("Bold changed to:", textProps.fontWeight);
                      }}
                      className="checkbox"
                    />
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
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between my-5">
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
                stock={stockAvailable}
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
            <div className="flex justify-center gap-2 text-textColor">
              <span
                onClick={handleDownloadScreenShot}
                className="text-sm cursor-pointer"
              >
                Download your design images
              </span>
              <button onClick={handleDownloadScreenShot}>
                <Downloads />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:flex justify-end sm:mx-40 mt-5">
        {isLoggedIn && (
          <button
            className={`me-5 bg-white text-buttonColor py-2 px-4 rounded cursor-pointer 
                  hover:bg-gray-100 transition duration-300 ease-in-out mt-5 w-full sm:w-44 
                  border border-buttonColor ${
                    isSaving ? "opacity-50 cursor-not-allowed" : ""
                  }`}
            onClick={() => handleSaveDesign("save")}
            disabled={isSaving}
          >
            {isSaving ? (
              <span className="loading loading-ring loading-md"></span>
            ) : (
              "Save Design"
            )}
            <div className="relative group inline-block">
              <ShowMore />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 mb-3 shadow-md rounded border border-gray-300 text-sm text-textColor bg-white border rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                If you want to Edit your design later, save it.
              </span>
            </div>
          </button>
        )}
        {isLoggedIn ? (
          <button
            onClick={handleAddToCart}
            style={{
              background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
            }}
            className="py-2 px-4 rounded cursor-pointer transition duration-700 ease-in-out text-white btn mt-5 w-full sm:w-44 me-2"
            disabled={isAdding}
          >
            {isAdding ? (
              <span className="loading loading-ring loading-md"></span>
            ) : (
              "ADD TO CART"
            )}
          </button>
        ) : (
          <button
            onClick={navigateToLogin}
            className="bg-red-500 hover:bg-red-600 transition duration-700 ease-in-out rounded w-60 text-white py-2 px-10 me-16"
          >
            Login to save and Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
