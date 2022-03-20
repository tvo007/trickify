import React, {useEffect, useState} from 'react';
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
  convertFromRaw,
} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import Button from '@mui/material/Button';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import MUIRichTextEditor from 'mui-rte';
import {stateToHTML} from 'draft-js-export-html';

export default function CustomEditor({saveContent, content}) {
  var initalStateEditor;
  if (content) {
    const contentHTML = convertFromHTML (content);
    const contentState = ContentState.createFromBlockArray (
      contentHTML.contentBlocks,
      contentHTML.entityMap
    );
    initalStateEditor = JSON.stringify (convertToRaw (contentState));
  } else {
    const emptyHTML = convertFromHTML ('<p></p>');
    const emptyState = ContentState.createFromBlockArray (
      emptyHTML.contentBlocks,
      emptyHTML.entityMap
    );

    initalStateEditor = JSON.stringify (convertToRaw (emptyState));
  }

  const [editorState, setEditorState] = useState (initalStateEditor);

  // useEffect (() => {
  //   var initalStateEditor;
  //   if (content) {
  //     const contentHTML = convertFromHTML (content);
  //     const contentState = ContentState.createFromBlockArray (
  //       contentHTML.contentBlocks,
  //       contentHTML.entityMap
  //     );
  //     initalStateEditor = JSON.stringify (convertToRaw (contentState));
  //     setEditorState (initalStateEditor);
  //   } else {
  //     const emptyHTML = convertFromHTML ('<p></p>');
  //     const emptyState = ContentState.createFromBlockArray (
  //       emptyHTML.contentBlocks,
  //       emptyHTML.entityMap
  //     );

  //     initalStateEditor = JSON.stringify (convertToRaw (emptyState));
  //     setEditorState (initalStateEditor);
  //   }
  // }, []);

  const onEditorStateChange = e => {
    // setEditorState (editorState);
    // console.log (editorState);
    // const rteContent = convertToRaw (e.getCurrentContent ());
    // rteContent && setEditorState(JSON.stringify(rteContent))
    // console.log(editorState)
  };

  const onEditorSave = data => {
    /**
     *todo
     * data is a stringified Draft.Model.Encoding.RawDraftContentState
     * 1. parse via convertFromRaw(JSON.parse(data))
     * 2. callback via stateToHTML package
     * 3. How to sanitize??
     * 4. How to trigger onSave on a different button??
     */

    const encoded = convertFromRaw (JSON.parse (data));

    saveContent (stateToHTML (encoded));
  };

  //todo: problem: editor state does not exist
  //editor state does exist but not updating in state change

  return (
    <div>
      <div>
        <MUIRichTextEditor defaultValue={editorState} onSave={onEditorSave} />
      </div>
    </div>
  );
}
