import ProtectedRoute from '@/components/ProtectedRoute'
import Sidebar from '@/components/ui/Sidebar'
import React from 'react'

export default function layout({children,}: {children: React.ReactNode}) {
  return (
    <ProtectedRoute>
    <div className='flex'>
        <Sidebar/>
        <main className="flex-1 p-6">
        {children}
      </main>
      
    </div>
    </ProtectedRoute>
  )
}
