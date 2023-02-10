import { useRouter } from 'next/router'
import React from 'react'

function Menu() {
    const router = useRouter()

    const handleClick = () => {

        router.push('/login')
    }

    return (
        <div className="container-mobile">
            <div>
                <img src="/body1.jpg" alt="bg-silde" className='bg-menu' />
                <div onClick={handleClick}>
                    <img src="/body4.jpg" alt="bg-silde" className='bg-menu-clik' />
                </div>
                <img src="/body2.jpg" alt="bg-silde" className='bg-menu-2' />
                <img src="/body3.jpg" alt="bg-silde" className='bg-menu-footer' />
            </div>
        </div>
    )
}

export default Menu