import React, { useState } from "react";
import { Link,useNavigate} from 'react-router-dom';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from '../images/Logo-f.png'
import MailLogo from '../images/alert.png'
import { X } from "lucide-react";

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'About Us', href: '/about', current: false },
  { name: 'Guide', href: '/guide', current: false },
 
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navbar(){
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert(`Subscribed with email: ${email}`);
  //   setEmail("");
  //   handleClosePopup();
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentPath = window.location.pathname;
      let location;

      if (currentPath.includes('/Flood')) {
        location = 'Flood';
      } else if (currentPath.includes('/region2')) {
        location = 'Region2';
      } else {
        location = 'General';
      }
  
      console.log('Submitting email:', email);
      console.log('Current location:', location);
  
      const response = await fetch('http://localhost:4000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, location }),
      });
  
      console.log('Response status:', response.status);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response data:', errorData);
        alert(`Error: ${errorData.message}`);
        return;
      }
  
      const data = await response.json();
      console.log('Success response data:', data);
  
      alert(data.message || 'Email sent successfully!');
      setEmail(""); // Clear email field
      handleClosePopup(); // Close popup
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error: ' + error.message);
    }
  };  
    

  return (
<>
    
<Disclosure as="nav" className="bg-blue-400" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50 }}>
    {({ open }) => (
      <>
        <div className=" max-w-7xl px-2 sm:px-6 lg:px-8 ">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>

            <div className=" flex mr-78">

           
                <img
                  className="h-8 w-auto"
                  src={Logo}
                  alt="Your Company"
                />

                <div className="ml-8 font-sans italic text-xl font-bold text-teal-100">
                  A-WARN
                </div>
              </div>
            <div className="flex  justify-end sm:items-stretch sm:justify-end">
              
              <div className="hidden sm:ml-12 sm:block" style={{ position: 'fixed', top: '1rem', right: '42rem', display: 'flex', alignItems: 'center' }}>
                <div className="flex space-x-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                
              </div>
              <div
                onClick={handleOpenPopup}
                className="cursor-pointer"
                style={{ position: 'fixed', top: '1rem', right: '7rem'}}
              >
                <img
                  src={MailLogo}
                  alt="Subscribe for Flood Alerts"
                  className="h-10 w-10 rounded-lg hover:scale-105 transition-transform"
                />
              </div>
            </div>

            <div style={{ position: 'fixed', top: '1rem', right: '4rem', display: 'flex', alignItems: 'center' }}>
              

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="relative flex rounded-full bg-white-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <BellIcon className="h-9 w-9 text-black" aria-hidden="true" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        <Link to="Avalanche">Avalanche ForeWarn</Link>
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                         
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          <Link to="Flood">Flood ForeWarn</Link>
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Tsunami ForeWarn
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <Disclosure.Panel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Disclosure.Button>
            ))}
          </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>

  {/* Email Popup */}
  {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-2xl shadow-xl w-11/12 max-w-md">
            {/* Close Button */}
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
              Stay Updated with Flood Alerts
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

  </>
)
}

export default Navbar;