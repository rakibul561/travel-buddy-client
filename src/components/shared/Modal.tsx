/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpdateUserMutation } from '@/redux/feature/auth/auth.api';
import { Camera, Lock, Sparkles, User } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UpdateProfile() {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const rawFormData = new FormData(form);

    // ✅ clean FormData (IMPORTANT)
    const formData = new FormData();

    // -------- Full Name --------
    const fullName = rawFormData.get('fullName');
    if (fullName && fullName.toString().trim() !== '') {
      formData.append('fullName', fullName.toString());
    }

    // -------- Password --------
    const oldPassword = rawFormData.get('oldPassword');
    const newPassword = rawFormData.get('newPassword');

    if (oldPassword && newPassword) {
      formData.append('oldPassword', oldPassword.toString());
      formData.append('newPassword', newPassword.toString());
    }

    // -------- File (ONLY if selected) --------
    const file = rawFormData.get('file') as File;
    if (file && file.size > 0) {
      formData.append('file', file);
    }

    // 🔍 DEBUG
    console.log('📤 Sending Clean FormData:');
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value);
    }

    try {
      const response = await updateUser(formData).unwrap();

      console.log('✅ Update Success Response:', response);

      toast.success('✅ Profile updated successfully');
      form.reset();
    } catch (error: any) {
      console.error('❌ Update Failed:', error);
      toast.error(error?.data?.message || '❌ Failed to update profile');
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="relative overflow-hidden group bg-[#00DC33] hover:bg-[#00C32D] text-white font-bold px-8 py-6 rounded-2xl shadow-2xl hover:shadow-[#00DC33]/30 transition-all duration-500 hover:scale-105">
            <span className="relative z-10 flex items-center gap-3 text-lg">
              <Sparkles className="h-5 w-5" />
              Update Profile
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-0 shadow-2xl rounded-3xl">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-[#00DC33] via-[#00C32D] to-[#00AA27] px-8 py-10">
            <DialogHeader>
              <DialogTitle className="text-4xl font-bold text-white mb-3">
                Edit Your Profile
              </DialogTitle>
              <DialogDescription className="text-white/90">
                Update your personal information and security settings
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="px-8 py-8 bg-white">
            <div className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <User className="h-4 w-4 text-[#00DC33]" />
                  Full Name
                </Label>
                <Input
                  name="fullName"
                  placeholder="Enter your full name"
                  className="h-12 rounded-xl border-2"
                />
              </div>

              {/* Profile Picture */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Camera className="h-4 w-4 text-[#00DC33]" />
                  Profile Picture
                </Label>
                <Input
                  name="file"
                  type="file"
                  accept="image/*"
                  className="h-12 rounded-xl border-2 file:bg-[#00DC33]/10 file:text-[#00DC33]"
                />
              </div>

              {/* Divider */}
              <div className="border-t pt-4 text-center text-sm font-semibold text-slate-500">
                🔐 Security Settings
              </div>

              {/* Old Password */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Lock className="h-4 w-4 text-[#00DC33]" />
                  Current Password
                </Label>
                <Input
                  name="oldPassword"
                  type="password"
                  className="h-12 rounded-xl border-2"
                />
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Lock className="h-4 w-4 text-[#00DC33]" />
                  New Password
                </Label>
                <Input
                  name="newPassword"
                  type="password"
                  className="h-12 rounded-xl border-2"
                />
              </div>
            </div>

            <DialogFooter className="mt-8 gap-3 flex-col sm:flex-row">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 px-8 rounded-xl w-full sm:w-auto"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 px-10 rounded-xl bg-[#00DC33] hover:bg-[#00C32D] text-white w-full sm:w-auto"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
