import "./FootballFever.css";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function Header(){
    return(
        <div className="background-black">
            <Typography variant="h4" gutterBottom style={{marginBottom: "0px"}}><span className="font-white">Football Fever</span></Typography>
            <Typography variant="h6" gutterBottom><span className="font-white">View latest football videos and results here</span></Typography>            
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
                    <Tab value="home" label="Home" />
                    <Tab value="highlights" label="Latest Highlights" />
                    <Tab value="livescore" label="Livescore" />
                </Tabs>
            </Box>
            <Routes>
                <Route path="/" element={<Homepage/>} />
                <Route path="*" element={<PageNotFound />}/>
            </Routes>
        </BrowserRouter>
    )
}

function Homepage(){
    return(
        <div>
            This is homepage.
        </div>
    )
}

function Livescore(){
    return(
        <div>
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