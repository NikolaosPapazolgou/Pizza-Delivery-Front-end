import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

// eslint-disable-next-line react/prop-types
function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <div>
      <Button onClick={() => dispatch(deleteItem(pizzaId))} type="small">
        Delete
      </Button>
    </div>
  );
}

export default DeleteItem;
