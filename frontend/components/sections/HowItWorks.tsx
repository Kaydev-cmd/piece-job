import React from 'react';
import { motion } from 'framer-motion';
import { HOW_IT_WORKS_STEPS } from '@/constants';
import HowItWorksCard from '../common/HowItWorksCard';
import {  ArrowDown, ArrowRight } from "lucide-react"

const HowItWorks: React.FC = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1, y: 0 }}>

          <section className='container py-20'>
            <div className='flex flex-col items-center text-center gap-2'>
                <div className="bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold rounded-full" style={{ padding: '12px' }}>
                    💼 Simple Process
                </div>
                <h1 className='text-6xl font-semibold lg:text-7xl' style={{ margin: '16px 0' }}>
                      How <span className="text-orange-500">PieceJob</span> Works
                </h1>
                <p className='text-slate-500 font-semibold lg:text-xl max-w-2xl'>
                    From sign-up to getting paid - we&#39;ve made the entire process as  simple and 
                    fast as possible so you can start earning today.
                </p>
            </div>
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-center flex-wrap"
            >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4" style={{ marginTop: '40px' }}>
                    {HOW_IT_WORKS_STEPS.map((step, index) => (
                        <div key={index} className="relative">
                            {/* Card */}
                            <div  className={`card flex flex-col gap-10 h-80 border-black text-center items-center justify-center shadow-md rounded-lg hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-0 bg-card/70 backdrop-blur-sm`}>

                            {/* card content */}
                                
                                    <div className="absolute text-center -top-3 left-1/2 transform -translate-x-1/2 md:mt-20" style={{marginTop: "20px"}}>
                                        <div className="w-6 h-6 bg-black text-white text-sm font-bold rounded-full flex items-center justify-center">
                                            {index + 1}
                                        </div>
                                    </div>
                                
                                    <HowItWorksCard variant={step.variant} color={step.color} title={step.title} description={step.description} textColor={step.textColor}/>
                            </div>

                            {/* Arrow for desktop  */}
                            {
                                index < HOW_IT_WORKS_STEPS.length - 1 && ( 
                                <>
                                    <ArrowRight className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                     <ArrowDown className="lg:hidden absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-muted-foreground w-4 h-4" />
                                </>
                            )
                            }
                        </div>
                    ))}
                </div>
            </motion.div>
          </section>      
        </motion.div>
    );
}

export default HowItWorks;