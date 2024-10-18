import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
  dicreaseItemQuantity,
  getCurrentQuantityById,
  increaseItemQuantity,
} from "./cartSlice";

// eslint-disable-next-line react/prop-types
function UpdateItemQuantity({ pizzaId }) {
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  return (
    <div className="flex gap-2 items-center md:gap-3">
      <Button
        onClick={() => dispatch(dicreaseItemQuantity(pizzaId))}
        type="round"
      >
        -
      </Button>
      <span className="text-sm font-medium ">{currentQuantity}</span>
      <Button
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
        type="round"
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
