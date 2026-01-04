'use client'
import { Mail, MapPin, Phone, User } from "lucide-react";
import UpdateProfile from "../../../components/shared/Modal";
import { useUserInfoQuery } from "../../../redux/feature/auth/auth.api";



const Profile = () => {
  const { data, isLoading } = useUserInfoQuery(undefined);
  const result = data?.data

  if (isLoading) {
    return (
     <div className="min-h-screen py-8 px-4">

        <div className="max-w-md mx-auto">
          <div className=" rounded-2xl shadow-xl overflow-hidden animate-pulse">
            <div className="h-32  relative"></div>
            <div className="relative -mt-16 flex justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-300"></div>
            </div>
            <div className="px-6 pb-6 pt-4 space-y-4">
              <div className="h-6 w-32 bg-gray-300 mx-auto rounded"></div>
              <div className="h-4 w-24 bg-gray-300 mx-auto rounded"></div>
              <div className="space-y-3 mt-4">
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-full bg-gray-300 rounded"></div>
              </div>
              <div className="h-10 w-full bg-gray-300 rounded mt-4"></div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="h-20 bg-gray-300 rounded-xl animate-pulse"></div>
            <div className="h-20 bg-gray-300 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen mt-24 bg-gradient-to-br py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="relative -mt-16 flex justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
              <img
                src={result?.profilePicture || "/api/placeholder/128/128"}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/api/placeholder/128/128";
                }}
              />
            </div>
          </div>
          <div className="px-6 pb-6 pt-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{result?.fullName}</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <User className="w-4 h-4 mr-1" />
                {result?.role} Account
              </span>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                <span className="text-sm break-all">{result?.email}</span>
              </div>
              {result?.phone && (
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{result.phone}</span>
                </div>
              )}
              {result?.address && (
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" />
                  <span className="text-sm">{result.address}</span>
                </div>
              )}
            </div>
            <UpdateProfile/>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">100%</div>
              <div className="text-xs text-gray-500 mt-1">Profile Complete</div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">Active</div>
              <div className="text-xs text-gray-500 mt-1">Account Status</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
