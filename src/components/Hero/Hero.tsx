import s from './Hero.module.css'
import { Link } from 'react-router-dom'
import { svg } from '../../constants/index.ts'
import { RiCheckFill } from "react-icons/ri";
import AnimatedLayout from '../AnimatedLayout.tsx';
import { leftSlide, rightSlide } from '../../utils/animation.ts';
import { motion } from 'framer-motion';

const Hero = () => {

    return (
        <AnimatedLayout>
        <section className={s.container}>
            <div className={s.first_wrapper}>
                <motion.h1 variants={leftSlide} initial='hidden' animate='visible' className={s.title}>The road to the <span>depths</span> of the human soul</motion.h1>
                <motion.h2 variants={rightSlide} initial='hidden' animate='visible' className={s.subtitle}>We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our experienced psychologists.</motion.h2>
                <Link to='/psychologists' className={s.get_link}>Get started<span>
                           <svg width={16} height={16}>
                               <use href={`${svg}#icon-get-arrow`} />
                            </svg>
                    </span>
                </Link>
            </div>
            <div className={s.second_wrapper}>
                <div className={s.img_wrapper}>
                    <picture>
                        <source srcSet='/images/main@3x-mob.png' media="(max-width: 767px)" />
                        <source srcSet='/images/main@3x-desk.png' media="(min-width: 768px)" />
                        <img className={s.image} src='/images/main@3x-desk.png' alt='psychologist'/>
                    </picture>
                    <div className={s.icon_box}>
                        <svg className={s.icon}>
                               <use href={`${svg}#icon-two-users`} />
                        </svg>
                    </div>
                    <div className={s.icon_box_question}>
                        <svg className={s.icon_question}>
                               <use href={`${svg}#icon-question`} />
                        </svg>
                    </div>
                    <div className={s.icon_box_green}>
                        <div className={s.white_block}>
                            <RiCheckFill className={s.icon_exp} />
                        </div>
                        <div className={s.text_wrapper}>
                            <p>Experienced psychologists</p>
                            <span>15,000</span>
                        </div>
                    </div>
                </div>
            </div>
            </section>
            </AnimatedLayout>
    )
}

export default Hero