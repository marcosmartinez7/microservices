import Router from "next/router";
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }) => {
  let secondsLeft = Math.floor((new Date(order.expiresAt) - new Date()) / 1000);
  const [timeLeft, setTimeleft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: (payment) => {
      Router.push("/orders");
    },
  });
  useEffect(() => {
    setTimeleft(secondsLeft);
    const timerId = setInterval(() => {
      secondsLeft -= 1;
      setTimeleft(secondsLeft);
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  if (timeLeft < 0) {
    return <div>Order expired</div>;
  }
  return (
    <div>
      {timeLeft} seconds until order expires
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51L8Xx8APFXilyFjeC1fI3PRxBehhOGjY3vvtjT6KyEuVTSYJs1TBCo7om9XgK4yWqIRV0ZLFjJUOlzpFFAmHeyvb00DUaohDN6"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      ></StripeCheckout>
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};

export default OrderShow;
