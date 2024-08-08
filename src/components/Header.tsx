import { Link } from 'react-router-dom'
import Logo from './Logo'
import NavMenu from './NavMenu'

type HeaderProps = {
    user: {
        _id: string;
        name: string;
        email: string;
    }
}

export default function Header({ user }: HeaderProps) {
    return (
        <header className='bg-gray-800 py-5'>
            <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
                <Link className='w-64' to={'/'}>
                    <Logo />
                </Link>

                <NavMenu user={user} />

            </div>
        </header>
    )
}
