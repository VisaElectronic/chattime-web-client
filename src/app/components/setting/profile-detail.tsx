import Image from "next/image";
import React from "react";

export default function ProfileSettings() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-start justify-center py-8 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
        {/* Profile Photo + Name */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden">
            <Image
              src="https://i.pravatar.cc/40?img=5"
              alt="Profile"
              width={50}
              height={50}
              className="object-cover w-full h-full"
            />
          </div>
          <input
            type="text"
            placeholder="test"
            className="flex-1 bg-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <p className="text-gray-400 text-sm">
          Enter your name and add a profile photo.
        </p>

        {/* Bio */}
        <div>
          <label className="block text-gray-200 font-medium mb-1">BIO</label>
          <textarea
            placeholder="A few words about you"
            rows={3}
            className="w-full bg-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <p className="text-gray-400 text-sm mt-1">
            Any details such as age, occupation or city.
          </p>
          <p className="text-gray-400 text-sm">Example: 23 y.o. designer from San Francisco</p>
        </div>

        {/* Date of Birth */}
        <div className="flex items-center justify-between">
          <span className="text-gray-200 font-medium">Date of Birth</span>
          <button className="text-indigo-400 font-medium hover:underline">Add</button>
        </div>
        <p className="text-gray-400 text-sm">Only your contacts will see your birthday. <span className="text-indigo-400 hover:underline cursor-pointer">Change &gt;</span></p>

        {/* Settings List */}
        <div className="divide-y divide-gray-700">
          <SettingRow label="Username" value="@your_username" />
          <SettingRow label="Change Number" value="+1 234 567 890" />
          <SettingRow label="Your Name Color" customElement={<div className="w-6 h-6 rounded-full bg-pink-500" />} />
          <SettingRow label="Personal Channel" actionText="Add" />
        </div>

        {/* Footer Actions */}
        <div className="pt-4 space-y-2">
          <button className="w-full text-indigo-400 font-medium hover:underline text-left">
            Add Account
          </button>
          <button className="w-full text-red-500 font-medium hover:underline text-left">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

interface SettingRowProps {
    label: string;
    value?: string;
    actionText?: string;
    customElement?: React.JSX.Element;
}

function SettingRow({ label, value, actionText, customElement }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between py-3">
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
