import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import api from '../../services/api';

import GlobalStyle from '../../styles/global';
import { Container, Content } from './styles';

import Upload from '../../components/Upload';
import FileList from '../../components/FileList';

class Posts extends Component {
  state = {
    uploadedFiles: []
  };

  handleUpload = files => {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles),
    });

    uploadedFiles.forEach(this.processUpload);
  };

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
        return id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile;
      })
    })
  }

  processUpload = (uploadedFile) => {
    const data = new FormData();

    data.append('file', uploadedFile.file, uploadedFile.name);

    api.post('posts/upload', data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total));

        this.updateFile(uploadedFile.id, {
          progress,
        })
      }
    })
  }

  render() {
    const { uploadedFiles } = this.state;

    return (
      <Container>
        <Content>
          <Upload onUpload={this.handleUpload} />
          {!!uploadedFiles.length && (
            <FileList files={uploadedFiles} />
          )}
        </Content>
        <GlobalStyle />
      </Container>
    );
  }
}

export default Posts;
