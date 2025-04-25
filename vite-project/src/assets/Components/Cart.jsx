import React, { useContext,useEffect } from 'react';
import context from './Context';
import { Link } from 'react-router-dom';
import { FaCartShopping, FaTrash } from 'react-icons/fa6';
import toast, { Toaster } from 'react-hot-toast';


const Cart = () => {
    const { cart, setcart } = useContext(context);

    useEffect(() => {
        if(cart.length>0){
            localStorage.setItem("cart",JSON.stringify(cart))
        }
    }, [cart])

    useEffect(() => {
      const content = localStorage.getItem("cart")
      if(content){
        setcart(JSON.parse(content))
      }
    }, [setcart])
    
    

  const incHandle = (id) => {
    setcart((prev) => prev.map((i) => i.id === id ? { ...i, quan: i.quan + 1 } : i));
    toast.success('Item Quantity Increased')
  };

  const decHandle = (id) => {   
    setcart((prev) => prev.map((i) => i.id === id && i.quan > 1 ? { ...i, quan: i.quan - 1 } : i));
    toast.success('Item Quantity Decreased')
  };

  return (
    <>
      <nav>
        <div><Toaster /></div>
        <div className='p-6 bg-green-300 flex justify-between items-center'>
          <div>
            <Link to='/' className='text-2xl font-bold'>
              Shopping Cart
            </Link>
          </div>
          <div className='relative flex items-center'>

          <Link to='/Cart' className="relative">
  <FaCartShopping size={22} className='cursor-pointer' />
  <span className='absolute top-[-5px] right-[-5px] md:top-[-10px] md:right-[-10px] bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
    {cart.length}
  </span>
</Link>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Your Cart</h2>

        <div className="max-w-5xl mx-auto space-y-6">
          {cart.length === 0 ? (
            <div className="text-center text-gray-600 text-lg">
              Your cart is empty.
            </div>
          ) : (
            cart.map((e, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4"
              >
                <img
                  src={e.image}
                  alt={e.name}
                  className="w-full sm:w-32 h-40 object-cover rounded-md"
                />
                <div className="flex-1 w-full text-center sm:text-left">
                  <h3 className="text-xl font-semibold">{e.name}</h3>
                  <p className="text-gray-600 mt-1">${e.price}</p>
                  <div className="flex justify-center sm:justify-start items-center mt-3 gap-3">
                  <button
                      className={`px-4 py-2 bg-red-200 text-white rounded-full hover:bg-red-600 transition ${e.quan <= 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                      onClick={() =>  decHandle(e.id)}
                      disabled={e.quan<=1}
                    >
                      -
                    </button>
                    <p className="text-lg">{e.quan}</p>
                    <button
                      className="px-4 py-2 bg-green-300 text-white rounded-full hover:bg-green-600 transition ${`if e.quan<=1`}"
                      onClick={() => incHandle(e.id)}
                    >
                      +
                    </button>
                   
                  </div>
                </div>

                <FaTrash
                  color='red'
                  className='cursor-pointer text-xl hover:text-red-600 transition'
                  onClick={() => {
                    setcart((items) => items.filter((p) => p.id !== e.id));
                    toast.success('Item Removed');
                  }}
                />
            <div className="mt-4 text-rightss font-semibold text-gray-700">
  Total: {e.quan} × ${e.price} = <span className="text-green-600">${(e.quan * e.price)}</span>
</div>

              </div>
            ))

          )}

        </div>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          >
            Back to Shopping
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
