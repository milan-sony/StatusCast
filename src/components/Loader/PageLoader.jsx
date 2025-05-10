import { LoaderCircle } from 'lucide-react'

function PageLoader() {
    return (
        <div className='w-full h-screen bg-base-100 flex justify-center items-center'>
            <LoaderCircle color="white" size={48} className='animate-spin' />
        </div>
    )
}

export default PageLoader