"use client"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border rounded-xl p-4 space-y-4">
          <Skeleton className="w-full h-48 rounded-xl" />
          <Skeleton className="w-2/3 h-6" />
          <Skeleton className="w-full h-4" />
          <div className="flex justify-between items-center">
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-12 h-6" />
          </div>
          <Skeleton className="w-full h-10" />
        </div>
      ))}
    </div>
  )
}