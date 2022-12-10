import "./FootballFever.css";
import { BrowserRouter, NavLink, Routes, Route, Link } from "react-router-dom"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { sampleMatches } from "./SampleMatches";

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
                    <div className="child-right">
                        <Typography color="text.secondary" variant="body2">
                            <p><strong>Welcome to Football Fever!</strong></p>
                            <p>We provide highlights of matches and live scores of each match from all around the world.</p>
                        </Typography>                        
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
    const [matches, setMatches] = React.useState(null)
    const [keyword, setKeyword] = React.useState('')    

    React.useEffect(
        () => {
            console.log("call useeffect")
            const api = "https://www.scorebat.com/video-api/v3/feed/?token=" + process.env.REACT_APP_VIDEO_API_KEY
            console.log(api)
            
            if(matches == null){
                console.log("Matches is null. Call api to get matches.")
                fetch(api)
                .then((res) => res.json()
                .then((json) => {
                    const allMatches = [...json.response]
                    console.log(allMatches) 
                    setMatches([...allMatches])
                }))
            }
        }, [keyword]
    )

    const handleChange = (event) => {
        setKeyword(event.target.value)
    }

    console.log("match highlight matches")
    console.log(matches)

    return(
        <div>
            <div style={{}}>
                <span>
                    <Typography color="text.secondary" variant="body2">
                        You may search your team / competiton here: 
                    </Typography><br/>                
                <TextField id="standard-basic" label="Keyword" variant="outlined" onChange={(event)=>handleChange(event)} value={keyword}/>
                </span>
            </div><br/>
            {matches === null ? <p className="font"><center>No match</center></p> : keyword !== '' ? matches.filter(p => p.title.toLowerCase().includes(keyword.toLowerCase()) || p.competition.toLowerCase().includes(keyword.toLowerCase())).map((match, index) => {return <Match key={index} match={match} />}):matches.map((match, index) => {return <Match key={index} match={match} />})}
        </div>
    )
}

function Match(props){
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const openCompetition = (url) => {
        console.log("Open competition: " + url)
        window.open(url)
    }

    return(
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"                
            >
                <div className="fill">
                    <img src={props.match.thumbnail} alt />
                </div>
            </Modal>
            <center>
            <div className="div-border" style={{backgroundColor: 'white', width: '50%', textAlign: 'left', padding: '10px'}}>
                <Typography color="text.secondary" variant="body2">
                    <p>{props.match.title}&nbsp;<span style={{float: 'right'}}>Match Day: <b>{props.match.date.substring(0,10)}</b></span></p>
                    <p><span onClick={()=>{openCompetition(props.match.competitionUrl)}}><strong className="link">{props.match.competition}</strong></span></p>
                    <center><img src={props.match.thumbnail} alt style={{width: '50%', height: '20%'}} onClick={handleOpen}/></center>
                    {props.match.videos.map((video, index) => {return <MatchVideo key={index} video={video} />})}
                </Typography>
            </div>
            <div>&nbsp;</div>
            </center>
        </div>
    )
}

function MatchVideo(props){
    const rawHTML = props.video.embed
    return(
        <div>
            
            <Typography color="text.secondary" variant="body2">
                <Typography variant="h6" gutterBottom>
                    <strong>{props.video.title}</strong>
                </Typography>
                <div dangerouslySetInnerHTML={{ __html: rawHTML }}></div>
            </Typography>
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