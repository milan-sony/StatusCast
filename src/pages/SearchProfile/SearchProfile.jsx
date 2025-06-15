import { UserRoundPlus } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { userSearchStore } from '../../store/userSearchStore'
import { userFriendRequestStore } from '../../store/userFriendRequestStore'

function SearchProfile() {
  const { searchUserProfiles, userProfiles, isLoading } = userSearchStore()
  const { sendRequest } = userFriendRequestStore()

  const [formData, setFormData] = useState({
    searchName: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    const { searchName } = formData
    if (!searchName.trim()) {
      toast.error('Search field is required')
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isFormValid = validateForm()
    if (isFormValid) {
      searchUserProfiles(formData)
      setFormData({ searchName: '' })
    }
  }

  return (
    <div className='w-full h-screen overflow-hidden'>
      <div className='pt-[100px] px-10'>

        {/* Search Input */}
        <form onSubmit={handleSubmit} className='flex justify-center gap-2'>
          <label className="input flex items-center gap-2 w-full max-w-md">
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
            <input
              type="search"
              required
              placeholder="Search Name / Username / Email"
              name="searchName"
              aria-label="Search by name, username, or email"
              value={formData.searchName}
              onChange={handleChange}
              className="w-full bg-transparent outline-none"
            />
          </label>
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        {/* Result Section */}
        <div className='mt-10 max-h-[400px] overflow-y-auto'>
          {isLoading ? (
            <div className='w-full flex justify-center mt-10'>
              <span className="loading loading-spinner text-primary"></span>
            </div>
          ) : userProfiles.length === 0 ? (
            <div className='w-full flex justify-center mt-10'>
              <p className='font-roboto text-sm opacity-60'>No profile found!</p>
            </div>
          ) : (
            userProfiles.map((profile) => (
              <>
                <div key={profile?._id} className='w-full flex justify-center p-2'>
                  <div className='flex p-4 bg-base-200 rounded-box w-full max-w-md justify-between items-center shadow-md'>
                    <div>
                      <h1 className='font-bold text-sm font-roboto lowercase'>{profile?.userName}</h1>
                      <div className='flex flex-col sm:flex-row mt-2'>
                        <p className='font-medium text-xs font-roboto sm:mr-2 capitalize'>{profile?.firstName} {profile?.lastName}</p>
                        <p className='font-medium text-xs font-roboto sm:ml-2 lowercase'>{profile?.email}</p>
                      </div>
                    </div>
                    <button className="btn btn-sm btn-soft btn-success" aria-label="Add User" onClick={() => sendRequest(profile?._id)}>
                      <UserRoundPlus size={15} />
                    </button>
                  </div>
                </div>
              </>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default SearchProfile
