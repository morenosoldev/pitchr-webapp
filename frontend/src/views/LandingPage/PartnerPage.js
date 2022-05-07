import { useState,useRef } from 'react';
import Nav from './Nav'
import { Waitlist } from 'waitlistapi';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { openPopupWidget } from 'react-calendly';


export default function PartnerPage() {
    const [showWaitlist, setShowWaitlist] = useState(false);
    const handleClose = () => setShowWaitlist(false);
    const handleShowWaitlist = () => setShowWaitlist(true);
    let myRef = useRef();

    const scrollTo = () => {
        window.scrollTo({ behavior: 'smooth', top: myRef.current.offsetTop })
      }

  return (
    <div>
    <div>
  <Nav/>
  <section className="tw-block tw-py-24 tw-leading-7 tw-text-left tw-text-gray-900 tw-bg-white">
    <div className="tw-relative tw-w-full tw-px-5 tw-px-8 tw-mx-auto tw-leading-7 tw-text-gray-900 tw-max-w-7xl lg:tw-px-16 xl:tw-px-32">
      <div className="tw-flex tw-flex-col tw-flex-wrap tw-items-center tw-text-left md:tw-flex-row">
        <div className="tw-flex-1 tw-opacity-100 xl:tw-pr-12 tw-transform-none">
          <h1 className="tw-box-border tw-mt-0 tw-text-4xl tw-font-normal tw-tracking-tight tw-text-center tw-text-gray-900 sm:tw-text-5xl md:tw-text-4xl lg:tw-text-5xl tw-mb-7 md:tw-text-left tw-font-bold">
            Welcome to <span className="tw-text-blue-600 tw-font-bold">Pitchr</span>. <span className="tw-block" />
          </h1>
          {/* Text */}
          <p className="tw-box-border tw-mt-0 tw-mb-8 tw-text-base tw-font-normal tw-text-center tw-text-gray-500 lg:tw-text-xl md:tw-text-left lg:tw-mb-8">Are you part of a company or organization that fits our vision of democratizing access to venture capital? Let's have a chat about how we can help each other out!</p>
          {/* Buttons */}
          <div className="tw-box-border tw-leading-7 tw-text-center tw-text-gray-900 md:tw-text-left">
            <a  onClick={() => openPopupWidget({url: "https://calendly.com/frederik-fuglsbjerg"})} href="#_" className="tw-inline-block tw-w-full tw-px-5 tw-py-3 tw-mb-3 tw-mr-1 tw-text-base tw-font-semibold tw-text-white tw-no-underline tw-align-middle tw-bg-blue-600 tw-border tw-border-transparent tw-border-solid tw-rounded-md tw-cursor-pointer tw-select-none sm:tw-mb-0 sm:tw-w-auto hover:tw-bg-blue-700 hover:tw-border-blue-700 hover:tw-text-white focus-within:tw-bg-blue-700 focus-within:tw-border-blue-700">Schedule a chat</a>
          </div>
        </div>
        <div className="tw-relative tw-flex tw-justify-center tw-flex-1 tw-w-full tw-px-5 tw-mt-16 tw-leading-7 tw-text-gray-900 md:tw-justify-end md:tw-mt-0">
          {/* Image */}
          <img src="https://cdn.devdojo.com/images/november2020/welcome.png" className="tw-w-full tw-max-w-md" />
        </div>
      </div>
    </div>
  </section>

  {/* Section 4 */}
  <section className="tw-bg-white">
    <div className="tw-px-8 tw-py-8 tw-mx-auto tw-max-w-7xl">
      <div className="tw-relative tw-px-6 tw-py-10 tw-overflow-hidden tw-rounded-2xl lg:tw-p-16 lg:tw-flex lg:tw-flex-col lg:tw-items-center lg:tw-justify-between">
        {/* Left Pattern */}
        <div className="tw-absolute tw-top-0 tw-left-0 tw-z-10 tw-hidden tw-h-full tw-p-4 tw-mt-1 tw-ml-3 tw--mt-4 tw--ml-4 tw-transform tw--rotate-90 lg:tw-block">
          <svg className="tw-w-auto tw-h-full tw-fill-current tw-text-blue-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 390">
          <defs /><g fillRule="nonzero"><circle cx={10} cy={10} r="9.5" /><circle cx={47} cy={10} r="9.5" /><circle cx={84} cy={10} r="9.5" /><circle cx={121} cy={10} r="9.5" /><circle cx={158} cy={10} r="9.5" /><circle cx={195} cy={10} r="9.5" /><circle cx={232} cy={10} r="9.5" /><circle cx={269} cy={10} r="9.5" /><circle cx={306} cy={10} r="9.5" /><circle cx={343} cy={10} r="9.5" /><circle cx={380} cy={10} r="9.5" /><circle cx={47} cy={47} r="9.5" /><circle cx={84} cy={47} r="9.5" /><circle cx={121} cy={47} r="9.5" /><circle cx={158} cy={47} r="9.5" /><circle cx={195} cy={47} r="9.5" /><circle cx={232} cy={47} r="9.5" /><circle cx={269} cy={47} r="9.5" /><circle cx={306} cy={47} r="9.5" /><circle cx={343} cy={47} r="9.5" /><circle cx={380} cy={47} r="9.5" /><circle cx={84} cy={84} r="9.5" /><circle cx={121} cy={84} r="9.5" /><circle cx={158} cy={84} r="9.5" /><circle cx={195} cy={84} r="9.5" /><circle cx={232} cy={84} r="9.5" /><circle cx={269} cy={84} r="9.5" /><circle cx={306} cy={84} r="9.5" /><circle cx={343} cy={84} r="9.5" /><circle cx={380} cy={84} r="9.5" /><circle cx={121} cy={121} r="9.5" /><circle cx={158} cy={121} r="9.5" /><circle cx={195} cy={121} r="9.5" /><circle cx={232} cy={121} r="9.5" /><circle cx={269} cy={121} r="9.5" /><circle cx={306} cy={121} r="9.5" /><circle cx={343} cy={121} r="9.5" /><circle cx={380} cy={121} r="9.5" /><circle cx={158} cy={158} r="9.5" /><circle cx={195} cy={158} r="9.5" /><circle cx={232} cy={158} r="9.5" /><circle cx={269} cy={158} r="9.5" /><circle cx={306} cy={158} r="9.5" /><circle cx={343} cy={158} r="9.5" /><circle cx={380} cy={158} r="9.5" /><circle cx={195} cy={195} r="9.5" /><circle cx={232} cy={195} r="9.5" /><circle cx={269} cy={195} r="9.5" /><circle cx={306} cy={195} r="9.5" /><circle cx={343} cy={195} r="9.5" /><circle cx={380} cy={195} r="9.5" /><circle cx={232} cy={232} r="9.5" /><circle cx={269} cy={232} r="9.5" /><circle cx={306} cy={232} r="9.5" /><circle cx={343} cy={232} r="9.5" /><circle cx={380} cy={232} r="9.5" /><circle cx={269} cy={269} r="9.5" /><circle cx={306} cy={269} r="9.5" /><circle cx={343} cy={269} r="9.5" /><circle cx={380} cy={269} r="9.5" /><circle cx={306} cy={306} r="9.5" /><circle cx={343} cy={306} r="9.5" /><circle cx={380} cy={306} r="9.5" /><circle cx={343} cy={343} r="9.5" /><circle cx={380} cy={343} r="9.5" /><circle cx={380} cy={380} r="9.5" /></g>
          </svg>
        </div>
        {/* Right Pattern */}
        <div className="tw-absolute tw-bottom-0 tw-right-0 tw-z-10 tw-hidden tw-h-full tw-p-4 tw-mt-1 tw-ml-3 tw--mb-4 tw--mr-4 tw-transform tw-rotate-90 md:tw-block">
        <svg className="tw-w-auto tw-h-full tw-fill-current tw-text-blue-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 390">
        <defs /><g fillRule="nonzero"><circle cx={10} cy={10} r="9.5" /><circle cx={47} cy={10} r="9.5" /><circle cx={84} cy={10} r="9.5" /><circle cx={121} cy={10} r="9.5" /><circle cx={158} cy={10} r="9.5" /><circle cx={195} cy={10} r="9.5" className /><circle cx={232} cy={10} r="9.5" /><circle cx={269} cy={10} r="9.5" className /><circle cx={306} cy={10} r="9.5" /><circle cx={343} cy={10} r="9.5" /><circle cx={380} cy={10} r="9.5" /><circle cx={47} cy={47} r="9.5" /><circle cx={84} cy={47} r="9.5" /><circle cx={121} cy={47} r="9.5" /><circle cx={158} cy={47} r="9.5" /><circle cx={195} cy={47} r="9.5" /><circle cx={232} cy={47} r="9.5" /><circle cx={269} cy={47} r="9.5" className /><circle cx={306} cy={47} r="9.5" /><circle cx={343} cy={47} r="9.5" /><circle cx={380} cy={47} r="9.5" /><circle cx={84} cy={84} r="9.5" /><circle cx={121} cy={84} r="9.5" /><circle cx={158} cy={84} r="9.5" className /><circle cx={195} cy={84} r="9.5" className /><circle cx={232} cy={84} r="9.5" /><circle cx={269} cy={84} r="9.5" className /><circle cx={306} cy={84} r="9.5" /><circle cx={343} cy={84} r="9.5" /><circle cx={380} cy={84} r="9.5" /><circle cx={121} cy={121} r="9.5" /><circle cx={158} cy={121} r="9.5" className /><circle cx={195} cy={121} r="9.5" /><circle cx={232} cy={121} r="9.5" /><circle cx={269} cy={121} r="9.5" className /><circle cx={306} cy={121} r="9.5" /><circle cx={343} cy={121} r="9.5" /><circle cx={380} cy={121} r="9.5" /><circle cx={158} cy={158} r="9.5" /><circle cx={195} cy={158} r="9.5" /><circle cx={232} cy={158} r="9.5" /><circle cx={269} cy={158} r="9.5" /><circle cx={306} cy={158} r="9.5" /><circle cx={343} cy={158} r="9.5" /><circle cx={380} cy={158} r="9.5" /><circle cx={195} cy={195} r="9.5" /><circle cx={232} cy={195} r="9.5" /><circle cx={269} cy={195} r="9.5" /><circle cx={306} cy={195} r="9.5" /><circle cx={343} cy={195} r="9.5" /><circle cx={380} cy={195} r="9.5" /><circle cx={232} cy={232} r="9.5" className /><circle cx={269} cy={232} r="9.5" /><circle cx={306} cy={232} r="9.5" /><circle cx={343} cy={232} r="9.5" /><circle cx={380} cy={232} r="9.5" /><circle cx={269} cy={269} r="9.5" /><circle cx={306} cy={269} r="9.5" /><circle cx={343} cy={269} r="9.5" /><circle cx={380} cy={269} r="9.5" /><circle cx={306} cy={306} r="9.5" /><circle cx={343} cy={306} r="9.5" /><circle cx={380} cy={306} r="9.5" /><circle cx={343} cy={343} r="9.5" /><circle cx={380} cy={343} r="9.5" /><circle cx={380} cy={380} r="9.5" /></g>
        </svg>
        </div>
        <h3 className="tw-relative tw-z-20 tw-mb-4 tw--mt-1 tw-text-4xl tw-font-bold">Join the Waitlist and Refer a Friend!</h3>
        <p className="tw-relative tw-z-20 tw-mb-6 tw-text-lg">The platform will open, once the waitlist is full! To avoid the wait, refer a friend and help us get started!</p>
        <div className="tw-relative tw-z-20 tw-flex tw-flex-col tw-items-center tw-w-full tw-space-y-5 md:tw-space-x-5 md:tw-space-y-0 md:tw-flex-row md:tw-w-auto lg:tw-flex-shrink-0 md:tw-px-0">
          <a  onClick={handleShowWaitlist} href="#_" className="tw-block tw-w-full tw-px-5 tw-py-3 tw-text-base tw-font-medium tw-leading-6 tw-text-center tw-text-white tw-transition tw-duration-150 tw-ease-in-out tw-bg-blue-600 tw-rounded-md md:tw-inline-flex md:tw-shadow-sm md:tw-w-auto hover:tw-bg-blue-500 focus:tw-outline-none focus:tw-shadow-outline">Join Waitlist</a>
        </div>
      </div>
    </div>
  </section>
  <Modal show={showWaitlist} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Join waitlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Waitlist api_key="0MXMG3" waitlist_link="https://pitchr.vc" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
    </Modal>
  {/* Section 5 */}
  <section className="tw-w-full tw-bg-blue-600">
    <div className="tw-px-8 tw-py-12 tw-mx-auto tw-max-w-7xl">
      <div className="tw-grid tw-grid-cols-2 tw-gap-10 tw-mb-3 md:tw-grid-cols-3 lg:tw-grid-cols-12 lg:tw-gap-20">
        <div className="tw-col-span-3">
          <a  href="#_" className="tw-text-xl tw-font-black tw-leading-none tw-text-white tw-select-none logo">pitchr</a>
          <p className="tw-my-4 tw-text-xs tw-leading-normal tw-text-blue-100">Fundraising, made simple.</p>
        </div>
        <nav className="tw-col-span-1 md:tw-col-span-1 lg:tw-col-span-2">
          <p className="tw-mb-3 tw-text-xs tw-font-semibold tw-tracking-wider tw-text-blue-200 tw-uppercase">For Startups</p>
          <a href="#" className="tw-flex tw-mb-3 tw-text-sm tw-font-medium tw-text-blue-100 tw-transition md:tw-mb-2 hover:tw-text-white" />
          <a href="#" className="tw-flex tw-mb-3 tw-text-sm tw-font-medium tw-text-blue-100 tw-transition md:tw-mb-2 hover:tw-text-white" />
          <a href="#" className="tw-flex tw-mb-3 tw-text-sm tw-font-medium tw-text-blue-100 tw-transition md:tw-mb-2 hover:tw-text-white" />
          <a href="#" className="tw-flex tw-mb-3 tw-text-sm tw-font-medium tw-text-blue-100 tw-transition md:tw-mb-2 hover:tw-text-white" />
          <a href="#" className="tw-flex tw-mb-3 tw-text-sm tw-font-medium tw-text-blue-100 tw-transition md:tw-mb-2 hover:tw-text-white" />
        </nav>
        <nav className="tw-col-span-1 md:tw-col-span-1 lg:tw-col-span-2">
          <p className="tw-mb-3 tw-text-xs tw-font-semibold tw-tracking-wider tw-text-blue-200 tw-uppercase">For investors</p>
          <a href="#" className="tw-flex tw-mb-3 tw-text-sm tw-font-medium tw-text-blue-100 tw-transition md:tw-mb-2 hover:tw-text-white" />
          <a href="#" className="tw-flex tw-mb-3 tw-text-sm tw-font-medium tw-text-blue-100 tw-transition md:tw-mb-2 hover:tw-text-white" />
          <a href="#" className="tw-flex tw-mb-3 tw-text-sm tw-font-medium tw-text-blue-100 tw-transition md:tw-mb-2 hover:tw-text-white" />
          <a href="#" className="tw-flex tw-mb-3 tw-text-sm tw-font-medium tw-text-blue-100 tw-transition md:tw-mb-2 hover:tw-text-white" />
        </nav>
        <nav className="tw-col-span-2 md:tw-col-span-1 lg:tw-col-span-2">
          <p className="tw-mb-3 tw-text-xs tw-font-semibold tw-tracking-wider tw-text-blue-200 tw-uppercase">For partners</p>
          <a href="#" className="tw-flex tw-mb-3 tw-text-sm tw-font-medium tw-text-blue-100 tw-transition md:tw-mb-2 hover:tw-text-white" />
          <a href="#" className="tw-flex tw-mb-3 tw-text-sm tw-font-medium tw-text-blue-100 tw-transition md:tw-mb-2 hover:tw-text-white" />
          <a href="#" className="tw-flex tw-mb-3 tw-text-sm tw-font-medium tw-text-blue-100 tw-transition md:tw-mb-2 hover:tw-text-white" />
          <a href="#" className="tw-flex tw-mb-3 tw-text-sm tw-font-medium tw-text-blue-100 tw-transition md:tw-mb-2 hover:tw-text-white" />
          <a href="#" className="tw-flex tw-mb-3 tw-text-sm tw-font-medium tw-text-blue-100 tw-transition md:tw-mb-2 hover:tw-text-white" />
        </nav>
        <div className="tw-col-span-3">
          <span className="tw-inline-flex tw-justify-center tw-w-full tw-mt-4 tw-space-x-5 sm:tw-ml-auto sm:tw-mt-0 sm:tw-justify-end">
            <a href="#" className="tw-text-blue-100 hover:tw-text-white">
              <span className="tw-sr-only">Facebook</span>
              <svg className="tw-w-6 tw-h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="tw-text-blue-100 hover:tw-text-white">
              <span className="tw-sr-only">Instagram</span>
              <svg className="tw-w-6 tw-h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="tw-text-blue-100 hover:tw-text-white">
              <span className="tw-sr-only">Twitter</span>
              <svg className="tw-w-6 tw-h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="tw-text-blue-100 hover:tw-text-white">
              <span className="tw-sr-only">GitHub</span>
              <svg className="tw-w-6 tw-h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="tw-text-blue-100 hover:tw-text-white">
              <span className="tw-sr-only">Dribbble</span>
              <svg className="tw-w-6 tw-h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
              </svg>
            </a>
          </span>
        </div>
      </div>
      <div className="tw-flex tw-flex-col tw-items-start tw-justify-between tw-pt-10 tw-mt-10 tw-border-t tw-border-blue-500 md:tw-flex-row md:tw-items-center">
        <p className="tw-mb-6 tw-text-sm tw-text-left tw-text-blue-200 md:tw-mb-0">© Copyright 2021 Pitchr. All Rights Reserved.</p>
        <div className="tw-flex tw-items-start tw-justify-start tw-space-x-6 md:tw-items-center md:tw-justify-center">
          <a href="#_" className="tw-text-sm tw-text-blue-200 tw-transition hover:tw-text-white">Terms</a>
          <a href="#_" className="tw-text-sm tw-text-blue-200 tw-transition hover:tw-text-white">Privacy</a>
        </div>
      </div>
    </div>
  </section>
</div>

    </div>
  )
}
