/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const registerUser = async (_: any, formData: FormData) => {
  try {
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const file = formData.get("file");

    if (!file) {
      return { success: false, message: "Profile picture is required" };
    }

    if (password !== confirmPassword) {
      return { success: false, message: "Passwords do not match" };
    }

    const registerData = {
      name: formData.get("name"),
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      password,
    };

    const finalFormData = new FormData();
    finalFormData.append("file", file as File);
    finalFormData.append("data", JSON.stringify(registerData));

    const res = await fetch(
      "http://localhost:5000/api/v1/users/register",
      {
        method: "POST",
        body: finalFormData,
      }
    );

    return await res.json();
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Registration failed",
    };
  }
};
