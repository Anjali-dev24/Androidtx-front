// import { BASE_URL } from "@env";
import axios from "axios";

const SERVER_URL = "https://www.9tx.online/api";

export const sendOtp = async (phoneNumber) => {
  console.log("o0sosoooo-==", phoneNumber);
  try {
    const data = {
      phoneNumber: phoneNumber, // Example: '+919005925440'
    };

    const response = await axios.post(
      "https://wishyo.in/users/send-otp",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("OTP sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.log("status code== otp :", error.response.status);
    console.log("Error sending OTP:", error.response.data);
    throw error.response.data;
  }
};

export const loginUser = async (phoneNumber, password) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/auth/signin`,
      {
        phone: phoneNumber,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Login successful:", response);
    return response;
  } catch (error) {
    console.log("status code== login :", error, phoneNumber, password);
    throw error;
  }
};

export const verify_email = async (email) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/auth/signin-email`,
      {
        email: email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("-=-=-=-=-=-email-=-=-=-verify-=-=succ-=-=-:", response);
    return response;
  } catch (error) {
    console.log("-=-=-=-=-=-email-=-=-=-verify-=-=err-=-=", error);
    throw error;
  }
};

export const otp_verification = async (email, otp) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/otp/verify-email-otp`,
      {
        email: email,
        otp: otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("-=-=-=-=-=-email-=-=-=-verify-=-=succ-=-=-:", response);
    return response;
  } catch (error) {
    console.log("-=-=-=-=-=-email-=-=-=-verify-=-=err-=-=", error);
    throw error;
  }
};

export const forgotPassword = async (phoneNumber) => {
  try {
    const response = await axios.post(
      "https://wishyo.in/users/forgot-password",
      {
        phoneNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Success:", response.data);
    return response.data;
  } catch (error) {
    console.log("status code== forgotpassword :", error.response.status);
    console.log("Error sending forgotpassword:", error.response.data);
    throw error.response.data;
  }
};

export const signupUser = async (
  email,
  phoneNumber,
  password,
  invitation_code,
  countryDetailId
) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: email,
      phone: phoneNumber,
      password: password,
      invitation_code: invitation_code,
      countryDetailId: countryDetailId,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(`${SERVER_URL}/auth/signup`, requestOptions);
    const data = await response.json();
    console.log("-=-=-=-=-resp-=-=-=-=-signup-=-=-=-", data, "-=-=-=-=-=", raw);
    return data;
  } catch (error) {
    console.log("error-=-=-=-=-countryCode", error);
    return error;
  }
};

export const forgot_password = async (email) => {
  console.log("-=-=-=-=-=email=-=-=-=-=-=-=-", email);
  try {
    const raw = JSON.stringify({
      email: email,
    });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(`${SERVER_URL}/auth/forgot-password`, {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: raw,
    });

    const data = await response.json();
    console.log("=-=-=-countryCode-=-=-=-", data);
    return data;
  } catch (error) {
    console.log("error-=-=-=-=-countryCode", error);
    return error;
  }
};

export const reset_password = async (token, newPassword) => {
  try {
    const raw = JSON.stringify({
      password: newPassword,
    });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(`${SERVER_URL}/auth/reset-password/${token}`, {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: raw,
    });

    const data = await response.json();
    console.log("=-=-=-countryCode-=-=-=-", data);
    // if (response.ok) {
    return data;
    // }
  } catch (error) {
    console.log("error-=-=-=-=-countryCode", error);
    return error;
  }
};

export const verify_otp = async (email, otp) => {
  try {
    const raw = JSON.stringify({
      email: email,
      otp: otp,
    });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(`${SERVER_URL}/otp/verify-email-otp`, {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: raw,
    });

    const data = await response.json();
    console.log("=-=-=-verify_otp-=-=-=-", data);
    return data;
  } catch (error) {
    console.log("-=-=-=-=-verifyotp_err-=-=-=--=", error);
    return error;
  }
};

export const logout = async (token) => {
  try {
    const response = await fetch(`${SERVER_URL}/user/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      redirect: "follow",
    });

    const data = await response.json();
    console.log("=-=-=-logout-=-=-=-", data);
    return data;
  } catch (error) {
    console.log("-=-=-=-=-logout==err-=-=-=--=", error);
    return error;
  }
};

export const user_profile = async (token, userId) => {
  try {
    const response = await fetch(`${SERVER_URL}/user/profile/${userId}`, {
      method: "GET",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("=-=-=-user_profile-=-=-=-", data);
    // if (response.ok) {
    return data;
    // }
  } catch (error) {
    console.log("error-=-=-=-=-user_profile-=-=-=-=err-=-=-=-=-", error);
    return error;
  }
};

export const CountryList = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/country/all`, {
      method: "GET",
      redirect: "follow",
    });

    const data = await response.json();
    console.log("=-=-=-countryCode-=-=-=-", data);
    // if (response.ok) {
    return data;
    // }
  } catch (error) {
    console.log("error-=-=-=-=-countryCode", error);
    return error;
  }
};

export const CountryCodeList = async () => {
  const url = "https://wishyo.in/users/verify-otp";
  const headers = {
    "Content-Type": "application/json",
  };

  const body = {
    phoneNumber,
    orderId,
    otp,
  };

  try {
    const response = await axios.post(url, body, { headers });
    console.log("Success:", response.data);
    return response.data;
  } catch (error) {
    console.log("status verify otp :", error.response.status);
    console.log("Error verify OTP:", error.response.data);
    throw error.response.data;
  }
};

export const verifyOtp = async (phoneNumber, orderId, otp) => {
  const url = "https://wishyo.in/users/verify-otp";
  const headers = {
    "Content-Type": "application/json",
  };

  const body = {
    phoneNumber,
    orderId,
    otp,
  };

  try {
    const response = await axios.post(url, body, { headers });
    console.log("Success:", response.data);
    return response.data;
  } catch (error) {
    console.log("status verify otp :", error.response.status);
    console.log("Error verify OTP:", error.response.data);
    throw error.response.data;
  }
};

export const make_Post_Api_Request = async (
  endPoint,
  data,
  token,
  showLog = false
) => {
  try {
    const response = await fetch("https://wishyo.in/users/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: "+919428615408",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("OTP sent successfully:", data);
    } else {
      console.error("Error sending OTP:", data);
    }
  } catch (error) {
    console.error("Error sending OTP:", error.message);
  }
};

export const get_isd = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/data/get-isd`, {
      method: "GET",
      redirect: "follow",
    });

    const data = await response.json();
    console.log("=-=-=-get_isd-=-=-=-", data);
    return data;
  } catch (error) {
    console.log("error-=-=-=-=-get_isd", error);
    return error;
  }
};

export const get_wallet_balance = async (token) => {
  try {
    const response = await fetch(`${SERVER_URL}/wallet/detail`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      redirect: "follow",
    });
    console.log("-=-=-=-=-=-=-wallet_balance-=-11=-=-=-", response);
    const data = await response.json();
    console.log("=-=-=-wallet_balance-=-=-=-", data);
    return data;
  } catch (error) {
    console.log("error-=-=-=-=-wallet_balance_err", error);
    return error;
  }
};

export const get_country_data = async (countryId) => {
  try {
    const response = await fetch(`${SERVER_URL}/country/${countryId}`, {
      method: "GET",
      redirect: "follow",
    });
    console.log("-=-=-=-=-=-=-67790fab39c3908163381e49-=-=-=-=-", response);
    const data = await response.json();
    console.log("=-=-=-get_country_data-=-=-=-", data);
    return data;
  } catch (error) {
    console.log("error-=-=-=-=-_country_data_err", error);
    return error;
  }
};

export const time_zone = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/data/get-timezone`, {
      method: "GET",
      redirect: "follow",
    });

    const data = await response.json();
    console.log("=-=-=-timeZone-=-=-=-", data);
    return data;
  } catch (error) {
    console.log("error-=-=-=-=-timeZone", error);
    return error;
  }
};

export const get_withdrawal_history = async (token) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/wallet/all/withdrawal-history/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: raw,
        redirect: "follow",
      }
    );
    // console.log("-=-=-=-=-=-=-wallet_balance-=-11=-=-=-", raw);
    const data = await response.json();
    // console.log("=-=-=-withdrawal_history-=-=-=-", data);
    return data;
  } catch (error) {
    console.log("error-=-=-=-=-withdrawal_history_err==-=-=-=-", error);
    return error;
  }
};

export const get_deposit_history = async (token) => {
  try {
    const response = await fetch(`${SERVER_URL}/wallet/all/deposit-history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: raw,
      redirect: "follow",
    });
    // console.log("-=-=-=-=-=-=-wallet_balance-=-11=-=-=-", raw);
    const data = await response.json();
    console.log("=-=-=-deposit_history-=-=-=-", data);
    return data;
  } catch (error) {
    console.log("error-=-=-=-=-withdrawal_history_err==-=-=-=-", error);
    return error;
  }
};

export const available_currencies = async (userId, amount, token, currency) => {
  try {
    const response = await fetch("https://wishyo.in/users/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: userId,
        amount: amount,
        currency: currency,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("list fetched-=-=-=-=-=-=-=-=:", data);
    } else {
      console.error("list fetched err-=-=-=-=-=-=-=-:", data);
    }
  } catch (error) {
    console.error("error-=-=-=-=-=-=-=-:", error.message);
  }
};

// export const make_Get_Api_Request = async (
//   endPoint,
//   token,
//   showLog = false
// ) => {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const response = await axios.get(`${BASE_URL}/${endPoint}`, config);
//     if (showLog) {
//       console.log(`SUCCESS: --- ${endPoint} --- `, response.data);
//     }
//     return response.data;
//   } catch (error) {
//     console.log(`ERROR: --- ${endPoint} --- `, error.response.data);
//     throw error.response.data;
//   }
// };

// export const make_Put_Api_Request = async (
//   endPoint,
//   data,
//   token,
//   showLog = false
// ) => {
//   try {
//     let config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const response = await axios.put(`${BASE_URL}/${endPoint}`, data, config);
//     if (showLog) {
//       console.log(`SUCCESS: --- ${endPoint} --- `, response.data);
//     }
//     return response.data;
//   } catch (error) {
//     console.log(`ERROR: --- ${endPoint} --- `, error.response.data);
//     throw error.response.data;
//   }
// };

// export const make_Delete_Api_Request = async (
//   endPoint,
//   token,
//   showLog = false
// ) => {
//   try {
//     let config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const response = await axios.delete(`${BASE_URL}/${endPoint}`, config);
//     if (showLog) {
//       console.log(`SUCCESS: --- ${endPoint} --- `, response.data);
//     }
//     return response.data;
//   } catch (error) {
//     console.log(`ERROR: --- ${endPoint} --- `, error.response.data);
//     throw error.response.data;
//   }
// };

export const privacy_Policy = "https://policies.google.com/privacy?hl=en-US";
export const term_Condition = "https://policies.google.com/privacy?hl=en-US";

export const getBankDetails = async (ifscCode) => {
  const url = `https://ifsc.razorpay.com/${ifscCode}`;

  try {
    const response = await axios.get(url);
    console.log("Bank details:", response.data);
    return response.data;
  } catch (error) {
    console.log("error in get back detail========", error.response.data);
    throw error.response.data;
  }
};
