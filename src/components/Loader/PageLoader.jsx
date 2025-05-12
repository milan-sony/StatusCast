import { LoaderCircle } from 'lucide-react'

function PageLoader() {
    return (
        <div className='w-full h-screen bg-white dark:bg-base-200 flex justify-center items-center'>
            <LoaderCircle color="white" size={48} className='animate-spin dark:text-black' />
        </div>
    )
}

export default PageLoader