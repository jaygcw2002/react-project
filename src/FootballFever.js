import "./FootballFever.css";
import { BrowserRouter, NavLink, Routes, Route, Link } from "react-router-dom"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function Header(){
    return(        
        <div>
            <div className="background-black">
                <Typography variant="h4" gutterBottom style={{marginBottom: "0px"}}><span className="font-white">Football Fever</span></Typography>
                <Typography variant="h6" gutterBottom><span className="font-white">View latest football videos and results here</span></Typography>            
            </div>
        </div>        
    )
}

function Menu(){
    const [value, setValue] = React.useState('one');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return(
        <BrowserRouter>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <NavLink to="/"><Tab value="home" label="Home" /></NavLink>
                    <NavLink to="/highlights"><Tab value="highlights" label="Latest Highlights" /></NavLink> |
                    <NavLink to="/livescore"><Tab value="livescore" label="Livescore" /></NavLink>
                </Tabs>
            </Box>
            <Routes>
                <Route path="/" element={<Homepage/>} />
                <Route path="/highlights" element={<MatchHighlights/>} />
                <Route path="/livescore" element={<Livescore/>} />
                <Route path="*" element={<PageNotFound />}/>
            </Routes>
        </BrowserRouter>
    )
}

function Homepage(){
    const homepageImg = "/images/homepage.jpg"
    const homepageImgAlt = "homepage"
    const [matchTitle, setMatchTitle] = React.useState(null);

    React.useEffect(
        () => {
            console.log("call useeffect")
            const api = "https://www.scorebat.com/video-api/v3/feed/?token=" + process.env.REACT_APP_VIDEO_API_KEY
            console.log(api)
    
            fetch(api)
            .then((res) => res.json()
            .then((json) => {
                const allMatches = [...json.response]
                console.log(allMatches) 
                setMatchTitle([allMatches[0], allMatches[1], allMatches[2], allMatches[3], allMatches[4]])
            }))
        }, [])

    return(
        <div>
            <div style={{backgroundColor: "#998fc7"}}>                
                <p className="font-white padding-bottom text-left">
                    &nbsp;{matchTitle !== null ? matchTitle.map((match, index) => {return <MatchTitleOnly key={index} index={index} title={match.title}/>}) : 'No match'}
                </p>
            </div>
            <div className="parent">                
                <div className="background-white">
                    <div className="child-left ">
                        <img src={homepageImg} alt={homepageImgAlt} style={{width:'80%'}} className="img-shadow"/>
                    </div>
                    <div className="child-right font">
                        <p><strong>Welcome to Football Fever!</strong></p>
                        <p>We provide highlights of matches and live scores of each match from all around the world.</p>
                    </div>
                </div>
            </div>                       
        </div>
    )
}

function MatchTitleOnly(props){
    return(
        <span>
            <Link to='/highlights' className="font-white">{props.title}</Link>&nbsp;|&nbsp;
        </span>
    )
}

function MatchHighlights(){
    return(
        <div>            
            This is match highlight
        </div>
    )
}

function Livescore(){
    return(
        <div style={{height: '100vh'}}>
            <iframe src="https://www.scorebat.com/embed/livescore/?token=Mzc1MDlfMTY2OTc5NTg2MF8wNTBhNzI5MzM2ZThmM2IwZGFiMjc1ZTNlNDk2NDQwOTJjNjk5YzZl" frameBorder={0} width={600} height={760} allowFullScreen allow={"autoplay"} style={{width:"100%", height:"760px", overflow:"hidden", display: "block"}}></iframe>
        </div>
    )
}

function FootballContent(){
    return(
        <div>
            <iframe src="https://www.scorebat.com/embed/?token=Mzc1MDlfMTY2OTc5NTg2MF8wNTBhNzI5MzM2ZThmM2IwZGFiMjc1ZTNlNDk2NDQwOTJjNjk5YzZl" frameBorder={0} width={600} height={760} allowFullScreen allow={"autoplay"} style={{width:"100%", height:"760px", overflow:"hidden", display: "block"}}></iframe>
        </div>
    )
}

function PageNotFound(){
    return(
        <div>
            Oops...Page is not found.
        </div>
    )
}

function FootballFever(){
    return(
        <div>
            <Header />
            <Menu />
        </div>
    )
}

export default FootballFever