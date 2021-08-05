import React,{useState} from 'react';
import { Restaurant,RestaurantInfo,Title,Adress,RestaurantFoto} from './styles';
import ReactStars from "react-rating-stars-component";
import restaurante from '../../assets/restaurante-fake.png';
import Skeleton from '../Skeleton';



const RestaurantCard=({restaurant,onClick})=>{
    const [imageLoaded,setImageLoaded]=useState(false);


    return(
        <Restaurant>
            <RestaurantInfo onClick={onClick}>
                <Title>{restaurant.name}</Title>
                <ReactStars count={5} isHalf edit={false} value={restaurant.rating} activeColor="#e7711c"/>
                <Adress>{restaurant.vicinity || restaurant.formatted_address}</Adress>
            </RestaurantInfo>
            <RestaurantFoto 
            imageLoaded={imageLoaded}
            src={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante}  
            onLoad={()=>setImageLoaded(true)}
            alt="foto"/>
        {!imageLoaded && <Skeleton width="100px" height="100px"/>}
        </Restaurant>
    )

    ;}
export default RestaurantCard;