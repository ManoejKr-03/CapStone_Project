// src/components/PlayerHome.tsx
import React from 'react';
import { Card, CardContent, Typography, Grid, Avatar, Divider, List, ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Import the Lato font from Google Fonts in your CSS or HTML
// Alternatively, you can add this directly to the HTML <head>:
// <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet">

const useStyles = makeStyles({
  root: {
    padding: '1.5rem',
    fontFamily: '"Lato", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    //backgroundColor: '#eef2f6',
    backgroundColor: '#ffffff',
    minHeight: '100vh',
  },
  card: {
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '0px',  // Sharp edges
    padding: '1rem',  // Reduced padding
    textAlign: 'center',
    backgroundColor: '#ffffff',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
  welcomeCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    color: '#00529B',
    padding: '1.5rem',
    borderRadius: '0px',  // Sharp edges
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: 700,
    color: '#2e3b4e',
  },
  subtitle: {
    color: '#b0bec5',
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: '#ffc107',
    fontSize: '1.6rem',
    marginBottom: '0.8rem',
  },
  sectionTitle: {
    fontFamily: '"Lato", sans-serif',
    fontWeight: 500,
    fontSize: '1.2rem',
    color: '#2e3b4e',
    marginBottom: '0.5rem',
  },
  divider: {
    margin: '0.5rem 0',  // Reduced margin for compactness
    backgroundColor: '#e0e0e0',
  },
  listText: {
    color: '#37474f',
    fontSize: '0.9rem',
    fontFamily: '"Lato", "Segoe UI", sans-serif',
  },
});

const PlayerHome: React.FC = () => {
  const classes = useStyles();

  const previousMatches = [
    { date: '2024-10-20', score: '45 Runs', result: 'Won' },
    { date: '2024-10-18', score: '32 Runs', result: 'Lost' },
    { date: '2024-10-15', score: '76 Runs', result: 'Won' },
  ];

  const upcomingMatches = [
    { date: '2024-11-05', team: 'Team A' },
    { date: '2024-11-10', team: 'Team B' },
  ];

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {/* Welcome Card */}
        <Grid item xs={12} md={8}>
          <Card className={`${classes.card} ${classes.welcomeCard}`}>
            <Avatar className={classes.avatar}>P</Avatar>
            <Typography variant="h4" className={classes.title}>
              Welcome Back, [Player Name]!
            </Typography>
          </Card>
        </Grid>

        {/* Stats Overview Card */}
        <Grid item xs={12} md={4}>
          <Card className={classes.card}>
            <Typography variant="h5" className={classes.sectionTitle}>
              Stats Overview
            </Typography>
            <Typography variant="body1" className={classes.listText}>Total Matches: 25</Typography>
            <Typography variant="body1" className={classes.listText}>Wins: 15</Typography>
            <Typography variant="body1" className={classes.listText}>Losses: 10</Typography>
          </Card>
        </Grid>

        {/* Previous Matches Card */}
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" className={classes.sectionTitle}>
                Previous Matches
              </Typography>
              <Divider className={classes.divider} />
              <List>
                {previousMatches.map((match, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Date: ${match.date}`}
                      secondary={`Score: ${match.score} - Result: ${match.result}`}
                      classes={{ primary: classes.listText, secondary: classes.listText }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Matches Card */}
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" className={classes.sectionTitle}>
                Upcoming Matches
              </Typography>
              <Divider className={classes.divider} />
              <List>
                {upcomingMatches.map((match, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Date: ${match.date}`}
                      secondary={`Against: ${match.team}`}
                      classes={{ primary: classes.listText, secondary: classes.listText }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Team Details Card */}
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" className={classes.sectionTitle}>
                Team Details
              </Typography>
              <Divider className={classes.divider} />
              <Typography variant="body1" className={classes.listText}>Team Name: [Your Team]</Typography>
              <Typography variant="body1" className={classes.listText}>Role: [Player Position]</Typography>
              <Typography variant="body1" className={classes.listText}>Joined: [Team Join Date]</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default PlayerHome;
