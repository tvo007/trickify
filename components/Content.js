import React, {useState} from 'react';
import dynamic from 'next/dynamic';
const Editor = dynamic (() => import ('./Editor'), {ssr: false});
import {Grid, IconButton, Menu, MenuItem} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../lib/graphql-query-mutation';
import {useMutation} from 'graphql-hooks';
import {UPDATE_CONTENT_MUTATION} from '../lib/graphql-query-mutation';

const Content = ({refetchPage, content, id}) => {
  const [openEditor, setOpenEditor] = useState (false);
  const [updateContent ] = useMutation (UPDATE_CONTENT_MUTATION);
  //todo add mutations ^^

  const [anchorEl, setAnchorEl] = useState (null);

  const handleClick = event => {
    setAnchorEl (event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl (null);
  };

  const handleEdit = () => {
    handleClose ();
    setOpenEditor (true);
  };

  const saveContent = async content => {
    await updateContent ({variables: {id, content}});
    setOpenEditor (false);
    refetchPage()
  };

  if (openEditor)
    return (
      <div>
        <Editor content={content} saveContent={saveContent} />
      </div>
    );

  return (
    <Grid container direction="row" alignItems="center">
      <Grid item>
        <IconButton
          aria-label="options"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          size="small"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean (anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
        </Menu>
      </Grid>

      <Grid item>
        <div
          dangerouslySetInnerHTML={{
            __html: content ? content : '',
          }}
        />
      </Grid>

    
    </Grid>
  );
};

export default Content;
