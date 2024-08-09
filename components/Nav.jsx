"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const{data:session}=useSession();
    const [providers, setProviders] = useState(null)
    const [toggleDeopdown, settoggleDeopdown] = useState(false)

    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        fetchProviders();
    }, []);
    return (
        <nav className='w-full flex-between mb-16 pt-3'>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image
                    src='/assets/images/logo.svg'
                    alt='Promptopia logo'
                    width={30}
                    height={30}
                    className='object-contain'
                />
                <p className='logo_text'>Promptopia</p>
            </Link>
           
            {/* desktop navigation */}
            <div className='sm:flex hidden'>
                {
                    session?.user? (
                        <div className='flex gap-3 md:gap-5'>
                            <Link href='/create-prompt' className='black_btn'>Create Post</Link>
                            <button className='outline_btn ' onClick={signOut} type='button'>Sign Out</button>
                            <Link href='/profile'>
                                <Image src={session?.user.image} alt='profile' width={37} height={37} className='rounded-full'></Image>
                            </Link>
                        </div>
                    ) : (<>
                        {
                            providers && Object.values(providers).map((provider) => (
                                <button key={provider.name} type='button' onClick={() => signIn(provider.id)} className='black_btn'>Sign In</button>
                            ))
                        }
                    </>)
                }

            </div>
            {/* mobile nav */}
            <div className='sm:hidden flex relative'>
                {
                    session?.user ? (
                        <div>
                            <Image src={session?.user.image}
                                width={37}
                                height={37}
                                className='rounded-full'
                                alt='profile'
                                onClick={() =>settoggleDeopdown((prev)=>(
                                    !prev
                                ))}
                            />
                            {
                                toggleDeopdown && (
                                    <div className='dropdown'>
                                        <Link href='/profile'
                                        className='dropdown_link'
                                        onClick={()=>settoggleDeopdown(false)}
                                        >
                                        my profile
                                        </Link>
                                        <Link href='/create-prompt'
                                        className='dropdown_link'
                                        onClick={()=>settoggleDeopdown(false)}
                                        >
                                        Create Prompt
                                        </Link>
                                        <button type='button' onClick={()=>{
                                            settoggleDeopdown(false)
                                            signOut()
                                        }} className='mt-5 w-full black_btn'>Sign Out</button>
                                    </div>
                                )
                            }
                        </div>
                    ) : (<>
                        {
                            providers && Object.values(providers).map((provider) => (
                                <button key={provider.name} type='button' onClick={() => signIn(provider.id)} className='black_btn'>Sign In</button>
                            ))
                        }
                    </>)
                }

            </div>
        </nav>
    )
}

export default Nav