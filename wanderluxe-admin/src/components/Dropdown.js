import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const DropDown = () => {
    const [dropdown, setDropdown] = useState(false);
    return (
        <>
            <ul className={dropdown ? 'hidden' : 'w-36 absolute list-none text-start top-12 bg-sky-300'} onClick={() => setDropdown(!dropdown)}>

                <li className='text-white p-2 hover:bg-sky-400 cursor-pointer'>
                    <Link
                        to="/"
                        className='w-full block'
                        onClick={() => setDropdown(false)}
                    >
                        option 1
                    </Link>
                </li>
                <li className='text-white p-2 hover:bg-sky-400 cursor-pointer'>
                    <Link
                        to="/"
                        className='w-full block'
                        onClick={() => setDropdown(false)}
                    >
                        option 2
                    </Link>
                </li>
                <li className='text-white p-2 hover:bg-sky-400 cursor-pointer'>
                    <Link
                        to="/"
                        className='w-full block'
                        onClick={() => setDropdown(false)}
                    >
                        option 3
                    </Link>
                </li>
            </ul>

        </>
    )
}

export default DropDown;