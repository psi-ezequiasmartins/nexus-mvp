/** 
 * FileUploader.jsx
 */

import React, { useState } from 'react';
import { uploadFile } from '../../services/uploadService';
import { getAuth } from 'firebase/auth';

function FileUploader() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      setStatus('Enviando...');
      const auth = getAuth();
      const user = auth.currentUser;
      const userId = user?.uid || 'anon';

      const result = await uploadFile(file, userId);
      setStatus(`Upload concluído: ${result.filename}`);
    } catch (err) {
      console.error(err);
      setStatus('Erro ao enviar.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>Enviar</button>
      <p>{status}</p>
    </div>
  );
}

export default FileUploader;
