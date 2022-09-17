import {Container, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import {Link} from 'react-router-dom';


export default function Faq() {
  const questions = ['What is My Chess Repertoire?', 'How do I create my repertoire?'];
  const answers = ['A website', 'Simple'];

  return (
    <>
      <Container maxWidth={'md'} component={'main'} sx={{mt: 15, mb: 6}}>
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
            Frequently asked questions
          </Typography>
        </Box>
        {questions.map((question, index) =>
          (
            <Box my={3} key={index}>
              <Typography
                variant="h4"
                mb={2}
              >
                {question}
              </Typography>
              <Typography
                variant="body"
                fontSize={18}
                fontWeight={1}
              >
                {answers[index]}
              </Typography>
            </Box>

          ),

        )}
        <Typography
          variant="body1"
          my={10}
          fontSize={20}
        >
          Still have questions? Feel free to {' '}
          <Link
            to="/contact"
            style={{textDecoration: 'none', color: 'green'}}
          >
            <b>contact us</b>
          </Link>
        </Typography>
      </Container>
    </>
  );
}
