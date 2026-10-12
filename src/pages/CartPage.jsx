import PageTitle from "../components/PageTitle"
import Cart from "../features/cart/Cart"

function CartPage() {
  return (
    <>
      <PageTitle
        title="Your Cart | Sammly"
        description="Review the items in your cart, update quantities, and proceed to checkout to place your custom apparel order."
        noIndex
      />
      <Cart />
    </>
  )
}

export default CartPage