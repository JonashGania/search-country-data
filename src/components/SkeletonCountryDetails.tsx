import { Skeleton } from "./ui/skeleton"

const SkeletonCountryDetails = () => {
    return (
        <div className="flex flex-wrap laptop:flex-nowrap justify-center w-full gap-20 px-4">
            <Skeleton className="w-[550px] laptop:w-[50%] h-[300px] phone:h-[400px] rounded-lg bg-gray-400 dark:bg-gray-800"/> 
            <div className="w-[550px] laptop:w-[50%]%]">
                <Skeleton className="w-[300px] h-12 rounded-lg bg-gray-400 dark:bg-gray-800"/>
                <div className="flex flex-wrap phone:flex-nowrap w-full gap-8 pt-6">
                    <div className="w-full phone:w-[50%] flex flex-col gap-2">
                        <Skeleton className="w-[200px] h-6 rounded-lg bg-gray-400 dark:bg-gray-800"/>
                        <Skeleton className="w-[200px] h-6 rounded-lg bg-gray-400 dark:bg-gray-800"/>
                        <Skeleton className="w-[200px] h-6 rounded-lg bg-gray-400 dark:bg-gray-800"/>
                        <Skeleton className="w-[200px] h-6 rounded-lg bg-gray-400 dark:bg-gray-800"/>
                        <Skeleton className="w-[200px] h-6 rounded-lg bg-gray-400 dark:bg-gray-800"/>
                    </div>
                    <div className="w-full phone:w-[50%] flex flex-col gap-2">
                        <Skeleton className="w-[200px] h-6 rounded-lg bg-gray-400 dark:bg-gray-800"/>
                        <Skeleton className="w-[200px] h-6 rounded-lg bg-gray-400 dark:bg-gray-800"/>
                        <Skeleton className="w-[200px] h-6 rounded-lg bg-gray-400 dark:bg-gray-800"/>
                    </div>  
                </div>

                <div className="pt-12 flex flex-wrap gap-4 w-full">
                    <Skeleton className="w-[100px] h-6 rounded-lg bg-gray-400 dark:bg-gray-800"/>
                    <Skeleton className="w-[100px] h-6 rounded-lg bg-gray-400 dark:bg-gray-800"/>
                    <Skeleton className="w-[100px] h-6 rounded-lg bg-gray-400 dark:bg-gray-800"/>
                    <Skeleton className="w-[100px] h-6 rounded-lg bg-gray-400 dark:bg-gray-800"/>
                    <Skeleton className="w-[100px] h-6 rounded-lg bg-gray-400 dark:bg-gray-800"/>
                </div>
            </div>
        </div>
    )
}

export default SkeletonCountryDetails