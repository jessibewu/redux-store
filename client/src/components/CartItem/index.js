import React from 'react';
// import { useStoreContext } from '../../utils/GlobalState';

import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
// idb:
import { idbPromise } from "../../utils/helpers";
// redux: 
import { useSelector, useDispatch } from 'react-redux';

const CartItem = ({ item }) => {
  // const [, dispatch] = useStoreContext();

  useSelector((state) => {
    return state
  });
  
  const dispatch = useDispatch();

  const removeFromCart = item => {
    dispatch({
    type: REMOVE_FROM_CART,
    _id: item._id
    });

    idbPromise('cart', 'delete', { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
  
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });

      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value) // will also automatically update the total dollar amount, because the parent Cart component re-renders whenever the global state is updated
      });

      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="flex-row">
      <div>
        <img
        // This component expects an item object as a prop and will use that object's properties to populate the JSX
          src={`/images/${item.image}`} 
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            // without an onChange handler, the element is read-only w/ value being pre-defined but isn't defined as such with a readOnly attribute.
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;