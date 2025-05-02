import s from './Hero.module.css'
import { Link } from 'react-router-dom'
import { svg } from '../../constants/index.ts'
import { RiCheckFill } from "react-icons/ri";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from 'react';


gsap.registerPlugin(SplitText)

const Hero = () => {

    const titleRef = useRef<HTMLHeadingElement | null>(null)
    const subtitleRef = useRef<HTMLHeadingElement | null>(null)

    useEffect(() => {
        const runAnimation = () => {
        const splitTitle = new SplitText(titleRef.current, { type: 'chars, words' })
        const splitSubtitle = new SplitText(subtitleRef.current, { type: 'chars, words' })
        
        gsap.from(splitTitle.chars, {
            x: 100,
            opacity: 0,
            duration: 0.6,
            ease: 'power4.out',
            stagger: 0.05,
        })

        gsap.from(splitSubtitle.chars, {
            x: -100,
            opacity: 0,
            duration: 0.6,
            ease: 'power4.out',
            stagger: 0.03,
            delay: 0.5, 
        })
            
         return () => {
            splitTitle.revert()
            splitSubtitle.revert()
        }    
        }
        if (document.fonts && document.fonts.ready) {
           document.fonts.ready.then(runAnimation)
        } else {
           runAnimation()
        }  
    }, [])

    return (
        <section className={s.container}>
            <div className={s.first_wrapper}>
                <h1 ref={titleRef} className={s.title}>The road to the <span>depths</span> of the human soul</h1>
                <h2 ref={subtitleRef} className={s.subtitle}>We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our experienced psychologists.</h2>
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
    )
}

export default Hero