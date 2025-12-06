/* eslint-disable @typescript-eslint/no-explicit-any */
export const registerUser = async (
  _currentSate: any,
  formData: any
): Promise<any> => {
  try {
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phoneNumber,
      address: formData.address,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
