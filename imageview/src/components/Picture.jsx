
import React from 'react';
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";

function Picture(props) {

    const isChosenPic = props.chosenPic;
    var chosenCss = isChosenPic ? "chosen" : "";


    return (


        <div className={`picCard ${chosenCss}`} onClick={() => { props.func(props.desc) }
        }  >
            <Card sx={{ minHeight: '280px', minWidth: "320px", height: '300px', width: '500px' }}>
                <CardCover>
                    <img
                        src={props.url}
                        alt={props.desc}
                    />
                </CardCover>
                <CardCover
                    sx={{
                        background:
                            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)"
                    }}
                />
                <CardContent sx={{ justifyContent: "flex-end", color: "white" }}>{props.desc}</CardContent>
            </Card>

        </div >

    );
}

export default Picture;
