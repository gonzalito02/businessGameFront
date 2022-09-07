import React, { useState } from "react";
import { useEffect } from "react";
import NavBar from "../NavBar";
import { BsLinkedin, BsInstagram, BsMailbox2, BsWhatsapp, BsGithub } from "react-icons/bs";
import Container from "react-bootstrap/esm/Container";
import { Button } from "bootstrap";

export default function About () {


    return (
        <>
        <NavBar />
        <Container>
            <p>
                The process of making decisions is hard to teach, because the best way of doing it, 
                is by making decisions and watching the consecuences.
                <br/>
                <br/>
                <h6>We must feel the impact to learn well.</h6>
                <br/>
                With the development of this game, I pretended to improve how I teach at university, 
                making posible that process.
                <br/>
                <br/>
                The students are assigned with two functions in this simulation:
                <ul>
                    <li>
                        As workers on a business, on a strategic level for investment structure and also the selling.
                    </li>
                    <li>
                        As customers on the market, on a strategic level for buying.
                    </li>
                </ul>
                In other words, they are the offer and the demand of this simplified economy, therefore their decisions changes the scenary and his future.
                <br/>
                They can use all the tools and models that they learned on the previous years of career, using the data generated in each step.
                <br/>   
                <br/>
                <h6>The consecuences become tangible and can be measured. That is the main idea of this game.</h6> 
                <br/>

                If you want to know more or tell me something, you can write me on:
                <br/>
                <br/>
                    <BsLinkedin size={30}/>
                    <span>  </span>
                    <a style={{color: "black"}} href="https://www.linkedin.com/in/gonzalorumi/">
                    <span>linkedin.com/in/gonzalorumi/</span>
                    </a>
                    <br/>
                    <br/>
                    <BsWhatsapp size={30}/>
                    <span>  </span>
                    <a style={{color: "black"}} href="https://wa.me/543875533223">
                    <span>+54 3875533223</span>
                    </a>
                    <br/>
                    <br/>
                    <BsMailbox2 size={30}/>
                    <span>  </span>
                    <a style={{color: "black"}} href="mailto:rumigonzalo@gmail.com">
                    <span>rumigonzalo@gmail.com</span>
                    </a>
                    <br/>
                    <br/>
                    <BsGithub size={30}/>
                    <span>  </span>
                    <a style={{color: "black"}} href="https://github.com/gonzalito02">
                    <span>github.com/gonzalito02</span>
                    </a>
                    <br/>
                    <br/>
                    <BsInstagram size={30}/>
                    <span>  </span>
                    <a style={{color: "black"}} href="https://www.instagram.com/gonzalorumi/?hl=es-la">
                    <span>@gonzalorumi</span>
                    </a>
                    <br/>
                    <br/>
                <h6>The feedback is always well comen!</h6> 
                <br/>
            </p>
            </Container>
        </>
    )
}