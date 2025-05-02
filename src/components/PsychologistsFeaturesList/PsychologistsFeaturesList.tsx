import { PsychologistsFeaturesListProps } from '../../types/PropsTypes'
import s from './PsychologistsFeaturesList.module.css'
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef } from 'react';

gsap.registerPlugin(SplitText, ScrollTrigger)
gsap.config({ nullTargetWarn: false })

const PsychologistsFeaturesList = ({ data }: PsychologistsFeaturesListProps) => {
    
    const { experience, specialization, initial_consultation, license } = data
    
    const experienceRef = useRef<HTMLParagraphElement | null>(null)
    const licenseRef = useRef<HTMLParagraphElement | null>(null)
    const specRef = useRef<HTMLParagraphElement | null>(null)
    const initRef = useRef<HTMLParagraphElement | null>(null)

       useEffect(() => {
           const runAnimation = () => {
           const splitExp = new SplitText(experienceRef.current, { type: 'chars, words' })
           const splitLic = new SplitText(licenseRef.current, { type: 'chars, words' })
           const splitSpec = new SplitText(specRef.current, { type: 'chars, words' })
           const splitInit = new SplitText(initRef.current, { type: 'chars, words' })

           const animate = (split: SplitText, triggerRef: React.RefObject<HTMLParagraphElement | null>) => {
               gsap.from(split.chars, {
                // y: 100,
                // opacity: 0,
                // autoAlpha: 0,
                // duration: 0.03,
                // ease: 'power4.out',
                // stagger: { each: 0.05 },
                  x: 50,
                  opacity: 0,
                  duration: 0.8,
                  ease: 'power4.out',
                  stagger: 0.03,
                  scrollTrigger: {
                     trigger: triggerRef.current, 
                     start: 'top 90%', 
                     toggleActions: 'play none none none',
                   },
                })
            }
           
            animate(splitExp, experienceRef)
            animate(splitLic, licenseRef)
            animate(splitSpec, specRef)
            animate(splitInit, initRef)
      
            return () => {
              splitExp.revert()
              splitLic.revert()
              splitSpec.revert()
              splitInit.revert()
            }
           }
           
           if (document.fonts && document.fonts.ready) {
              document.fonts.ready.then(runAnimation)
           } else {
              runAnimation()
        }  
        }, [])
    
  return (
      <ul className={s.features_list}>
          <li className={s.features_item}>
              <p ref={experienceRef} className={s.desc}>
                  Experience: <span>{experience}</span>
              </p>
          </li>
          <li className={s.features_item}>
              <p ref={licenseRef} className={s.desc}>
                  License: <span>{license}</span>
              </p>
          </li>
          <li className={s.features_item}>
              <p ref={specRef} className={s.desc}>
                  Specialization: <span>{specialization}</span>
              </p>
          </li>
          <li className={s.features_item}>
              <p ref={initRef} className={s.desc}>
                  Initial_consultation: <span>{initial_consultation}</span>
              </p>
          </li>
      </ul>
  )
}

export default PsychologistsFeaturesList
