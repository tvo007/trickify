import {Button, Card, Typography, Box, Stack, Divider} from '@mui/material';
import React from 'react';
import Highlighter from 'react-highlight-words';

const ResultCard = ({item, playerHandler, searchInput}) => {
  return item
    ? <Box
        sx={{
          p: '10px',
          mx: '10px',
          my: '3px',
          textAlign: 'left',
          display: 'inline-block',
          width: 'auto',
          borderRadius: 1,
          hover: 'cursor-pointer',
          '&:hover': {
            background: '#F9F3F5',
            cursor: 'pointer',
          },
        }}
        onClick={() => playerHandler (item)}
      >
        <Stack direction="column">
          <Box>
            <Typography
              component={Box}
              fontWeight={'medium'}
              variant="subtitle2"
              sx={{color: '#ff5252'}}
            >
              <Highlighter
                searchWords={[searchInput.tricks]}
                autoEscape={true}
                textToHighlight={item.tricks}
                highlightStyle={{
                  textDecoration: 'underline',
                }}
                highlightTag={'strong'}
              />

            </Typography>
          </Box>

          <Stack direction="row" spacing={3}>
            <Typography
              component={Box}
              fontWeight={'regular'}
              variant="subtitle2"
              color="#6F6F6F"
            >
              {item.performed_by}
            </Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography
              component={Box}
              fontWeight={'regular'}
              variant="subtitle2"
              color="#6F6F6F"
            >
              {item.sampler.name}
            </Typography>

          </Stack>
        </Stack>
      </Box>
    : null;
};

export default ResultCard;

/**
 * <Button
      sx={{
      
        textAlign: 'left',
        display: 'inline-block',
        width: 'auto',
      }}
      onClick={() => playerHandler (item)}
    >
      
      {item.tricks}
    </Button>
 */
