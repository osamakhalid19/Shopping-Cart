import React, { useState } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import products from './Data';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import context from './Context';
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
  const [items, setItems] = useState(products);
  const [isadded, setisadded] = useState([]);
  const { cart, setcart } = useContext(context);

  const addHandle = (e) => {
    toast.success("Product Added Successfully");
    setcart([...cart, e]);
    setisadded([...isadded, e.id]);
  };

  const incHandle = (id) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, quan: i.quan + 1 } : i));
    toast.success('Item Quantity Increased')
    
  };

  const decHandle = (id) => {
    setItems((prev) => prev.map((i) => i.id === id && i.quan > 1 ? { ...i, quan: i.quan - 1 } : i));
    toast.success('Item Quantity Decreased')
  };

  return (
    <>
      <nav>
        <div><Toaster /></div>
        <div className="p-6 bg-green-300 flex justify-between">
          <div>
            <Link to="/" className="text-2xl font-bold text-white">Shopping Cart</Link>
          </div>
          <div>
           <Link to='/Cart' className="relative">
  <FaCartShopping size={22} className='cursor-pointer' />
  <span className='absolute top-[-5px] right-[-5px] md:top-[-10px] md:right-[-10px] bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
    {cart.length}
  </span>
</Link>

          </div>
        </div>
      </nav>

      <main className="bg-gray-100 min-h-screen">
        <div className="text-4xl font-bold text-center mt-8 text-gray-800">Products</div>
        <div className="m-auto w-45 pb-2 border-b-3 border-gray-800 mb-8"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {items.map((e) => (
            <div
              key={e.id}
              className="bg-white rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img
                src={e.image}
                alt={e.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{e.name}</h2>
                <p className="text-gray-600">${e.price}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:justify-between p-4 space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => decHandle(e.id)}
                    disabled={e.quan<=1}
                    className={` bg-red-200 text-white rounded-full px-4 py-2 text-lg hover:bg-red-600 transition ${e.quan<=1?'bg-gray-400 cursor-not-allowed':'cursor-pointer'}`}
                  >
                    −
                  </button>
                  <span className="text-lg font-medium">{e.quan}</span>
                  <button
                    onClick={() => incHandle(e.id)}
                    className="cursor-pointer bg-green-300 text-white rounded-full px-4 py-2 text-lg hover:bg-green-600 transition"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addHandle(e)}
                  disabled={isadded.includes(e.id)}
                  className={`px-6 py-2 rounded-full text-white font-semibold transition ${
                    isadded.includes(e.id)
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {isadded.includes(e.id) ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
