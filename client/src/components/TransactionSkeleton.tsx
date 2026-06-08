import React from 'react'
import { Skeleton } from './ui/skeleton'

export default function TransactionSkeleton() {
  return (
    <div className='space-y-4'>
        {[1,2,3,4].map((item)=>(
            <Skeleton key={item} className="h-20 w-full" />
        ))}
      
    </div>
  )
}
