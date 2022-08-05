import { toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import BasicButton from "../components/buttons/basic-button";
import {
  authToken,
  authUserData,
  isAuthUser,
  API_BASE,
} from "../Utils/helpers";
import axios from "axios";

function StripeDonateForm({ book, amount, action }) {
  const [product] = useState({
    amount: amount,
    description: "Donation to book Author",
  });

  const headers = {
    accept: "application/json",
    Authorization: "bearer " + authToken(),
  };

  async function handleToken(token, addresses) {
    const response = await axios.request({
      method: "post",
      headers: headers,
      url: API_BASE + "/api/stripe/charge/donation",
      data: {
        token,
        product,
        book,
        user_uuid: isAuthUser() && authUserData().uuid,
      },
    });

    // console.log(response.status);

    if (response.status === 200) {
      console.log("user", response.data.user);
      toast("Donation Received!", { type: "success" });
      action && action();
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  useEffect(() => {
    // alert(amount);
  }, []);

  return (
    <StripeCheckout
      class="center"
      stripeKey="pk_test_51LOIxbEzLEQuHiLRcxD8NPU1OkQnqVd4tJQNqH0Ss5SMXplVrH3K29BZM7gEjAlBW95sQiCOVHuhQPdDhKohrIA900cyouHzVO"
      token={handleToken}
      amount={`$${50 * 100}`}
      name={`Donation`}
    >
      <BasicButton title={`Donate $${product.amount}`} classes="w-full" />
    </StripeCheckout>
  );
}

export default StripeDonateForm;
