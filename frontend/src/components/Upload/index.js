import React, { Component } from 'react';

import Dropzone from 'react-dropzone';

import { DropContainer, UploadMessage } from './styles';

export default class Upload extends Component {
    renderDragMessage = (isDragActive, isDragReject) => {
        if (!isDragActive) {
            return <UploadMessage>Arraste arquivos aqui...</UploadMessage>
        }

        if (isDragReject) {
            return <UploadMessage type='error'>Arquivo não suportado</UploadMessage>
        }

        return <UploadMessage type='success'>Solte os arquivos aqui</UploadMessage>
    };

    render() {
        const { onUpload } = this.props;

        return (
            /*
            <Dropzone> - Definindo área de upload
            "accept" - informa que tipo de imagem quer receber no upload (nesse caso todo tipo de IMAGEM)
            "onDropAccepted" - função que é chamada a cada upload realizado
            */
            <Dropzone accept="image/*" onDropAccepted={onUpload}>
                {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                    <DropContainer
                        {...getRootProps()} 
                        isDragActive={isDragActive}
                        isDragReject={isDragReject}
                    >
                        <input {...getInputProps()} />
                        {this.renderDragMessage(isDragActive, isDragReject)}
                    </DropContainer>
                )}
            </Dropzone>
        );
    }
}