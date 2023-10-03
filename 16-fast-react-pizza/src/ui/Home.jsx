import { useSelector } from 'react-redux'
import CreateUser from '../features/user/CreateUser'
import Button from './Button'

function Home() {
    const username = useSelector((state) => state.user.username)

    // whenever the size is greater than 640 then my-10 will be overwritten by sm:my-16
    // whenever the size is greater than 768ox then text will be overwritten by md:text-3xl
    return (
        <div className="my-10 px-4 text-center sm:my-16">
            <h1 className="mb-8  text-xl font-semibold md:text-3xl">
                The best pizza.
                <br />
                <span className="text-yellow-500">
                    Straight out of the oven, straight to you.
                </span>
            </h1>

            {username === '' ? (
                <CreateUser />
            ) : (
                <Button to="/menu" type="primary">
                    Continue ordering, {username}
                </Button>
            )}
        </div>
    )
}

export default Home
