import { JobExpertiseCardProps } from "@/interfaces"

import { GraduationCap , Home , Truck , Wrench , Scissors , Camera , Users, Laptop } from "lucide-react"


const JobExpertiseCard: React.FC<JobExpertiseCardProps> = ({
    variant = "GraduationCap",
    title,
    count ,
    rate,

}) => {
     return (
    <div className="card flex flex-col gap-2 item-center text-center bg-white shadow-md rounded-lg cursor-pointer transition-all duration-300 border-2 border-[#1D4ED8]/20 hover:border-[#1D4ED8]/40 hover:bg-[#1D4ED8]/5 hover:-translate-y-1 hover:shadow-medium ">
           <div className="text-center text-[#1D4ED8] group-hover:scale-110 transition-transform duration-300 flex justify-center">
                {
                    variant === "GraduationCap" ? (
                        <GraduationCap className="h-8 w-8" />
                    ) : variant === "Home" ? (
                        <Home className="h-8 w-8" />
                    ) : variant === "Truck" ? (
                        <Truck  className="h-8 w-8" />
                    ) : variant === "Wrench" ? (
                        <Wrench className="h-8 w-8" />
                    ) : variant === "Scissors" ? ( 
                        <Scissors className="h-8 w-8" />
                    ) : variant === "Camera" ? (
                        <Camera className="h-8 w-8" />  
                    ) : variant === "Users" ? (
                        <Users className="h-8 w-8" />
                    ) : variant === "Laptop" ? (
                        <Laptop className="h-8 w-8" />
                    ) : null
                }
           </div>
            <h1 className="font-bold text-xl">{title}</h1>
            <p className="text-slate-500 font-bold text-lg">{count}</p>
            <p className="text-[#1D4ED5] font-bold text-lg ">{rate}</p>
    </div>
 )
}

export default JobExpertiseCard;