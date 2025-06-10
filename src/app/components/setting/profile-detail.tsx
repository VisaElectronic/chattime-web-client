import { LOGIN_ROUTE } from "@/constants/routes";
import User from "@/models/User";
import { AuthService } from "@/services/auth.service";
import { UserService } from "@/services/user.service";
import { useUserStore } from "@/stores/profile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Datepicker } from "flowbite-react";

export default function ProfileSettings() {
  const router = useRouter();
  const [profile, setProfile] = useState<User | null>(null);
  const [, setError] = useState<string | null>(null);
  const [, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [dob, setDob] = useState<Date>();

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await UserService.fetchProfile();
        setProfile(user);
        setFirstname(user.firstname);
        setLastname(user.lastname);
        setBio(user.bio);
        setUser(user)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        }
      }
    }
    fetchData();
  }, []);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthService.logout();
      AuthService.removeAuthToken();
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
    <div className="w-full min-h-screen flex items-start justify-center py-8 px-4">
      <div className="w-full max-w-lg rounded-xl shadow-lg p-6 space-y-6">
        {/* Profile Photo + Name */}
        <div className="flex items-center space-x-4 bg-gray-800 rounded-lg p-2">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image
              src="https://i.pravatar.cc/40?img=5"
              alt="Profile"
              width={50}
              height={50}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col flex-auto">
            <input
              id="firstname"
              value={firstname}
              onChange={e => setFirstname(e.target.value)}
              type="text"
              placeholder="test"
              className="flex-1 text-white placeholder-gray-400 focus:outline-none pb-3"
            />
            <hr className="border-solid text-[#666e7a]" />
            <input
              id="lastname"
              value={lastname}
              onChange={e => setLastname(e.target.value)}
              type="text"
              placeholder="test"
              className="flex-1 text-white placeholder-gray-400 focus:outline-none pt-3"
            />
          </div>
        </div>
        <p className="text-gray-400 text-sm">
          Enter your name and add a profile photo.
        </p>

        {/* Bio */}
        <div>
          <label className="block text-gray-200 text-xs mb-1">BIO</label>
          <input
            id="bio"
            type="text"
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder="A few words about you"
            className="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <p className="text-gray-400 text-sm mt-1">
            Any details such as age, occupation or city.
          </p>
          <p className="text-gray-400 text-sm">Example: 23 y.o. designer from San Francisco</p>
        </div>

        {/* Date of Birth */}
        <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-lg">
          <span className="text-gray-200 font-medium">Date of Birth</span>
          <Datepicker 
            defaultValue={dob}
            value={dob} 
            onChange={(date: Date | null) => date ? setDob(date) : null}
            placeholder="Pick Your Date Of Birth"
          />
        </div>
        <p className="text-gray-400 text-sm">Only your contacts will see your birthday.</p>

        {/* Settings List */}
        <div className="divide-y divide-gray-700 bg-gray-800 px-4 rounded-lg">
          <ProfileField label="Username" value={profile?.username ? '@' + profile?.username : ''} />
          <ProfileField label="Change Number" value={profile?.phone} />
          {/* <ProfileField label="Your Name Color" customElement={<div className="w-6 h-6 rounded-full bg-pink-500" />} />
          <ProfileField label="Personal Channel" actionText="Add" /> */}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col divide-y divide-gray-700 bg-gray-800 px-4 rounded-lg">
          {/* <button className="text-indigo-400 font-medium hover:underline text-left py-2 cursor-pointer">
            Add Account
          </button> */}
          <button className="text-red-500 font-medium hover:underline text-left py-2 cursor-pointer" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

interface ProfileFieldProps {
    label: string;
    value?: string;
    actionText?: string;
    customElement?: React.JSX.Element;
}

function ProfileField({ label, value, actionText, customElement }: ProfileFieldProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-gray-200">{label}</span>
      <div className="flex items-center space-x-2">
        {value && <span className="text-gray-400">{value}</span>}
        {customElement && customElement}
        {actionText && <span className="text-indigo-400 font-medium">{actionText}</span>}
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}
