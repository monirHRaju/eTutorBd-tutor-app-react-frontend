import React from 'react';
import { GiDirectionSigns } from 'react-icons/gi';
import { GrUserExpert } from 'react-icons/gr';
import { motion } from "framer-motion";
import { FaGaugeHigh } from 'react-icons/fa6';
import Container from '../Shared/Container';
import SectionHeader from '../Shared/SectionHeader';

const WhyChooseUs = () => {
    return (
        <section className='py-20'>
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <SectionHeader label="Why Choose Us" title="Trusted by Students & Parents" subtitle="Join thousands who have found the perfect tutor through eTutor BD." />
                    <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-8'>
                        <motion.div
                            whileHover={{ scale: 1.02, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className='p-6 rounded-2xl shadow-lg hover:shadow-xl bg-base-100 border border-base-300 hover:bg-primary hover:text-primary-content transition-all duration-300'
                        >
                            <FaGaugeHigh size={60} />
                            <h3 className='text-2xl font-semibold mt-3 mb-2'>100+ Type of Tuitions</h3>
                            <p className="text-base-content/80">Explore practical, career-boosting courses that deliver real skills and results.</p>
                        </motion.div>
                        
                        <motion.div
                            whileHover={{ scale: 1.02, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className='p-6 rounded-2xl shadow-lg hover:shadow-xl bg-base-100 border border-base-300 hover:bg-primary hover:text-primary-content transition-all duration-300'
                        >
                            <GiDirectionSigns size={60} />
                            <h3 className='text-2xl font-semibold mt-3 mb-2'>Flexible Learning</h3>
                            <p className="text-base-content/80">Learn anytime, anywhere with courses designed to fit your schedule.</p>
                        </motion.div>
                        
                        <motion.div
                            whileHover={{ scale: 1.02, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className='p-6 rounded-2xl shadow-lg hover:shadow-xl bg-base-100 border border-base-300 hover:bg-primary hover:text-primary-content transition-all duration-300'
                        >
                            <GrUserExpert size={60} />
                            <h3 className='text-2xl font-semibold mt-3 mb-2'>Expert Instructor</h3>
                            <p className="text-base-content/80">Gain knowledge from experienced instructors dedicated to your learning success.</p>
                        </motion.div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
};

export default WhyChooseUs;


//career-boost certify
// 100+ High Impact Courses
// Flexible Learning