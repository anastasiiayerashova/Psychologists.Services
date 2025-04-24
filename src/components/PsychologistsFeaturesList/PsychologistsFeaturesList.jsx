import s from './PsychologistsFeaturesList.module.css'

const PsychologistsFeaturesList = ({ data }) => {
    
  const { experience, specialization, initial_consultation, license } = data
    
  return (
      <ul className={s.features_list}>
          <li className={s.features_item}>
              <p className={s.desc}>
                  Experience: <span>{experience}</span>
              </p>
          </li>
          <li className={s.features_item}>
              <p className={s.desc}>
                  License: <span>{license}</span>
              </p>
          </li>
          <li className={s.features_item}>
              <p className={s.desc}>
                  Specialization: <span>{specialization}</span>
              </p>
          </li>
          <li className={s.features_item}>
              <p className={s.desc}>
                  Initial_consultation: <span>{initial_consultation}</span>
              </p>
          </li>
      </ul>
  )
}

export default PsychologistsFeaturesList
