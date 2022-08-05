import { toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import BasicButton from "../components/buttons/basic-button";
import { authToken, authUserData } from "../Utils/helpers";
import axios from "axios";

function StripeForm({ book, action }) {
  const [product] = useState({
    name: book.name,
    price: book.price,
    description: "This is a sample book",
  });

  const headers = {
    accept: "application/json",
    Authorization: "bearer " + authToken(),
  };

  async function handleToken(token, addresses) {
    const response = await axios.request({
      method: "post",
      headers: headers,
      url: "/api/stripe/charge",
      data: {
        token,
        product,
        book,
        user_uuid: authUserData().uuid,
      },
    });

    // console.log(response.status);

    if (response.status === 200) {
      console.log("user", response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast("Payment Successful!", { type: "success" });
      action && action();
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  useEffect(() => {}, []);

  return (
    <StripeCheckout
      class="center"
      stripeKey="pk_test_51LOIxbEzLEQuHiLRcxD8NPU1OkQnqVd4tJQNqH0Ss5SMXplVrH3K29BZM7gEjAlBW95sQiCOVHuhQPdDhKohrIA900cyouHzVO"
      token={handleToken}
      amount={`$${product.price * 100}`}
      name={book.name}
    >
      <BasicButton title={`Ad-Free $${book.price}`} />
    </StripeCheckout>
  );
}

export default StripeForm;
