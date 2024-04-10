import { useState, useEffect } from 'react'
// import { useUpdateCartQuantityContext } from '@/context/Store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
//import Link from 'next/link'
import { Link } from 'react-router-dom'
//import Price from '@/components/Price'
//import { getCartSubTotal } from '@/utils/helpers'

function Cart({ cart }) {
  // const updateCartQuantity = useUpdateCartQuantityContext()
  const [cartItems, setCartItems] = useState([])
  const [subtotal, setSubtotal] = useState(0)

  useEffect(() => {
    setCartItems([])
    // setSubtotal(getCartSubTotal(cart))
    setSubtotal(999)
  }, [cart])

  // function updateItem(id, quantity) {
  //   updateCartQuantity(id, quantity)
  // }

  return (
    <div className="min-h-80 max-w-2xl my-4 sm:my-8 mx-auto w-full">
      <table className="mx-auto">
        <thead>
          <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
            <th className="font-primary font-normal px-6 py-4">Product</th>
            <th className="font-primary font-normal px-6 py-4">Quantity</th>
            <th className="font-primary font-normal px-6 py-4 hidden sm:table-cell">Price</th>
            <th className="font-primary font-normal px-6 py-4">Remove</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-palette-lighter">
          {cartItems.map(item =>  {
            console.log('Executing...');
            console.log(`My cart items ${cartItems}`);
            cartItems.length === 0 ? <h2>You don't have any carts yet</h2> :
             (
              <tr key={item.variantId} className="text-sm sm:text-base text-gray-600 text-center">
                <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center">
                  <img
                    src={item.productImage.originalSrc}
                    alt={item.productImage.altText}
                    height={64}
                    width={64}
                    className={`hidden sm:inline-flex`}
                  />
                  <Link passHref href={`/products/${item.productHandle}`}>
                    <a className="pt-1 hover:text-palette-dark">
                      {item.productTitle}, {item.variantTitle}
                    </a>
                  </Link>
                </td>
                <td className="font-primary font-medium px-4 sm:px-6 py-4">
                  <input
                    type="number"
                    inputMode="numeric"
                    id="variant-quantity"
                    name="variant-quantity"
                    min="1"
                    step="1"
                    value={item.variantQuantity}
                    onChange={(e) => 
                      
                      
                      {
                        // updateItem(item.variantId, e.target.value)
                      }
                    
                    }
                    className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
                  />
                </td>
                <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                </td>
                <td className="font-primary font-medium px-4 sm:px-6 py-4">
                  <button
                    aria-label="delete-item"
                    className=""
                    onClick={() => {
                      // updateItem(item.variantId, 0)
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} className="w-8 h-8 text-palette-primary border border-palette-primary p-1 hover:bg-palette-lighter" />
                  </button>
                </td>
              </tr>
            )
          })}
          {
            subtotal === 0 ?
              null
              :
              <tr className="text-center">
                <td></td>
                <td className="font-primary text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">Subtotal</td>
                <td className="font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
  
                </td>
                <td></td>
              </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default Cart