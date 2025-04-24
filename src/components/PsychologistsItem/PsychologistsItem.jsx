import s from './PsychologistsItem.module.css'
import { svg } from '../../constants/index.js'
import PsychologistsFeaturesList from '../PsychologistsFeaturesList/PsychologistsFeaturesList.jsx'
import PsychologistAvatar from '../PsychologistAvatar/PsychologistAvatar.jsx'

const PsychologistsItem = ({ data }) => {
  
  const { about, avatar_url, experience, id, initial_consultation, license, name, price_per_hour, rating, reviews, specialization } = data
  
  return (
    <li className={s.card}>
      <div className={s.card_header}>
        <PsychologistAvatar data={data} />
           <div className={s.card_main}>

              <div className={s.header_wrap}>
                 <div className={s.title_wrap}>
                    <p className={s.subtitle}>Psychologist</p>
                    <h2 className={s.name}>{name}</h2>
                 </div>

                 <div className={s.meta}>
                    <p className={s.rating}>
                       <svg width={16} height={16}>
                          <use href={`${svg}#icon-star`} />
                       </svg>
                       {`Rating: ${rating}`}
                    </p>
                    <span className={s.separator}>|</span>
                    <p className={s.price_label}>
                    Price / 1 hour: <span>{`${price_per_hour}$`}</span>
                    </p>
                  </div>
              </div>

              <div className={s.card_body_desc}>
                 <PsychologistsFeaturesList data={data} />
                 <p className={s.about}>{about}</p>
                 <button type='button' className={s.btn}>Read more</button>
              </div>
          </div>
      </div>

      <div className={s.card_body_mob}>
         <PsychologistsFeaturesList data={data} />
         <p className={s.about}>{about}</p>
         <button type='button' className={s.btn}>Read more</button>
      </div>
    </li>
  )
}

export default PsychologistsItem

