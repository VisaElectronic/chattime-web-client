import { FC, Suspense } from "react";
import ResetPassword from "../components/reset-password/reset-password";

const Page: FC = () => {
    return (
        <Suspense>
            <ResetPassword />
        </Suspense>
    );
}

export default Page;