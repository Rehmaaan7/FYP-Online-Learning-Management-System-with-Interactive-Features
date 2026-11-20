import { useGetPurchaseDetialsWithStatusQuery } from "@/features/api/purchaseApi"
import { Navigate, useParams } from "react-router-dom"


export const PurchaseProtectedRoute = ({children})=>{
    const {courseId} = useParams()
    const {data, isLoading} = useGetPurchaseDetialsWithStatusQuery()
    if (isLoading) {
        return <div className="flex items center contents-center"><h1>Loading...</h1></div>
    }
    return data?.purchased ? children : <Navigate to={`/courseinfo/${courseId}`} />
}
export default PurchaseProtectedRoute;