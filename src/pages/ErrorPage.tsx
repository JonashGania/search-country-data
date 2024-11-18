import { Link, useLocation, useRouteError } from "react-router-dom"
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
    message?: string
}

const ErrorPage = ({ message }: ErrorPageProps) => {
    const error = useRouteError();
    const location = useLocation();
    const stateMessage = location.state?.message;

    return (
        <div className="w-full min-h-screen flex items-center justify-center flex-col">
            <h1 className="text-5xl font-extrabold pb-12">Oops!</h1>
            <p className="pb-4">
                {stateMessage ? stateMessage : "Sorry, we couldn't find the page you were looking for."}
            </p>
            { message ? (
                <i className="text-gray-400 pb-4">{message}</i>
            ) : (
                error ? <i className="text-gray-400 pb-4">{`Error - ${error.status || error.message}`}</i> 
                      : 'An unexpected error occured.'               
            )}
            <Button>
                <Link to="/">Go back</Link>
            </Button>
        </div>
    )
}

export default ErrorPage