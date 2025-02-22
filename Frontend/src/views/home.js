import React from 'react'
import { Helmet } from 'react-helmet'
import { useState,useEffect, useRef } from 'react'
import abi from "./contractJson/Report.json"
import { ethers } from 'ethers'
import './home.css'
// demo demo

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom'


gsap.registerPlugin(ScrollTrigger);

// demo demo


const Home = (props) => {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
    const imageRef = useRef(null);

    const checkVisibility = () => {
        if (!imageRef.current) return; // Check if the ref is valid
        const rect = imageRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // Check if the image is in the viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
            setIsVisible(true);
        } else {
            setIsVisible(false); // Reset visibility when the image goes out of view
        }
    };

    const headerRef = useRef(null);
    


  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".home-project",
        start: "top bottom", // Start when the top of the section hits the bottom of the viewport
        end: "bottom top", // End when the bottom of the section hits the top of the viewport
        scrub: 1, // Smooth scrubbing
      }
    });

 const fadeInTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top bottom", // Start the animation when the top of the header hits the bottom of the viewport
        end: "top center", // End when the top of the header is at the center of the viewport
        scrub: 1, // Smooth scrubbing
      }
    });

    // Fade-in animation
    fadeInTimeline.fromTo(headerRef.current, {
      opacity: 0, // Initial state
      y: 50 // Start 50px below
    }, {
      opacity: 1, // Final state
      y: 0, // End at original position
      duration: 1 // Animation duration
    });
    // window.addEventListener('mousemove', handleMouseMove);

//try

window.addEventListener('scroll', checkVisibility);
checkVisibility(); // Check visibility on component mount


// Select all accordion containers
const accordions = gsap.utils.toArray(".home-element");

// Create the animation timeline
const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".home-faq",
    start: "top bottom", // Start when the top of the FAQ section hits the bottom of the viewport
    end: "bottom top", // End when the bottom of the FAQ section hits the top of the viewport
    scrub: 1, // Smooth scrubbing
  }
});

// Staggered animations for each accordion with enhanced effects
tl2.from(accordions, {
  y: 60, // Start each accordion 50px down
  scale: 1.0, // Start with a scale of 0.8
  opacity: 0, // Start with opacity 0
  duration: 0.9, // Increased duration
  stagger: 0.3, // Increased stagger time
  ease: "power2.out", // Smoother easing
  onComplete: () => {
    // Optionally, you can add a slight bounce effect on completion
    
    gsap.to(accordions, {
      scale: 1,
      duration: 0.3,
      ease: "bounce.out"
    });
  }
});


//try

    // Animation for the text
    tl.fromTo(".home-content1", 
      { x: 100, opacity: 0 }, // Initial state (from)
      { x: 0, opacity: 1, duration: 1 } // End state (to)
    );

    // Animation for the image
    tl.fromTo(".home-image2", 
      { x: -100, opacity: 0 }, // Initial state (from)
      { x: 0, opacity: 1, duration: 1 }, // End state (to)
      "<" // Position it to start at the same time as the previous animation
    );

    return () => {
      window.removeEventListener('scroll', checkVisibility); // Cleanup on unmount

      // Cleanup on unmount
      tl.kill();
     
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      fadeInTimeline.kill(); // Cleanup the timeline
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); 

    };
  }, []);

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");

  async function loginWithMetaMask() {

    const contractAddress = "0x6471EACC40D24bC9F4BAB843560eDFEa190730c5";
    const contractABI = abi.abi;

    // Check if MetaMask is installed
    if (window.ethereum) {
      try {
        // Request MetaMask to connect
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = await ethereum.request({
          method: "eth_requestAccounts",});
        
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setAccount(account);
        setState({ provider, signer, contract });
        // MetaMask is connected and user is logged in
        // Redirect to another page
        navigate('/dashboard');
        //window.location.href = '/dashboard';
      } catch (error) {
        // User denied account access or MetaMask is not available
        console.error('MetaMask login error:', error);
        alert('Failed to login with MetaMask. Please make sure you have MetaMask installed and try again.');
      }
    } else {
      // MetaMask extension is not installed
      alert('Please install MetaMask extension to login with MetaMask.');
    }
  }
  console.log(account);
  // console.log(state);
 
  
  async function loginAsAdmin() {
    // Check if MetaMask is installed
    if (window.ethereum) {
        try {
            // Request MetaMask to connect
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0]; // Assuming you're using the first account returned

            // Redirect if the logged-in account matches the admin address
            if (true) {
              navigate('/admin-dash');  
              //window.location.href = '/admin-dash';
            } else {
              alert('You are not authorized to access the admin dashboard.');
            }
        } catch (error) {
            // User denied account access or MetaMask is not available
            console.error('MetaMask login error:', error);
            alert('Failed to login with MetaMask. Please make sure you have MetaMask installed and try again.');
        }
    } else {
        // MetaMask extension is not installed
        alert('Please install MetaMask extension to login with MetaMask.');
    }
}

  return (
    <div className="home-container">
      <Helmet>
        <title>FarmSafe</title>
        <meta property="og:title" content="CRIME ALERT" />
      </Helmet>
      <header data-thq="thq-navbar" className="home-navbar">
        <span className="home-logo">FarmSafe</span>
        <a
          href=""
          target="_blank"
          rel="noreferrer noopener"
          className="home-link"
        >
          <svg viewBox="0 0 877.7142857142857 1024" className="home-icon">
            <path d="M438.857 73.143c242.286 0 438.857 196.571 438.857 438.857 0 193.714-125.714 358.286-300 416.571-22.286 4-30.286-9.714-30.286-21.143 0-14.286 0.571-61.714 0.571-120.571 0-41.143-13.714-67.429-29.714-81.143 97.714-10.857 200.571-48 200.571-216.571 0-48-17.143-86.857-45.143-117.714 4.571-11.429 19.429-56-4.571-116.571-36.571-11.429-120.571 45.143-120.571 45.143-34.857-9.714-72.571-14.857-109.714-14.857s-74.857 5.143-109.714 14.857c0 0-84-56.571-120.571-45.143-24 60.571-9.143 105.143-4.571 116.571-28 30.857-45.143 69.714-45.143 117.714 0 168 102.286 205.714 200 216.571-12.571 11.429-24 30.857-28 58.857-25.143 11.429-89.143 30.857-127.429-36.571-24-41.714-67.429-45.143-67.429-45.143-42.857-0.571-2.857 26.857-2.857 26.857 28.571 13.143 48.571 64 48.571 64 25.714 78.286 148 52 148 52 0 36.571 0.571 70.857 0.571 81.714 0 11.429-8 25.143-30.286 21.143-174.286-58.286-300-222.857-300-416.571 0-242.286 196.571-438.857 438.857-438.857zM166.286 703.429c1.143-2.286-0.571-5.143-4-6.857-3.429-1.143-6.286-0.571-7.429 1.143-1.143 2.286 0.571 5.143 4 6.857 2.857 1.714 6.286 1.143 7.429-1.143zM184 722.857c2.286-1.714 1.714-5.714-1.143-9.143-2.857-2.857-6.857-4-9.143-1.714-2.286 1.714-1.714 5.714 1.143 9.143 2.857 2.857 6.857 4 9.143 1.714zM201.143 748.571c2.857-2.286 2.857-6.857 0-10.857-2.286-4-6.857-5.714-9.714-3.429-2.857 1.714-2.857 6.286 0 10.286s7.429 5.714 9.714 4zM225.143 772.571c2.286-2.286 1.143-7.429-2.286-10.857-4-4-9.143-4.571-11.429-1.714-2.857 2.286-1.714 7.429 2.286 10.857 4 4 9.143 4.571 11.429 1.714zM257.714 786.857c1.143-3.429-2.286-7.429-7.429-9.143-4.571-1.143-9.714 0.571-10.857 4s2.286 7.429 7.429 8.571c4.571 1.714 9.714 0 10.857-3.429zM293.714 789.714c0-4-4.571-6.857-9.714-6.286-5.143 0-9.143 2.857-9.143 6.286 0 4 4 6.857 9.714 6.286 5.143 0 9.143-2.857 9.143-6.286zM326.857 784c-0.571-3.429-5.143-5.714-10.286-5.143-5.143 1.143-8.571 4.571-8 8.571 0.571 3.429 5.143 5.714 10.286 4.571s8.571-4.571 8-8z"></path>
          </svg>
        </a>
        <a
          href=""
          target="_blank"
          rel="noreferrer noopener"
          className="home-link1"
        >
          <svg viewBox="0 0 1024 1024" className="home-icon02">
            <path d="M1024 226.4c-37.6 16.8-78.2 28-120.6 33 43.4-26 76.6-67.2 92.4-116.2-40.6 24-85.6 41.6-133.4 51-38.4-40.8-93-66.2-153.4-66.2-116 0-210 94-210 210 0 16.4 1.8 32.4 5.4 47.8-174.6-8.8-329.4-92.4-433-219.6-18 31-28.4 67.2-28.4 105.6 0 72.8 37 137.2 93.4 174.8-34.4-1-66.8-10.6-95.2-26.2 0 0.8 0 1.8 0 2.6 0 101.8 72.4 186.8 168.6 206-17.6 4.8-36.2 7.4-55.4 7.4-13.6 0-26.6-1.4-39.6-3.8 26.8 83.4 104.4 144.2 196.2 146-72 56.4-162.4 90-261 90-17 0-33.6-1-50.2-3 93.2 59.8 203.6 94.4 322.2 94.4 386.4 0 597.8-320.2 597.8-597.8 0-9.2-0.2-18.2-0.6-27.2 41-29.4 76.6-66.4 104.8-108.6z"></path>
          </svg>
        </a>
        <div className="home-container1">
          <div className="home-container2">
            <div className="home-container3">
              <div
                data-thq="thq-navbar-nav"
                data-role="Nav"
                className="home-desktop-menu"
              >
                <nav
                  data-thq="thq-navbar-nav-links"
                  data-role="Nav"
                  className="home-nav"
                ></nav>
              </div>
            </div>
          </div>
          <a
            href=""
            target="_blank"
            rel="noreferrer noopener"
            className="home-link2"
          >
            <svg viewBox="0 0 877.7142857142857 1024" className="home-icon04">
              <path d="M199.429 357.143v566.286h-188.571v-566.286h188.571zM211.429 182.286c0.571 54.286-40.571 97.714-106.286 97.714v0h-1.143c-63.429 0-104-43.429-104-97.714 0-55.429 42.286-97.714 106.286-97.714 64.571 0 104.571 42.286 105.143 97.714zM877.714 598.857v324.571h-188v-302.857c0-76-27.429-128-95.429-128-52 0-82.857 34.857-96.571 68.571-4.571 12.571-6.286 29.143-6.286 46.286v316h-188c2.286-513.143 0-566.286 0-566.286h188v82.286h-1.143c24.571-38.857 69.143-95.429 170.857-95.429 124 0 216.571 81.143 216.571 254.857z"></path>
            </svg>
          </a>
        </div>
        <div data-thq="thq-navbar-btn-group" className="home-btn-group">
          <div className="home-socials"></div>
        </div>
        <div className="home-container4"></div>
        <div data-thq="thq-burger-menu" className="home-burger-menu">
          <button className="button home-button">
            <svg viewBox="0 0 1024 1024" className="home-icon06">
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
            </svg>
          </button>
          <div
            data-thq="slider"
            data-navigation="true"
            data-pagination="true"
            className="home-slider swiper"
          >
            <div data-thq="slider-wrapper" className="swiper-wrapper"></div>
            <div
              data-thq="slider-pagination"
              className="home-slider-pagination swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal"
            ></div>
            <div
              data-thq="slider-button-prev"
              className="swiper-button-prev"
            ></div>
            <div
              data-thq="slider-button-next"
              className="swiper-button-next"
            ></div>
          </div>
        </div>
        <div data-thq="thq-mobile-menu" className="home-mobile-menu">
          <div
            data-thq="thq-mobile-menu-nav"
            data-role="Nav"
            className="home-nav1"
          >
            <div className="home-container5">
              <span className="home-logo1">Character</span>
              <div data-thq="thq-close-menu" className="home-menu-close">
                <svg viewBox="0 0 1024 1024" className="home-icon08">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <nav
              data-thq="thq-mobile-menu-nav-links"
              data-role="Nav"
              className="home-nav2"
            >
              <span className="home-text">About</span>
              <span className="home-text01">Features</span>
              <span className="home-text02">Pricing</span>
              <span className="home-text03">Team</span>
              <span className="home-text04">Blog</span>
            </nav>
            <div className="home-container6">
              <button className="home-login button">Login</button>
              <button className="button">Register</button>
            </div>
          </div>
          <div className="home-icon-group">
            <svg viewBox="0 0 950.8571428571428 1024" className="home-icon10">
              <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
            </svg>
            <svg viewBox="0 0 877.7142857142857 1024" className="home-icon12">
              <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
            </svg>
            <svg viewBox="0 0 602.2582857142856 1024" className="home-icon14">
              <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
            </svg>
          </div>
        </div>
        <div data-thq="thq-dropdown" className="home-meta-mask list-item"></div>
        <div data-thq="thq-dropdown" className="home-admin list-item">
          <div data-thq="thq-dropdown-toggle" className="home-dropdown-toggle">
            <span className="home-text05">Choose</span>
            <div data-thq="thq-dropdown-arrow" className="home-dropdown-arrow">
              <svg viewBox="0 0 1024 1024" className="home-icon16">
                <path d="M426 726v-428l214 214z"></path>
              </svg>
            </div>
          </div>
          <ul data-thq="thq-dropdown-list" className="home-dropdown-list">
            <li data-thq="thq-dropdown" className="home-dropdown list-item">
              <div
                data-thq="thq-dropdown-toggle"
                className="home-dropdown-toggle1"
              >
                <span className="home-text06" onClick={loginWithMetaMask}>Create</span>
              </div>
            </li>
            <li data-thq="thq-dropdown" className="home-dropdown1 list-item">
              <div
                data-thq="thq-dropdown-toggle"
                className="home-dropdown-toggle2"
              >
                <span className="home-text07" onClick={loginAsAdmin}>Contracts</span>
                <div
                  data-thq="thq-dropdown-arrow"
                  className="home-dropdown-arrow1"
                ></div>
              </div>
              <ul data-thq="thq-dropdown-list" className="home-dropdown-list1">
                <li
                  data-thq="thq-dropdown"
                  className="home-dropdown2 list-item"
                ></li>
                <li
                  data-thq="thq-dropdown"
                  className="home-dropdown3 list-item"
                ></li>
                <li
                  data-thq="thq-dropdown"
                  className="home-dropdown4 list-item"
                ></li>
                <li
                  data-thq="thq-dropdown"
                  className="home-dropdown5 list-item"
                ></li>
              </ul>
            </li>
          </ul>
        </div>
      </header>
      <section className="home-hero">
        <div className="home-heading">
          <h1 className="home-header">
            <span>Decentralized Assured Contract Farming</span>
            <br></br>
            
          </h1>
          <p className="home-caption">Let those crops grow</p>
        </div>
        <div className="home-buttons">
          <button className="home-view button" onClick={loginWithMetaMask}>Create Contract</button>
          <a href="#learn1" className="home-learn button-clean button">
            Learn more
          </a>
        </div>
      </section>
      <section className="home-description">
        
          <img
            alt="image"
            src="https://i.ibb.co/fHVQckR/final-removebg-preview.png"
            className={`home-divider-image ${isVisible ? 'visible' : ''}`}
            ref={imageRef}
          />
        
      </section>
      
      <section className="home-project">
        <div className="home-understand">
          <div className="home-content1">
            <span className="home-caption1">Project</span>
            <div className="home-heading1">
              <h2 id="learn1" className="home-learn2">
                Understand the project
              </h2>
              <p className="home-header2">
              The Decentralized Assured Contract Farming platform will connect farmers with reliable buyers, ensuring stable incomes. Key features include user authentication, profile management, contract creation, a searchable marketplace, price negotiation tools, secure payment processing, and automated notifications. The backend will be built using Node.js with Express.js or Django for Python, ensuring data security and privacy. This platform aims to provide transparent communication, secure contracts, and timely payments, reducing market risks for farmers.
              </p>
            </div>
            
          </div>
          <img alt="image" src="https://i.ibb.co/WsK84nN/pngtree-the-farmers-working-in-the-farm-png-image-12488196-removebg-preview.png" className="home-image2" />
        </div>
      </section>
      <section className="home-faq">
      <h2 ref={headerRef} className="home-header3">We have all the answers</h2>
      <div className="home-accordion">
          <div
            data-role="accordion-container"
            className="home-element accordion"
          >
            <div className="home-content2">
              <span className="home-header4">
                What is the purpose of this webapp?
              </span>
              <span data-role="accordion-content" className="home-description2">
              The web app aims to connect farmers with reliable buyers through a decentralized platform, ensuring stable incomes. It facilitates transparent communication, secure contracts, and timely payments, reducing market risks and providing a reliable market for farmers’ crops.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
            </div>
            
            
            <div className="home-icon-container">
              <svg
                viewBox="0 0 1024 1024"
                data-role="accordion-icon-closed"
                className="home-icon18"
              >
                <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
            </div>
          </div>
          <div
            data-role="accordion-container"
            className="home-element accordion"
          >
          <div className="home-content2">
              <span className="home-header4">
                What does our website offer ?
              </span>
              <span data-role="accordion-content" className="home-description2">
              Our website offers a decentralized platform that connects farmers with reliable buyers, ensuring stable incomes through secure contract farming agreements. Key features include user authentication, profile management, contract creation, a searchable marketplace, price negotiation tools, secure payment processing, and automated notifications. This platform aims to provide transparent communication, secure contracts, and timely payments, reducing market risks for farmers.                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
            </div>
          </div>
          <div
            data-role="accordion-container"
            className="home-element accordion"
          >
          <div className="home-content2">
              <span className="home-header4">
                What makes our service worth your time ? 
              </span>
              <span data-role="accordion-content" className="home-description2">
              Our service is worth your time because it offers a secure and transparent platform for contract farming, ensuring stable incomes for farmers. With features like secure contracts, timely payments, price negotiation tools, and automated notifications, we reduce market risks and provide a reliable market for crops. This enhances income stability and fosters trust between farmers and buyers.                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>

              
              
            </div>
          </div>

          

          <h1 class="try"></h1>
        </div>
      </section>
      
    </div>
  )
  
}

export default Home;
