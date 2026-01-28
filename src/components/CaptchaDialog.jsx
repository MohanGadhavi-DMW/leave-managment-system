import React, { useEffect, useState } from "react";
import {
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import { ArrowPathIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import CrossIcon from "@/assets/icons/cross-small.png";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

const CaptchaDialog = ({
  open = true,
  setOpen = () => {},
  values = {},
  title = "Security Verification",
  onVerificationComplete = () => {},
}) => {
  const [captchaInput, setCaptchaInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  //  ------------------------------------------------------------
  useEffect(() => {
    if (open) loadCaptchaEnginge(6);
  }, [open]);

  const handleCaptchaSubmit = async () => {
    if (validateCaptcha(captchaInput)) {
      setCaptchaInput("");
      setErrorMsg("");
      setOpen(false);
      onVerificationComplete();
    } else {
      setErrorMsg("Invalid Captcha !");
      loadCaptchaEnginge(6);
      setCaptchaInput("");
    }
  };

  const initValues = {
    email: "",
    phone: "",
    dialCode: "",
    countryCode: "",
  };

  {
    /* CAPTCHA DIALOG */
  }
  return (
    <Dialog open={open} handler={() => setOpen(false)} size="md">
      <DialogHeader className="flex justify-between items-center">
        {title}
        <img
          src={CrossIcon}
          alt="close"
          className="w-6 h-6 cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </DialogHeader>

      <DialogBody className="px-8 py-6 space-y-4">
        <div className="flex justify-center">
          <div className="flex items-center border rounded-lg p-4">
            <LoadCanvasTemplate />
            <div className="flex flex-col ml-3">
              <IconButton variant="text" onClick={() => loadCaptchaEnginge(6)}>
                <ArrowPathIcon className="h-5 w-5" />
              </IconButton>
              <IconButton variant="text">
                <SpeakerWaveIcon className="h-5 w-5" />
              </IconButton>
            </div>
          </div>
        </div>

        <Typography className="text-sm font-medium text-gray-800 mt-2">
          Type characters as shown above
        </Typography>

        <input
          label="Enter Captcha"
          value={captchaInput}
          onChange={(e) => setCaptchaInput(e.target.value)}
          className="w-full px-5 py-3  rounded-md text-sm text-black font-medium"
        />
        {errorMsg && <div className="error">{errorMsg}</div>}
      </DialogBody>

      <DialogFooter>
        <button onClick={handleCaptchaSubmit} className="primary-btn">
          Submit
        </button>
      </DialogFooter>
    </Dialog>
  );
};

export default CaptchaDialog;
