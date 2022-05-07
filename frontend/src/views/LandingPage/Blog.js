import React from 'react'
import Nav from './Nav'

export default function Blog() {
  return (
    <div>
        <div>
    <Nav/>
  <section className="tw-w-full tw-py-16 tw-bg-white">
    <div className="tw-px-10 tw-mx-auto tw-max-w-7xl">
      <div className="tw-text-center">
        <h2 className="tw-relative tw-inline-block tw-px-5 tw-py-2 tw-mb-5 tw-text-5xl tw-font-bold tw-font-extrabold tw-bg-white tw-border-2 tw-border-black">
          <div className="tw-absolute tw-w-full tw-py-2 tw-h-full tw-inset-0 tw-border-2 tw-border-black tw-bg-black tw-ml-1.5 tw-mt-1.5" />
          <div className="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-py-2 tw-bg-white" />
          <span className="tw-relative">Pitchr blog</span>
        </h2>
        <p className="tw-text-xl tw-font-medium tw-text-gray-800 tw-mb-7">View the latest posts from our blog</p>
      </div>
      <div className="tw-grid tw-grid-cols-12 tw-gap-8">
        <div className="tw-relative tw-col-span-12 tw-duration-150 tw-ease-out tw-transform tw-border-2 tw-border-black tw-cursor-pointer md:tw-col-span-6 lg:tw-col-span-4 hover:tw-scale-105">
          <a href="#_" className="tw-block tw-h-64 tw-overflow-hidden">
            <img src="https://cdn.devdojo.com/images/may2021/blogimg1.jpg" className="tw-object-cover tw-w-full tw-h-full" />
          </a>
          <div className="tw-p-5 tw-pb-6">
            <h2 className="tw-mb-2">
              <a href="/extracting-tailwindcss-from-html" className="tw-text-2xl tw-font-bold tw-leading-tight tw-tracking-tight">5 Tips on Getting The Most from Your Training Days</a>
            </h2>
            <p className="tw-mb-2 tw-text-sm tw-font-medium tw-tracking-widest tw-text-gray-500">Written on April 2, 2021</p>
            <p className="tw-text-gray-700">
              <span>Follow these simple steps to learn how you can increase your gains and get the most out of your training days. In this post we'll show you exactly how to accomplish this.</span>
            </p>
          </div>
        </div>
        <div className="tw-relative tw-col-span-12 tw-duration-150 tw-ease-out tw-transform tw-border-2 tw-border-black tw-cursor-pointer md:tw-col-span-6 lg:tw-col-span-4 hover:tw-scale-105">
          <a href="#_" className="tw-block tw-h-64 tw-overflow-hidden">
            <img src="https://cdn.devdojo.com/images/may2021/blogimg2.jpg" className="tw-object-cover tw-w-full tw-h-full" />
          </a>
          <div className="tw-p-5 tw-pb-6">
            <h2 className="tw-mb-2">
              <a href="/extracting-tailwindcss-from-html" className="tw-text-2xl tw-font-bold tw-leading-tight tw-tracking-tight">Learn about the Retro Tech that Pushed the Limits</a>
            </h2>
            <p className="tw-mb-2 tw-text-sm tw-font-medium tw-tracking-widest tw-text-gray-500">Written on April 2, 2021</p>
            <p className="tw-text-gray-700">
              <span>Have you ever wondered about the devices that got us to where we are today? In this article you will learn about the old tech gadgets that tw-transformed our culture.</span>
            </p>
          </div>
        </div>
        <div className="tw-relative tw-col-span-12 tw-duration-150 tw-ease-out tw-transform tw-border-2 tw-border-black tw-cursor-pointer md:tw-col-span-6 lg:tw-col-span-4 hover:tw-scale-105">
          <a href="#_" className="tw-block tw-h-64 tw-overflow-hidden">
            <img src="https://cdn.devdojo.com/images/may2021/blogimg3.jpg" className="tw-object-cover tw-w-full tw-h-full" />
          </a>
          <div className="tw-p-5 tw-pb-6">
            <h2 className="tw-mb-2">
              <a href="/extracting-tailwindcss-from-html" className="tw-text-2xl tw-font-bold tw-leading-tight tw-tracking-tight">Travel Destinations that Should be on Your Bucket List</a>
            </h2>
            <p className="tw-mb-2 tw-text-sm tw-font-medium tw-tracking-widest tw-text-gray-500">Written on April 2, 2021</p>
            <p className="tw-text-gray-700">
              <span className>Check out these top destinations that is an tw-absolute must visit before you kick the bucket. Find out some of the top destinations from around the world.</span>
            </p>
          </div>
        </div>
        <div className="tw-relative tw-col-span-12 tw-duration-150 tw-ease-out tw-transform tw-border-2 tw-border-black tw-cursor-pointer md:tw-col-span-6 lg:tw-col-span-4 hover:tw-scale-105">
          <a href="#_" className="tw-block tw-h-64 tw-overflow-hidden">
            <img src="https://cdn.devdojo.com/images/may2021/blogimg4.jpg" className="tw-object-cover tw-w-full tw-h-full" />
          </a>
          <div className="tw-p-5 tw-pb-6">
            <h2 className="tw-mb-2">
              <a href="/extracting-tailwindcss-from-html" className="tw-text-2xl tw-font-bold tw-leading-tight tw-tracking-tight">The Best Breeds</a>
            </h2>
            <p className="tw-mb-2 tw-text-sm tw-font-medium tw-tracking-widest tw-text-gray-500">Written on April 2, 2021</p>
            <p className="tw-text-gray-700">
              <span>Find out the best breeds for your personality type. You can learn a lot about an individual based on the dog they own.</span>
            </p>
          </div>
        </div>
        <div className="tw-relative tw-col-span-12 tw-duration-150 tw-ease-out tw-transform tw-border-2 tw-border-black tw-cursor-pointer md:tw-col-span-6 lg:tw-col-span-4 hover:tw-scale-105">
          <a href="#_" className="tw-block tw-h-64 tw-overflow-hidden">
            <img src="https://cdn.devdojo.com/images/may2021/blogimg5.jpg" className="tw-object-cover tw-w-full tw-h-full" />
          </a>
          <div className="tw-p-5 tw-pb-6">
            <h2 className="tw-mb-2">
              <a href="/extracting-tailwindcss-from-html" className="tw-text-2xl tw-font-bold tw-leading-tight tw-tracking-tight">The Best Holiday Drinks</a>
            </h2>
            <p className="tw-mb-2 tw-text-sm tw-font-medium tw-tracking-widest tw-text-gray-500">Written on April 2, 2021</p>
            <p className="tw-text-gray-700">
              <span>Holidays are the best time to hangout with family and friends. It's also an amazing time to enjoy these top rated drinks.</span>
            </p>
          </div>
        </div>
        <div className="tw-relative tw-col-span-12 tw-duration-150 tw-ease-out tw-transform tw-border-2 tw-border-black tw-cursor-pointer md:tw-col-span-6 lg:tw-col-span-4 hover:tw-scale-105">
          <a href="#_" className="tw-block tw-h-64 tw-overflow-hidden">
            <img src="https://cdn.devdojo.com/images/may2021/blogimg6.jpg" className="tw-object-cover tw-w-full tw-h-full" />
          </a>
          <div className="tw-p-5 tw-pb-6">
            <h2 className="tw-mb-2">
              <a href="/extracting-tailwindcss-from-html" className="tw-text-2xl tw-font-bold tw-leading-tight tw-tracking-tight">Hottest Rides of the Year</a>
            </h2>
            <p className="tw-mb-2 tw-text-sm tw-font-medium tw-tracking-widest tw-text-gray-500">Written on April 2, 2021</p>
            <p className="tw-text-gray-700">
              <span>See the vehicles that made the list of the premium exotic cars of the year. Picked and selected from top car enthusiasts.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Section 3 */}
  <section className="tw-bg-white">
    <div className="tw-max-w-6xl tw-py-12 tw-mx-auto">
      <div className="tw-grid tw-gap-8 md:tw-grid-cols-2 lg:tw-gap-12">
        <a href="#_" className="tw-flex tw-flex-col tw-p-6 tw-space-y-6 tw-transition-all tw-duration-500 tw-bg-white tw-border tw-border-indigo-100 tw-rounded-lg tw-shadow hover:tw-shadow-xl lg:tw-p-8 lg:tw-flex-row lg:tw-space-y-0 lg:tw-space-x-6">
          <div className="tw-flex tw-items-center tw-justify-center tw-w-16 tw-h-16 tw-border tw-border-indigo-200 tw-shadow-inner tw-bg-gradient-to-br tw-from-indigo-50 tw-to-indigo-200 tw-rounded-xl lg:tw-h-20 lg:tw-w-20">
            <svg className="tw-w-10 tw-h-10 tw-text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
          </div>
          <div className="tw-flex-1">
            <h5 className="tw-mt-1 tw-mb-2 tw-text-xl tw-font-bold lg:tw-text-2xl">Resources and Knowledge</h5>
            <p className="tw-mb-6 tw-text-lg tw-text-gray-600">Access a wealt=""h of startup and venture capital resources, including articles, tools and videos regarding investors, startup fundraising and pitch decks etc.</p>
            <span className="tw-flex tw-items-center tw-text-lg tw-font-bold tw-text-indigo-600">
              Customzation Details
              <svg className="tw-w-4 tw-h-4 tw-ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" className /></svg>
            </span>
          </div>
        </a>
        <a href="#_" className="tw-flex tw-flex-col tw-p-6 tw-space-y-6 tw-transition-all tw-duration-500 tw-bg-white tw-border tw-border-indigo-100 tw-rounded-lg tw-shadow hover:tw-shadow-xl lg:tw-p-8 lg:tw-flex-row lg:tw-space-y-0 lg:tw-space-x-6">
          <div className="tw-flex tw-items-center tw-justify-center tw-w-16 tw-h-16 tw-border tw-border-indigo-200 tw-shadow-inner tw-bg-gradient-to-br tw-from-indigo-50 tw-to-indigo-200 tw-rounded-xl lg:tw-h-20 lg:tw-w-20">
            <svg className="tw-w-10 tw-h-10 tw-text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" className /></svg>
          </div>
          <div className="tw-flex-1">
            <h5 className="tw-mt-1 tw-mb-2 tw-text-xl tw-font-bold lg:tw-text-2xl">Startup Checklists and Glossary</h5>
            <p className="tw-mb-6 tw-text-lg tw-text-gray-600">Access our checklists built for founders to keep an overview over their fundraising process, investor outreach, startup building and more. </p>
            <span className="tw-flex tw-items-center tw-text-lg tw-font-bold tw-text-indigo-600">
              Integration Details
              <svg className="tw-w-4 tw-h-4 tw-ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
          </div>
        </a>
      </div>
    </div>
  </section>
  {/* Section 4 */}
  <section className="tw-relative tw-w-full tw-pt-20 tw-pb-24 tw-bg-blue-600">
    <div className="tw-max-w-6xl tw-px-12 tw-mx-auto">
      <h3 className="tw-mt-1 tw-text-xl tw-font-medium tw-text-left tw-text-gray-100 sm:tw-text-3xl md:tw-text-4xl">Frequently Asked Questions</h3>
      <div className="tw-flex tw-flex-col tw-w-full tw-py-6 tw-mx-auto tw-mt-10 md:tw-flex-row sm:tw-py-8">
        <h3 className="tw-mb-2 tw-mr-10 tw-text-lg tw-font-medium tw-text-gray-200 md:tw-mb-0 tw-w-72 sm:tw-text-xl md:tw-text-lg">What is Pitchr?</h3>
        <p className="tw-text-base tw-text-gray-400 sm:tw-text-lg md:text-normal">Pitchr is a fundraising tool, which helps startups founders build a comprehensive pitch with an overview of their team, metrics, pitch deck, video pitch and product demo, and document room, and give them the ability to share all of this with one, simple link to their profile! Moreover, we help startups streamline their investor outreach through our integrated directory of global investors, where you can attach your Pitchr profile to the emails you send the investors.</p>
      </div>
      <div className="tw-flex tw-flex-col tw-w-full tw-py-6 tw-mx-auto tw-mt-10 md:tw-flex-row sm:tw-py-8">
        <h3 className="tw-mb-2 tw-mr-10 tw-text-lg tw-font-medium tw-text-gray-200 md:tw-mb-0 tw-w-72 sm:tw-text-xl md:tw-text-lg">Is my startup ready for investment?</h3>
        <p className="tw-text-base tw-text-gray-400 sm:tw-text-lg md:text-normal">Thankfully, your startup doesn't need to be 100% ready to fundraise to sign up to Pitchr.  You can also use our platform to present a pitch, meet potential investors for future rounds, or simply get access to our large directory of global investors.</p>
      </div>
      <div className="tw-flex tw-flex-col tw-w-full tw-py-6 tw-mx-auto tw-mt-10 md:tw-flex-row sm:tw-py-8">
        <h3 className="tw-mb-2 tw-mr-10 tw-text-lg tw-font-medium tw-text-gray-200 md:tw-mb-0 tw-w-72 sm:tw-text-xl md:tw-text-lg">How will Pitchr help my startup get funded?</h3>
        <p className="tw-text-base tw-text-gray-400 sm:tw-text-lg md:text-normal">We provide value to startups in two key ways: help you build a compelling and comprehensive pitch that will increase your conversion when reaching out to investors. Second, we help you find just the right investor for your startup through our directory of global investors that you can access to send out your pitch.</p>
      </div>
      <div className="tw-flex tw-flex-col tw-w-full tw-py-6 tw-mx-auto tw-mt-10 md:tw-flex-row sm:tw-py-8">
        <h3 className="tw-mb-2 tw-mr-10 tw-text-lg tw-font-medium tw-text-gray-200 md:tw-mb-0 tw-w-72 sm:tw-text-xl md:tw-text-lg">Why is Pitchr the go-to option for startups?</h3>
        <p className="tw-text-base tw-text-gray-400 sm:tw-text-lg md:text-normal">Pitchr is the go-to option for startups, because we simplify and streamline the fundraising process for you. We help you create an effective and compelling pitch, and reach out to relevant investors, so you can get funded as fast as possible.</p>
      </div>
    </div>
  </section>
</div>

    </div>
  )
}
