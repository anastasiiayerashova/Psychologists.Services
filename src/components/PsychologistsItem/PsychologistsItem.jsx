import s from './PsychologistsItem.module.css'
import { svg } from '../../constants/index.js'
import PsychologistsFeaturesList from '../PsychologistsFeaturesList/PsychologistsFeaturesList.jsx'


const PsychologistsItem = ({ data }) => {
  
  const {about, avatar_url, experience, id, initial_consultation, license, name, price_per_hour, rating, reviews, specialization} = data
  return (
    <li className={s.card}>
      <div className={s.card_header}>
        <img src={avatar_url} alt={name} className={s.image} />
        <div className={s.card_main}>

          <div>
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
            <span className="separator">|</span>
            <p className={s.price_label}>
              Price / 1 hour: <span>{`${price_per_hour}$`}</span>
            </p>
          </div>
        </div>
      </div>

      <div className={s.card_body}>
        <PsychologistsFeaturesList data={data} />
        <p className={s.about}>{about}</p>
        <button type='button' className={s.btn}>Read more</button>
      </div>

      
    </li>
  )
}

export default PsychologistsItem

