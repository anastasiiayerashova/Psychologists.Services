import s from './Reviews.module.css'
import { Avatar } from '@mui/material'
import { svg } from '../../constants/index.ts'
import { ReviewsProps } from '../../types/PropsTypes.ts'


const Reviews = ({ data }: ReviewsProps) => {
    
    const { reviews } = data

    return (
        <ul className={s.list}>
            {reviews.map((review, index) => (
                <li key={index} className={s.item}>
                    <div className={s.head}>
                        <Avatar sx={{
                            bgcolor: 'var(--light-green)',
                            fontFamily: 'Inter, sans-serif',
                        }}
                        ><span style={{ color: 'var(--green)', lineHeight: 1, fontWeight: '500', fontSize: '20px' }}>{review.reviewer.slice(0, 1)}</span></Avatar>
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