import React, { useRef } from 'react'

export default function Form() {
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const descriptionRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      description: descriptionRef.current.value
    }
    console.log(formData)

    try {
      const response = await fetch('/apps/vite-proxy-subpath/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      nameRef.current.value = ''
      emailRef.current.value = ''
      descriptionRef.current.value = ''
  
      const data = await response.json()
      console.log(data)
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="tw-min-h-full tw-flex tw-justify-center tw-items-center">
      <form onSubmit={handleSubmit} className="tw-bg-white tw-w-96 tw-p-8 tw-shadow-lg tw-rounded-lg tw-border-2 tw-border-black">
        <div className="tw-mb-4">
          <label htmlFor="name" className="tw-block tw-text-md tw-font-medium tw-text-black">Name</label>
          <input
            ref={nameRef}
            type="text"
            id="name"
            name="name"
            className="tw-mt-1 tw-p-2 tw-w-full tw-border-2 tw-border-black tw-rounded-md tw-text-black"
            required
          />
        </div>
        <div className="tw-mb-4">
          <label htmlFor="email" className="tw-block tw-text-md tw-font-medium tw-text-black">Email</label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            name="email"
            className="tw-mt-1 tw-p-2 tw-w-full tw-border-2 tw-border-black tw-rounded-md tw-text-black"
            required
          />
        </div>
        <div className="tw-mb-4">
          <label htmlFor="description" className="tw-block tw-text-md tw-font-medium tw-text-black">Description</label>
          <textarea
            ref={descriptionRef}
            id="description"
            name="description"
            className="tw-mt-1 tw-p-2 tw-w-full tw-border-2 tw-border-black tw-rounded-md tw-text-black"
            required
          ></textarea>
        </div>
        <div className="tw-flex tw-justify-end">
          <button type="submit" className="tw-bg-black tw-hover:bg-gray-800 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}