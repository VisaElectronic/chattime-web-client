"use client"

import Loading from '@/components/commons/loading';
import SimpleCountdown from '@/components/commons/simple-countdown';
import ToastBoss from '@/components/commons/toast-container';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '@/constants/routes';
import { RegisterOTPDto } from '@/dto/auth/register-otp.request';
import { RegisterResendOTPDto } from '@/dto/auth/register-resend.request';
import { RegisterVerifyOTPDto } from '@/dto/auth/register-verify.request';
import { AuthService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect, FC } from 'react';
import { toast } from 'react-toastify';

const VerifyRegister: FC = () => {
  // State to hold the OTP digits. An array allows for individual digit control.
  // Explicitly typing 'otp' as a string array.
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']); // Assuming a 6-digit OTP
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [resendDuration,] = useState(70);

  // Refs for each input field to manage focus
  // Typing 'inputRefs' as a mutable ref object that can hold an array of HTMLInputElement or null.
  const inputRefs = useRef(Array.from({ length: otp.length }, () => React.createRef<HTMLInputElement | null>()));

  // Function to handle changes in OTP input fields
  // 'e' is typed as React.ChangeEvent<HTMLInputElement> for input change events.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    // Only allow single digit input
    if (value.length > 1) return;

    // Update the OTP state
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically move to the next input field if a digit is entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].current?.focus();
    }
  };

  // Function to handle backspace key press
  // 'e' is typed as React.KeyboardEvent<HTMLInputElement> for keyboard events on input elements.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // If backspace is pressed and the current field is empty, move to the previous field
      inputRefs.current[index - 1].current?.focus();
    }
  };

  // Function to handle paste event
  // 'e' is typed as React.ClipboardEvent<HTMLInputElement> for paste events on input elements.
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    // Ensure pasted data is numeric and matches OTP length
    if (/^\d+$/.test(pasteData) && pasteData.length === otp.length) {
      const newOtp = pasteData.split('');
      setOtp(newOtp);
      // Move focus to the last input field after pasting
      inputRefs.current[otp.length - 1].current?.focus();
    }
  };

  // Function to simulate OTP verification
  const handleVerifyOtp = async () => {
    setLoading(true);
    const enteredOtp = otp.join('');
    try {
      const preData: RegisterOTPDto = JSON.parse(sessionStorage.getItem('register-info') ?? '');
      console.log('preData', preData);
      if(!preData.identifier) return;
      const data: RegisterVerifyOTPDto = {
        ...preData,
        otpCode: enteredOtp
      };
      const res = await AuthService.registerVerify(data);
      if (res.success) {
        router.push(LOGIN_ROUTE); // or wherever you want to go
        return;
      }
      toast.error(res.message ?? '500 Internal Server Error');
    } catch (err: unknown) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setCanResend(false);
    try {
      const preData: RegisterOTPDto = JSON.parse(sessionStorage.getItem('register-info') ?? '');
      const data: RegisterResendOTPDto = {
        email: preData.email,
        identifier: preData.identifier
      }
      const res = await AuthService.registerResend(data);
      if (res.success) {
        preData.identifier = res.data.identifier;
        sessionStorage.setItem('register-info', JSON.stringify(preData));
        toast.info('OTP is sent to your email.');
        return;
      }
      toast.error(res.message ?? '500 Internal Server Error');
      sessionStorage.setItem('register-info', '');
      router.replace(REGISTER_ROUTE);
    } catch (err: unknown) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Focus the first input field on component mount
  useEffect(() => {
    inputRefs.current[0].current?.focus();
  }, []);

  return (
    <div>
      {loading && <Loading />}
      <div className="min-h-screen dark:bg-gray-900 dark:text-white grid md:grid-cols-1">
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
          <div className="dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Verify Your Account</h2>
            <p className="text-gray-600 dark:text-gray-200 mb-6">
              Please enter the 6-digit code sent to your email.
            </p>

            <div className="flex justify-center space-x-2 sm:space-x-3 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1} // maxLength can be a number
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  ref={inputRefs.current[index]}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100
                            border border-gray-300 dark:border-gray-500 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                            outline-none transition-all duration-200 shadow-sm dark:bg-gray-700
                            appearance-none [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:_hidden [&::-webkit-inner-spin-button]:_hidden"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6
                        rounded-lg shadow-md hover:shadow-lg transition-all duration-300
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              Verify OTP
            </button>

            <div className="flex gap-1 justify-center text-gray-500 text-sm mt-6">
              <div>
                Didn&apos;t receive the code?{' '}
              </div>
              {
                canResend &&
                <a className="text-blue-600 hover:underline cursor-pointer" onClick={handleResendOtp}>
                    Resend Code
                </a>
              }
              {
                !canResend &&
                <SimpleCountdown 
                  initialSeconds={resendDuration}
                  setCanResend={setCanResend}
                />
              }
            </div>
          </div>
        </div>
      </div>
      <ToastBoss />
    </div>
  );
};

export default VerifyRegister;
