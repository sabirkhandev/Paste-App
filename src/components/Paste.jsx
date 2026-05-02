import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../features/pasteSlice';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Edit, Eye, Trash2, Copy, Share } from "lucide-react";

const Paste = () => {
  const [search, setSearch] = useState('');
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) => 
    paste.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  const handleShare = (paste) => {
    const shareUrl = `${window.location.origin}/pastes/${paste?._id}`;
    if (navigator.share) {
      navigator.share({ title: paste.title, url: shareUrl })
        .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Share link copied!");
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className='max-w-4xl mx-auto p-4 mt-6'>
      
      {/* Search Section */}
      <div className='mb-6'>
        <input 
          type="text" 
          value={search}
          placeholder='Search paste here...'
          onChange={(e) => setSearch(e.target.value)}
          className='border focus:border-blue-500 outline-none w-full p-2 rounded-md'
        />
      </div>

      {/* List Section */}
      <div className='border border-blue-500 rounded-md p-4'>
        <h3 className='font-bold text-2xl mb-4 border-b border-b-blue-500 pb-2'>All Pastes</h3>
        
        <div className='flex flex-col gap-4'>
          {filterData.length > 0 ? (
            filterData.map((paste) => (
              <div key={paste?._id} className='flex justify-between border  p-4 rounded-md gap-4'>
                
                {/* Content Area */}
                <div className='flex flex-col gap-2 min-w-0'>
                  <div className='font-bold text-xl wrap-break-word'>{paste.title}</div>
                  <div className='text-gray-600 wrap-break-word overflow-hidden'>{paste.content}</div>
                </div>

                {/* Actions Area */}
                <div className='flex flex-col items-end gap-4 shrink-0'>
                  <div className='flex gap-2 flex-wrap justify-end'>

                    <Link title="View" to={`/pastes/${paste?._id}`} className='p-2 border rounded hover:text-blue-500'><Eye size={15} /></Link>

                    <Link title="Edit" to={`/?pasteId=${paste?._id}`} className='p-2 border rounded hover:text-blue-500'><Edit size={15} /></Link>

                    <button title="Copy" onClick={() => handleCopy(paste?.content)} className='p-2 border rounded hover:text-blue-500'><Copy size={15} /></button>

                    <button title="Delete" onClick={() => handleDelete(paste?._id)} className='p-2 border rounded hover:text-blue-500'><Trash2 size={15} /></button>

                    <button title="Share" onClick={() => handleShare(paste)} className='p-2 border rounded hover:text-blue-500'><Share size={15}/></button>
                  </div>
                  
                  <div className='text-xs text-gray-500 font-medium'>
                    Created on : {paste.createdAt}
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className='text-xl text-center py-10 text-gray-400 font-semibold'>No Paste Found!</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Paste