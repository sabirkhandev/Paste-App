import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className='max-w-4xl mx-auto p-10 text-center text-2xl font-bold text-gray-400'>
        Paste not found! 😕
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-4 mt-6'>
      <div className='flex flex-col gap-6 border border-gray-300 p-6 rounded-md bg-white shadow-sm'>
        
        <div>
          <label className='block text-sm font-medium text-blue-500 mb-1'>Title</label>
          <input 
            className='font-bold text-xl border-2 rounded-md px-4 py-2 bg-gray-50 cursor-not-allowed w-full outline-none'
            value={paste?.title}
            disabled
            readOnly 
          />
        </div>

        {/* Content Section */}
        <div>
          <label className='block text-sm font-medium text-blue-500 mb-1'>Content</label>
          <textarea 
            className='border-2 rounded-md px-4 py-2 bg-gray-50 cursor-not-allowed resize-none w-full min-h-100 outline-none'
            value={paste?.content}
            disabled
            readOnly
          />
        </div>

        <div className='text-right text-xs text-gray-400 font-medium italic'>
          Created on: {paste.createdAt}
        </div>

        <Link to="/pastes" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Pastes
        </Link>

      </div>
    </div>
  )
}

export default ViewPaste