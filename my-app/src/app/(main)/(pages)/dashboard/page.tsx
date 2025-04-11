// import React from 'react'

// const DashboardPage = () => {
//   return (
//     <div className="flex flex-col gap-4 relative">
//       <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
//         Dashboard
//       </h1>
//     </div>
//   )
// }

// export default DashboardPage


import { ChartAreaInteractive } from "@/src/components/dashboard/chart-area-interactive"
import { DataTable } from "@/src/components/dashboard/data-table"
import { SectionCards } from "@/src/components/dashboard/section-cards"
import { SiteHeader } from "@/src/components/dashboard/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import React from "react"

import data from "./data.json"

export default function Page() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
