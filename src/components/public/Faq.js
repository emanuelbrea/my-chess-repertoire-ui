import {
  Collapse,
  Container,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Footer from './Footer';
import {ExpandLess, ExpandMore} from '@mui/icons-material';


export default function Faq() {
  const sections = ['General', 'Chess Style', 'Customization', 'Chess Games', 'Openings', 'Cost'];
  const questions = [['What is My Chess Repertoire?',
    'Why do I need a repertoire?',
    'I am new to chess. Should I create an opening repertoire?',
    'How long does it take to create a repertoire?'],
  ['How is my chess profile defined?',
    'What else conforms my profile?'],
  ['How do I create my repertoire?',
    'After the repertoire is created, can I modify it?',
    'How do I edit a particular line?',
    'How can I mark my favorite lines?'],
  ['What chess games database was used?',
    'How many games does this database contain?',
    'How are my moves picked?'],
  ['Are the stats of each position displayed?',
    'I don’t understand algebraic notation. Can I use My Chess Repertoire?',
    'Do all openings have names?',
    'Which is the depth of each line?',
    'After I reach the end of a line, can I add more moves?'],
  ['How much does it cost?',
    'Will there be more releases?'],
  ];
  const answers = [['My Chess Repertoire is a website that creates automatically your opening repertoire based on your chess profile.',
    'Having a chess opening repertoire will help you play the first phase of the game with more confidence because you will have a better understanding of the plans and ideas behind each opening.',
    'For chess amateurs it is recommended to first understand the main plans of the openings before trying to memorize lots of variants. However, it is important to have a solid repertoire with basic openings that will allow you to avoid making mistakes during the opening. My Chess Repertoire will consider it when creating your repertoire.',
    'It should take less than 5 seconds.'],
  ['It considers your playing style. It can vary from solid to aggressive. You can also define if you prefer to play main lines or side lines to surprise your opponent. Also, you can choose between classical openings or more modern.',
    'Your repertoire will also take into account your playing strength or elo rating and your age to choose the best lines for you.'],
  ['First you need to choose the color (white or black) in the repertoires menu. Then define your chess style and let My Chess Repertoire do the magic. ',
    'Absolutely. You can edit the lines that you want, or you can recreate the repertoire with another style.',
    'You can click on the suggested move and choose between the alternatives. Note that not all the moves will be displayed. It only suggests moves that have been played above a certain percentage of the total games.',
    'You can click on the favorite icon below your move.'],
  ['My Chess Repertoire uses Chessbase 2022 database. It only contains games that were played by players with more than 2300 elo rating (both). It also filters out games played before 1970. ',
    'It contains more than 1,2 million games applying above filters.',
    'In every position, My Chess Repertoire will choose the best move for your repertoire based on your style and on the stats of the position. You can always change the move if you are not happy with it.'],
  ['Yes, you will find a table with the stats after every move. These stats will help you understand better the position and the possible moves.',
    'Not a problem. In each position you will get a diagram with the move played on the board, so you don’t have to worry about complex notation. ',
    'The most common openings are classified using the ECO codes. The opening and the sub variations have names. You will also find the description of the mains moves, taken from the wikibook, just like lichess.org does.',
    'This will depend on each line and your rating. Initially it can vary from 4 to 8 moves long. ',
    'Sure. My Chess Repertoire will calculate a few more moves so that you can continue studying the line. Note that the line won’t continue if there are not enough games or after move number 15.'],
  ['My Chess Repertoire is completely free and open source. If you would like to contribute to it, please visit ',
    'Yes. This is the beta version and next releases will include more features to improve the algorithm and to integrate your repertoire with existing chess platforms. '],
  ];

  const [open, setOpen] = useState('');

  const handleClick = (question) => {
    if (question === open) {
      setOpen('');
    } else {
      setOpen(question);
    }
  };

  return (
    <>
      <Container maxWidth={'lg'} component={'main'} sx={{mt: 15, mb: 6}}>
        <Box sx={{mt: 3, mb: 6}}>
          <Typography
            variant="h5"
            fontWeight={200}
          >
            FAQs
          </Typography>
          <Typography
            variant="h3"
            fontWeight={500}
          >
            Frequently Asked
          </Typography>
          <Typography
            variant="h3"
            fontWeight={500}
            color={'primary'}
          >
            Questions
          </Typography>
        </Box>


        {
          sections.map((section, index1) => (
            <List
              key={section}
              sx={{width: '100%', mb: 5}}
              subheader={
                <ListSubheader component="div" color={'primary'} sx={{fontSize: 32}}>
                  {section}
                </ListSubheader>
              }
            >
              {questions[index1].map((question, index) =>
                (
                  <>
                    <ListItemButton onClick={() => handleClick(question)}
                      sx={{
                        padding: 3,
                        color: open === question && {color: '#769656'},
                      }}
                    >
                      <ListItemText primary={<Typography
                        variant="body"
                        fontSize={26}
                        fontWeight={1}
                      >
                        {question}
                      </Typography>}/>
                      {open === question ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>
                    <Collapse in={open === question} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding sx={{padding: 2, border: '2px solid #769656'}}>
                        <Typography
                          variant="body"
                          fontSize={20}
                          fontWeight={1}

                        >
                          {answers[index1][index]}
                        </Typography>

                        {question === 'How much does it cost?' &&
                            <Link
                              to="/contact"
                              style={{textDecoration: 'none', color: 'green'}}
                            >
                              <Typography
                                variant="body"
                                fontSize={20}
                              >
                                <b>here</b>
                              </Typography>
                            </Link>
                        }
                      </List>
                    </Collapse>
                    <Divider color={'#769656'} variant={'fullWidth'}/>
                  </>
                ),
              )}
            </List>
          ) )
        }

        <Typography
          variant="body1"
          my={10}
          fontSize={20}
        >
          If you have more questions, please feel free to {' '}
          <Link
            to="/contact"
            style={{textDecoration: 'none', color: 'green'}}
          >
            <b>contact us</b>
          </Link>
        </Typography>
      </Container>
      <Footer/>
    </>
  );
}
