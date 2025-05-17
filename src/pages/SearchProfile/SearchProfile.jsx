import React from 'react'

function SearchProfile() {
  return (
    <div className='w-full h-dvh'>
      <div className='pt-[100px] pl-10 pr-10'>

        <div className='flex justify-center'>
          <label className="input">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search Name" />
          </label>
          <button className="btn btn-primary">Search</button>
        </div>

        <div className='mt-10'>

          <ul className="list bg-base-100 rounded-box shadow-md">

            <li className="list-row">
              {/* <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div> */}
              <div>
                <div>Milan Sony</div>
                {/* <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div> */}
              </div>
              {/* <button className="btn btn-square btn-ghost">
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
              </button>
              <button className="btn btn-square btn-ghost">
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
              </button> */}
            </li>

          </ul>

        </div>

      </div>
    </div>
  )
}

export default SearchProfile
