"use client";

import Loading from "@/components/commons/loading";
import ToastBoss from "@/components/commons/toast-container";
import { LOGIN_ROUTE } from "@/constants/routes";
import { AuthService } from "@/services/auth.service";
import { Button, Label, TextInput } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "react-toastify";

const ResetPassword: FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const token = searchParams.get('token');
        const email = searchParams.get('email');
        if (!token || !email) {
            toast.error('Something Went Wrong.');
            return;
        }
        if (!password || !confirmPassword) {
            toast.error('Please enter password and confirm password.');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Confirm password does not match.');
            return;
        }

        setLoading(true);

        try {
            const res = await AuthService.resetPassword({
                token,
                email,
                password,
                confirmPassword
            });
            if (res.success) {
                toast.success(res.message ?? 'Something Went Wrong.');
                setTimeout(() => {
                    router.push(LOGIN_ROUTE);
                }, 1000);
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
                        <h2 className="text-2xl font-bold mb-6 dark:text-white">Tonsaeay Chat Reset Password</h2>
                        <form className="space-y-4">

                            <div>
                                <Label htmlFor="password" className="dark:text-gray-200" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    placeholder="New Password"
                                    onChange={(e) => setPassword(e.currentTarget.value)} required />
                            </div>
                            <div>
                                <Label htmlFor="confirm-password" className="dark:text-gray-200" />
                                <TextInput
                                    id="confirm-password"
                                    type="password"
                                    placeholder="Confirm New Password"
                                    onChange={(e) => setConfirmPassword(e.currentTarget.value)} required />
                            </div>

                            <Button fullSized onClick={handleSubmit}>Reset Password</Button>
                        </form>

                        <p className="text-gray-400 text-sm mt-6">
                            Back to login ? Click here {" "}
                            <a href={LOGIN_ROUTE} className="text-blue-500 hover:underline">Log In</a>
                        </p>
                    </div>
                </div>
            </div>
            <ToastBoss />
        </div>
    );
}

export default ResetPassword;