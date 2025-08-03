"use client";

import Loading from "@/components/commons/loading";
import { CHAT_ROUTE } from "@/constants/routes";
import LoginResponse from "@/dto/auth/login.response";
import { AuthService } from "@/services/auth.service";
import { useUserStore } from "@/stores/profile";
import { Button, Label, TextInput, Checkbox } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    AuthService.removeAuthToken();
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response: LoginResponse = await AuthService.login({ email, password });
      AuthService.storeAuthToken(response.data.accessToken);
      setUser(response.data.profile)
      router.push(CHAT_ROUTE); // or wherever you want to go
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
      <div className="min-h-screen dark:bg-gray-900 text-white grid md:grid-cols-2">
        {/* — Left side: features list — */}
        <div className="p-12 flex flex-col justify-center space-y-8">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-full">
              {/* replace with your SVG or icon */}
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
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
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
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
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
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
            <h2 className="text-2xl font-bold mb-6 text-white">Welcome To Tonsaeay Chat</h2>

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
              <div>
                <Label htmlFor="email" className="text-gray-200" />
                <TextInput 
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.currentTarget.value)} required />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-200" />
                <TextInput id="password" type="password" placeholder="••••••••" onChange={(e) => setPassword(e.currentTarget.value)} required />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-gray-200">Remember me</Label>
                </div>
                <a href="#" className="text-blue-500 hover:underline text-sm">Forgot password?</a>
              </div>

              <Button fullSized onClick={handleSubmit}>Sign in to your account</Button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              Don’t have an account yet?{" "}
              <a href="/register" className="text-blue-500 hover:underline">Sign up here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
