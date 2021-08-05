import React, { useState } from 'react';
import logo from '../../assets/logo.svg';
import { useSelector } from 'react-redux';
import TextField, { Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import restaurante from '../../assets/restaurante-fake.png'
import {Card,RestaurantCard,Modal,Map,Loader,Skeleton} from '../../components'
import {Container,Search,Logo,Wrapper,CarouselTitle, Carousel,ModalTitle,ModalContent} from './styles'
const Home = () =>{

    const [inputValue, setInputValue]=useState('');
    const [modalOpened,setModalOpened]=useState(false);
    const [query,setQuery]=useState('');
    const {restaurants,restaurantSelected} = useSelector((state)=>state.restaurants);
    const [placeId,setPlaceId]=useState(null);


    function handleKeyPress(e){
        if(e.key==='Enter'){
            setQuery(inputValue);
        }
    }


    function handleOpenModal(placeId){
        setPlaceId(placeId);
        setModalOpened(true);
    }


    const settings={
        dots: false,
        infinite: true,
        autoplay:true,
        speed: 400,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight:true,

    };

    return(
    <Wrapper>
        <Container>
            <Search>
                <Logo src={logo} alt="logo"/>
                <TextField
                    label='Pesquisar'
                    outlined
                    trailingIcon={<MaterialIcon role="button" icon="search"/>}>
                <Input
                    value={inputValue}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setInputValue(e.target.value)} />
                </TextField>

            {restaurants.length>0 ? (
                <>
                    <CarouselTitle>Na sua Área</CarouselTitle>
                    <Carousel {...settings}>
                    {restaurants.map((restaurant)=>(
                    <Card key={restaurant.place_id}
                    photo={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante} 
                    title={restaurant.name}/>))}
                    
                    </Carousel>
                </>
            ) : (<Loader/>)
            }

                
            
                </Search>
                {restaurants.map((restaurant)=>(
                    <RestaurantCard restaurant={restaurant}
                    onClick={()=>handleOpenModal(restaurant.place_id)}
                    ></RestaurantCard>
                ))}
           
        </Container>
        <Map query={query} placeId={placeId}/>
        <Modal open={modalOpened} onClose={()=>setModalOpened(!modalOpened)}>
            
            {
                restaurantSelected ?(
                    <>
                    
                <ModalTitle>{restaurantSelected?.name}</ModalTitle>   
                <ModalContent>{restaurantSelected?.formatted_phone_number}</ModalContent>
                <ModalContent>{restaurantSelected?.formatted_address}</ModalContent>
                <ModalContent>{restaurantSelected?.opening_hours?.open_now?"Aberto Agora" :"Fechado no momento"}</ModalContent>
            
                    </>
                ):
                <>
                <Skeleton width="10px" height="10px"/>
                <Skeleton width="10px" height="10px"/>
                <Skeleton width="10px" height="10px"/>
                <Skeleton width="10px" height="10px"/>
                </>
            }


            </Modal> 
    </Wrapper>

    );
}

export default Home;