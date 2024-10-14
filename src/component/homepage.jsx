import Fingerprint from "../assets/icons/Fingerprint.svg";
import fingertwo from "../assets/icons/fingertwo.svg";
import scanner from "../assets/icons/scanner.svg";
import Workstation from "../assets/icons/Workstation.svg";
import { useState, useEffect } from "react";
import fingerprint, { findPort, stream, capture } from "fingerprint-scanners";
import {
  CAPTURE_BODY,
  DEVICE_ID,
  DEVICE_SUB_ID,
  STREAM_TIMEOUT,
} from "../../config.js";

function Header() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [devicePort, setDevicePort] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [capturedData, setCapturedData] = useState(null);

  const validate = () => {
    let formErrors = {};
    if (!name) formErrors.name = "Name is required";
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email address is invalid";
    }
    return formErrors;
  };

  const DetectDevice = async () => {
    try {
      const port = await findPort();
      if (port) {
        setDevicePort(port);
        setError(null); // Clear any previous errors
      } else {
        
      }
    } catch (err) {
      setError("Error detecting device: " + err.message);
    }
  };

  
const captureFingerprint = async () => {
    if (devicePort && streaming) {
      try {
        const data = await capture({
          ...CAPTURE_BODY,
          deviceId: DEVICE_ID,
          deviceSubId: DEVICE_SUB_ID,
        });
        setCapturedData(data);
        setStreaming(false);
        console.log("Fingerprint captured successfully:", data);
      } catch (err) {
        setError("Error capturing fingerprint: " + err.message);
      }
    } else {
      setError("Streaming is not active or device is not connected.");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      console.log("Form Submitted: ", { name, email });
      // Reset form values after submission
      setName("");
      setEmail("");
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };
  return (
    <div className="flex flex-col gap-[90px] ">
      <div className="mt-[4%] flex flex-col items-center gap-[20px] ">
        <img
          className="w-[70px] h-[70px] "
          src={Fingerprint}
          alt="fingerprint Icon"
        />
        <p className="text-[26px] font-semibold font-montserrat text-darkgray">
          Welcome to Our Secure Fingerprint Capture Portal
        </p>
        <p className="mt-[-10px] text-center font-montserrat w-[650px] ">
          Your identity matters, and we're here to make it safer and easier for
          you. Use our fast, secure, and reliable system to capture your
          fingerprint effortlessly.
        </p>
      </div>
      <div className="flex mx-[8%] ">
        <div className="flex-col mt-[20px]">
          <img
            className="ml-[15px] w-[150px] h-[150px] "
            src={Workstation}
            alt="scan Icon"
          />
          <p
            onClick={() => {
              DetectDevice();
              console.log("clicked");
            }}
            className="cursor-pointer w-[200px] font-montserrat bg-darkgreen mt-[30px]  p-[10px] rounded  text-white text-[13px] "
          >
            Click to check for scanner.
          </p>
          {devicePort ? (
            <p className="mt-[10px] font-montserrat text-[12px] ">
              Device detected
            </p>
          ) : (
            <p className="mt-[10px] font-montserrat text-[12px] ">
              Please Install your fingerprint device sdk and try again
            </p>
          )}
        </div>
        <div className="ml-[80px] font-montserrat ">
          <p>Get Started</p>
          <div className="mt-[15px]  flex ">
            <form>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="font-montserrat font-light mt-1 block w-[280px] pl-[5px] border border-gray-300 h-[34px]  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  className="font-montserrat font-light mt-1 block w-[280px] pl-[5px] border border-gray-300 h-[34px]  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                className="mt-[40px] font-montserrat ml-[260px] w-[130px] h-[39px] bg-darkgreen text-white px-4 py-2 rounded-md "
              >
                Submit
              </button>
            </form>
           <div className="flex gap-[50px] ">
           <img className="w-[70px] h-[70px]" src={fingertwo} alt="finger print icon" />
           <div className="flex-col gap-[20px] ">
           <button
              onClick={()=>{
                captureFingerprint
              }}
                className="font-montserrat w-[100px] h-[39px] bg-darkgreen text-white px-4 py-2 rounded "
              >
                Scan
              </button>
              <p className="mt-[20px] text-[12px] ">fingerprint data : {capturedData} </p>
           </div>
           </div>
          </div>
          <div>
    
          </div>
        </div>
      </div>
    </div>
  );
}





export default Header;
