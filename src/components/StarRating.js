import React, { useState } from "react";
import './StarRating.css'
import fullstar from '../images/fullstar.svg';
import emptystar from '../images/emptystar.svg';

const StarRating = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
    <div>
        {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
            <label>
                <input type="radio" name="rating" value={ratingValue} 
                onClick={() => setRating(ratingValue)}/>
                <img id ="star" width={30} height={30} src={ratingValue <= (hover || rating) ? fullstar : emptystar}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}>
                </img>
            </label>
            );
        })}
    </div>
    );
};

export default StarRating;
