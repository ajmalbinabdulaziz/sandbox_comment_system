import Link from 'next/link'
import { useState } from 'react'
import HamburgerMenu from './HamburgerMenu'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'


function Header() {

    const [showIcons, setShowIcons] = useState(false)
    const { data: session } = useSession()

    console.log(session)
    return (
        <header className="flex justify-between h-20 fixed z-30 top-0 bg-purple-600 w-full mx-auto">

            <div className="pt-5 pr-2 sm:hidden"><HamburgerMenu /></div>  
            <div className="hidden pt-5 sm:flex items-center space-x-5 text-purple-600 pr-10"> 
                <Link href="/blog" target="_blank">
                    <a className="rounded-full font-bold shadow-md shadow-purple-100 px-4 py-1 cursor-pointer text-white hover:bg-purple-400">Blog</a>
                </Link>  
                <Link href="/contact" >                
                    <a className="text-white font-bold">Contact</a>  
                </Link> 
                  {/* Sign in/Sign out button */}
                {session && (
                <div onClick={()=>signOut()} className='hidden cursor-pointer items-center space-x-2 border 
                border-gray-100 p-1 lg:flex'>
                    <div className='relative w-7 h-7 flex-shrink-0'>
                    </div>

                    <div className='flex-1 text-xs'>
                    <p className='truncate'>{session?.user?.name}</p>
                    <p className='text-gray-400 font-bold'>Sign Out</p>
                    </div>

                </div>
                )}

            </div>  
        </header>
    )
}

export default Header