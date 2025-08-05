"use client";

import Loading from "@/components/commons/loading";
import { LOGIN_ROUTE } from "@/constants/routes";
import { AuthService } from "@/services/auth.service";
import { Button, Label, TextInput, Checkbox } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await AuthService.register({
        firstname,
        lastname,
        phone,
        email,
        password
      });
      router.push(LOGIN_ROUTE); // or wherever you want to go
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError(String(err))
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {loading && <Loading />}
      <div className="min-h-screen dark:bg-gray-900 dark:text-white grid md:grid-cols-2">
        {/* — Left side: features list — */}
        <div className="p-12 flex flex-col justify-center space-y-8">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-full">
              {/* replace with your SVG or icon */}
              <svg className="w-5 h-5 dark:text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Chat With Your Friends</h3>
              <p className="text-gray-400">Real time chat communication with your friends.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-full">
              <svg className="w-5 h-5 dark:text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Send Photos, Videos and Voice Messages</h3>
              <p className="text-gray-400">Send photos, videos and voice message to your friends.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-full">
              <svg className="w-5 h-5 dark:text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Available On Web or App</h3>
              <p className="text-gray-400">Chat on website or mobile app freely</p>
            </div>
          </div>
        </div>

        {/* — Right side: login form — */}
        <div className="flex items-center justify-center p-12">
          <div className="w-full max-w-md dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Create your Free Account</h2>

            {/* <div className="flex space-x-4 mb-6">
              <Button outline pill className="flex-1 text-xs">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"></svg>
                Log in with Google
              </Button>
              <Button outline pill className="flex-1 text-xs">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"></svg>
                Log in with Apple
              </Button>
            </div>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-600" />
              <span className="px-2 text-gray-400">or</span>
              <hr className="flex-grow border-gray-600" />
            </div> */}

            <form className="space-y-4">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="firstname" className="dark:text-gray-200">First Name</Label>
                  <TextInput 
                    id="firstname"
                    type="text" 
                    placeholder="Enter your email"
                    value={firstname}
                    onChange={(e) => setFirstname(e.currentTarget.value)} required 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="lastname" className="dark:text-gray-200">Last Name</Label>
                  <TextInput 
                    id="lastname"
                    type="text" 
                    placeholder="Enter your email"
                    value={lastname}
                    onChange={(e) => setLastname(e.currentTarget.value)} required 
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="dark:text-gray-200">Your Email</Label>
                <TextInput 
                  id="email"
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)} required 
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone" className="dark:text-gray-200" >Your Phone</Label>
                <TextInput 
                  id="phone"
                  type="text" 
                  placeholder="Enter your phone" 
                  value={phone}
                  onChange={(e) => setPhone(e.currentTarget.value)} required 
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="dark:text-gray-200" >Password</Label>
                <TextInput
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  onChange={(e) => setPassword(e.currentTarget.value)} required 
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="confirm-password" className="dark:text-gray-200">Confirm Password</Label>
                <TextInput
                  id="confirm-password" 
                  type="password" 
                  placeholder="••••••••" 
                  onChange={(e) => setPassword(e.currentTarget.value)} required 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <Checkbox id="agree" className="w-6" />
                  <Label htmlFor="agree" className="dark:text-gray-200">By signing up, you are creating a account, and you agree to Terms of Use and Privacy Policy.</Label>
                </div>
              </div>

              <Button fullSized onClick={handleSubmit}>Create an account</Button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">Sign in here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
