import * as React from 'react';
import {Card, CardMedia, CardContent,IconButton, Typography, CardActionArea, Stack, styled} from '@mui/material';
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

export default function CauseCard2({ causeInfo, setDonationCause}) {
    const handleCardClick= () => {
        setDonationCause(causeInfo.id, causeInfo.attributes.name)
    };

    return (
        <Card sx={{ width: 800 }}>
            <CardActionArea
            onClick={handleCardClick}>
                <Stack sx={{ padding: 2 }} direction="row">
                    <CardMedia
                        component="img"
                        style={{ height: 150, width: 150, objectFit: "contain" }}
                        image={(
                            causeInfo.attributes.hasOwnProperty('logo')
                                ? causeInfo.attributes.logo
                                : 'https://logos.benevity.org/cause_logo/cause-logo-defaut.png'
                        )}
                        title={causeInfo.attributes.name + " logo"}
                    />
                    <Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <CardContent>
                                <Typography variant="h5">
                                    {causeInfo.attributes.hasOwnProperty('name') && causeInfo.attributes.name}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {causeInfo.attributes.hasOwnProperty('city') && causeInfo.attributes.city}
                                </Typography>
                            </CardContent>
                        </Stack>
                        <CardContent>
                            <Typography variant="body1" color="text.secondary">
                                {causeInfo.attributes.hasOwnProperty('description') && causeInfo.attributes.description}
                            </Typography>
                        </CardContent>
                    </Stack>
                </Stack>
            </CardActionArea>
        </Card>
    );
}
