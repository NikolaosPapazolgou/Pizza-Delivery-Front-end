// https://uibakery.io/regex-library/phone-number

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";
// eslint-disable-next-line no-unused-vars
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isSumbitting = navigation.state === "submitting";
  const {
    username,
    position,
    status: addressStatus,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const isLoadingAdress = addressStatus === "loading";
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPriceWithPriority = totalCartPrice + priorityPrice;
  //Returns action data everyth
  const formErrors = useActionData();
  console.log(formErrors);
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">
        Ready to order? Let&apos;s go!
      </h2>
      {/* Using the Form react-router-dom component that helps
          as determine a method of request and a action 
          that will be called when the Form is submitted.
          The action is determined - deligated in the App 
          createBrowserRouter AppLayout children action: createOrderAction 
          property
      */}
      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            defaultValue={username}
            className="input grow"
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="text-sm mt-2 text-red-700 bg-red-100 rounded-md">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
              disabled={isLoadingAdress}
              defaultValue={address}
            />
            {addressStatus === "error" && (
              <p className="text-sm mt-2 text-red-700 bg-red-100 rounded-md">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute top-[3px] right-[3px] z-50 md:right-[5px] md:top-[5px]">
              <Button
                disabled={isLoadingAdress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                type="small"
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button type="primary" disabled={isSumbitting || isLoadingAdress}>
            {isSumbitting
              ? `Placing order....`
              : `Order now from ${formatCurrency(totalPriceWithPriority)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true ",
  };
  console.log(order);
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number we might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;
  // If everything is okay, create new order and redirect
  const newOrder = await createOrder(order);
  //Do not overuse
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
