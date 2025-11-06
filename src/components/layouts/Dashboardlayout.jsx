import React from 'react'
import Navbar from './Navbar'

const Dashboardlayout = ({children, activeMenue}) => {
  return (
    <div>
        <div>
            <Navbar activeMenue={activeMenue}/>
        </div>
        <main className="flex-1 mt-6 px-6">
        {children}
      </main>
        
    </div>
  )
}

export default Dashboardlayout