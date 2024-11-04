// src/components/PlayerHome.tsx
import React from 'react';
import { Card, CardContent, Typography, Grid, Avatar, Divider, List, ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    padding: '2rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: '1.5rem',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#ffb300', // Yellow color
  },
  subtitle: {
    color: '#5f6368',
  },
  avatar: {
    width: 70,
    height: 70,
    backgroundColor: '#ffb300', // Yellow color
    fontSize: '2rem',
    margin: 'auto',
  },
  sectionTitle: {
    color: '#2a2e43',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  divider: {
    margin: '1rem 0',
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
      <Card className={classes.card}>
        <CardContent>
          <Avatar className={classes.avatar}>P</Avatar>
          <Typography variant="h4" align="center" className={classes.title}>
            <br/>
            Welcome Back, [Player Name]!
            
          </Typography>
          {/* <Typography variant="subtitle1" align="center" className={classes.subtitle}>
            Email: player@example.com
          </Typography>
          <Typography variant="subtitle2" align="center" className={classes.subtitle}>
            Joined: [Joining Date]
          </Typography> */}
        </CardContent>
      </Card>

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
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" className={classes.sectionTitle}>
            Upcoming Matches
          </Typography>
          <Divider className={classes.divider} />
          <List>
            {upcomingMatches.map((match, index) => (
              <ListItem key={index}>
                <ListItemText primary={`Date: ${match.date}`} secondary={`Against: ${match.team}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" className={classes.sectionTitle}>
            Team Details
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="body1">Team Name: [Your Team]</Typography>
          <Typography variant="body1">Role: [Player Position]</Typography>
          <Typography variant="body1">Joined: [Team Join Date]</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerHome;
