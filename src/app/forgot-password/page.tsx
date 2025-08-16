"use client";

import Loading from "@/components/commons/loading";
import ToastBoss from "@/components/commons/toast-container";
import { LOGIN_ROUTE } from "@/constants/routes";
import { AuthService } from "@/services/auth.service";
import { Button, Label, TextInput } from "flowbite-react";
import { FC, useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword: FC = () => {
    const [email, setEmail] = useState("");
    const [, setError] = useState<string | null>(null);
    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!email) {
            toast.error('Please enter email address.');
            return;
        }

        setLoading(true);

        try {
            const res = await AuthService.forgotPassword({
                email
            });
            if (res.success) {
                setEmailSent(true);
                return;
            }
            toast.error(res.message ?? 'Something Went Wrong.');
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
            <div className="min-h-screen dark:bg-gray-900 dark:text-white grid md:grid-cols-1">
                <div className="flex items-center justify-center p-12">
                    <div className="w-full max-w-md dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-6 dark:text-white">Welcome To Tonsaeay Chat</h2>
                        {
                            !emailSent &&
                            <>
                                <form className="space-y-4">
                                    <p>
                                        Please enter the email address you used to register. We&apos;ll send you a link to reset your password.
                                    </p>

                                    <div>
                                        <Label htmlFor="email" className="dark:text-gray-200" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            onChange={(e) => setEmail(e.currentTarget.value)} required />
                                    </div>

                                    <Button fullSized onClick={handleSubmit} disabled={loading ? true : false}>Submit</Button>
                                </form>
                                <p className="text-gray-400 text-sm mt-6">
                                    Back to login ? Click here {" "}
                                    <a href={LOGIN_ROUTE} className="text-blue-500 hover:underline">Log In</a>
                                </p>
                            </>
                        }
                        {
                            emailSent &&
                            <>
                                <p>
                                    Email is sent, check your inbox.
                                </p>
                                <p className="text-gray-400 text-sm mt-6">
                                    Back to login ? Click here {" "}
                                    <a href={LOGIN_ROUTE} className="text-blue-500 hover:underline">Log In</a>
                                </p>
                            </>
                        }
                    </div>
                </div>
            </div>
            <ToastBoss />
        </div>
    );
}

export default ForgotPassword;