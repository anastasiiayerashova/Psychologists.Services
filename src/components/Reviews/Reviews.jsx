import s from './Reviews.module.css'
import { Avatar } from '@mui/material'
import { svg } from '../../constants/index.js'

const Reviews = ({ data }) => {
    
    const { reviews } = data
    console.log(reviews)

    return (
        <ul className={s.list}>
            {reviews.map((review, index) => (
                <li key={index} className={s.item}>
                    <div className={s.head}>
                        <Avatar sx={{
                            bgcolor: 'rgba(84, 190, 150, 0.2)',
                            fontFamily: 'Inter, sans-serif',
                        }}
                        ><span style={{ color: '#54be91', lineHeight: 1, fontWeight: '500', fontSize: '20px' }}>{review.reviewer.slice(0, 1)}</span></Avatar>
                        <div className={s.head_text}>
                            <p className={s.name}>{review.reviewer}</p>
                            <p className={s.rating}>
                                <svg width={16} height={16}>
                                    <use href={`${svg}#icon-star`} />
                                </svg>
                                {review.rating}
                            </p>
                        </div>
                    </div>
                    <p className={s.text}>{review.comment}</p>
                </li>
            ))}
        </ul>
    )
    
}

export default Reviews