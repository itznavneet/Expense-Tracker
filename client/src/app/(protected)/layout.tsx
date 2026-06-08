import MobileSidebar from '@/components/MobileSidebar'
import ProtectedRoute from '@/components/ProtectedRoute'
import Sidebar from '@/components/ui/Sidebar'
import React from 'react'

export default function layout({children,}: {children: React.ReactNode}) {
  return (
    <ProtectedRoute>
    <div className='flex'>
      <div className='hidden md:block'>
        <Sidebar/>
        </div>
        <main className="flex-1">
          <div className='md:hidden p-4 border-b'>
            <MobileSidebar/>
          </div>
          <div className='p-6'>
        {children}
        </div>
      </main>
      
    </div>
    </ProtectedRoute>
  )
}
