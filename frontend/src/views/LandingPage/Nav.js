import { Transition } from '@tailwindui/react'
import { useState } from 'react';

export default function Nav() {
    const [hoverHome,setHoverHome] = useState(false);
    const [hoverStartup,setHoverStartup] = useState(false);
    const [hoverInvestor,setHoverInvestor] = useState(false);
    const [hoverPartner,setHoverPartner] = useState(false);
    const [hoverBlog,setHoverBlog] = useState(false);


  return (
    <section className="tw-relative tw-w-full tw-px-8 tw-text-gray-700 tw-bg-white body-font">
    <div className="tw-container tw-flex tw-flex-col tw-flex-wrap tw-items-center tw-justify-between tw-py-5 tw-mx-auto md:tw-flex-row tw-max-w-7xl">
      <a href="/" className="tw-relative tw-z-10 tw-flex tw-items-center tw-w-auto tw-text-2xl tw-font-extrabold tw-leading-none tw-text-black tw-select-none">pitchr</a>
      <nav className="tw-top-0 tw-left-0 tw-z-0 tw-flex tw-items-center tw-justify-center tw-w-full tw-h-full tw-py-5 tw--ml-0 tw-space-x-5 tw-text-base md:tw--ml-5 md:tw-py-0 md:tw-absolute">
        <a href="/" className="tw-relative tw-font-medium tw-leading-6 tw-text-gray-600 tw-transition tw-duration-150 tw-ease-out hover:tw-text-gray-900" x-data="{ hover: false }" onMouseEnter={() => setHoverHome(true)} onMouseLeave={() => setHoverHome(false)}>
          <span className="tw-block tw-font-bold">Home</span>
          <span className="tw-absolute tw-bottom-0 tw-left-0 tw-inline-block tw-w-full tw-h-0.5 tw--mb-1 tw-overflow-hidden">
          <Transition
        as="span"
        appear={true} 
        show={hoverHome}
        enter="tw-transition ease tw-duration-200"
        enterFrom="tw-scale-0"
        enterTo="tw-scale-100"
        leave="tw-transition tw-ease-out tw-duration-300"
        leaveFrom="tw-scale-100"
        leaveTo="tw-scale-0"
        className="tw-absolute tw-inset-0 tw-inline-block tw-w-full tw-h-1 tw-h-full tw-transform tw-bg-gray-900"
      >
  
      </Transition>
          </span>
        </a>
        <a href="/startup" className="tw-relative tw-font-medium tw-leading-6 tw-text-gray-600 tw-transition tw-duration-150 tw-ease-out hover:tw-text-gray-900" onMouseEnter={() => setHoverStartup(true)} onMouseLeave={() => setHoverStartup(false)}>
          <span className="tw-block tw-font-bold">For Startups</span>
          <span className="tw-absolute tw-bottom-0 tw-left-0 tw-inline-block tw-w-full tw-h-0.5 tw--mb-1 tw-overflow-hidden">
          <Transition
        as="span"
        appear={true} 
        show={hoverStartup}
        enter="tw-transition ease tw-duration-200"
        enterFrom="tw-scale-0"
        enterTo="tw-scale-100"
        leave="tw-transition tw-ease-out tw-duration-300"
        leaveFrom="tw-scale-100"
        leaveTo="tw-scale-0"
        className="tw-absolute tw-inset-0 tw-inline-block tw-w-full tw-h-1 tw-h-full tw-transform tw-bg-gray-900"
      >
  
      </Transition>        
      </span>
        </a>
        <a href="/investors" className="tw-relative tw-font-medium tw-leading-6 tw-text-gray-600 tw-transition tw-duration-150 tw-ease-out hover:tw-text-gray-900" x-data="{ hover: false }" onMouseEnter={() => setHoverInvestor(true)} onMouseLeave={() => setHoverInvestor(false)}>
          <span className="tw-block tw-font-bold">For Investors</span>
          <span className="tw-absolute tw-bottom-0 tw-left-0 tw-inline-block tw-w-full tw-h-0.5 tw--mb-1 tw-overflow-hidden">
          <Transition
        as="span"
        show={hoverInvestor}
        appear={true} 
        enter="tw-transition ease tw-duration-200"
        enterFrom="tw-scale-0"
        enterTo="tw-scale-100"
        leave="tw-transition tw-ease-out tw-duration-300"
        leaveFrom="tw-scale-100"
        leaveTo="tw-scale-0"
        className="tw-absolute tw-inset-0 tw-inline-block tw-w-full tw-h-1 tw-h-full tw-transform tw-bg-gray-900"
      >
  
      </Transition>        </span>
        </a>
        <a href="/partners" className="tw-relative tw-font-medium tw-leading-6 tw-text-gray-600 tw-transition tw-duration-150 tw-ease-out hover:tw-text-gray-900" x-data="{ hover: false }" onMouseEnter={() => setHoverPartner(true)} onMouseLeave={() => setHoverPartner(false)}>
          <span className="tw-block tw-font-bold">For Partners</span>
          <span className="tw-absolute tw-bottom-0 tw-left-0 tw-inline-block tw-w-full tw-h-0.5 tw--mb-1 tw-overflow-hidden">
          <Transition
        as="span"
        appear={true} 
        show={hoverPartner}
        enter="tw-transition ease tw-duration-200"
        enterFrom="tw-scale-0"
        enterTo="tw-scale-100"
        leave="tw-transition tw-ease-out tw-duration-300"
        leaveFrom="tw-scale-100"
        leaveTo="tw-scale-0"
        className="tw-absolute tw-inset-0 tw-inline-block tw-w-full tw-h-1 tw-h-full tw-transform tw-bg-gray-900"
      >
  
      </Transition>
          </span>
        </a>


        <a href="/blog" className="tw-relative tw-font-medium tw-leading-6 tw-text-gray-600 tw-transition tw-duration-150 tw-ease-out hover:tw-text-gray-900" x-data="{ hover: false }" onMouseEnter={() => setHoverBlog(true)} onMouseLeave={() => setHoverBlog(false)}>
          <span className="tw-block tw-font-bold">Blog</span>
          <span className="tw-absolute tw-bottom-0 tw-left-0 tw-inline-block tw-w-full tw-h-0.5 tw--mb-1 tw-overflow-hidden">
          <Transition
        as="span"
        appear={true} 
        show={hoverBlog}
        enter="tw-transition ease tw-duration-200"
        enterFrom="tw-scale-0"
        enterTo="tw-scale-100"
        leave="tw-transition tw-ease-out tw-duration-300"
        leaveFrom="tw-scale-100"
        leaveTo="tw-scale-0"
        className="tw-absolute tw-inset-0 tw-inline-block tw-w-full tw-h-1 tw-h-full tw-transform tw-bg-gray-900"
      >
  
      </Transition>
          </span>
        </a>
      </nav>
      <div className="tw-relative tw-z-10 tw-inline-flex tw-items-center tw-space-x-3 md:tw-ml-5 lg:tw-justify-end">
        <a href="/auth/sign-in" className />
        <span className="tw-inline-flex tw-rounded-md tw-shadow-sm">
          <a href="/auth/sign-in" className="tw-inline-flex tw-items-center tw-justify-center tw-px-4 tw-py-2 tw-text-base tw-leading-6 tw-text-white tw-whitespace-no-wrap tw-bg-blue-600 tw-border tw-border-blue-700 tw-rounded-md tw-shadow-sm hover:tw-bg-blue-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-blue-500 tw-font-bold">Sign In</a>
        </span>
      </div>
    </div>
  </section>

  )
}
