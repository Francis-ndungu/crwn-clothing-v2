import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartItems } from "../../store/cart/cart.selector.js";
// import { CartContext } from "../../contexts/cart.context";

import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles.jsx";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem cartItem={item} key={item.id} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>

      <Button onClick={goToCheckoutHandler}>CHECKOUT NOW</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
