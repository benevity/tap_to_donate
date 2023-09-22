import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Stack from "@mui/material/Stack";
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function CauseCard({ causeInfo }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card sx={{ width: 800 }}>

            <Stack direction="row" sx={{padding:2}}>
                <CardMedia
                    component="img"
                    style={{ height: 200, width: 200, objectFit: "contain" }}
                    image={(causeInfo.data.attributes.logos.length > 0
                        ? causeInfo.data.attributes.logos[0].url
                        : 'https://logos.benevity.org/cause_logo/cause-logo-defaut.png'
                    )}

                    title={causeInfo.data.attributes.name + " logo"}
                />
                <CardHeader
                    titleTypographyProps={{ variant: 'h3' }}
                    title={causeInfo.data.attributes.name}
                />

            </Stack>
            {/* <CardHeader
                titleTypographyProps={{variant:'h5'}}
                title={causeInfo.data.attributes.name}
            /> */}
            {/* <CardMedia
                component="img"
                style={{ height:200,maxHeight: 200, objectFit: "contain" }}
                image={(causeInfo.data.attributes.logos.length > 0
                    ? causeInfo.data.attributes.logos[0].url 
                    :'https://logos.benevity.org/cause_logo/cause-logo-defaut.png'
                    )}
                
                title={causeInfo.data.attributes.name + " logo"}
            /> */}
            <CardContent>
                <Typography variant="body1" color="text.secondary">
                    {causeInfo.data.attributes.caption}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    {!expanded ? 'Show more' : 'Hide'}
                    <ExpandMoreIcon
                        style={{ transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)' }}
                    />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        {causeInfo.data.attributes.address.street}
                        {" "}
                        {causeInfo.data.attributes.address.line2}
                        {" "}
                        {causeInfo.data.attributes.address.line3}
                        <br></br>
                        {causeInfo.data.attributes.address.city}
                        {" "}
                        {causeInfo.data.attributes.address.country.name}
                        {" "}
                        {causeInfo.data.attributes.address.postcode}
                    </Typography>
                    <Typography paragraph>
                        {causeInfo.data.attributes.website}
                        <br></br>
                        {causeInfo.data.attributes.phone}
                    </Typography>
                    <Typography paragraph>
                        {/* delete everything after ********** */}
                        {causeInfo.data.attributes.hasOwnProperty('description') &&causeInfo.data.attributes.description.slice(0, causeInfo.data.attributes.description.indexOf("******"))}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
