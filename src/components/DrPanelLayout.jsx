import React from 'react'
import DrPanelSidebar from './DrPanelSidebar'

const DrPanelLayout = ({children}) => {
  return (
     <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar (always visible on admin pages) */}
      <div className="hidden md:block">
        <DrPanelSidebar activeMenue="drdashboard"/>
      </div>

      {/* Mobile sidebar */}
      <div className="md:hidden">
        <DrPanelSidebar />
      </div>

      {/* Main content area */}
      <main className="flex-1 w-full md:ml-5">
        <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>
      </main>
    </div>
  )
}

export default DrPanelLayout