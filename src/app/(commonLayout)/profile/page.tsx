'use client'
import { Mail, MapPin, Phone, User, ShieldCheck, CheckCircle, Sparkles } from "lucide-react";
import UpdateProfile from "../../../components/shared/Modal";
import { useUserInfoQuery } from "../../../redux/feature/auth/auth.api";

const Profile = () => {
  const { data, isLoading } = useUserInfoQuery(undefined);
  const result = data?.data

  if (isLoading) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="max-w-4xl w-full mx-auto">
          <div className="glass rounded-3xl p-8 animate-pulse space-y-8">
            <div className="h-48 bg-muted/50 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-muted/20 to-muted/40 animate-shimmer" />
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-start md:-mt-20 px-4">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-muted shadow-xl relative z-10" />
              <div className="space-y-4 flex-1 pt-4">
                <div className="h-8 w-64 bg-muted/50 rounded-lg" />
                <div className="h-4 w-32 bg-muted/30 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-muted/30 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse-slow -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl animate-float translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="glass rounded-3xl overflow-hidden shadow-xl border border-white/20 animate-slide-in-from-bottom">

          {/* Cover Photo Area */}
          <div className="h-56 bg-gradient-to-r from-primary via-primary/80 to-accent relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-700 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start -mt-20">
              {/* Profile Image */}
              <div className="relative group">
                <div className="w-40 h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white ring-4 ring-black/5 relative z-10 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={result?.profilePicture || "/api/placeholder/128/128"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://ui-avatars.com/api/?name=" + (result?.fullName || "User") + "&background=random";
                    }}
                  />
                </div>
                <div className="absolute bottom-2 right-2 z-20 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shadow-lg" title="Active">
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 pt-2 md:pt-20 space-y-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 font-display flex items-center gap-2">
                      {result?.fullName}
                      {result?.role === 'ADMIN' && <ShieldCheck className="w-6 h-6 text-primary" />}
                    </h1>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                        <User className="w-3 h-3 mr-1" />
                        {result?.role || 'Traveler'}
                      </span>
                      <span className="text-muted-foreground text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {result?.address || 'Earth, Milky Way'}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <UpdateProfile />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {/* Contact Information */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white/50 rounded-2xl p-6 border border-white/40 shadow-sm backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 font-display">
                    <Sparkles className="w-5 h-5 text-accent" />
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1 group">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email Address</label>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 group-hover:border-primary/20 group-hover:shadow-md transition-all">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Mail className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-gray-700 break-all">{result?.email}</span>
                      </div>
                    </div>

                    <div className="space-y-1 group">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone Number</label>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 group-hover:border-primary/20 group-hover:shadow-md transition-all">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Phone className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-gray-700">{result?.phone || 'Not provided'}</span>
                      </div>
                    </div>

                    <div className="space-y-1 group md:col-span-2">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Address</label>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 group-hover:border-primary/20 group-hover:shadow-md transition-all">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-gray-700">{result?.address || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats & Status */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-white shadow-lg shadow-primary/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    Account Status
                  </h3>
                  <div className="text-3xl font-bold mb-1">Active</div>
                  <div className="text-primary-foreground/80 text-sm mb-6">Your account is fully verified</div>

                  <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-full rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Profile Strength
                  </h3>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="text-4xl font-bold text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">Great job! Your profile is complete.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
