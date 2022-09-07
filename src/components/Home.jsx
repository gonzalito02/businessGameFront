import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGameControl } from "../redux/actions/actions";
import MarketStaticTable from "./Market/MarketStaticTable/MarketStaticTable";
import NavBar from "./NavBar";
import PlayerTable from "./PlayersTable/PlayerTable";
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import "./Home.css"

export default function Home () {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGameControl());
    }, [dispatch])

    return (
        <>
            <NavBar />     

            <Container>

            <Carousel>
                <Carousel.Item>
                    <div className="carousel1">
                    </div>
                    <Carousel.Caption>
                        <div className="itemCarousel">
                        <h3>Welcome to Business Game</h3>
                        <p>We simule, like a game, to improve the decision process.</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carousel2">
                    </div>
                    <Carousel.Caption>
                        <div className="itemCarousel">
                        <h3>Through three steps, in five periods</h3>
                        <p>First you make a move like a business, then you shop in the market like a customer.
                            Finally, we clear all the position and update the ranking table.
                        </p>

                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carousel3">
                    </div>
                    <Carousel.Caption>
                        <div className="itemCarousel">
                        <h3>The winners</h3>
                        <p>The business with more rentability at the end of the game wins. 
                            The customer who shop more and better, in terms of quantity and quality, wins.</p> 
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
             </Carousel>
             
            <PlayerTable />

            <MarketStaticTable />

            </Container>
        </>

    )
}