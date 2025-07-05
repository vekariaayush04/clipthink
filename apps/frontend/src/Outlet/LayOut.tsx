import { Navbar } from '@/components/navbar'
import { Outlet } from 'react-router-dom'

const LayOut = () => {
  return (
    <div className="flex h-screen flex-col max-w-screen box-border">
        <Navbar />
        <Outlet />
    </div>
  )
}

export default LayOut