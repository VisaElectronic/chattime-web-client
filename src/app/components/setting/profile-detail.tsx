import { LOGIN_ROUTE } from "@/constants/routes";
import User from "@/models/User";
import { AuthService } from "@/services/auth.service";
import { UserService } from "@/services/user.service";
import { useUserStore } from "@/stores/profile";
import { useRouter } from "next/navigation";
import React, {useCallback, useEffect, useState } from "react";
import { Avatar, Datepicker } from "flowbite-react";
import Dropzone from "@/components/commons/dropzone";
import { HiCamera } from "react-icons/hi";
import ProfileDetailHeader from "./profile-detail-header";
import Loading from "@/components/commons/loading";
import { API_DOMAIN, DEFAULT_DATA } from "@/constants/api";
import UpdateProfileDto from "@/dto/user/update-profile.request";
import { UtilService } from "@/services/util.service";
import { toast } from "react-toastify";
import { disconnectStomp } from "@/lib/stomp";

export default function ProfileSettings() {
  const router = useRouter();
  const notify = (desc: string) => toast.success(desc);
  const [profile, setProfile] = useState<User | null>(null);
  const [, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [dob, setDob] = useState<Date | null>(profile?.dob ? new Date(profile?.dob) : null);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await UserService.fetchProfile();
        setProfile(user);
        setFirstname(user.firstname);
        setLastname(user.lastname);
        setBio(user.bio ?? '');
        setDob(user.dob ? new Date(user.dob) : null);
        setUser(user)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        }
      }
    }
    fetchData();
  }, [setUser]);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthService.logout();
      AuthService.removeAuthToken();
      disconnectStomp();
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

  const handleFiles = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
  }, []);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const bodyForm: UpdateProfileDto = {
        firstname,
        lastname,
        bio,
        dob: dob ? UtilService.formatToYYYYMMDD(dob) : '',
        avatar: files
      };
      const res = await UserService.updateProfile(bodyForm);
      if(res) {
        notify('Profile updated successfully.');
        setUser(res);
      }
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
    <div className="w-full min-h-screen flex flex-col ">
      {loading && <Loading />}
      <ProfileDetailHeader handlePressDone={handleUpdateProfile} />
      <div className="flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-lg rounded-xl shadow-lg p-6 space-y-6">
          {/* Profile Photo + Name */}
          <div className="flex items-center space-x-4 dark:bg-gray-800 rounded-lg p-2 gap-3">
            <div className={
              'relative overflow-hidden cursor-pointer m-0 flex justify-center items-center' + (!files || files.length <= 0 ? '' : '')
            }>
              <Dropzone
                onFiles={handleFiles}
                previewSize="lg"
              >
                {
                  (!files || files.length <= 0) && !profile?.avatar ? <HiCamera className="w-6 h-6 dark:text-gray-400" /> :
                  <>
                    <Avatar
                        size="lg"
                        img={API_DOMAIN + '/' + (profile?.avatar ? profile.avatar : DEFAULT_DATA.PROFILE)}
                        rounded
                        className='opacity-50'
                    />
                    <HiCamera className="
                        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                        w-10 h-10 text-gray-400
                    "
                    />
                  </>
                }
              </Dropzone>
            </div>
            <div className="flex flex-col flex-auto">
              <input
                id="firstname"
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
                type="text"
                placeholder="test"
                className="flex-1 dark:text-white dark:placeholder-gray-400 focus:outline-none pb-3"
              />
              <hr className="border-solid text-[#666e7a]" />
              <input
                id="lastname"
                value={lastname}
                onChange={e => setLastname(e.target.value)}
                type="text"
                placeholder="test"
                className="flex-1 dark:text-white dark:placeholder-gray-400 focus:outline-none pt-3"
              />
            </div>
          </div>
          <p className="dark:text-gray-400 text-sm">
            Enter your name and add a profile photo.
          </p>

          {/* Bio */}
          <div>
            <label className="block dark:text-gray-200 text-xs mb-1">BIO</label>
            <input
              id="bio"
              type="text"
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="A few words about you"
              className="w-full dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-500"
            />
            <p className="dark:text-gray-400 text-sm mt-1">
              Any details such as age, occupation or city.
            </p>
            <p className="dark:text-gray-400 text-sm">Example: 23 y.o. designer from San Francisco</p>
          </div>

          {/* Date of Birth */}
          <div className="flex items-center justify-between dark:bg-gray-800 px-4 py-2 rounded-lg">
            <span className="dark:text-gray-200 font-medium">Date of Birth</span>
            <Datepicker 
              value={dob ?? new Date} 
              onChange={(date: Date | null) => date ? setDob(date) : null}
              placeholder="Pick Your Date Of Birth"
            />
          </div>
          <p className="dark:text-gray-400 text-sm">Only your contacts will see your birthday.</p>

          {/* Settings List */}
          <div className="divide-y divide-gray-700 dark:bg-gray-800 px-4 rounded-lg">
            <ProfileField label="Username" value={profile?.username ? '@' + profile?.username : ''} />
            <ProfileField label="Phone Number" value={profile?.phone} />
            {/* <ProfileField label="Your Name Color" customElement={<div className="w-6 h-6 rounded-full bg-pink-500" />} />
            <ProfileField label="Personal Channel" actionText="Add" /> */}
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col divide-y divide-gray-700 dark:bg-gray-800 px-4 rounded-lg">
            {/* <button className="text-indigo-400 font-medium hover:underline text-left py-2 cursor-pointer">
              Add Account
            </button> */}
            <button className="text-red-600 font-medium hover:underline text-left py-2 cursor-pointer" onClick={handleLogout}>
              Log Out
            </button>
          </div>
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
      <span className="dark:text-gray-200">{label}</span>
      <div className="flex items-center space-x-2">
        {value && <span className="dark:text-gray-400">{value}</span>}
        {customElement && customElement}
        {actionText && <span className="dark:text-indigo-400 font-medium">{actionText}</span>}
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
